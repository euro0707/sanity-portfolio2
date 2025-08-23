'use client'

import { Button } from '@/components/ui'

export function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.querySelector('section')
    projectsSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 left-1/6 w-48 h-48 bg-neon-green/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Main heading */}
        <div className="mb-8 animate-in">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Modern
            <span className="block text-transparent bg-gradient-to-r from-primary via-accent to-pink-400 bg-clip-text animate-glow">
              Developer
            </span>
            Portfolio
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Showcasing innovative projects with real-time GitHub integration, 
            built with cutting-edge technologies and stunning neon aesthetics.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            variant="primary"
            onClick={scrollToProjects}
            className="animate-glow"
          >
            View Projects
          </Button>
          
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => window.open('https://github.com/euro0707', '_blank')}
          >
            GitHub Profile
          </Button>
        </div>

        {/* Tech stack indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto opacity-75">
          {[
            { name: 'Next.js', color: 'neon-cyan' },
            { name: 'TypeScript', color: 'neon-purple' },
            { name: 'Sanity CMS', color: 'neon-green' },
            { name: 'Tailwind CSS', color: 'neon-pink' }
          ].map((tech, index) => (
            <div 
              key={tech.name}
              className="glass-card p-3 rounded-2 text-center transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`text-${tech.color} font-mono text-sm font-medium`}>
                {tech.name}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}