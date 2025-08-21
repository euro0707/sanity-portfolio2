import { createClient } from '@sanity/client'
import { groq } from 'groq'
import { ENV } from './env'

export const sanityClient = createClient({
  projectId: ENV.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: ENV.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
  perspective: 'published',
})

// GROQ queries
export const QUERIES = {
  ALL_PROJECTS: groq`*[_type == "project"] | order(featured desc, _createdAt desc) {
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
  
  PROJECT_BY_SLUG: groq`*[_type == "project" && slug.current == $slug][0] {
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
  
  FEATURED_PROJECTS: groq`*[_type == "project" && featured == true] | order(_createdAt desc) {
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
    return await sanityClient.fetch(QUERIES.ALL_PROJECTS)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    return await sanityClient.fetch(QUERIES.PROJECT_BY_SLUG, { slug })
  } catch (error) {
    console.error('Error fetching project by slug:', error)
    return null
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    return await sanityClient.fetch(QUERIES.FEATURED_PROJECTS)
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
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
    const response = await fetch(`/api/github?repo=${encodeURIComponent(repoName)}`)
    
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