"use client";

import React from "react";
import { ArrowRight, ClipboardCheck, Clock, Lightbulb, Mic, Star, ThumbsUp, Users } from "lucide-react";
import { CANDIDATES } from "@/data/employerData";
import { RECOMMENDATIONS, overallScore } from "@/data/screeningData";
import { Avatar, Pill, btnPrimary } from "@/components/employer/ui";
import { useScreening } from "@/components/screening/ScreeningStore";
import { jobTitleFor } from "@/components/screening/ProfilesView";
import { cn } from "@/lib/utils";

const WEEKLY_GOAL = 10;

const TIPS = [
  "Start with small talk — nervous candidates open up after a minute.",
  "Use STAR for behavioural questions: Situation, Task, Action, Result.",
  "Write notes as you go; rate only after the interview ends.",
  "Be specific in concerns so recruiters know what to probe next.",
];

export const ScreeningOverview: React.FC<{ onInterview: (candidateId: string) => void }> = ({ onInterview }) => {
  const { evaluations, evaluationFor } = useScreening();
  const pending = CANDIDATES.filter((c) => !evaluationFor(c.id));
  const avg = evaluations.length ? Math.round((evaluations.reduce((s, e) => s + overallScore(e.ratings), 0) / evaluations.length) * 10) / 10 : 0;
  const recommended = evaluations.filter((e) => e.recommendation === "strong" || e.recommendation === "shortlist").length;
  const upNext = [...pending].sort((a, b) => b.match - a.match).slice(0, 4);
  const progress = Math.min(evaluations.length / WEEKLY_GOAL, 1);

  const tiles = [
    { label: "Profiles to interview", value: pending.length, icon: Users, tone: "bg-primary-light text-primary", href: "#profiles" },
    { label: "Interviews done", value: evaluations.length, icon: ClipboardCheck, tone: "bg-emerald-50 text-emerald-600" },
    { label: "Average score given", value: avg ? `${avg} / 5` : "—", icon: Star, tone: "bg-amber-50 text-amber-600" },
    { label: "Recommended", value: recommended, icon: ThumbsUp, tone: "bg-sky-100 text-sky-600" },
  ];

  return (
    <div className="space-y-4">
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {tiles.map(({ label, value, icon: Icon, tone, href }) => {
          const body = (
            <>
              <span className={cn("grid h-9 w-9 place-items-center rounded-xl", tone)}>
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <span className="mt-4 block text-[28px] font-bold leading-none tracking-tight tabular-nums text-ink">{value}</span>
              <span className="mt-1.5 block text-[12.5px] font-medium text-ink-light">{label}</span>
            </>
          );
          return (
            <li key={label}>
              {href ? (
                <a href={href} className="card-soft card-glow block h-full p-4 transition-transform hover:-translate-y-0.5 sm:p-5">
                  {body}
                </a>
              ) : (
                <div className="card-soft h-full p-4 sm:p-5">{body}</div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-4">
          <section className="card-soft p-4 sm:p-5" aria-labelledby="upnext-title">
            <div className="flex items-center justify-between gap-3">
              <h2 id="upnext-title" className="text-[16px] font-semibold text-ink">
                Up next
              </h2>
              <a href="#profiles" className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-primary hover:underline">
                All profiles <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
            <ul className="mt-4 divide-y divide-hairline">
              {upNext.map((c) => (
                <li key={c.id} className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <Avatar name={c.name} src={c.photo} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-semibold text-ink">{c.name}</p>
                    <p className="truncate text-[12px] text-body">
                      {c.education.split(",")[0]} · {jobTitleFor(c.jobId) ?? "CV repository"}
                    </p>
                  </div>
                  <Pill tone="green">{c.match}% match</Pill>
                  <button type="button" className={btnPrimary} onClick={() => onInterview(c.id)}>
                    <Mic className="h-3.5 w-3.5" aria-hidden /> Start interview
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="card-soft p-4 sm:p-5" aria-labelledby="recent-title">
            <h2 id="recent-title" className="text-[16px] font-semibold text-ink">
              Your evaluations
            </h2>
            {evaluations.length === 0 ? (
              <p className="mt-4 rounded-xl bg-surface-soft/60 px-4 py-6 text-center text-[13px] text-body">No interviews yet — start with someone from Up next.</p>
            ) : (
              <ul className="mt-4 divide-y divide-hairline">
                {evaluations.map((e) => {
                  const c = CANDIDATES.find((x) => x.id === e.candidateId)!;
                  const rec = RECOMMENDATIONS.find((r) => r.id === e.recommendation)!;
                  return (
                    <li key={e.id} className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0">
                      <Avatar name={c.name} src={c.photo} />
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-semibold text-ink">{c.name}</p>
                        <p className="truncate text-[12px] text-body">
                          {e.submittedAt} · <Clock className="inline h-3 w-3" aria-hidden /> {e.durationMin} min
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[13px] font-semibold tabular-nums text-ink">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden /> {overallScore(e.ratings)}
                      </span>
                      <Pill tone={rec.tone}>{rec.label}</Pill>
                      <button type="button" onClick={() => onInterview(c.id)} className="text-[12.5px] font-semibold text-primary hover:underline cursor-pointer">
                        Open
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>

        <div className="space-y-4">
          <section className="card-soft p-5" aria-labelledby="goal-title">
            <h2 id="goal-title" className="text-[15px] font-semibold text-ink">
              Weekly goal
            </h2>
            <p className="mt-1 text-[12.5px] text-body">
              <b className="font-semibold tabular-nums text-ink">{evaluations.length}</b> of {WEEKLY_GOAL} prescreens this week
            </p>
            <div className="mt-3 h-2.5 rounded-full bg-surface-soft" role="progressbar" aria-valuemin={0} aria-valuemax={WEEKLY_GOAL} aria-valuenow={evaluations.length} aria-label="Weekly goal">
              <div className="h-2.5 rounded-full bg-gradient-to-r from-primary to-sky-400 transition-all" style={{ width: `${progress * 100}%` }} />
            </div>
            <p className="mt-2 text-[12px] text-muted">Each completed prescreen counts towards your HR practicum certificate.</p>
          </section>

          <section className="card-soft p-5" aria-labelledby="tips-title">
            <h2 id="tips-title" className="flex items-center gap-2 text-[15px] font-semibold text-ink">
              <Lightbulb className="h-4 w-4 text-amber-500" aria-hidden /> Prescreen tips
            </h2>
            <ul className="mt-3 space-y-2.5">
              {TIPS.map((t, i) => (
                <li key={t} className="flex gap-2.5 text-[13px] leading-snug text-body">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-light text-[11px] font-bold text-primary">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
