import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "primary"
    | "secondary"
    | "info"
    | "neutral"
    | "default"
    | "dark"
    | "outline"
    | "live"
    | "success"
    | "alert"
    | "warning";
  isPulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  isPulse = false,
  children,
  ...props
}) => {
  const variantStyles = {
    // Quietly Primary: Vibrant blue #2563eb with white text
    primary: "bg-primary text-white",
    default: "bg-primary-light text-primary border border-primary/20",
    
    // Quietly Secondary: Orange #f97316 with white text ("Featured", "Top Rated")
    secondary: "bg-secondary text-white",

    // Quietly Info / Tertiary: #06b6d4 with white text
    info: "bg-tertiary text-white",

    // Quietly Neutral: #f3f4f6 with ink text
    neutral: "bg-surface-strong text-ink border border-hairline",

    // Dark
    dark: "bg-ink text-white",

    // Outline
    outline: "bg-white text-ink border border-hairline",

    // Live stream badge
    live: "bg-primary text-white font-semibold uppercase tracking-wider text-[11px]",

    // Semantic success
    success: "bg-success-light text-success border border-success/30",

    // Semantic alert
    alert: "bg-error-light text-error border border-error/30",

    // Semantic warning
    warning: "bg-warning-light text-warning border border-warning/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1.5 min-h-[24px] px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-[0.3px]",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {isPulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
      )}
      {children}
    </span>
  );
};
