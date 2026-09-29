"use client";

import React from "react";
import { Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface TeamHireCardProps {
  name: string;
  role: string;
  avatarUrl: string;
  bio?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
    website?: string;
  };
  onConnect?: () => void;
  className?: string;
}

export const TeamHireCard: React.FC<TeamHireCardProps> = ({
  name,
  role,
  avatarUrl,
  bio,
  onConnect,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between text-center w-full p-6 rounded-sm bg-canvas border border-hairline shadow-rest transition-all duration-200",
        "hover:shadow-hover hover:border-border-strong",
        className
      )}
    >
      <div className="flex flex-col items-center w-full">
        {/* Avatar: 120x120px circular */}
        <div className="relative h-[120px] w-[120px] rounded-full overflow-hidden border-2 border-hairline shadow-xs mb-4">
          <img
            src={avatarUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Member Name: title-md 18px/600 in ink */}
        <h3 className="text-[18px] font-semibold text-ink leading-tight">
          {name}
        </h3>

        {/* Job Title: body-sm 14px/400 in muted */}
        <p className="text-[14px] text-muted font-normal mt-1 leading-normal">
          {role}
        </p>

        {bio && (
          <p className="text-[13px] text-body-secondary mt-2 line-clamp-2 max-w-[260px]">
            {bio}
          </p>
        )}

        {/* Social Links: 3-4 icons, 24x24px each */}
        <div className="flex items-center justify-center gap-3 my-4">
          <button
            aria-label="LinkedIn profile"
            className="h-8 w-8 rounded-sm flex items-center justify-center text-muted hover:text-primary hover:bg-surface-soft transition-colors"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </button>
          <button
            aria-label="Twitter / X profile"
            className="h-8 w-8 rounded-sm flex items-center justify-center text-muted hover:text-primary hover:bg-surface-soft transition-colors"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
          <button
            aria-label="Email contact"
            className="h-8 w-8 rounded-sm flex items-center justify-center text-muted hover:text-primary hover:bg-surface-soft transition-colors"
          >
            <Mail className="h-4 w-4" />
          </button>
          <button
            aria-label="Personal portfolio"
            className="h-8 w-8 rounded-sm flex items-center justify-center text-muted hover:text-primary hover:bg-surface-soft transition-colors"
          >
            <Globe className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Full-width Contact/Connect CTA button-secondary */}
      <div className="w-full pt-2">
        <Button
          variant="secondary"
          size="md"
          className="w-full min-h-[48px] text-[15px] font-medium"
          onClick={onConnect}
        >
          Connect Profile
        </Button>
      </div>
    </div>
  );
};
