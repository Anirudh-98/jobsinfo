"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, GraduationCap, Building2, School, Star, Sparkles, Clock, TrendingUp } from "lucide-react";
import { JOURNEYS } from "@/data/homeContent";
import { SectionHeading, Reveal } from "@/components/home/shared";
import { cn } from "@/lib/utils";

const TAB_ICONS: Record<string, React.ElementType> = {
  "job-seekers": Search,
  students: GraduationCap,
  employers: Building2,
  colleges: School,
  experts: Star,
};

export const JourneySection: React.FC = () => {
  const [activeId, setActiveId] = useState(JOURNEYS[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const journey = JOURNEYS.find((j) => j.id === activeId)!;
  const EntryIcon = TAB_ICONS[journey.id];

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + JOURNEYS.length) % JOURNEYS.length;
    setActiveId(JOURNEYS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="journeys" className="scroll-mt-24 bg-gradient-to-b from-white via-[#f4f8ff] to-white py-20 sm:py-28" aria-labelledby="journeys-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="journeys-title"
          eyebrow="Choose your path"
          title="Your Journey Starts Here"
          sub="Pick who you are and see exactly how you'll get from sign-up to outcome — no more than four steps."
        />

        <div
          role="tablist"
          aria-label="Journeys by role"
          className="no-scrollbar mx-auto mt-10 flex w-full max-w-fit gap-1 overflow-x-auto rounded-full border border-hairline bg-white p-1.5 shadow-rest"
        >
          {JOURNEYS.map((j, i) => {
            const Icon = TAB_ICONS[j.id];
            const selected = j.id === activeId;
            return (
              <button
                key={j.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${j.id}`}
                aria-selected={selected}
                aria-controls={`panel-${j.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(j.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full px-4 text-[14px] font-semibold transition-all cursor-pointer",
                  selected ? "btn-gradient" : "text-body hover:text-primary"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {j.tab}
              </button>
            );
          })}
        </div>

        <Reveal>
          <div
            key={journey.id}
            role="tabpanel"
            id={`panel-${journey.id}`}
            aria-labelledby={`tab-${journey.id}`}
            className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.4fr]"
          >
            {/* Entry + outcome */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-blue-600 to-[#0b1f4d] p-7 sm:p-9 text-white">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-400/30 blur-3xl" aria-hidden />
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                <EntryIcon className="h-6 w-6" aria-hidden />
              </span>
              <p className="relative mt-6 text-[12px] font-semibold uppercase tracking-[0.1em] text-sky-200">Entry point</p>
              <h3 className="relative mt-1 text-[26px] sm:text-[30px] font-bold leading-tight">{journey.entryTitle}</h3>
              <p className="relative mt-1 text-[15px] text-blue-100">{journey.entrySub}</p>

              <div className="relative mt-8 rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur">
                <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-sky-200">
                  <Sparkles className="h-4 w-4" aria-hidden /> Outcome
                </p>
                <p className="mt-2 text-[18px] font-semibold leading-snug">{journey.outcome}</p>
                <ul className="mt-4 space-y-1.5">
                  {journey.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-[13.5px] text-blue-50">
                      <TrendingUp className="h-4 w-4 text-sky-300" aria-hidden /> {h}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={journey.cta.href}
                className="group relative mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-primary hover:bg-primary-light transition-colors"
              >
                {journey.cta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>

            {/* Steps timeline */}
            <ol className="card-soft relative grid gap-3 p-4 sm:p-6">
              {journey.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="group relative flex gap-4 rounded-2xl p-4 transition-colors hover:bg-primary-light/40"
                >
                  {i < journey.steps.length - 1 && (
                    <span className="absolute left-[39px] top-[64px] bottom-[-20px] w-px bg-gradient-to-b from-primary/40 to-primary/5" aria-hidden />
                  )}
                  <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-primary/20 bg-white text-[16px] font-bold text-primary shadow-rest transition-colors group-hover:bg-primary group-hover:text-white">
                    {i + 1}
                  </span>
                  <div className="flex-1 pt-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-[16px] font-semibold text-ink">{step.title}</h4>
                      <span className="hidden lg:inline-flex items-center gap-1 rounded-full bg-surface-strong px-2 py-0.5 text-[11.5px] font-medium text-body opacity-0 transition-opacity group-hover:opacity-100">
                        <Clock className="h-3 w-3" aria-hidden /> Step {i + 1} of {journey.steps.length}
                      </span>
                    </div>
                    <p className="mt-1 text-[14px] text-body">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
