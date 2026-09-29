import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, leftIcon, rightIcon, id, disabled, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[13px] font-medium text-muted tracking-[0.2px]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-muted">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={cn(
              "w-full h-12 px-4 py-3 text-[15px] rounded-sm bg-canvas border text-ink placeholder:text-muted-soft transition-all duration-200 outline-none",
              leftIcon ? "pl-10" : "pl-4",
              rightIcon ? "pr-10" : "pr-4",
              error
                ? "border-2 border-error focus:border-error focus:ring-1 focus:ring-error"
                : "border-hairline focus:border-2 focus:border-border-strong focus:shadow-rest",
              disabled && "bg-surface-soft text-muted cursor-not-allowed",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-error flex items-center gap-1 font-medium mt-1">
            <span>⚠</span> {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-muted mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
