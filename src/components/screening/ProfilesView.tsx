"use client";

import React, { useState } from "react";
import { BriefcaseBusiness, ChevronLeft, ChevronRight, ClipboardCheck, FileSearch, FolderOpen, MapPin, Mic, Search, Star } from "lucide-react";
import { CANDIDATES, EDUCATION_GROUPS, EMPLOYER_JOBS, EducationGroupId, educationGroup } from "@/data/employerData";
import { RECOMMENDATIONS, overallScore } from "@/data/screeningData";
import { Dropdown } from "@/components/ui/Dropdown";
import { FolderCard } from "@/components/ui/folder-card";
import { BLUE_COVER, FOLDER_TOKENS } from "@/components/employer/RepositoryView";
import { Avatar, Empty, Pill, btnPrimary, btnSecondary } from "@/components/employer/ui";
import { useScreening } from "@/components/screening/ScreeningStore";
import { cn } from "@/lib/utils";

const STATUS = ["To interview", "Interviewed"];
const experienceLabel = (y: number) => (y === 0 ? "Fresher" : `${y} yr${y > 1 ? "s" : ""}`);
const REC_TONE = { green: "green", blue: "blue", amber: "amber", rose: "rose" } as const;

export const jobTitleFor = (jobId: string | null) => EMPLOYER_JOBS.find((j) => j.id === jobId)?.title;

