"use client";

import React from "react";
import { MapPin, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface JobCircularProps {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: string;
  salary: string;
  imageUrl?: string;
  featuredBadge?: string;
  onApply?: () => void;
  onViewDetails?: () => void;
  className?: string;
}

export const JobCircularCard: React.FC<JobCircularProps> = ({
  title,
  company,
  companyLogo,
  location,
  type,
  salary,
  imageUrl,
  featuredBadge = "Featured",
  onApply,
  onViewDetails,
  className,
}) => {
  // Fallback image generator based on company
  const defaultImage = `https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80`;

  return (
    <div
      tabIndex={0}
      onClick={onViewDetails}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onViewDetails?.();
        }
      }}
      className={cn(
        "group relative flex flex-col justify-between w-full p-4 rounded-sm bg-canvas border border-hairline shadow-rest transition-all duration-200 cursor-pointer",
        "hover:shadow-hover hover:border-border-strong",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
    >
      <div>
        {/* Featured Image (1:1.77 aspect ratio, 8px radius) with overlaid pill badge */}
        <div className="relative w-full aspect-[1.77] rounded-sm overflow-hidden bg-surface-soft mb-2">
          <img
            src={imageUrl || defaultImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          {featuredBadge && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <Badge variant="secondary" className="shadow-xs">
                {featuredBadge}
              </Badge>
            </div>
          )}
        </div>

        {/* Company Row (Logo 32x32px + Name: title-sm 16px/600 ink) */}
        <div className="flex items-center gap-2.5 my-2">
          <div className="h-8 w-8 min-w-[32px] rounded-sm bg-primary-light text-primary flex items-center justify-center font-bold text-xs">
            {companyLogo || company.substring(0, 2).toUpperCase()}
          </div>
          <span className="text-[16px] font-semibold text-ink truncate leading-tight">
            {company}
          </span>
        </div>

        {/* Job Title: title-md 18px/600 in ink */}
        <h3 className="text-[18px] font-semibold text-ink leading-snug line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Job Meta Row: body-sm 14px/400 in body-secondary */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[14px] text-body-secondary">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-muted shrink-0" />
            <span className="truncate max-w-[120px]">{location}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5 text-muted shrink-0" />
            <span>{type}</span>
          </span>
        </div>

        <div className="mt-2 text-[14px] font-semibold text-ink">
          {salary}
        </div>
      </div>

      {/* Apply CTA Button: button-primary full-width 48px min height */}
      <div className="mt-3 pt-2">
        <Button
          variant="primary"
          size="md"
          className="w-full min-h-[48px] text-[15px] font-semibold"
          onClick={(e) => {
            e.stopPropagation();
            onApply?.();
          }}
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
};
