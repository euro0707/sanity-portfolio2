import { getAllProjects } from '@/lib/sanity'
import { ProjectGrid } from '@/components/ProjectGrid'
import { Hero } from '@/components/Hero'

export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  const projects = await getAllProjects()
  const featuredProjects = projects.filter(project => project.featured)

  return (
    <main className="min-h-screen">
      <Hero />
      
      {featuredProjects.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-text mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-dark-muted max-w-2xl mx-auto">
                Showcasing some of my best work with real-time GitHub data
              </p>
            </div>
            
            <ProjectGrid projects={featuredProjects} />
          </div>
        </section>
      )}
      
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-text mb-4">
              All Projects
            </h2>
            <p className="text-lg text-dark-muted max-w-2xl mx-auto">
              A complete overview of my development journey
            </p>
          </div>
          
          <ProjectGrid projects={projects} />
        </div>
      </section>
    </main>
  )
}