// Every student applicant, filed into education folders. Opening a folder lists its profiles with "Start interview".
export const ProfilesView: React.FC<{
  onInterview: (candidateId: string) => void;
  /** Open folder, held by the page so returning from an interview lands back in the same folder. */
  folder: EducationGroupId | null;
  setFolder: (id: EducationGroupId | null) => void;
}> = ({ onInterview, folder, setFolder }) => {
  const { evaluationFor } = useScreening();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  const locations = Array.from(new Set(CANDIDATES.map((c) => c.location.split(",").at(-1)!.trim()))).sort();
  const q = query.trim().toLowerCase();
  const results = CANDIDATES.filter(
    (c) =>
      (!q || [c.name, c.headline, c.education, ...c.skills].some((v) => v.toLowerCase().includes(q))) &&
      (!location || c.location.includes(location)) &&
      (!status || (status === "Interviewed") === Boolean(evaluationFor(c.id)))
  ).sort((a, b) => b.match - a.match);
  const filtered = Boolean(q || location || status);

  const inGroup = (id: EducationGroupId) => results.filter((c) => educationGroup(c) === id);
  const current = folder ? EDUCATION_GROUPS.find((g) => g.id === folder)! : null;
  const shown = folder ? inGroup(folder) : [];

  return (
    <div className="space-y-4">
      <div className="card-soft p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[13.5px] text-body">Pick a folder, choose a candidate and run their HR prescreen. Your evaluation goes straight to recruiters.</p>
          <p className="text-[12.5px] text-body" aria-live="polite">
            <b className="font-semibold tabular-nums text-ink">{results.length}</b> of {CANDIDATES.length} profiles
            {filtered && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setLocation("");
                  setStatus("");
                }}
                className="ml-2 font-semibold text-primary hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            )}
          </p>
        </div>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-3 lg:grid-cols-[minmax(0,1.8fr)_repeat(2,minmax(0,1fr))]">
          <label className="relative block min-w-0 sm:col-span-3 lg:col-span-1">
            <span className="sr-only">Search profiles</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, skill, college…"
              className="h-11 w-full rounded-xl border border-hairline bg-white pl-10 pr-3 text-[13px] text-ink outline-none transition-colors placeholder:text-muted hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>
          <Dropdown label="Location" placeholder="Any location" icon={MapPin} value={location} options={locations} onChange={setLocation} />
          <Dropdown label="Status" placeholder="Any status" icon={ClipboardCheck} value={status} options={STATUS} onChange={setStatus} />
        </div>
      </div>

      <nav aria-label="Profile folders" className="flex flex-wrap items-center gap-1.5 text-[13px]">
        {current ? (
          <>
            <button
              type="button"
              onClick={() => setFolder(null)}
              className="inline-flex items-center gap-1 rounded-full border border-hairline bg-white px-3 py-1.5 font-medium text-body transition-colors hover:border-primary/40 hover:text-primary cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" aria-hidden /> All folders
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-muted" aria-hidden />
            <span className="inline-flex items-center gap-1.5 font-semibold text-ink" aria-current="page">
              <FolderOpen className="h-4 w-4 text-primary" aria-hidden /> {current.title}
              <span className="font-normal text-muted">· {shown.length} profiles</span>
            </span>
          </>
        ) : (
          <span className="font-semibold text-ink">All folders</span>
        )}
      </nav>

      {!current ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {EDUCATION_GROUPS.map((g) => {
            const members = inGroup(g.id);
            const empty = members.length === 0;
            const done = members.filter((c) => evaluationFor(c.id)).length;
            return (
              <li key={g.id} className={cn(empty && "opacity-45")}>
                <FolderCard
                  role="button"
                  tabIndex={empty ? -1 : 0}
                  aria-disabled={empty}
                  aria-label={`Open ${g.title} folder, ${members.length} ${members.length === 1 ? "profile" : "profiles"}, ${done} interviewed`}
                  onClick={() => !empty && setFolder(g.id)}
                  onKeyDown={(e) => {
                    if (!empty && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      setFolder(g.id);
                    }
                  }}
                  interactive={!empty}
                  coverBackground={BLUE_COVER}
                  title={g.title}
                  subtitle={g.subtitle}
                  count={members.length}
                  countLabel={members.length === 1 ? "Profile" : "Profiles"}
                  meta={done ? `${done} interviewed` : ""}
                  className={cn("w-full rounded-[8.46cqw] outline-none focus-visible:ring-4 focus-visible:ring-primary/30", FOLDER_TOKENS, empty ? "cursor-not-allowed" : "cursor-pointer")}
                />
              </li>
            );
          })}
        </ul>
      ) : shown.length === 0 ? (
        <Empty icon={FileSearch} title={`No ${current.title} profiles match`} text="Try fewer filters, or open another folder." />
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {shown.map((c) => {
            const ev = evaluationFor(c.id);
            const rec = ev && RECOMMENDATIONS.find((r) => r.id === ev.recommendation)!;
            const job = jobTitleFor(c.jobId);
            return (
              <li key={c.id} className="card-soft flex flex-col p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <Avatar name={c.name} size="lg" src={c.photo} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold text-ink">{c.name}</p>
                    <p className="text-[12.5px] text-body">{c.headline}</p>
                    <p className="mt-1 text-[12px] font-medium text-ink-light">{c.education}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11.5px] font-semibold tabular-nums text-emerald-600">{c.match}%</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-body">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-muted" aria-hidden />{c.location}</span>
                  <span className="inline-flex items-center gap-1"><BriefcaseBusiness className="h-3.5 w-3.5 text-muted" aria-hidden />{experienceLabel(c.experienceYears)}</span>
                  {job && <span className="inline-flex items-center gap-1">For {job}</span>}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.skills.map((s) => (
                    <span key={s} className="rounded-full border border-hairline px-2.5 py-1 text-[11px] font-medium text-body">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex-1" aria-hidden />
                <div className="mt-4 flex items-center justify-between gap-2 border-t border-hairline pt-4">
                  {ev && rec ? (
                    <span className="flex flex-wrap items-center gap-1.5">
                      <Pill tone={REC_TONE[rec.tone]}>{rec.label}</Pill>
                      <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold tabular-nums text-ink">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden /> {overallScore(ev.ratings)}
                      </span>
                    </span>
                  ) : (
                    <Pill>Not interviewed</Pill>
                  )}
                  <button type="button" className={ev ? btnSecondary : btnPrimary} onClick={() => onInterview(c.id)}>
                    <Mic className="h-3.5 w-3.5" aria-hidden /> {ev ? "Re-interview" : "Start interview"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
