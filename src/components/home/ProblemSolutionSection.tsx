"use client";

import React, { useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PROBLEMS } from "@/data/homeContent";
import { Eyebrow, Reveal } from "@/components/home/shared";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

export const ProblemSolutionSection: React.FC = () => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = PROBLEMS[active];

  const select = (index: number, focus = false) => {
    const next = (index + PROBLEMS.length) % PROBLEMS.length;
    setActive(next);
    const tab = tabRefs.current[next];
    if (focus) tab?.focus();
    // Keep the chosen chip visible in the mobile scroller without moving the page
    tab?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      select(e.key === "Home" ? 0 : PROBLEMS.length - 1, true);
    } else if (keys[e.key]) {
      e.preventDefault();
      select(active + keys[e.key], true);
    }
  };

  return (
    <section className="py-20 sm:py-28" aria-labelledby="problems-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Why we exist</Eyebrow>
            <h2 id="problems-title" className="mt-4 text-[28px] sm:text-[40px] font-bold leading-[1.1] tracking-[-0.025em] text-ink text-balance">
              Ten problems we kept hearing. <span className="text-primary">Here&apos;s what we built for each.</span>
            </h2>
          </div>
          <p className="max-w-[44ch] text-[15px] leading-relaxed text-body text-pretty lg:pb-1.5">
            From students hunting for a first break to MSMEs that can&apos;t afford consultants — pick a challenge to see our answer.
          </p>
        </div>

        <Reveal className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          {/* Challenge index: chip scroller on mobile, numbered list on desktop */}
          <div
            role="tablist"
            aria-label="Challenges"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:border-t lg:border-hairline"
          >
            {PROBLEMS.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.challenge}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`problem-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="problem-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  className={cn(
                    "group relative flex shrink-0 items-center gap-3 text-left transition-colors cursor-pointer",
                    "rounded-full border px-4 py-2 text-[13.5px] font-medium",
                    "lg:rounded-none lg:border-0 lg:border-b lg:border-hairline lg:px-0 lg:py-4 lg:text-[15px]",
                    selected
                      ? "border-primary bg-primary text-white lg:bg-transparent lg:text-ink"
                      : "border-hairline bg-white text-body hover:text-ink lg:bg-transparent"
                  )}
                >
                  {/* Active marker slides along the left edge on desktop */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -left-4 top-1/2 hidden h-8 w-[3px] -translate-y-1/2 rounded-full bg-primary transition-opacity lg:block",
                      selected ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span
                    className={cn(
                      "hidden w-7 shrink-0 text-[13px] font-semibold tabular-nums lg:block",
                      selected ? "text-primary" : "text-muted group-hover:text-body"
                    )}
                  >
                    {pad(i + 1)}
                  </span>
                  <span className={cn("lg:flex-1", selected && "lg:font-semibold")}>{item.challenge}</span>
                  <span
                    className={cn(
                      "hidden shrink-0 text-[12px] font-medium lg:block",
                      selected ? "text-primary" : "text-muted"
                    )}
                  >
                    {item.audience}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div
            role="tabpanel"
            id="problem-panel"
            aria-labelledby={`problem-tab-${active}`}
            className="card-soft relative flex min-h-[520px] flex-col overflow-hidden lg:sticky lg:top-28 lg:self-start"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" aria-hidden />

            <div key={active} className="relative flex flex-1 flex-col animate-[panel-in_0.35s_cubic-bezier(0.2,0.7,0.2,1)]">
              <div className="p-6 sm:p-9">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[13px] font-medium text-muted">
                    The challenge <span className="text-hairline">/</span> {p.audience}
                  </p>
                  <p className="text-[13px] font-semibold tabular-nums text-muted">
                    <span className="text-ink">{pad(active + 1)}</span> / {pad(PROBLEMS.length)}
                  </p>
                </div>
                <h3 className="mt-4 text-[22px] sm:text-[26px] font-semibold leading-snug tracking-[-0.015em] text-ink text-balance">
                  {p.challenge}
                </h3>
                <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-body text-pretty">{p.challengeText}</p>
              </div>

              <div className="relative flex items-center px-6 sm:px-9" aria-hidden>
                <span className="h-px flex-1 bg-hairline" />
                <span className="mx-3 grid h-9 w-9 place-items-center rounded-full border border-primary/20 bg-white text-primary shadow-[0_6px_16px_-8px_rgba(37,99,235,0.6)]">
                  <ArrowDown className="h-4 w-4" />
                </span>
                <span className="h-px flex-1 bg-hairline" />
              </div>

              <div className="flex flex-1 flex-col bg-gradient-to-b from-white to-[#f4f8ff] p-6 sm:p-9">
                <p className="text-[13px] font-semibold text-primary">How we solve it</p>
                <h4 className="mt-3 text-[20px] sm:text-[24px] font-bold leading-snug tracking-[-0.015em] text-primary-dark text-balance">
                  {p.solution}
                </h4>
                <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 rounded-2xl border border-primary/10 bg-white/80 p-4 text-[14px] leading-snug text-ink-light">
                      <span className="mt-px grid h-5 w-5 shrink-0 place-items-center rounded-md bg-primary-light text-primary">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-end gap-2 pt-8">
                  <button
                    type="button"
                    onClick={() => select(active - 1)}
                    aria-label="Previous challenge"
                    className="grid h-11 w-11 place-items-center rounded-full border border-hairline bg-white text-ink transition-all hover:border-primary/40 hover:text-primary active:scale-[0.96] cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => select(active + 1)}
                    aria-label="Next challenge"
                    className="btn-gradient grid h-11 w-11 place-items-center rounded-full active:scale-[0.96] cursor-pointer"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
