import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${React.useId()}`
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`
    
    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-dark-text"
          >
            {label}
          </label>
        )}
        
        <input
          type={type}
          className={cn(
            // Base styles
            "flex w-full rounded-2 border px-3 py-2",
            "text-sm text-dark-text placeholder:text-dark-muted",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            
            // Default state
            "bg-dark-card border-dark-border",
            "focus:border-neon-cyan focus:ring-neon-cyan/20",
            
            // Error state
            {
              "border-status-error focus:border-status-error focus:ring-status-error/20": 
                error,
            },
            
            className
          )}
          ref={ref}
          id={inputId}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={cn(
            error && errorId,
            helperText && helperId
          )}
          {...props}
        />
        
        {error && (
          <p 
            id={errorId}
            className="text-sm text-status-error"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p 
            id={helperId}
            className="text-sm text-dark-muted"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }