"use client";

import React, { useState } from "react";
import { BriefcaseBusiness, CalendarClock, Download, GraduationCap, MapPin, Wallet } from "lucide-react";
import { Candidate, Interview } from "@/data/employerData";
import { useApp } from "@/context/AppContext";
import { useEmployer } from "@/components/employer/EmployerStore";
import { Avatar, Dialog, Field, StageBadge, btnDanger, btnPrimary, btnSecondary, inputClass } from "@/components/employer/ui";

const INTERVIEW_MODES: Interview["mode"][] = ["Video call", "In person", "Phone"];

const ProfileDialog: React.FC<{
  candidate: Candidate;
  onClose: () => void;
  onInterview: () => void;
  onOffer: () => void;
}> = ({ candidate: c, onClose, onInterview, onOffer }) => {
  const { jobs, shortlist, reject, markHired } = useEmployer();
  const { showToast } = useApp();
  const job = jobs.find((j) => j.id === c.jobId);

  const act = (fn: () => void, msg: string) => {
    fn();
    showToast(msg);
    onClose();
  };

  const primary =
    c.stage === "applied" ? (
      <button type="button" className={btnPrimary} onClick={() => act(() => shortlist(c.id), `${c.name} shortlisted.`)}>
        Shortlist
      </button>
    ) : c.stage === "shortlisted" ? (
      <button type="button" className={btnPrimary} onClick={onInterview}>
        Request interview
      </button>
    ) : c.stage === "interview" ? (
      <button type="button" className={btnPrimary} onClick={onOffer}>
        Make offer
      </button>
    ) : c.stage === "offered" ? (
      <button type="button" className={btnPrimary} onClick={() => act(() => markHired(c.id), `${c.name} marked as hired.`)}>
        Mark as hired
      </button>
    ) : null;

  return (
    <Dialog
      title="Candidate profile"
      onClose={onClose}
      wide
      footer={
        <>
          <button type="button" className={btnSecondary} onClick={() => showToast(`Downloading ${c.name}'s CV…`)}>
            <Download className="h-3.5 w-3.5" aria-hidden /> Download CV
          </button>
          {!["hired", "rejected"].includes(c.stage) && (
            <button type="button" className={btnDanger} onClick={() => act(() => reject(c.id), `${c.name} marked as not selected.`)}>
              Not a fit
            </button>
          )}
          {primary}
        </>
      }
    >
      <div className="flex items-start gap-4">
        <Avatar name={c.name} size="lg" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[18px] font-semibold text-ink">{c.name}</p>
            <StageBadge stage={c.stage} />
          </div>
          <p className="text-[13px] text-body">{c.headline}</p>
          <p className="mt-1 text-[12.5px] font-semibold text-emerald-600">{c.match}% match</p>
        </div>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          [MapPin, "Location", c.location],
          [BriefcaseBusiness, "Experience", c.experienceYears ? `${c.experienceYears} yr${c.experienceYears > 1 ? "s" : ""}` : "Fresher"],
          [GraduationCap, "Education", c.education],
          [Wallet, "Expected CTC", `${c.expectedCtc} · notice ${c.noticePeriod}`],
        ].map(([Icon, label, value]) => {
          const I = Icon as React.ElementType;
          return (
            <div key={label as string} className="flex items-start gap-3 rounded-xl bg-surface-soft/60 p-3">
              <I className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <div className="min-w-0">
                <dt className="text-[11.5px] text-muted">{label as string}</dt>
                <dd className="text-[13px] font-medium text-ink">{value as string}</dd>
              </div>
            </div>
          );
        })}
      </dl>

      <p className="mt-5 text-[13px] font-semibold text-ink">Skills</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {c.skills.map((s) => (
          <span key={s} className="rounded-full bg-primary-light px-2.5 py-1 text-[12px] font-medium text-primary">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-hairline p-3 text-[12.5px] text-body">
        {job ? (
          <>
            Applied for <b className="font-semibold text-ink">{job.title}</b> on {c.appliedOn} · via {c.source}
          </>
        ) : (
          <>In the CV repository · sourced via {c.source}. Not yet applied to any of your jobs.</>
        )}
        {c.interview && (
          <p className="mt-2 flex items-center gap-1.5">
            <CalendarClock className="h-3.5 w-3.5 text-primary" aria-hidden /> {c.interview.round}: {c.interview.date}, {c.interview.time} ({c.interview.mode}) —{" "}
            {c.interview.status}
          </p>
        )}
        {c.offer && (
          <p className="mt-2">
            Offer {c.offer.ctc} sent {c.offer.sentOn} · {c.offer.status} · joining {c.offer.joiningDate}
          </p>
        )}
      </div>
    </Dialog>
  );
};

const InterviewDialog: React.FC<{ candidate: Candidate; onClose: () => void }> = ({ candidate: c, onClose }) => {
  const { requestInterview } = useEmployer();
  const { showToast } = useApp();
  const [form, setForm] = useState({ date: "", time: "", mode: INTERVIEW_MODES[0], round: "First round" });
  const valid = form.date && form.time && form.round.trim();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    const date = new Date(`${form.date}T00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    const time = new Date(`1970-01-01T${form.time}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    requestInterview(c.id, { date, time, mode: form.mode, round: form.round.trim() });
    showToast(`Interview request sent to ${c.name}.`);
    onClose();
  };

  return (
    <Dialog
      title={`Request interview · ${c.name}`}
      onClose={onClose}
      footer={
        <>
          <button type="button" className={btnSecondary} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" form="interview-form" className={btnPrimary} disabled={!valid}>
            Send request
          </button>
        </>
      }
    >
      <form id="interview-form" onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        <Field label="Date">
          <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass} />
        </Field>
        <Field label="Time">
          <input type="time" required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={inputClass} />
        </Field>
        <Field label="Mode">
          <select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value as Interview["mode"] })} className={inputClass}>
            {INTERVIEW_MODES.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </Field>
        <Field label="Round">
          <input required value={form.round} onChange={(e) => setForm({ ...form, round: e.target.value })} className={inputClass} />
        </Field>
      </form>
    </Dialog>
  );
};

