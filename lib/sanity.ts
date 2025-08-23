import { createClient } from '@sanity/client'
import { ENV } from './env'

export const sanityClient = ENV.NEXT_PUBLIC_SANITY_PROJECT_ID && ENV.NEXT_PUBLIC_SANITY_DATASET 
  ? createClient({
      projectId: ENV.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: ENV.NEXT_PUBLIC_SANITY_DATASET,
      useCdn: process.env.NODE_ENV === 'production',
      apiVersion: '2024-01-01',
      perspective: 'published',
    })
  : null

// GROQ queries
export const QUERIES = {
  ALL_PROJECTS: `*[_type == "project"] | order(featured desc, _createdAt desc) {
    _id,
    title,
    slug,
    description,
    githubUrl,
    featured,
    tags,
    _createdAt,
    _updatedAt
  }`,
  
  PROJECT_BY_SLUG: `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    githubUrl,
    featured,
    tags,
    _createdAt,
    _updatedAt
  }`,
  
  FEATURED_PROJECTS: `*[_type == "project" && featured == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    githubUrl,
    tags,
    _createdAt
  }`,
}

// Type definitions
export interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  githubUrl: string
  featured: boolean
  tags: string[]
  _createdAt: string
  _updatedAt: string
}

export interface ProjectWithGitHub extends Project {
  githubData?: {
    full_name: string
    description: string
    stargazers_count: number
    forks_count: number
    language: string
    html_url: string
    homepage: string
    pushed_at: string
    updated_at: string
    topics: string[]
    license: string | null
    open_issues_count: number
  }
}

// Helper functions
export async function getAllProjects(): Promise<Project[]> {
  try {
    // If Sanity client is not configured, use mock data
    if (!sanityClient) {
      console.log('Sanity client not configured, using mock data')
      const { mockProjects } = await import('./mock-data')
      return mockProjects
    }
    
    const projects = await sanityClient.fetch(QUERIES.ALL_PROJECTS)
    // If no projects in Sanity, use mock data for development
    if (projects.length === 0) {
      const { mockProjects } = await import('./mock-data')
      return mockProjects
    }
    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    // Fallback to mock data
    const { mockProjects } = await import('./mock-data')
    return mockProjects
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    if (!sanityClient) {
      console.log('Sanity client not configured, using mock data for slug lookup')
      const { mockProjects } = await import('./mock-data')
      return mockProjects.find(p => p.slug.current === slug) || null
    }
    return await sanityClient.fetch(QUERIES.PROJECT_BY_SLUG, { slug })
  } catch (error) {
    console.error('Error fetching project by slug:', error)
    return null
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    if (!sanityClient) {
      console.log('Sanity client not configured, using mock featured projects')
      const { mockProjects } = await import('./mock-data')
      return mockProjects.filter(p => p.featured)
    }
    return await sanityClient.fetch(QUERIES.FEATURED_PROJECTS)
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    const { mockProjects } = await import('./mock-data')
    return mockProjects.filter(p => p.featured)
  }
}

export async function getProjectWithGitHubData(project: Project): Promise<ProjectWithGitHub> {
  try {
    // Extract repo name from GitHub URL
    const repoMatch = project.githubUrl.match(/github\.com\/([^/]+\/[^/]+)/)
    if (!repoMatch) {
      return { ...project }
    }

    const repoName = repoMatch[1]
    // Skip GitHub API calls during build time to avoid timeouts
    if (typeof window === 'undefined' && process.env.VERCEL_ENV === 'build') {
      return { ...project }
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3002')
    const response = await fetch(`${baseUrl}/api/github?repo=${encodeURIComponent(repoName)}`)
    
    if (!response.ok) {
      console.warn(`Failed to fetch GitHub data for ${repoName}:`, response.status)
      return { ...project }
    }

    const githubData = await response.json()
    return {
      ...project,
      githubData
    }
  } catch (error) {
    console.error('Error fetching GitHub data:', error)
    return { ...project }
  }
}

export async function getAllProjectsWithGitHubData(): Promise<ProjectWithGitHub[]> {
  try {
    const projects = await getAllProjects()
    
    // Fetch GitHub data for all projects in parallel
    const projectsWithGitHub = await Promise.allSettled(
      projects.map(project => getProjectWithGitHubData(project))
    )
    
    return projectsWithGitHub
      .filter((result): result is PromiseFulfilledResult<ProjectWithGitHub> => 
        result.status === 'fulfilled'
      )
      .map(result => result.value)
  } catch (error) {
    console.error('Error fetching projects with GitHub data:', error)
    return []
  }
}