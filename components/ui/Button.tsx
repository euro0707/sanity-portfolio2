import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const isDisabled = disabled || loading

    return (
      <button
        className={cn(
          // Base styles
          "inline-flex items-center justify-center gap-2",
          "font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          "relative overflow-hidden",
          
          // Size variants
          {
            "h-9 px-3 text-sm rounded-1": size === "sm",
            "h-11 px-4 text-sm rounded-2": size === "md", 
            "h-12 px-6 text-base rounded-2": size === "lg",
          },
          
          // Color variants
          {
            // Primary - Neon cyan
            "bg-neon-cyan text-dark-bg hover:bg-neon-cyan/90": variant === "primary",
            "hover:shadow-lg hover:shadow-neon-cyan/25": variant === "primary",
            "focus-visible:ring-neon-cyan": variant === "primary",
            
            // Secondary - Dark with border
            "bg-dark-card border border-dark-border text-dark-text": variant === "secondary",
            "hover:bg-dark-border hover:border-neon-purple/50": variant === "secondary",
            "focus-visible:ring-neon-purple": variant === "secondary",
            
            // Ghost - Transparent
            "text-dark-text hover:bg-dark-card/50": variant === "ghost",
            "focus-visible:ring-dark-border": variant === "ghost",
            
            // Danger - Red
            "bg-status-error text-white hover:bg-status-error/90": variant === "danger",
            "hover:shadow-lg hover:shadow-status-error/25": variant === "danger",
            "focus-visible:ring-status-error": variant === "danger",
          },
          
          className
        )}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        <span className={cn("transition-opacity duration-200", {
          "opacity-0": loading,
          "opacity-100": !loading
        })}>
          {children}
        </span>
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }