"use client";

import React, { useState } from "react";
import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarCheck,
  CalendarClock,
  FileSearch,
  Globe,
  MapPin,
  Search,
  Star,
  UserCheck,
} from "lucide-react";
import { Candidate, Source, Stage } from "@/data/employerData";
import { useApp } from "@/context/AppContext";
import { Dropdown } from "@/components/ui/Dropdown";
import { useEmployer } from "@/components/employer/EmployerStore";
import { useCandidateDialogs } from "@/components/employer/CandidateDialogs";
import { Avatar, Empty, Intro, Pill, StageBadge, btnDanger, btnPrimary, btnSecondary } from "@/components/employer/ui";

const experienceLabel = (y: number) => (y === 0 ? "Fresher" : `${y} yr${y > 1 ? "s" : ""}`);

/* ---------- CV / Profile repository ---------- */

const EXPERIENCE_BANDS = ["Fresher", "1–2 yrs", "3+ yrs"];
const inBand = (y: number, band: string) => (band === "Fresher" ? y === 0 : band === "1–2 yrs" ? y >= 1 && y <= 2 : y >= 3);

export const RepositoryView: React.FC = () => {
  const { candidates, shortlist } = useEmployer();
  const { showToast } = useApp();
  const { openProfile, dialogs } = useCandidateDialogs();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [source, setSource] = useState("");

  const locations = Array.from(new Set(candidates.map((c) => c.location.split(",").at(-1)!.trim()))).sort();
  const sources = Array.from(new Set(candidates.map((c) => c.source)));
  const q = query.trim().toLowerCase();
  const results = candidates
    .filter(
      (c) =>
        (!q || [c.name, c.headline, c.education, ...c.skills].some((v) => v.toLowerCase().includes(q))) &&
        (!location || c.location.includes(location)) &&
        (!experience || inBand(c.experienceYears, experience)) &&
        (!source || c.source === (source as Source))
    )
    .sort((a, b) => b.match - a.match);

  return (
    <div className="space-y-4">
      <div className="card-soft p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[13.5px] text-body">Search every CV on Jobsinfo.world — including candidates who haven&apos;t applied to your jobs yet.</p>
          <p className="text-[12.5px] text-body" aria-live="polite">
            <b className="font-semibold tabular-nums text-ink">{results.length}</b> of {candidates.length} profiles
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

      {results.length === 0 ? (
        <Empty icon={FileSearch} title="No profiles match" text="Try fewer filters or a broader skill." />
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {results.map((c) => (
            <li key={c.id} className="card-soft flex flex-col p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <Avatar name={c.name} />
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold text-ink">{c.name}</p>
                  <p className="text-[12.5px] text-body">{c.headline}</p>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11.5px] font-semibold tabular-nums text-emerald-600">{c.match}% match</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-body">
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
                  <button type="button" className={btnSecondary} onClick={() => openProfile(c.id)}>
                    View profile
                  </button>
                  {c.stage === "applied" && (
                    <button
                      type="button"
                      className={btnPrimary}
                      onClick={() => {
                        shortlist(c.id);
                        showToast(`${c.name} shortlisted.`);
                      }}
                    >
                      <Star className="h-3.5 w-3.5" aria-hidden /> Shortlist
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {dialogs}
    </div>
  );
};

/* ---------- Pipeline stages ---------- */

const useStageList = (stage: Stage) => {
  const { candidates, jobs } = useEmployer();
  const [jobFilter, setJobFilter] = useState("");
  const inStage = candidates.filter((c) => c.stage === stage);
  const jobTitles = jobs.filter((j) => inStage.some((c) => c.jobId === j.id)).map((j) => j.title);
  const selected = jobs.find((j) => j.title === jobFilter);
  const list = inStage.filter((c) => !selected || c.jobId === selected.id);
  const jobFilterControl = (
    <div className="w-full sm:w-64">
      <Dropdown label="Job" placeholder="All jobs" icon={BriefcaseBusiness} value={jobFilter} options={jobTitles} onChange={setJobFilter} />
    </div>
  );
  return { list, total: inStage.length, jobFilter: jobFilterControl, jobTitle: (c: Candidate) => jobs.find((j) => j.id === c.jobId)?.title ?? "CV repository" };
};

const Row: React.FC<{
  candidate: Candidate;
  jobTitle: string;
  detail: React.ReactNode;
  actions: React.ReactNode;
  onOpen: () => void;
}> = ({ candidate: c, jobTitle, detail, actions, onOpen }) => (
  <li className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] lg:items-center">
    <div className="flex min-w-0 items-start gap-3">
      <Avatar name={c.name} />
      <div className="min-w-0">
        <button type="button" onClick={onOpen} className="text-left text-[14.5px] font-semibold text-ink hover:text-primary cursor-pointer">
          {c.name}
        </button>
        <p className="truncate text-[12.5px] text-body">{c.headline}</p>
        <p className="mt-1 text-[12px] text-muted">
          For <span className="font-medium text-ink-light">{jobTitle}</span> · {c.match}% match
        </p>
      </div>
    </div>
    <div className="min-w-0 text-[12.5px] text-body">{detail}</div>
    <div className="flex flex-wrap gap-2 lg:justify-end">{actions}</div>
  </li>
);

const StageList: React.FC<{
  intro: string;
  stage: Stage;
  emptyIcon: React.ElementType;
  emptyTitle: string;
  emptyText: string;
  render: (c: Candidate, dialogs: ReturnType<typeof useCandidateDialogs>) => { detail: React.ReactNode; actions: React.ReactNode };
}> = ({ intro, stage, emptyIcon, emptyTitle, emptyText, render }) => {
  const { list, total, jobFilter, jobTitle } = useStageList(stage);
  const d = useCandidateDialogs();

  return (
    <div className="space-y-4">
      <Intro text={`${intro} ${total} in total.`}>{total > 0 && jobFilter}</Intro>
      {list.length === 0 ? (
        <Empty icon={emptyIcon} title={emptyTitle} text={emptyText} />
      ) : (
        <ul className="card-soft divide-y divide-hairline">
          {list.map((c) => {
            const { detail, actions } = render(c, d);
            return <Row key={c.id} candidate={c} jobTitle={jobTitle(c)} detail={detail} actions={actions} onOpen={() => d.openProfile(c.id)} />;
          })}
        </ul>
      )}
      {d.dialogs}
    </div>
  );
};

export const ShortlistedView: React.FC = () => {
  const { reject } = useEmployer();
  const { showToast } = useApp();
  return (
    <StageList
      stage="shortlisted"
      intro="Candidates you shortlisted, ready for an interview request."
      emptyIcon={Star}
      emptyTitle="No shortlisted candidates"
      emptyText="Shortlist people from the CV repository or your job applicants."
      render={(c, d) => ({
        detail: (
          <>
            <p>{c.education}</p>
            <p className="mt-0.5">Expects {c.expectedCtc} · notice {c.noticePeriod}</p>
          </>
        ),
        actions: (
          <>
            <button type="button" className={btnDanger} onClick={() => { reject(c.id); showToast(`${c.name} marked as not selected.`); }}>
              Not a fit
            </button>
            <button type="button" className={btnPrimary} onClick={() => d.openInterview(c.id)}>
              <CalendarClock className="h-3.5 w-3.5" aria-hidden /> Request interview
            </button>
          </>
        ),
      })}
    />
  );
};

export const InterviewsView: React.FC = () => {
  const { setInterviewStatus } = useEmployer();
  const { showToast } = useApp();
  return (
    <StageList
      stage="interview"
      intro="Interview requests you've sent and their status."
      emptyIcon={CalendarCheck}
      emptyTitle="No interview requests"
      emptyText="Request an interview from the Shortlisted profiles page."
      render={(c, d) => {
        const i = c.interview;
        return {
          detail: i ? (
            <>
              <p className="font-medium text-ink">{i.round}</p>
              <p className="mt-0.5">
                {i.date} · {i.time} · {i.mode}
              </p>
              <p className="mt-1">
                <Pill tone={i.status === "Completed" ? "green" : i.status === "Confirmed" ? "blue" : "amber"}>{i.status}</Pill>
              </p>
            </>
          ) : null,
          actions: (
            <>
              {i?.status === "Requested" && (
                <button type="button" className={btnSecondary} onClick={() => { setInterviewStatus(c.id, "Confirmed"); showToast(`Interview with ${c.name} confirmed.`); }}>
                  Mark confirmed
                </button>
              )}
              {i?.status === "Confirmed" && (
                <button type="button" className={btnSecondary} onClick={() => { setInterviewStatus(c.id, "Completed"); showToast(`Interview with ${c.name} completed.`); }}>
                  Mark completed
                </button>
              )}
              <button type="button" className={btnPrimary} onClick={() => d.openOffer(c.id)}>
                <Award className="h-3.5 w-3.5" aria-hidden /> Make offer
              </button>
            </>
          ),
        };
      }}
    />
  );
};

export const OfferedView: React.FC = () => {
  const { setOfferStatus, markHired } = useEmployer();
  const { showToast } = useApp();
  return (
    <StageList
      stage="offered"
      intro="Offers you've sent and whether candidates have responded."
      emptyIcon={Award}
      emptyTitle="No open offers"
      emptyText="Make an offer after an interview to see it here."
      render={(c) => {
        const o = c.offer;
        return {
          detail: o ? (
            <>
              <p className="font-medium text-ink">{o.ctc}</p>
              <p className="mt-0.5">
                Sent {o.sentOn} · joining {o.joiningDate}
              </p>
              <p className="mt-1">
                <Pill tone={o.status === "Accepted" ? "green" : o.status === "Declined" ? "rose" : "amber"}>{o.status}</Pill>
              </p>
            </>
          ) : null,
          actions: (
            <>
              {o?.status === "Pending" && (
                <>
                  <button type="button" className={btnDanger} onClick={() => { setOfferStatus(c.id, "Declined"); showToast(`${c.name} declined the offer.`); }}>
                    Declined
                  </button>
                  <button type="button" className={btnSecondary} onClick={() => { setOfferStatus(c.id, "Accepted"); showToast(`${c.name} accepted the offer.`); }}>
                    Accepted
                  </button>
                </>
              )}
              {o?.status !== "Declined" && (
                <button type="button" className={btnPrimary} onClick={() => { markHired(c.id); showToast(`${c.name} marked as hired.`); }}>
                  <UserCheck className="h-3.5 w-3.5" aria-hidden /> Mark hired
                </button>
              )}
            </>
          ),
        };
      }}
    />
  );
};

export const HiredView: React.FC = () => (
  <StageList
    stage="hired"
    intro="People who accepted and joined, or are about to."
    emptyIcon={BadgeCheck}
    emptyTitle="No hires yet"
    emptyText="Candidates you mark as hired appear here."
    render={(c, d) => ({
      detail: (
        <>
          <p className="font-medium text-ink">{c.offer?.ctc ?? c.expectedCtc}</p>
          <p className="mt-0.5">
            Hired {c.hiredOn} · joining {c.offer?.joiningDate ?? "TBC"}
          </p>
        </>
      ),
      actions: (
        <button type="button" className={btnSecondary} onClick={() => d.openProfile(c.id)}>
          View profile
        </button>
      ),
    })}
  />
);
