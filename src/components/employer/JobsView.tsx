"use client";

import React, { useState } from "react";
import { BriefcaseBusiness, MapPin, Plus } from "lucide-react";
import { EmployerJob, JobStatus } from "@/data/employerData";
import { useApp } from "@/context/AppContext";
import { useEmployer } from "@/components/employer/EmployerStore";
import { useCandidateDialogs } from "@/components/employer/CandidateDialogs";
import { Avatar, Dialog, Empty, Field, Pill, StageBadge, btnDanger, btnPrimary, btnSecondary, inputClass } from "@/components/employer/ui";
import { cn } from "@/lib/utils";

const STATUSES: ("All" | JobStatus)[] = ["All", "Active", "Paused", "Closed"];
const TYPES: EmployerJob["type"][] = ["Full-time", "Internship", "Contract"];
const STATUS_TONE = { Active: "green", Paused: "amber", Closed: "neutral" } as const;

const NewJobDialog: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { addJob } = useEmployer();
  const { showToast } = useApp();
  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "Hyderabad",
    type: TYPES[0],
    experience: "0–2 yrs",
    salary: "",
    openings: 1,
  });
  const valid = form.title.trim() && form.department.trim() && form.location.trim() && form.salary.trim() && form.openings > 0;
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    addJob({ ...form, title: form.title.trim(), department: form.department.trim() });
    showToast(`“${form.title.trim()}” is now live.`);
    onClose();
  };

  return (
    <Dialog
      title="Post a new job"
      onClose={onClose}
      wide
      footer={
        <>
          <button type="button" className={btnSecondary} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" form="new-job" className={btnPrimary} disabled={!valid}>
            Publish job
          </button>
        </>
      }
    >
      <form id="new-job" onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        <Field label="Job title" className="sm:col-span-2">
          <input required value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Sales Executive" className={inputClass} />
        </Field>
        <Field label="Department">
          <input required value={form.department} onChange={(e) => set("department", e.target.value)} placeholder="e.g. Sales" className={inputClass} />
        </Field>
        <Field label="Location">
          <input required value={form.location} onChange={(e) => set("location", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Job type">
          <select value={form.type} onChange={(e) => set("type", e.target.value as EmployerJob["type"])} className={inputClass}>
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Experience">
          <input value={form.experience} onChange={(e) => set("experience", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Salary">
          <input required value={form.salary} onChange={(e) => set("salary", e.target.value)} placeholder="e.g. ₹4–6 LPA" className={inputClass} />
        </Field>
        <Field label="Openings">
          <input type="number" min={1} value={form.openings} onChange={(e) => set("openings", Number(e.target.value))} className={inputClass} />
        </Field>
      </form>
    </Dialog>
  );
};

const ApplicantsDialog: React.FC<{ job: EmployerJob; onClose: () => void; onOpen: (id: string) => void }> = ({ job, onClose, onOpen }) => {
  const { candidates } = useEmployer();
  const applicants = candidates.filter((c) => c.jobId === job.id).sort((a, b) => b.match - a.match);
  return (
    <Dialog title={`Applicants · ${job.title}`} onClose={onClose} wide>
      {applicants.length === 0 ? (
        <p className="py-8 text-center text-[13px] text-body">No applicants yet.</p>
      ) : (
        <ul className="divide-y divide-hairline">
          {applicants.map((c) => (
            <li key={c.id} className="flex items-center gap-3 py-3">
              <Avatar name={c.name} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">{c.name}</p>
                <p className="truncate text-[12px] text-body">
                  {c.headline} · {c.match}% match
                </p>
              </div>
              <StageBadge stage={c.stage} />
              <button type="button" className={btnSecondary} onClick={() => onOpen(c.id)}>
                View
              </button>
            </li>
          ))}
        </ul>
      )}
    </Dialog>
  );
};

export const JobsView: React.FC = () => {
  const { jobs, candidates, setJobStatus } = useEmployer();
  const { showToast } = useApp();
  const { openProfile, dialogs } = useCandidateDialogs();
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("All");
  const [creating, setCreating] = useState(false);
  const [viewing, setViewing] = useState<EmployerJob | null>(null);

  const list = jobs.filter((j) => status === "All" || j.status === status);
  const count = (s: (typeof STATUSES)[number]) => (s === "All" ? jobs.length : jobs.filter((j) => j.status === s).length);

  const changeStatus = (job: EmployerJob, next: JobStatus, msg: string) => {
    setJobStatus(job.id, next);
    showToast(msg);
  };

  return (
    <div className="space-y-4">
      <div className="card-soft flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto" role="group" aria-label="Filter by status">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={status === s}
              onClick={() => setStatus(s)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors cursor-pointer",
                status === s ? "bg-primary text-white" : "border border-hairline bg-white text-body hover:border-primary/40 hover:text-primary"
              )}
            >
              {s} <span className="tabular-nums opacity-70">{count(s)}</span>
            </button>
          ))}
        </div>
        <button type="button" className={btnPrimary} onClick={() => setCreating(true)}>
          <Plus className="h-4 w-4" aria-hidden /> Post a job
        </button>
      </div>

      {list.length === 0 ? (
        <Empty icon={BriefcaseBusiness} title={`No ${status.toLowerCase()} jobs`} text="Post a job or change the filter." />
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2">
          {list.map((job) => {
            const applicants = candidates.filter((c) => c.jobId === job.id);
            const inPipeline = applicants.filter((c) => ["shortlisted", "interview", "offered", "hired"].includes(c.stage)).length;
            return (
              <li key={job.id} className="card-soft flex flex-col p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[15.5px] font-semibold text-ink">{job.title}</p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-body">
                      <span>{job.department}</span>
                      <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-muted" aria-hidden />{job.location}</span>
                    </p>
                  </div>
                  <Pill tone={STATUS_TONE[job.status]}>{job.status}</Pill>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {[job.type, job.experience, job.salary, `${job.openings} openings`].map((t) => (
                    <span key={t} className="rounded-full border border-hairline px-2.5 py-1 text-[11px] font-medium text-body">
                      {t}
                    </span>
                  ))}
                </div>
                <dl className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-surface-soft/60 p-3 text-center">
                  {(
                    [
                      ["Applicants", applicants.length],
                      ["In pipeline", inPipeline],
                      ["Views", job.views.toLocaleString("en-IN")],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label} className="flex flex-col-reverse">
                      <dt className="text-[11px] text-muted">{label}</dt>
                      <dd className="text-[17px] font-bold tabular-nums text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex-1" aria-hidden />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-hairline pt-4">
                  <p className="text-[11.5px] text-muted">Posted {job.postedOn}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.status === "Active" && (
                      <button type="button" className={btnSecondary} onClick={() => changeStatus(job, "Paused", `“${job.title}” paused.`)}>
                        Pause
                      </button>
                    )}
                    {job.status === "Paused" && (
                      <button type="button" className={btnSecondary} onClick={() => changeStatus(job, "Active", `“${job.title}” is live again.`)}>
                        Resume
                      </button>
                    )}
                    {job.status === "Closed" ? (
                      <button type="button" className={btnSecondary} onClick={() => changeStatus(job, "Active", `“${job.title}” reopened.`)}>
                        Reopen
                      </button>
                    ) : (
                      <button type="button" className={btnDanger} onClick={() => changeStatus(job, "Closed", `“${job.title}” closed.`)}>
                        Close
                      </button>
                    )}
                    <button type="button" className={btnPrimary} onClick={() => setViewing(job)}>
                      Applicants
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {creating && <NewJobDialog onClose={() => setCreating(false)} />}
      {viewing && (
        <ApplicantsDialog
          job={viewing}
          onClose={() => setViewing(null)}
          onOpen={(id) => {
            setViewing(null);
            openProfile(id);
          }}
        />
      )}
      {dialogs}
    </div>
  );
};
