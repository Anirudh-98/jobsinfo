"use client";

import React, { useState } from "react";
import { BriefcaseBusiness, ChevronLeft, ChevronRight, FileSearch, FolderOpen, Globe, MapPin, Search, Star } from "lucide-react";
import { Candidate, EDUCATION_GROUPS, EducationGroupId, Source, educationGroup } from "@/data/employerData";
import { useApp } from "@/context/AppContext";
import { Dropdown } from "@/components/ui/Dropdown";
import { FolderCard } from "@/components/ui/folder-card";
import { useEmployer } from "@/components/employer/EmployerStore";
import { useCandidateDialogs } from "@/components/employer/CandidateDialogs";
import { Avatar, Empty, Pill, StageBadge, btnPrimary, btnSecondary } from "@/components/employer/ui";
import { cn } from "@/lib/utils";

const EXPERIENCE_BANDS = ["Fresher", "1–2 yrs", "3+ yrs"];
const inBand = (y: number, band: string) => (band === "Fresher" ? y === 0 : band === "1–2 yrs" ? y >= 1 && y <= 2 : y >= 3);
// White & blue folders: brand-blue cover behind a frosted white folder front, matching the site theme.
const BLUE_COVER =
  "radial-gradient(70% 90% at 78% 115%, rgba(191,219,254,.85) 0%, rgba(147,197,253,.35) 40%, rgba(0,0,0,0) 72%), linear-gradient(165deg, #1e40af 0%, #2563eb 55%, #3b82f6 100%)";
// FolderCard ships `dark:` tokens (black panel) that win when the OS is in dark mode, so every token is
// set for both schemes. The panel is slightly translucent so the blue cover frosts through where they overlap.
// Written out in full (not generated) so Tailwind can see every class.
const FOLDER_TOKENS = [
  "[--folder-card-bezel:rgba(255,255,255,0.72)] dark:[--folder-card-bezel:rgba(255,255,255,0.72)]",
  "[--folder-card-surface:#ffffff] dark:[--folder-card-surface:#ffffff]",
  "[--folder-card-panel-from:rgba(255,255,255,0.9)] dark:[--folder-card-panel-from:rgba(255,255,255,0.9)]",
  "[--folder-card-panel-to:rgba(241,246,255,0.82)] dark:[--folder-card-panel-to:rgba(241,246,255,0.82)]",
  "[--folder-card-title:#0f172a] dark:[--folder-card-title:#0f172a]",
  "[--folder-card-subtitle:#64748b] dark:[--folder-card-subtitle:#64748b]",
].join(" ");

const experienceLabel = (y: number) => (y === 0 ? "Fresher" : `${y} yr${y > 1 ? "s" : ""}`);


const CandidateCard: React.FC<{ c: Candidate; onView: () => void; onShortlist: () => void }> = ({ c, onView, onShortlist }) => (
  <li className="card-soft flex flex-col p-4 sm:p-5">
    <div className="flex items-start gap-3">
      <Avatar name={c.name} />
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold text-ink">{c.name}</p>
        <p className="text-[12.5px] text-body">{c.headline}</p>
      </div>
      <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11.5px] font-semibold tabular-nums text-emerald-600">{c.match}% match</span>
    </div>
    <p className="mt-3 text-[12.5px] font-medium text-ink-light">{c.education}</p>
    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-body">
      <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-muted" aria-hidden />{c.location}</span>
      <span className="inline-flex items-center gap-1"><BriefcaseBusiness className="h-3.5 w-3.5 text-muted" aria-hidden />{experienceLabel(c.experienceYears)}</span>
      <span className="inline-flex items-center gap-1"><Globe className="h-3.5 w-3.5 text-muted" aria-hidden />{c.source}</span>
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
      {c.stage === "applied" && !c.jobId ? <Pill>Not applied</Pill> : <StageBadge stage={c.stage} />}
      <div className="flex gap-2">
        <button type="button" className={btnSecondary} onClick={onView}>
          View profile
        </button>
        {c.stage === "applied" && (
          <button type="button" className={btnPrimary} onClick={onShortlist}>
            <Star className="h-3.5 w-3.5" aria-hidden /> Shortlist
          </button>
        )}
      </div>
    </div>
  </li>
);

