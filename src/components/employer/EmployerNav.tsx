"use client";

import React from "react";
import {
  Award,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  FileSearch,
  LayoutGrid,
  LifeBuoy,
  LogOut,
  Settings,
  Star,
} from "lucide-react";
import { Stage } from "@/data/employerData";
import { useEmployer } from "@/components/employer/EmployerStore";
import { cn } from "@/lib/utils";

export const EMPLOYER_VIEWS = [
  { id: "overview", label: "Dashboard", icon: LayoutGrid, group: "Hiring" },
  { id: "jobs", label: "Job postings", icon: BriefcaseBusiness, group: "Hiring" },
  { id: "repository", label: "CV / Profile repository", short: "Search candidates", icon: FileSearch, group: "Hiring" },
  { id: "shortlisted", label: "Shortlisted profiles", icon: Star, group: "Pipeline", stage: "shortlisted" },
  { id: "interviews", label: "Interview requests", icon: CalendarClock, group: "Pipeline", stage: "interview" },
  { id: "offered", label: "Offered candidates", icon: Award, group: "Pipeline", stage: "offered" },
  { id: "hired", label: "Hired candidates", icon: BadgeCheck, group: "Pipeline", stage: "hired" },
  { id: "reports", label: "Reports & analytics", icon: BarChart3, group: "Insights" },
  { id: "company", label: "Company profile", icon: Building2, group: "Account" },
  { id: "settings", label: "Account settings", icon: Settings, group: "Account" },
  { id: "support", label: "Support center", icon: LifeBuoy, group: "Account" },
] as const satisfies readonly { id: string; label: string; icon: React.ElementType; group: string; stage?: Stage; short?: string }[];

export type EmployerViewId = (typeof EMPLOYER_VIEWS)[number]["id"];
export const isEmployerView = (v: string): v is EmployerViewId => EMPLOYER_VIEWS.some((x) => x.id === v);

const useStageCount = () => {
  const { candidates } = useEmployer();
  return (stage?: Stage) => (stage ? candidates.filter((c) => c.stage === stage).length : undefined);
};

// Labelled sidebar for large screens; there are too many sections for an icon-only rail.
export const EmployerSidebar: React.FC<{ active: EmployerViewId; onLogout: () => void }> = ({ active, onLogout }) => {
  const count = useStageCount();
  return (
    <nav aria-label="Employer dashboard" className="sticky top-3 hidden max-h-[calc(100dvh-1.5rem)] w-[248px] shrink-0 flex-col self-start overflow-y-auto px-3 py-5 lg:flex">
      {EMPLOYER_VIEWS.map((v, i) => {
        const isActive = active === v.id;
        const n = count("stage" in v ? v.stage : undefined);
        const Icon = v.icon;
        return (
          <React.Fragment key={v.id}>
            {(i === 0 || EMPLOYER_VIEWS[i - 1].group !== v.group) && (
              <p className={cn("px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted", i > 0 && "mt-4")}>{v.group}</p>
            )}
            <a
              href={`#${v.id}`}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-colors",
                isActive ? "btn-gradient" : "text-ink-light hover:bg-primary-light hover:text-primary"
              )}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
              <span className="min-w-0 flex-1 truncate">{v.label}</span>
              {n !== undefined && (
                <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums", isActive ? "bg-white/25 text-white" : "bg-surface-soft text-body")}>
                  {n}
                </span>
              )}
            </a>
          </React.Fragment>
        );
      })}
      <div className="mt-4 border-t border-hairline pt-4">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-ink-light transition-colors hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
        >
          <LogOut className="h-[18px] w-[18px]" aria-hidden /> Logout
        </button>
      </div>
    </nav>
  );
};

// Scrolling pill bar for tablets and phones.
export const EmployerMobileNav: React.FC<{ active: EmployerViewId }> = ({ active }) => {
  const count = useStageCount();
  return (
    <nav aria-label="Employer dashboard" className="no-scrollbar -mx-3 mb-4 flex gap-2 overflow-x-auto px-3 lg:hidden">
      {EMPLOYER_VIEWS.map((v) => {
        const isActive = active === v.id;
        const n = count("stage" in v ? v.stage : undefined);
        const Icon = v.icon;
        return (
          <a
            key={v.id}
            href={`#${v.id}`}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium transition-colors",
              isActive ? "btn-gradient" : "border border-hairline bg-white text-body"
            )}
          >
            <Icon className="h-4 w-4" aria-hidden /> {"short" in v ? v.short : v.label}
            {n !== undefined && <span className="tabular-nums opacity-70">{n}</span>}
          </a>
        );
      })}
    </nav>
  );
};
