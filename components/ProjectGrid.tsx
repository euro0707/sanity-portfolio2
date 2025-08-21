'use client'

import { ProjectCard } from './ProjectCard'
import { type ProjectWithGitHub } from '@/lib/sanity'

interface ProjectGridProps {
  projects: ProjectWithGitHub[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4 opacity-50">🚀</div>
        <h3 className="text-xl font-semibold text-dark-text mb-2">No projects yet</h3>
        <p className="text-dark-muted">
          Projects will appear here once they are added to the CMS.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <div
          key={project._id}
          className="animate-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  )
}