import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "bordered"
  hoverable?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hoverable = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "rounded-3 p-4 md:p-6 transition-all duration-300",
          
          // Variant styles
          {
            // Default card
            "bg-dark-card border border-dark-border": variant === "default",
            
            // Glass effect card
            "glass-card": variant === "glass",
            
            // Bordered card with gradient
            "gradient-border": variant === "bordered",
          },
          
          // Hover effects
          {
            "hover:border-neon-cyan/30 hover:shadow-lg hover:shadow-neon-cyan/10": 
              hoverable && variant === "default",
            "hover:border-neon-purple/30 hover:shadow-lg hover:shadow-neon-purple/10": 
              hoverable && variant === "glass",
            "hover:scale-[1.02] hover:shadow-xl": hoverable,
          },
          
          className
        )}
        {...props}
      />
    )
  }
)

Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 mb-4", className)}
    {...props}
  />
))

CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-dark-text",
      className
    )}
    {...props}
  />
))

CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-dark-muted", className)}
    {...props}
  />
))

CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))

CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4 mt-4 border-t border-dark-border", className)}
    {...props}
  />
))

CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }