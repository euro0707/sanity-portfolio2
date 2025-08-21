import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "error" | "neon"
  size?: "sm" | "md" | "lg"
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center font-medium transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          
          // Size variants
          {
            "px-2 py-0.5 text-xs rounded-1": size === "sm",
            "px-2.5 py-1 text-xs rounded-1": size === "md",
            "px-3 py-1.5 text-sm rounded-2": size === "lg",
          },
          
          // Color variants
          {
            // Default
            "bg-dark-border text-dark-text": variant === "default",
            
            // Secondary
            "bg-dark-card border border-dark-border text-dark-muted": variant === "secondary",
            
            // Success
            "bg-status-success/20 text-status-success border border-status-success/30": variant === "success",
            
            // Warning
            "bg-status-warning/20 text-status-warning border border-status-warning/30": variant === "warning",
            
            // Error
            "bg-status-error/20 text-status-error border border-status-error/30": variant === "error",
            
            // Neon - Special glowing effect
            "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30": variant === "neon",
          },
          
          // Glow effect for neon variant
          {
            "shadow-sm shadow-neon-cyan/25": variant === "neon",
          },
          
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"

export { Badge }