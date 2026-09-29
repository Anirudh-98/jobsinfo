"use client";

import React from "react";
import { ArrowRight, MessageSquare, Send } from "lucide-react";
import { ApplicationRecord, useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const STAGES: ApplicationRecord["status"][] = ["Applied", "Shortlisted", "Interview", "Offer"];

const STATUS_TONE: Record<ApplicationRecord["status"], string> = {
  Applied: "bg-surface-soft text-body",
  Shortlisted: "bg-primary-light text-primary",
  Interview: "bg-orange-50 text-orange-600",
  Offer: "bg-emerald-50 text-emerald-600",
};

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const Stepper: React.FC<{ status: ApplicationRecord["status"] }> = ({ status }) => {
  const reached = STAGES.indexOf(status);
  return (
    <ol className="grid grid-cols-4 gap-1.5" aria-label={`Stage: ${status}`}>
      {STAGES.map((stage, i) => (
        <li key={stage} className="min-w-0">
          <span className={cn("block h-1.5 rounded-full", i < reached ? "bg-primary" : i === reached ? "bg-gradient-to-r from-primary to-sky-400" : "bg-surface-strong")} />
          <span className={cn("mt-1.5 block text-[11px]", i < reached ? "font-medium text-primary" : i === reached ? "font-semibold text-ink" : "text-muted")}>
            {stage}
          </span>
        </li>
      ))}
    </ol>
  );
};

export const ApplicationPipeline: React.FC = () => {
  const { applications, showToast } = useApp();

  return (
    <section className="card-soft p-4 sm:p-6" aria-labelledby="pipeline-title">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 id="pipeline-title" className="text-[16px] font-semibold text-ink">
            Application pipeline
          </h2>
          <p className="mt-0.5 text-[12.5px] text-body">Where each application stands right now</p>
        </div>
        <span className="rounded-full bg-primary-light px-3 py-1 text-[12px] font-semibold tabular-nums text-primary">
          {applications.length} active
        </span>
      </div>

      {applications.length === 0 ? (
        <div className="mt-5 rounded-2xl bg-surface-soft/60 px-6 py-10 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary-light text-primary">
            <Send className="h-5 w-5" aria-hidden />
          </span>
          <p className="mt-4 text-[15px] font-semibold text-ink">No applications yet</p>
          <p className="mt-1 text-[13px] text-body">Apply to a recommended job and track it here.</p>
          <a href="#jobs" className="btn-gradient mt-5 inline-flex min-h-[38px] items-center gap-1 rounded-full px-5 text-[13px] font-semibold">
            Explore jobs <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      ) : (
        <ul className="mt-5 divide-y divide-hairline">
          {applications.map((app) => (
            <li key={app.id} className="grid gap-4 py-4 first:pt-0 last:pb-0 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.9fr)_auto] lg:items-center">
              <div className="flex min-w-0 items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-light text-[12px] font-bold text-primary">
                  {initials(app.company)}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[14px] font-semibold text-ink">{app.jobTitle}</p>
                    <span className={cn("rounded-full px-2 py-0.5 text-[10.5px] font-semibold", STATUS_TONE[app.status])}>{app.status}</span>
                  </div>
                  <p className="mt-0.5 truncate text-[12px] text-body">
                    {app.company} · {app.salary} · Applied {app.appliedDate.toLowerCase()}
                  </p>
                  <p className="mt-2 rounded-lg bg-surface-soft/70 px-2.5 py-1.5 text-[12px] leading-snug text-ink-light">{app.stageNotes}</p>
                </div>
              </div>
              <Stepper status={app.status} />
              <button
                type="button"
                onClick={() => showToast(`Message sent to the recruiter at ${app.company}.`)}
                className="btn-soft inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-full px-4 text-[12.5px] font-semibold cursor-pointer"
              >
                <MessageSquare className="h-3.5 w-3.5" aria-hidden /> Message recruiter
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
