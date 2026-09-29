"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { VIEWS, ViewId } from "@/components/dashboard/views";

const item =
  "group relative grid h-11 w-11 place-items-center rounded-2xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30";

const Tip: React.FC<{ label: string }> = ({ label }) => (
  <span className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-20 -translate-y-1/2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1 text-[11.5px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
    {label}
  </span>
);

// Icon rail on the left of the dashboard (md and up). Every item switches the view in place.
export const DashboardSidebar: React.FC<{ active: ViewId; onSignOut: () => void }> = ({ active, onSignOut }) => (
  <nav aria-label="Dashboard" className="sticky top-3 hidden min-h-[calc(100dvh-2.5rem)] w-[76px] shrink-0 flex-col items-center gap-2 self-start py-5 md:flex">
    {VIEWS.map(({ id, label, icon: Icon, group }, i) => {
      const isActive = active === id;
      const newGroup = i > 0 && VIEWS[i - 1].group !== group;
      return (
        <React.Fragment key={id}>
          {newGroup && <span className="my-2 h-px w-8 bg-hairline" aria-hidden />}
          <a
            href={`#${id}`}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
            className={cn(item, isActive ? "btn-gradient" : "text-body hover:bg-primary-light hover:text-primary")}
          >
            <Icon className="h-[18px] w-[18px]" aria-hidden />
            <Tip label={label} />
          </a>
        </React.Fragment>
      );
    })}
    <button
      type="button"
      onClick={onSignOut}
      aria-label="Sign out"
      className={cn(item, "mt-auto text-body hover:bg-rose-50 hover:text-rose-600 cursor-pointer")}
    >
      <LogOut className="h-[18px] w-[18px]" aria-hidden />
      <Tip label="Sign out" />
    </button>
  </nav>
);

// Same views as a horizontally scrolling pill bar for phones, where the rail is hidden.
export const DashboardMobileNav: React.FC<{ active: ViewId }> = ({ active }) => (
  <nav aria-label="Dashboard" className="no-scrollbar -mx-3 mb-4 flex gap-2 overflow-x-auto px-3 md:hidden">
    {VIEWS.map(({ id, label, icon: Icon }) => {
      const isActive = active === id;
      return (
        <a
          key={id}
          href={`#${id}`}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium transition-colors",
            isActive ? "btn-gradient" : "border border-hairline bg-white text-body"
          )}
        >
          <Icon className="h-4 w-4" aria-hidden /> {label}
        </a>
      );
    })}
  </nav>
);
