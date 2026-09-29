"use client";

import React from "react";
import Link from "next/link";
import { Search, Zap, Star, ChartColumn, Building2, Check, ArrowRight, MapPin } from "lucide-react";
import { FEATURES } from "@/data/homeContent";
import { SectionHeading, Reveal } from "@/components/home/shared";
import { cn } from "@/lib/utils";

const ICONS: Record<(typeof FEATURES)[number]["key"], React.ElementType> = {
  jobs: Search,
  projects: Zap,
  experts: Star,
  assessment: ChartColumn,
  business: Building2,
};

const LAYOUT: Record<(typeof FEATURES)[number]["key"], string> = {
  jobs: "lg:col-span-3",
  projects: "lg:col-span-3",
  experts: "lg:col-span-2",
  assessment: "lg:col-span-2",
  business: "lg:col-span-2",
};

const SAMPLE_JOBS = [
  { role: "HR Executive", org: "Aditya Hospitals", place: "Hyderabad", tag: "Full time" },
  { role: "Software Developer", org: "Amazon Dev. Center", place: "Hyderabad", tag: "45 openings" },
  { role: "Account Executive", org: "Akash Enterprises", place: "Hyderabad", tag: "Fresher" },
];

const JobsPreview = () => (
  <ul className="mt-6 space-y-2" aria-hidden>
    {SAMPLE_JOBS.map((j) => (
      <li
        key={j.role}
        className="grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-hairline bg-white p-3 shadow-rest"
      >
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-light text-[12px] font-bold text-primary">
          {j.org.slice(0, 2).toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[13.5px] font-semibold leading-5 text-ink">{j.role}</span>
          <span className="flex min-w-0 items-center gap-1 text-[12px] leading-5 text-body">
            <span className="truncate">{j.org}</span>
            <span aria-hidden>·</span>
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="shrink-0">{j.place}</span>
          </span>
        </span>
        <span className="hidden sm:inline-flex w-[92px] justify-center whitespace-nowrap rounded-full bg-surface-strong px-2 py-0.5 text-[11px] font-medium text-body">
          {j.tag}
        </span>
      </li>
    ))}
  </ul>
);

const ProjectsPreview = () => (
  <div className="mt-6 rounded-2xl border border-hairline bg-white p-4 shadow-[0_12px_28px_-18px_rgba(30,64,175,0.35)]" aria-hidden>
    <div className="flex items-center justify-between">
      <p className="text-[13.5px] font-semibold text-ink">Digital Marketing Campaign</p>
      <span className="rounded-full bg-primary-light px-2 py-0.5 text-[11px] font-semibold text-primary">Live</span>
    </div>
    <p className="mt-1 text-[12px] text-body">Milestone 3 of 4 · Mentor review due Friday</p>
    <div className="mt-3 h-2 rounded-full bg-surface-strong">
      <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-primary to-sky-400" />
    </div>
    <div className="mt-4 flex items-center justify-between text-[12px]">
      <div className="flex -space-x-2">
        {["RK", "AD", "SS"].map((n, i) => (
          <span key={n} className={cn("grid h-7 w-7 place-items-center rounded-full border-2 border-white text-[10px] font-bold text-white", ["bg-primary", "bg-sky-500", "bg-[#0b1f4d]"][i])}>
            {n}
          </span>
        ))}
      </div>
      <span className="font-semibold text-ink">Earning: ₹25,000</span>
    </div>
  </div>
);

export const FeaturesSection: React.FC = () => (
  <section className="py-20 sm:py-28" aria-labelledby="features-title">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        id="features-title"
        eyebrow="Platform"
        title="Everything You Need on One Platform"
        sub="Jobs, projects, mentors, assessments and business support — built to work together, not as separate tools."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {FEATURES.map((f, i) => {
          const Icon = ICONS[f.key];
          const large = f.key === "jobs" || f.key === "projects";
          return (
            <Reveal key={f.key} delay={i * 60} className={cn(LAYOUT[f.key], f.key === "business" && "sm:col-span-2 lg:col-span-2")}>
              <article
                className={cn(
                  "card-soft card-glow group flex h-full flex-col overflow-hidden p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1",
                  large && "bg-gradient-to-br from-[#eef4ff] via-white to-[#f0f9ff]"
                )}
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white shadow-[0_10px_20px_-10px_rgba(37,99,235,0.9)]">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-[20px] font-semibold text-ink group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-body">{f.desc}</p>

                <ul className="mt-4 space-y-2">
                  {f.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[14px] text-ink-light">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>

                {f.key === "jobs" && <JobsPreview />}
                {f.key === "projects" && <ProjectsPreview />}

                <div className="mt-auto pt-6">
                  <p className="text-[13px] font-semibold text-primary">{f.metric}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5 lg:max-h-0 lg:opacity-0 lg:overflow-hidden transition-all duration-300 lg:group-hover:max-h-24 lg:group-hover:opacity-100 lg:group-focus-within:max-h-24 lg:group-focus-within:opacity-100">
                    {f.hover.map((h) => (
                      <span key={h} className="rounded-full bg-primary-light/70 px-2.5 py-1 text-[11.5px] font-medium text-primary-dark">
                        {h}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={f.cta.href}
                    className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-semibold text-ink hover:text-primary transition-colors"
                  >
                    {f.cta.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
