import * as React from "react"
import { cn } from "@/lib/utils"

export interface LoadingProps {
  size?: "sm" | "md" | "lg"
  variant?: "spinner" | "pulse" | "dots"
  className?: string
}

const Loading: React.FC<LoadingProps> = ({ 
  size = "md", 
  variant = "spinner", 
  className 
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  }
  
  if (variant === "spinner") {
    return (
      <div
        className={cn(
          "border-2 border-current border-t-transparent rounded-full animate-spin",
          sizeClasses[size],
          className
        )}
        role="status"
        aria-label="Loading"
      />
    )
  }
  
  if (variant === "pulse") {
    return (
      <div
        className={cn(
          "bg-current rounded-full animate-pulse",
          sizeClasses[size],
          className
        )}
        role="status"
        aria-label="Loading"
      />
    )
  }
  
  if (variant === "dots") {
    return (
      <div 
        className={cn("flex space-x-1", className)}
        role="status"
        aria-label="Loading"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "bg-current rounded-full animate-bounce",
              {
                "w-1 h-1": size === "sm",
                "w-1.5 h-1.5": size === "md",
                "w-2 h-2": size === "lg",
              }
            )}
            style={{ 
              animationDelay: `${i * 0.1}s`,
              animationDuration: "0.6s"
            }}
          />
        ))}
      </div>
    )
  }
  
  return null
}

export interface LoadingStateProps {
  loading: boolean
  error?: string | null
  children: React.ReactNode
  loadingComponent?: React.ReactNode
  errorComponent?: React.ReactNode
}

const LoadingState: React.FC<LoadingStateProps> = ({
  loading,
  error,
  children,
  loadingComponent,
  errorComponent
}) => {
  if (error) {
    if (errorComponent) {
      return <>{errorComponent}</>
    }
    
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="text-status-error mb-2">⚠️</div>
        <p className="text-status-error font-medium mb-1">Something went wrong</p>
        <p className="text-dark-muted text-sm">{error}</p>
      </div>
    )
  }
  
  if (loading) {
    if (loadingComponent) {
      return <>{loadingComponent}</>
    }
    
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Loading size="lg" className="text-neon-cyan mb-3" />
        <p className="text-dark-muted text-sm">Loading...</p>
      </div>
    )
  }
  
  return <>{children}</>
}

export { Loading, LoadingState }