import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "cta" | "outline" | "ghost" | "chip";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none cursor-pointer active:scale-[0.98]";

    const sizeStyles = {
      sm: "min-h-[36px] px-3.5 text-[13px] rounded-sm gap-1.5 font-medium",
      md: "min-h-[48px] px-4 py-3 text-[15px] rounded-sm gap-2 font-semibold",
      lg: "min-h-[48px] px-6 py-3 text-[16px] rounded-sm gap-2.5 font-semibold",
      icon: "min-h-[40px] min-w-[40px] h-10 w-10 p-0 rounded-sm justify-center items-center",
    };

    const variantStyles = {
      // Quietly button-primary: Vibrant blue (#2563eb), white text, 8px radius, Rest -> Hover shadow
      primary:
        "bg-primary text-white hover:bg-primary-hover active:bg-primary-active shadow-rest hover:shadow-hover disabled:bg-primary-disabled disabled:text-muted disabled:shadow-none active:shadow-inner",
      
      // Quietly button-secondary: White bg, 1px solid primary, primary text
      secondary:
        "bg-white text-primary border border-primary hover:bg-surface-strong hover:text-primary-hover hover:border-primary-hover hover:shadow-rest active:bg-surface-soft active:text-primary-active disabled:border-hairline disabled:text-muted disabled:shadow-none",

      // Quietly button-tertiary: inline link style with underline on hover
      tertiary:
        "bg-transparent text-primary hover:text-primary-hover hover:underline active:text-primary-active p-0 min-h-0 min-w-0 shadow-none",

      // Quietly CTA: Vibrant blue primary or high-visibility action
      cta:
        "bg-primary text-white hover:bg-primary-hover active:bg-primary-active shadow-rest hover:shadow-hover font-semibold",

      // Outline with hairline border
      outline:
        "border border-hairline text-ink bg-white hover:bg-surface-strong hover:border-border-strong shadow-rest",

      // Ghost
      ghost:
        "text-ink hover:text-primary hover:bg-surface-strong shadow-none",

      // Filter chip
      chip:
        "min-h-[32px] px-3 text-xs rounded-full border border-hairline bg-white text-body hover:border-primary hover:text-primary transition-colors shadow-none",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <span>Please wait...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
