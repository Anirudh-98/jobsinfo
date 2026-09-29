import React from "react";
import Link from "next/link";
import { GraduationCap, Settings, IndianRupee, Target, ArrowRight } from "lucide-react";
import { PILLARS } from "@/data/homeContent";
import { Reveal, Eyebrow } from "@/components/home/shared";
import { cn } from "@/lib/utils";

const ICONS: Record<(typeof PILLARS)[number]["key"], React.ElementType> = {
  learn: GraduationCap,
  do: Settings,
  earn: IndianRupee,
  lead: Target,
};

export const PhilosophySection: React.FC = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f1f6ff] to-white py-20 sm:py-28" aria-labelledby="philosophy-title">
    <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 id="philosophy-title" className="mt-4 text-[28px] sm:text-[40px] font-bold leading-[1.1] tracking-[-0.025em] text-ink text-balance">
            Learn, do, earn, lead — <span className="text-primary">one path, four stages.</span>
          </h2>
        </div>
        <p className="max-w-[44ch] text-[15px] leading-relaxed text-body text-pretty lg:pb-1.5">
          The Jobsinfo.world philosophy: every stage builds on the last, so skills turn into real work, real income and, eventually, leadership.
        </p>
      </div>

      <Reveal className="mt-12">
        <ol className="card-soft relative grid overflow-hidden md:grid-cols-2 xl:grid-cols-4">
          {/* Progress rail across the top of the panel (desktop) */}
          <span className="pointer-events-none absolute inset-x-0 top-[52px] hidden h-px bg-gradient-to-r from-primary/60 via-sky-400/50 to-primary/15 xl:block" aria-hidden />

          {PILLARS.map((p, i) => {
            const Icon = ICONS[p.key];
            return (
              <li
                key={p.key}
                className={cn(
                  "group relative flex flex-col p-6 sm:p-8 transition-colors duration-300 hover:bg-[#f7faff]",
                  i > 0 && "border-t border-hairline",
                  i % 2 === 1 && "md:border-l",
                  i === 1 && "md:border-t-0",
                  i > 0 && "xl:border-t-0 xl:border-l"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="relative z-10 grid h-10 w-10 place-items-center rounded-xl bg-primary text-white shadow-[0_8px_18px_-8px_rgba(37,99,235,0.9)] ring-4 ring-white transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="relative z-10 rounded-full bg-white px-2 text-[12px] font-semibold tabular-nums text-muted">
                    Stage {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-7 text-[26px] font-bold tracking-[-0.02em] text-ink">{p.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-body text-pretty xl:min-h-[6rem]">{p.desc}</p>

                <ol className="mt-6 space-y-3.5">
                  {p.steps.map(([title, detail], k) => (
                    <li key={title} className="flex gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-primary-light text-[11px] font-bold tabular-nums text-primary">
                        {k + 1}
                      </span>
                      <span>
                        <span className="block text-[14px] font-semibold leading-snug text-ink">{title}</span>
                        <span className="block text-[13px] text-body">{detail}</span>
                      </span>
                    </li>
                  ))}
                </ol>

                <ul className="mt-7 space-y-2 border-t border-dashed border-hairline pt-5">
                  {p.metrics.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-[13px] tabular-nums text-ink-light">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" aria-hidden />
                      {m}
                    </li>
                  ))}
                </ul>

                {/* Pinned to the bottom so all four CTAs share one baseline */}
                <Link
                  href={p.cta.href}
                  className="mt-auto inline-flex min-h-[44px] items-center gap-1.5 pt-6 text-[14px] font-semibold text-primary transition-colors hover:text-primary-hover"
                >
                  {p.cta.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </div>
  </section>
);