// CV repository organised into education folders (10th/SSC … MBA, Other). Search and filters narrow every folder at once.
export const RepositoryView: React.FC = () => {
  const { candidates, shortlist } = useEmployer();
  const { showToast } = useApp();
  const { openProfile, dialogs } = useCandidateDialogs();
  const [folder, setFolder] = useState<EducationGroupId | null>(null);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [source, setSource] = useState("");

  const locations = Array.from(new Set(candidates.map((c) => c.location.split(",").at(-1)!.trim()))).sort();
  const sources = Array.from(new Set(candidates.map((c) => c.source)));
  const q = query.trim().toLowerCase();
  const filtered = Boolean(q || location || experience || source);
  const results = candidates
    .filter(
      (c) =>
        (!q || [c.name, c.headline, c.education, ...c.skills].some((v) => v.toLowerCase().includes(q))) &&
        (!location || c.location.includes(location)) &&
        (!experience || inBand(c.experienceYears, experience)) &&
        (!source || c.source === (source as Source))
    )
    .sort((a, b) => b.match - a.match);

  const inGroup = (id: EducationGroupId) => results.filter((c) => educationGroup(c) === id);
  const current = folder ? EDUCATION_GROUPS.find((g) => g.id === folder)! : null;
  const shown = folder ? inGroup(folder) : [];

  const onShortlist = (c: Candidate) => {
    shortlist(c.id);
    showToast(`${c.name} shortlisted.`);
  };

  return (
    <div className="space-y-4">
      <div className="card-soft p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[13.5px] text-body">Every CV on Jobsinfo.world, organised by education — including candidates who haven&apos;t applied yet.</p>
          <p className="text-[12.5px] text-body" aria-live="polite">
            <b className="font-semibold tabular-nums text-ink">{results.length}</b> of {candidates.length} profiles
            {filtered && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setLocation("");
                  setExperience("");
                  setSource("");
                }}
                className="ml-2 font-semibold text-primary hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            )}
          </p>
        </div>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-3 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
          <label className="relative block min-w-0 sm:col-span-3 lg:col-span-1">
            <span className="sr-only">Search candidates</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Skills, role, college or name…"
              className="h-11 w-full rounded-xl border border-hairline bg-white pl-10 pr-3 text-[13px] text-ink outline-none transition-colors placeholder:text-muted hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </label>
          <Dropdown label="Location" placeholder="Any location" icon={MapPin} value={location} options={locations} onChange={setLocation} />
          <Dropdown label="Experience" placeholder="Any experience" icon={BriefcaseBusiness} value={experience} options={EXPERIENCE_BANDS} onChange={setExperience} />
          <Dropdown label="Source" placeholder="Any source" icon={Globe} value={source} options={sources} onChange={setSource} />
        </div>
      </div>

      {/* Breadcrumb */}
      <nav aria-label="Repository folders" className="flex flex-wrap items-center gap-1.5 text-[13px]">
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
            const shortlisted = members.filter((c) => c.stage !== "applied" && c.stage !== "rejected").length;
            return (
              <li key={g.id} className={cn(empty && "opacity-45")}>
                <FolderCard
                  role="button"
                  tabIndex={empty ? -1 : 0}
                  aria-disabled={empty}
                  aria-label={`Open ${g.title} folder, ${members.length} ${members.length === 1 ? "profile" : "profiles"}`}
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
                  meta={shortlisted ? `${shortlisted} in pipeline` : ""}
                  className={cn(
                    "w-full rounded-[8.46cqw] outline-none ring-1 ring-primary/10 focus-visible:ring-4 focus-visible:ring-primary/30",
                    FOLDER_TOKENS,
                    empty ? "cursor-not-allowed" : "cursor-pointer"
                  )}
                />
              </li>
            );
          })}
        </ul>
      ) : shown.length === 0 ? (
        <Empty icon={FileSearch} title={`No ${current.title} profiles match`} text="Try fewer filters, or open another folder." />
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {shown.map((c) => (
            <CandidateCard key={c.id} c={c} onView={() => openProfile(c.id)} onShortlist={() => onShortlist(c)} />
          ))}
        </ul>
      )}
      {dialogs}
    </div>
  );
};
