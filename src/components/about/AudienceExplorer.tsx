"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Building2, Check, GraduationCap, Lightbulb, Search, Store } from "lucide-react";
import { AUDIENCES } from "@/data/aboutContent";
import { cn } from "@/lib/utils";
import { JoinButton } from "@/components/about/JoinButton";

const ICONS: Record<string, React.ElementType> = {
  students: GraduationCap,
  seekers: Search,
  employers: BriefcaseBusiness,
  colleges: Building2,
  business: Store,
  experts: Lightbulb,
};

// "Who we serve": audience list on the left, the selected audience's detail on the right (homepage list + detail pattern).
export const AudienceExplorer: React.FC = () => {
  const [active, setActive] = useState(AUDIENCES[0].key);
  const current = AUDIENCES.find((a) => a.key === active)!;
  const Icon = ICONS[current.key];

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-6">
      <div role="tablist" aria-label="Who we serve" aria-orientation="vertical" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
        {AUDIENCES.map((a) => {
          const I = ICONS[a.key];
          const selected = a.key === active;
          return (
            <button
              key={a.key}
              type="button"
              role="tab"
              id={`aud-tab-${a.key}`}
              aria-selected={selected}
              aria-controls="aud-panel"
              onClick={() => setActive(a.key)}
              onKeyDown={(e) => {
                const i = AUDIENCES.findIndex((x) => x.key === active);
                const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? i + 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? i - 1 : null;
                if (next === null) return;
                e.preventDefault();
                const target = AUDIENCES[(next + AUDIENCES.length) % AUDIENCES.length];
                setActive(target.key);
                document.getElementById(`aud-tab-${target.key}`)?.focus();
              }}
              tabIndex={selected ? 0 : -1}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all cursor-pointer lg:w-full",
                selected
                  ? "border-transparent bg-white shadow-[0_18px_40px_-24px_rgba(30,64,175,0.45)] card-glow is-featured"
                  : "border-hairline bg-white/60 hover:border-primary/30 hover:bg-white"
              )}
            >
              <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors", selected ? "btn-gradient" : "bg-primary-light text-primary")}>
                <I className="h-[18px] w-[18px]" aria-hidden />
              </span>
              <span className={cn("whitespace-nowrap text-[14.5px] font-semibold", selected ? "text-primary" : "text-ink")}>{a.label}</span>
              <ArrowRight className={cn("ml-auto hidden h-4 w-4 transition-all lg:block", selected ? "translate-x-0 text-primary opacity-100" : "-translate-x-1 opacity-0")} aria-hidden />
            </button>
          );
        })}
      </div>

      <div
        id="aud-panel"
        role="tabpanel"
        aria-labelledby={`aud-tab-${current.key}`}
        className="card-soft relative overflow-hidden p-6 sm:p-10"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" aria-hidden />
        <div key={current.key} className="relative animate-[panel-in_0.35s_cubic-bezier(0.2,0.7,0.2,1)]">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-light text-primary">
            <Icon className="h-6 w-6" aria-hidden />
          </span>
          <p className="mt-5 text-[13px] font-semibold uppercase tracking-wide text-primary">For {current.label.toLowerCase()}</p>
          <h3 className="mt-2 max-w-xl text-[24px] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[30px]">{current.headline}</h3>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-body">{current.text}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {current.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 rounded-2xl bg-surface-soft/70 p-3.5 text-[13.5px] font-medium text-ink-light">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-white">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>
          {current.cta.href === "signup" ? (
            <JoinButton className="mt-8 h-11 text-[14px]">{current.cta.label}</JoinButton>
          ) : (
            <Link href={current.cta.href} className="btn-gradient mt-8 inline-flex h-11 items-center gap-2 rounded-full px-6 text-[14px] font-semibold">
              {current.cta.label} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
