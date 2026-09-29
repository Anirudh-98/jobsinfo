"use client";

import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TestimonialCardProps {
  quote: string;
  authorName: string;
  authorTitle: string;
  companyOrCollege?: string;
  avatarUrl?: string;
  rating?: number;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  authorName,
  authorTitle,
  companyOrCollege,
  avatarUrl,
  rating = 5,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between w-full h-full min-h-[280px] p-6 rounded-sm bg-canvas border border-hairline shadow-rest transition-all duration-200",
        "hover:shadow-hover",
        className
      )}
    >
      <div>
        {/* Star Rating: 5x16px stars, #fbbf24 amber */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-[#fbbf24] text-[#fbbf24]" />
          ))}
        </div>

        {/* Review Excerpt: body-md 15px/400 in ink */}
        <p className="text-[15px] font-normal text-ink leading-relaxed line-clamp-4">
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      <div className="mt-4">
        {/* Divider: 1px hairline */}
        <div className="h-px w-full bg-hairline my-3" />

        {/* Author Details: 40x40px avatar + title-sm author name + body-sm muted title */}
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={authorName}
              className="h-10 w-10 min-h-[40px] min-w-[40px] rounded-full object-cover border border-hairline"
            />
          ) : (
            <div className="h-10 w-10 min-h-[40px] min-w-[40px] rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-xs">
              {authorName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)}
            </div>
          )}
          <div className="min-w-0">
            <h4 className="text-[16px] font-semibold text-ink leading-tight truncate">
              {authorName}
            </h4>
            <p className="text-[14px] text-muted leading-tight truncate mt-0.5">
              {authorTitle}
              {companyOrCollege ? ` · ${companyOrCollege}` : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
