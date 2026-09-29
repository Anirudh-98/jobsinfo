"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CategoryCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  icon: Icon,
  title,
  description,
  onClick,
  className,
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        "group relative flex flex-col justify-between w-full h-[160px] p-4 rounded-sm bg-canvas border border-hairline shadow-rest transition-all duration-200 cursor-pointer select-none",
        "hover:shadow-hover hover:bg-surface-soft hover:border-border-strong",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
    >
      {/* Icon: 40x40px, centered top, muted color shifts to primary blue on hover */}
      <div className="flex justify-center w-full">
        <div className="h-10 w-10 min-h-[40px] min-w-[40px] rounded-sm flex items-center justify-center text-muted group-hover:text-primary transition-colors duration-200">
          <Icon className="h-7 w-7" />
        </div>
      </div>

      {/* Text block: title-sm 16px/600 in ink, body-sm 14px/400 in body-secondary */}
      <div className="text-left mt-2">
        <h3 className="text-[16px] font-semibold text-ink leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-[14px] text-body-secondary line-clamp-2 mt-1.5 leading-snug">
          {description}
        </p>
      </div>
    </div>
  );
};
