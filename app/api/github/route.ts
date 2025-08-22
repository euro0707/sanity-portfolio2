import { NextResponse } from "next/server"
import { z } from "zod"
import { rateLimit, getClientIP } from "@/lib/rateLimit"
import { ENV } from "@/lib/env"

export const runtime = "nodejs"

// GitHub API response schema
const GitHubRepoSchema = z.object({
  full_name: z.string(),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  language: z.string().nullable(),
  html_url: z.string().url(),
  homepage: z.string().nullable(),
  pushed_at: z.string(),
  updated_at: z.string(),
  topics: z.array(z.string()).optional(),
  license: z.object({
    name: z.string(),
    spdx_id: z.string().optional(),
  }).nullable().optional(),
  open_issues_count: z.number().optional(),
})

type GitHubRepo = z.infer<typeof GitHubRepoSchema>

interface CacheEntry {
  data: GitHubRepo | null
  timestamp: number
  ttl: number
}

const cache = new Map<string, CacheEntry>()

function parseRepoPath(input: string): string | null {
  try {
    // Handle GitHub URLs
    if (input.startsWith("http")) {
      const url = new URL(input)
      if (url.hostname !== "github.com") {
        return null
      }
      const pathParts = url.pathname.replace(/^\/+/, "").split("/")
      const [owner, repo] = pathParts
      if (!owner || !repo || pathParts.length > 2) {
        return null
      }
      return `${owner}/${repo}`
    }
    
    // Handle owner/repo format
    if (/^[\w.-]+\/[\w.-]+$/.test(input.trim())) {
      return input.trim()
    }
    
    return null
  } catch {
    return null
  }
}

function getCachedData(key: string): GitHubRepo | null {
  const entry = cache.get(key)
  if (!entry) return null
  
  const now = Date.now()
  if (now - entry.timestamp > entry.ttl) {
    cache.delete(key)
    return null
  }
  
  return entry.data
}

function setCachedData(key: string, data: GitHubRepo | null, ttl: number): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl
  })
  
  // Clean up expired entries periodically
  if (cache.size > 100) {
    const now = Date.now()
    for (const [k, entry] of cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        cache.delete(k)
      }
    }
  }
}

async function fetchGitHubRepo(repo: string): Promise<GitHubRepo | null> {
  const cacheKey = `repo:${repo}`
  
  // Check cache first
  const cached = getCachedData(cacheKey)
  if (cached) {
    return cached
  }
  
  const headers: Record<string, string> = {
    "Accept": "application/vnd.github+json",
    "User-Agent": "neo-portfolio-bot/1.0",
    "X-GitHub-Api-Version": "2022-11-28"
  }
  
  if (ENV.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${ENV.GITHUB_TOKEN}`
  }
  
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, { 
      headers,
      next: { revalidate: false } // We handle caching manually
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error(`GitHub API error for ${repo}: ${response.status} ${errorText}`)
      
      // Cache errors for shorter duration
      if (response.status === 404) {
        setCachedData(cacheKey, null, 300_000) // 5 minutes for not found
      } else if (response.status === 403) {
        setCachedData(cacheKey, null, 60_000) // 1 minute for rate limit
      }
      
      return null
    }
    
    const data = await response.json()
    const validatedData = GitHubRepoSchema.parse(data)
    
    // Cache successful responses for 1 hour
    setCachedData(cacheKey, validatedData, 3600_000)
    
    return validatedData
    
  } catch (error) {
    console.error(`Error fetching GitHub repo ${repo}:`, error)
    
    // Cache fetch errors for 1 minute
    setCachedData(cacheKey, null, 60_000)
    
    return null
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    // Rate limiting
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(`github:${clientIP}`, 60, 60_000)
    
    if (!rateLimitResult.ok) {
      return NextResponse.json(
        { 
          error: "Too Many Requests",
          retryAfter: rateLimitResult.retryAfter 
        }, 
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.retryAfter?.toString() || '60',
            'X-RateLimit-Limit': '60',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
          }
        }
      )
    }
    
    // Parse and validate input
    const { searchParams } = new URL(request.url)
    const repoInput = searchParams.get("repo")
    
    if (!repoInput) {
      return NextResponse.json(
        { error: "Missing 'repo' parameter" }, 
        { status: 400 }
      )
    }
    
    const repo = parseRepoPath(repoInput)
    if (!repo) {
      return NextResponse.json(
        { 
          error: "Invalid repository format. Use 'owner/repo' or GitHub URL" 
        }, 
        { status: 400 }
      )
    }
    
    // Fetch repository data
    const repoData = await fetchGitHubRepo(repo)
    
    if (!repoData) {
      return NextResponse.json(
        { error: "Repository not found or inaccessible" }, 
        { status: 404 }
      )
    }
    
    // Return filtered response
    const response = {
      full_name: repoData.full_name,
      description: repoData.description || "",
      stargazers_count: repoData.stargazers_count,
      forks_count: repoData.forks_count,
      language: repoData.language || "Unknown",
      html_url: repoData.html_url,
      homepage: repoData.homepage || "",
      pushed_at: repoData.pushed_at,
      updated_at: repoData.updated_at,
      topics: repoData.topics || [],
      license: repoData.license?.name || null,
      open_issues_count: repoData.open_issues_count || 0,
    }
    
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'X-RateLimit-Limit': '60',
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
      }
    })
    
  } catch (error) {
    console.error("GitHub API route error:", error)
    
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    )
  }
}