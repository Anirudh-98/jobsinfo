"use client";

import React, { useState } from "react";
import { Download, Mail, MapPin, Phone, Plus, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { RESUME_DEFAULTS } from "@/data/studentData";
import { useStudent } from "@/components/dashboard/StudentStore";
import { Field, btnPrimary, btnSecondary, inputClass } from "@/components/employer/ui";
import { cn } from "@/lib/utils";

const ACCENTS = [
  { name: "Blue", value: "#2563eb" },
  { name: "Navy", value: "#0b1f4d" },
  { name: "Teal", value: "#0f766e" },
];

type Resume = typeof RESUME_DEFAULTS;
type Edu = Resume["education"][number];
type Exp = Resume["experience"][number];
type Proj = Resume["projects"][number];

const textareaClass =
  "w-full rounded-xl border border-hairline bg-white px-3.5 py-2.5 text-[13.5px] leading-relaxed text-ink outline-none transition-colors hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/15";

const Section: React.FC<{ title: string; action?: React.ReactNode; children: React.ReactNode }> = ({ title, action, children }) => (
  <fieldset className="border-t border-hairline pt-5 first:border-t-0 first:pt-0">
    <div className="flex items-center justify-between gap-3">
      <legend className="text-[14px] font-semibold text-ink">{title}</legend>
      {action}
    </div>
    <div className="mt-3 space-y-3">{children}</div>
  </fieldset>
);

const RemoveButton: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => (
  <button type="button" onClick={onClick} aria-label={label} className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted hover:bg-rose-50 hover:text-rose-600 cursor-pointer">
    <Trash2 className="h-4 w-4" aria-hidden />
  </button>
);

export const ResumeBuilderView: React.FC = () => {
  const { user, showToast } = useApp();
  const { resume, updateResume } = useStudent();
  const [accent, setAccent] = useState(ACCENTS[0].value);

  // Generic list helpers for education / experience / projects.
  const setItem = <K extends "education" | "experience" | "projects">(key: K, i: number, patch: Partial<Resume[K][number]>) =>
    updateResume({ [key]: resume[key].map((x, j) => (j === i ? { ...x, ...patch } : x)) } as Partial<Resume>);
  const addItem = <K extends "education" | "experience" | "projects">(key: K, blank: Resume[K][number]) =>
    updateResume({ [key]: [...resume[key], blank] } as Partial<Resume>);
  const removeItem = (key: "education" | "experience" | "projects", i: number) =>
    updateResume({ [key]: resume[key].filter((_, j) => j !== i) } as Partial<Resume>);

  const addBtn = (onClick: () => void) => (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-primary hover:underline cursor-pointer">
      <Plus className="h-3.5 w-3.5" aria-hidden /> Add
    </button>
  );

  return (
    <div className="grid items-start gap-4 2xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_520px]">
      {/* Editor */}
      <form onSubmit={(e) => e.preventDefault()} className="card-soft space-y-5 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] text-body">
            Name, contact and skills come from your <a href="#profile" className="font-semibold text-primary hover:underline">profile</a>.
          </p>
          <div className="flex items-center gap-2" role="radiogroup" aria-label="Accent colour">
            {ACCENTS.map((a) => (
              <button
                key={a.value}
                type="button"
                role="radio"
                aria-checked={accent === a.value}
                aria-label={a.name}
                onClick={() => setAccent(a.value)}
                className={cn("h-7 w-7 rounded-full ring-offset-2 transition-shadow cursor-pointer", accent === a.value && "ring-2 ring-primary/50")}
                style={{ background: a.value }}
              />
            ))}
          </div>
        </div>

        <Section title="Professional summary">
          <textarea rows={4} value={resume.summary} onChange={(e) => updateResume({ summary: e.target.value })} className={textareaClass} aria-label="Professional summary" />
        </Section>

        <Section title="Education" action={addBtn(() => addItem("education", { degree: "", school: "", year: "", score: "" } as Edu))}>
          {resume.education.map((ed, i) => (
            <div key={i} className="grid gap-2.5 rounded-xl bg-surface-soft/60 p-3 sm:grid-cols-[1fr_1fr_auto]">
              <Field label="Degree"><input value={ed.degree} onChange={(e) => setItem("education", i, { degree: e.target.value })} className={inputClass} /></Field>
              <Field label="College / school"><input value={ed.school} onChange={(e) => setItem("education", i, { school: e.target.value })} className={inputClass} /></Field>
              <div className="flex items-end"><RemoveButton onClick={() => removeItem("education", i)} label={`Remove ${ed.degree || "education entry"}`} /></div>
              <Field label="Years"><input value={ed.year} onChange={(e) => setItem("education", i, { year: e.target.value })} className={inputClass} /></Field>
              <Field label="Score"><input value={ed.score} onChange={(e) => setItem("education", i, { score: e.target.value })} className={inputClass} /></Field>
            </div>
          ))}
        </Section>

        <Section title="Experience & internships" action={addBtn(() => addItem("experience", { title: "", company: "", period: "", points: "" } as Exp))}>
          {resume.experience.map((ex, i) => (
            <div key={i} className="grid gap-2.5 rounded-xl bg-surface-soft/60 p-3 sm:grid-cols-[1fr_1fr_auto]">
              <Field label="Role"><input value={ex.title} onChange={(e) => setItem("experience", i, { title: e.target.value })} className={inputClass} /></Field>
              <Field label="Company"><input value={ex.company} onChange={(e) => setItem("experience", i, { company: e.target.value })} className={inputClass} /></Field>
              <div className="flex items-end"><RemoveButton onClick={() => removeItem("experience", i)} label={`Remove ${ex.title || "experience entry"}`} /></div>
              <Field label="Period" className="sm:col-span-2"><input value={ex.period} onChange={(e) => setItem("experience", i, { period: e.target.value })} className={inputClass} /></Field>
              <Field label="What you did (one per line)" className="sm:col-span-3">
                <textarea rows={3} value={ex.points} onChange={(e) => setItem("experience", i, { points: e.target.value })} className={textareaClass} />
              </Field>
            </div>
          ))}
        </Section>

        <Section title="Projects" action={addBtn(() => addItem("projects", { name: "", detail: "" } as Proj))}>
          {resume.projects.map((p, i) => (
            <div key={i} className="grid gap-2.5 rounded-xl bg-surface-soft/60 p-3 sm:grid-cols-[1fr_1.4fr_auto]">
              <Field label="Project"><input value={p.name} onChange={(e) => setItem("projects", i, { name: e.target.value })} className={inputClass} /></Field>
              <Field label="Details"><input value={p.detail} onChange={(e) => setItem("projects", i, { detail: e.target.value })} className={inputClass} /></Field>
              <div className="flex items-end"><RemoveButton onClick={() => removeItem("projects", i)} label={`Remove ${p.name || "project"}`} /></div>
            </div>
          ))}
        </Section>

        <Section title="More">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Certifications"><input value={resume.certifications} onChange={(e) => updateResume({ certifications: e.target.value })} className={inputClass} /></Field>
            <Field label="Languages"><input value={resume.languages} onChange={(e) => updateResume({ languages: e.target.value })} className={inputClass} /></Field>
          </div>
        </Section>

        <div className="flex flex-wrap justify-end gap-2 border-t border-hairline pt-5">
          <button type="button" className={btnSecondary} onClick={() => showToast("Resume saved to your profile.")}>
            Save
          </button>
          <button type="button" className={btnPrimary} onClick={() => window.print()}>
            <Download className="h-3.5 w-3.5" aria-hidden /> Download PDF
          </button>
        </div>
      </form>

      {/* Live preview — also the only thing printed by "Download PDF" (see #resume-print in globals.css) */}
      <div className="xl:sticky xl:top-3">
        <p className="mb-2 px-1 text-[12.5px] font-medium text-muted">Live preview</p>
        <article id="resume-print" className="rounded-2xl border border-hairline bg-white p-6 text-[12px] leading-relaxed text-ink shadow-[0_24px_48px_-28px_rgba(15,23,42,0.35)] sm:p-8">
          <header className="border-b-2 pb-4" style={{ borderColor: accent }}>
            <h2 className="text-[24px] font-bold tracking-tight" style={{ color: accent }}>{user.name}</h2>
            <p className="mt-0.5 text-[13px] font-medium text-ink-light">{user.qualification}</p>
            <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-body">
              <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" aria-hidden />{user.email}</span>
              <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" aria-hidden />{user.phone}</span>
              <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" aria-hidden />{user.city}</span>
            </p>
          </header>

          {resume.summary.trim() && <p className="mt-4 text-body">{resume.summary}</p>}

          {[
            {
              title: "Education",
              show: resume.education.some((e) => e.degree),
              body: resume.education.filter((e) => e.degree).map((e, i) => (
                <div key={i} className="flex justify-between gap-4">
                  <div>
                    <p className="font-semibold">{e.degree}</p>
                    <p className="text-body">{e.school}</p>
                  </div>
                  <p className="shrink-0 text-right text-body">{e.year}{e.score && <><br />{e.score}</>}</p>
                </div>
              )),
            },
            {
              title: "Experience",
              show: resume.experience.some((e) => e.title),
              body: resume.experience.filter((e) => e.title).map((e, i) => (
                <div key={i}>
                  <div className="flex justify-between gap-4">
                    <p className="font-semibold">{e.title}{e.company && <span className="font-normal text-body"> · {e.company}</span>}</p>
                    <p className="shrink-0 text-body">{e.period}</p>
                  </div>
                  <ul className="mt-1 list-disc pl-4 text-body">
                    {e.points.split("\n").filter((p) => p.trim()).map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              )),
            },
            {
              title: "Projects",
              show: resume.projects.some((p) => p.name),
              body: resume.projects.filter((p) => p.name).map((p, i) => (
                <p key={i}><span className="font-semibold">{p.name}</span>{p.detail && <span className="text-body"> — {p.detail}</span>}</p>
              )),
            },
            {
              title: "Skills",
              show: user.skills.length > 0,
              body: (
                <div className="flex flex-wrap gap-1.5">
                  {user.skills.map((s) => (
                    <span key={s} className="rounded-full px-2.5 py-0.5 text-[11px] font-medium" style={{ background: `${accent}14`, color: accent }}>{s}</span>
                  ))}
                </div>
              ),
            },
            { title: "Certifications", show: Boolean(resume.certifications.trim()), body: <p className="text-body">{resume.certifications}</p> },
            { title: "Languages", show: Boolean(resume.languages.trim()), body: <p className="text-body">{resume.languages}</p> },
          ]
            .filter((s) => s.show)
            .map((s) => (
              <section key={s.title} className="mt-5">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: accent }}>{s.title}</h3>
                <div className="mt-2 space-y-2">{s.body}</div>
              </section>
            ))}
        </article>
      </div>
    </div>
  );
};
