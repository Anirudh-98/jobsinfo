"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { VIEWS, ViewId } from "@/components/dashboard/views";

const GROUP_TITLES = { main: "Job search", learn: "Learning", account: "Account" } as const;

// Labelled sidebar on the left of the dashboard (lg and up). Every item switches the view in place.
export const DashboardSidebar: React.FC<{ active: ViewId; onSignOut: () => void }> = ({ active, onSignOut }) => (
  <nav
    aria-label="Dashboard"
    className="sticky top-3 hidden max-h-[calc(100dvh-1.5rem)] min-h-[calc(100dvh-2.5rem)] w-[232px] shrink-0 flex-col self-start overflow-y-auto px-3 py-5 lg:flex"
  >
    {VIEWS.map(({ id, label, icon: Icon, group }, i) => {
      const isActive = active === id;
      return (
        <React.Fragment key={id}>
          {(i === 0 || VIEWS[i - 1].group !== group) && (
            <p className={cn("px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted", i > 0 && "mt-4")}>{GROUP_TITLES[group]}</p>
          )}
          <a
            href={`#${id}`}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
              isActive ? "btn-gradient" : "text-ink-light hover:bg-primary-light hover:text-primary"
            )}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
            <span className="min-w-0 truncate">{label}</span>
          </a>
        </React.Fragment>
      );
    })}
    <div className="mt-auto border-t border-hairline pt-4">
      <button
        type="button"
        onClick={onSignOut}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-ink-light transition-colors hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
      >
        <LogOut className="h-[18px] w-[18px]" aria-hidden /> Sign out
      </button>
    </div>
  </nav>
);

// Same views as a horizontally scrolling pill bar for tablets and phones, where the sidebar is hidden.
export const DashboardMobileNav: React.FC<{ active: ViewId }> = ({ active }) => (
  <nav aria-label="Dashboard" className="no-scrollbar -mx-3 mb-4 flex gap-2 overflow-x-auto px-3 lg:hidden">
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
