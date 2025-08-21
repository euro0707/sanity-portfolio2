'use client'

import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui'
import { type ProjectWithGitHub } from '@/lib/sanity'
import { formatNumber, getRelativeTime, truncate } from '@/lib/utils'
import { ExternalLink, Star, GitFork, Calendar, Code } from 'lucide-react'

interface ProjectCardProps {
  project: ProjectWithGitHub
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { githubData } = project
  const hasGitHubData = !!githubData

  const openGitHub = () => {
    window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
  }

  const openHomepage = () => {
    if (githubData?.homepage) {
      window.open(githubData.homepage, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Card 
      variant={project.featured ? "glass" : "default"} 
      hoverable 
      className="h-full flex flex-col group"
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="flex items-center gap-2 mb-2 group-hover:text-neon-cyan transition-colors">
              {project.featured && (
                <span className="text-neon-yellow" title="Featured Project">⭐</span>
              )}
              <span className="truncate">{project.title}</span>
            </CardTitle>
            
            {hasGitHubData && (
              <div className="flex items-center gap-4 text-sm text-dark-muted mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>{formatNumber(githubData.stargazers_count)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-4 h-4" />
                  <span>{formatNumber(githubData.forks_count)}</span>
                </div>
                {githubData.language && (
                  <div className="flex items-center gap-1">
                    <Code className="w-4 h-4" />
                    <span>{githubData.language}</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={openGitHub}
              className="p-2 text-dark-muted hover:text-neon-cyan"
              aria-label="Open GitHub repository"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* Description */}
        <div className="mb-4 flex-1">
          <p className="text-sm text-dark-muted leading-relaxed">
            {githubData?.description 
              ? truncate(githubData.description, 120)
              : project.description 
                ? truncate(project.description, 120)
                : 'No description available'
            }
          </p>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="secondary" size="sm">
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 4 && (
                <Badge variant="secondary" size="sm">
                  +{project.tags.length - 4}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* GitHub Topics */}
        {hasGitHubData && githubData.topics && githubData.topics.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {githubData.topics.slice(0, 3).map((topic) => (
                <Badge key={topic} variant="neon" size="sm">
                  {topic}
                </Badge>
              ))}
              {githubData.topics.length > 3 && (
                <Badge variant="neon" size="sm">
                  +{githubData.topics.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Footer with metadata */}
        <div className="pt-4 mt-auto border-t border-dark-border">
          <div className="flex items-center justify-between text-xs text-dark-muted">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>
                {hasGitHubData 
                  ? `Updated ${getRelativeTime(githubData.updated_at)}`
                  : `Created ${getRelativeTime(project._createdAt)}`
                }
              </span>
            </div>
            
            {githubData?.license && (
              <div className="text-xs bg-dark-card px-2 py-1 rounded border border-dark-border">
                {githubData.license}
              </div>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-2 mt-3">
            <Button
              variant="primary"
              size="sm"
              onClick={openGitHub}
              className="flex-1"
            >
              View Code
            </Button>
            
            {githubData?.homepage && (
              <Button
                variant="secondary"
                size="sm"
                onClick={openHomepage}
                className="flex-1"
              >
                Live Demo
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}