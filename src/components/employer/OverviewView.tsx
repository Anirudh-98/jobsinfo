"use client";

import React from "react";
import { ArrowRight, Award, BadgeCheck, BriefcaseBusiness, CalendarClock, Star, UserPlus } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useEmployer } from "@/components/employer/EmployerStore";
import { useCandidateDialogs } from "@/components/employer/CandidateDialogs";
import { Avatar, Pill, btnPrimary, btnSecondary } from "@/components/employer/ui";
import { cn } from "@/lib/utils";

const Panel: React.FC<{ title: string; href: string; link: string; children: React.ReactNode; className?: string }> = ({ title, href, link, children, className }) => (
  <section className={cn("card-soft p-4 sm:p-5", className)} aria-label={title}>
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-[16px] font-semibold text-ink">{title}</h2>
      <a href={href} className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-primary hover:underline">
        {link} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </a>
    </div>
    <div className="mt-4">{children}</div>
  </section>
);

export const OverviewView: React.FC = () => {
  const { jobs, candidates, shortlist } = useEmployer();
  const { showToast } = useApp();
  const { openProfile, dialogs } = useCandidateDialogs();

  const by = (stage: string) => candidates.filter((c) => c.stage === stage);
  const newApplicants = candidates.filter((c) => c.stage === "applied" && c.jobId);
  const interviews = by("interview");
  const pendingOffers = by("offered").filter((c) => c.offer?.status === "Pending");

  const TILES = [
    { label: "Active jobs", value: jobs.filter((j) => j.status === "Active").length, href: "#jobs", icon: BriefcaseBusiness, tone: "bg-primary-light text-primary" },
    { label: "New applicants", value: newApplicants.length, href: "#repository", icon: UserPlus, tone: "bg-sky-100 text-sky-600" },
    { label: "Shortlisted", value: by("shortlisted").length, href: "#shortlisted", icon: Star, tone: "bg-amber-50 text-amber-600" },
    { label: "Interviews", value: interviews.length, href: "#interviews", icon: CalendarClock, tone: "bg-orange-50 text-orange-600" },
    { label: "Offers pending", value: pendingOffers.length, href: "#offered", icon: Award, tone: "bg-violet-50 text-violet-600" },
    { label: "Hired", value: by("hired").length, href: "#hired", icon: BadgeCheck, tone: "bg-emerald-50 text-emerald-600" },
  ];

  const topJobs = jobs
    .filter((j) => j.status === "Active")
    .map((j) => ({ job: j, applicants: candidates.filter((c) => c.jobId === j.id).length }))
    .sort((a, b) => b.applicants - a.applicants)
    .slice(0, 4);

  return (
    <div className="space-y-4">
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-6">
        {TILES.map(({ label, value, href, icon: Icon, tone }) => (
          <li key={label}>
            <a href={href} className="card-soft card-glow group flex h-full flex-col p-4 transition-transform hover:-translate-y-0.5 sm:p-5">
              <span className={cn("grid h-9 w-9 place-items-center rounded-xl", tone)}>
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <span className="mt-4 text-[28px] font-bold leading-none tracking-tight tabular-nums text-ink">{value}</span>
              <span className="mt-1.5 flex items-center justify-between text-[12.5px] font-medium text-ink-light">
                {label}
                <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_400px]">
        <Panel title="Recent applicants" href="#repository" link="Search all CVs">
          {newApplicants.length === 0 ? (
            <p className="rounded-xl bg-surface-soft/60 px-4 py-6 text-center text-[13px] text-body">You&apos;re all caught up — no unreviewed applicants.</p>
          ) : (
            <ul className="divide-y divide-hairline">
              {newApplicants.map((c) => (
                <li key={c.id} className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <Avatar name={c.name} />
                  <div className="min-w-0 flex-1">
                    <button type="button" onClick={() => openProfile(c.id)} className="text-left text-[14px] font-semibold text-ink hover:text-primary cursor-pointer">
                      {c.name}
                    </button>
                    <p className="truncate text-[12px] text-body">
                      {jobs.find((j) => j.id === c.jobId)?.title} · applied {c.appliedOn}
                    </p>
                  </div>
                  <Pill tone="green">{c.match}% match</Pill>
                  <div className="flex gap-2">
                    <button type="button" className={btnSecondary} onClick={() => openProfile(c.id)}>
                      View
                    </button>
                    <button
                      type="button"
                      className={btnPrimary}
                      onClick={() => {
                        shortlist(c.id);
                        showToast(`${c.name} shortlisted.`);
                      }}
                    >
                      Shortlist
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Upcoming interviews" href="#interviews" link="All requests">
          {interviews.length === 0 ? (
            <p className="rounded-xl bg-surface-soft/60 px-4 py-6 text-center text-[13px] text-body">No interviews scheduled.</p>
          ) : (
            <ul className="space-y-2">
              {interviews.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => openProfile(c.id)}
                    className="flex w-full items-center gap-3 rounded-xl bg-surface-soft/60 p-3 text-left transition-colors hover:bg-primary-light/50 cursor-pointer"
                  >
                    <span className="grid w-12 shrink-0 place-items-center rounded-lg bg-white py-1.5 text-center shadow-sm">
                      <span className="text-[16px] font-bold leading-none text-ink">{c.interview?.date.split(" ")[0]}</span>
                      <span className="text-[10.5px] font-semibold uppercase text-primary">{c.interview?.date.split(" ")[1]}</span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-semibold text-ink">{c.name}</span>
                      <span className="block truncate text-[12px] text-body">
                        {c.interview?.round} · {c.interview?.time} · {c.interview?.mode}
                      </span>
                    </span>
                    <Pill tone={c.interview?.status === "Confirmed" ? "blue" : "amber"}>{c.interview?.status}</Pill>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <Panel title="Your active jobs" href="#jobs" link="Manage postings">
        <ul className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
          {topJobs.map(({ job, applicants }) => (
            <li key={job.id} className="rounded-2xl border border-hairline p-4">
              <p className="truncate text-[14px] font-semibold text-ink">{job.title}</p>
              <p className="truncate text-[12px] text-body">{job.location}</p>
              <p className="mt-3 text-[12.5px] text-body">
                <b className="text-[18px] font-bold tabular-nums text-ink">{applicants}</b> applicants · {job.openings} openings
              </p>
            </li>
          ))}
        </ul>
      </Panel>
      {dialogs}
    </div>
  );
};
