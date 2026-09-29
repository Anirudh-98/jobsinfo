"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X, Radio, CalendarPlus } from "lucide-react";
import { ANNOUNCEMENTS } from "@/data/homeContent";

export const AnnouncementBar: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % ANNOUNCEMENTS.length), 4500);
    return () => window.clearInterval(id);
  }, []);

  if (!visible) return null;

  return (
    <div className="relative bg-[#0b1f4d] text-white" role="region" aria-label="Announcements">
      <div className="max-w-7xl mx-auto flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-2 pr-12 text-[13px]">
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red-500/15 px-2 py-0.5 font-semibold text-red-300">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-live-pulse" aria-hidden />
          LIVE NOW
        </span>
        <p className="hidden md:block truncate text-white/85">
          <span className="text-white/60">1.2K watching ·</span> Expert Session: Career Opportunities in Emerging
          Industries with <span className="font-semibold text-white">Dr. Ravi Kumar</span>
        </p>
        <p className="hidden min-[400px]:block md:hidden min-w-0 truncate text-white/85">
          Expert session · <span className="font-semibold text-white">Dr. Ravi Kumar</span>
        </p>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link
            href="/masterclass"
            className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-[#0b1f4d] hover:bg-primary-light transition-colors"
          >
            <Radio className="h-3.5 w-3.5" aria-hidden /> Watch Live
          </Link>
          <Link
            href="/masterclass"
            className="hidden sm:inline-flex items-center gap-1 rounded-full border border-white/25 px-3 py-1 text-[12px] font-semibold hover:bg-white/10 transition-colors"
          >
            <CalendarPlus className="h-3.5 w-3.5" aria-hidden /> Schedule
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 text-center text-[12.5px] font-semibold text-white" aria-live="polite">
          {ANNOUNCEMENTS[index]}
        </p>
      </div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss announcements"
        className="absolute right-2 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white cursor-pointer"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