const OfferDialog: React.FC<{ candidate: Candidate; onClose: () => void }> = ({ candidate: c, onClose }) => {
  const { makeOffer } = useEmployer();
  const { showToast } = useApp();
  const [ctc, setCtc] = useState(c.expectedCtc);
  const [joining, setJoining] = useState("");
  const valid = ctc.trim() && joining;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    const joiningDate = new Date(`${joining}T00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    makeOffer(c.id, { ctc: ctc.trim(), joiningDate });
    showToast(`Offer sent to ${c.name}.`);
    onClose();
  };

  return (
    <Dialog
      title={`Make offer · ${c.name}`}
      onClose={onClose}
      footer={
        <>
          <button type="button" className={btnSecondary} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" form="offer-form" className={btnPrimary} disabled={!valid}>
            Send offer
          </button>
        </>
      }
    >
      <form id="offer-form" onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        <Field label="Annual CTC">
          <input required value={ctc} onChange={(e) => setCtc(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Joining date">
          <input type="date" required value={joining} onChange={(e) => setJoining(e.target.value)} className={inputClass} />
        </Field>
        <p className="text-[12px] text-body sm:col-span-2">
          Candidate expects {c.expectedCtc} · notice period {c.noticePeriod}.
        </p>
      </form>
    </Dialog>
  );
};

/** Opens the profile, interview and offer dialogs for any candidate; render `dialogs` once in the view. */
export const useCandidateDialogs = () => {
  const { candidates } = useEmployer();
  const [state, setState] = useState<{ id: string; kind: "profile" | "interview" | "offer" } | null>(null);
  const candidate = state && candidates.find((c) => c.id === state.id);
  const close = () => setState(null);

  const dialogs =
    candidate && state ? (
      state.kind === "profile" ? (
        <ProfileDialog
          candidate={candidate}
          onClose={close}
          onInterview={() => setState({ id: candidate.id, kind: "interview" })}
          onOffer={() => setState({ id: candidate.id, kind: "offer" })}
        />
      ) : state.kind === "interview" ? (
        <InterviewDialog candidate={candidate} onClose={close} />
      ) : (
        <OfferDialog candidate={candidate} onClose={close} />
      )
    ) : null;

  return {
    openProfile: (id: string) => setState({ id, kind: "profile" }),
    openInterview: (id: string) => setState({ id, kind: "interview" }),
    openOffer: (id: string) => setState({ id, kind: "offer" }),
    dialogs,
  };
};
