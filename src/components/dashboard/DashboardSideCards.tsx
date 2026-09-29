"use client";

import React from "react";
import { ArrowRight, Bell, Bookmark, CalendarClock, Sparkles, Video, BadgeCheck, X } from "lucide-react";
import { ALL_JOBS } from "@/data/studentData";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const PROFILE_STEPS = [
  { label: "Record a 60s video intro", gain: 15, icon: Video },
  { label: "Verify your college ID", gain: 10, icon: BadgeCheck },
];

const Ring: React.FC<{ value: number }> = ({ value }) => {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 72 72" className="h-[76px] w-[76px] shrink-0 -rotate-90" aria-hidden>
      <defs>
        <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <circle cx="36" cy="36" r={r} fill="none" stroke="currentColor" strokeWidth="7" className="text-surface-strong" />
      <circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        stroke="url(#ring-grad)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value / 100)}
        className="transition-[stroke-dashoffset] duration-700"
      />
    </svg>
  );
};

export const ProfileStrengthCard: React.FC = () => {
  const { user, updateUser, showToast } = useApp();
  const done = user.profileCompletion >= 100;

  const complete = (label: string, gain: number) => {
    const next = Math.min(100, user.profileCompletion + gain);
    updateUser({ profileCompletion: next });
    showToast(`${label} done — profile strength is now ${next}%.`);
  };

  return (
    <section className="card-soft p-4 sm:p-5" aria-labelledby="profile-title">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Ring value={user.profileCompletion} />
          <span className="absolute inset-0 grid place-items-center text-[16px] font-bold tabular-nums text-ink">{user.profileCompletion}%</span>
        </div>
        <div className="min-w-0">
          <h2 id="profile-title" className="text-[15px] font-semibold text-ink">
            Profile strength
          </h2>
          <p className="mt-0.5 text-[12.5px] leading-snug text-body">
            {done ? "Your profile is complete. Recruiters see you first." : "Complete profiles get up to 3× more recruiter views."}
          </p>
        </div>
      </div>

      {!done && (
        <div className="mt-4 space-y-2">
          {PROFILE_STEPS.map(({ label, gain, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => complete(label, gain)}
              className="group flex w-full items-center gap-3 rounded-xl border border-hairline bg-white px-3 py-2.5 text-left transition-colors hover:border-primary/30 hover:bg-primary-light/40 cursor-pointer"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-light text-primary">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <span className="min-w-0 flex-1 text-[12.5px] font-medium text-ink">{label}</span>
              <span className="text-[11.5px] font-semibold text-emerald-600">+{gain}%</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export const SavedJobsCard: React.FC = () => {
  const { savedJobIds, toggleSaveJob, setSelectedJobForModal, setIsQuickApplyOpen } = useApp();
  const saved = ALL_JOBS.filter((j) => savedJobIds.includes(j.id));

  return (
    <section className="card-soft p-4 sm:p-5" aria-labelledby="saved-title">
      <div className="flex items-center justify-between">
        <h2 id="saved-title" className="flex items-center gap-2 text-[15px] font-semibold text-ink">
          <Bookmark className="h-4 w-4 text-primary" aria-hidden /> Saved jobs
          <span className="rounded-full bg-primary-light px-2 py-0.5 text-[11px] font-semibold tabular-nums text-primary">{saved.length}</span>
        </h2>
        <a href="#saved" className="text-[12px] font-semibold text-primary hover:underline">
          View all
        </a>
      </div>

      {saved.length === 0 ? (
        <p className="mt-4 rounded-xl bg-surface-soft/60 px-4 py-5 text-center text-[12.5px] text-body">
          Tap the bookmark on any job to keep it here.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-hairline">
          {saved.map((job) => (
            <li key={job.id} className="flex items-center gap-3 py-3 last:pb-0">
              <button type="button" onClick={() => setSelectedJobForModal(job)} className="min-w-0 flex-1 text-left cursor-pointer">
                <span className="block truncate text-[13px] font-semibold text-ink hover:text-primary">{job.title}</span>
                <span className="block truncate text-[11.5px] text-body">
                  {job.company} · {job.salary}
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedJobForModal(job);
                  setIsQuickApplyOpen(true);
                }}
                className="shrink-0 rounded-full bg-primary-light px-3 py-1.5 text-[11.5px] font-semibold text-primary transition-colors hover:bg-primary hover:text-white cursor-pointer"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={() => toggleSaveJob(job.id)}
                aria-label={`Remove ${job.title} from saved jobs`}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

const ALERTS = [
  { title: "Deloitte partner interview", detail: "Friday · 3:00 PM IST · Video call", icon: CalendarClock, highlight: true },
  { title: "New match: Cyient HR trainee", detail: "Fits your MBA HR specialisation", icon: Sparkles, highlight: false },
];

export const AlertsCard: React.FC = () => (
  <section id="upcoming" className="card-soft scroll-mt-24 p-4 sm:p-5" aria-labelledby="alerts-title">
    <h2 id="alerts-title" className="flex items-center gap-2 text-[15px] font-semibold text-ink">
      <Bell className="h-4 w-4 text-primary" aria-hidden /> Upcoming
    </h2>
    <ul className="mt-3 space-y-2">
      {ALERTS.map(({ title, detail, icon: Icon, highlight }) => (
        <li
          key={title}
          className={cn("flex items-start gap-3 rounded-xl p-3", highlight ? "bg-gradient-to-br from-[#e8f0ff] to-[#f5f9ff]" : "bg-surface-soft/60")}
        >
          <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg", highlight ? "bg-white text-primary shadow-sm" : "bg-white text-body")}>
            <Icon className="h-4 w-4" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block text-[13px] font-semibold text-ink">{title}</span>
            <span className="block text-[11.5px] text-body">{detail}</span>
          </span>
        </li>
      ))}
    </ul>
  </section>
);
