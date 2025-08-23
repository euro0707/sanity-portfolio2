'use client'

import { useEffect, useState } from 'react'
import { ProjectCard } from './ProjectCard'
import { type Project, type ProjectWithGitHub } from '@/lib/sanity'

interface ProjectWithGitHubDataProps {
  project: Project
}

export function ProjectWithGitHubData({ project }: ProjectWithGitHubDataProps) {
  const [projectWithGitHub, setProjectWithGitHub] = useState<ProjectWithGitHub>({ ...project })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        // Extract repo name from GitHub URL
        const repoMatch = project.githubUrl.match(/github\.com\/([^/]+\/[^/]+)/)
        if (!repoMatch) {
          setProjectWithGitHub({ ...project })
          setLoading(false)
          return
        }

        const repoName = repoMatch[1]
        const response = await fetch(`/api/github?repo=${encodeURIComponent(repoName)}`)
        
        if (response.ok) {
          const githubData = await response.json()
          setProjectWithGitHub({
            ...project,
            githubData
          })
        } else {
          console.warn(`Failed to fetch GitHub data for ${repoName}:`, response.status)
          setProjectWithGitHub({ ...project })
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
        setProjectWithGitHub({ ...project })
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [project])

  return <ProjectCard project={projectWithGitHub} loading={loading} />
}