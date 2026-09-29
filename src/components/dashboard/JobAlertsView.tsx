"use client";

import React, { useState } from "react";
import { BellRing, BriefcaseBusiness, LayoutGrid, MapPin, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ALL_JOBS, JobAlert } from "@/data/studentData";
import { Dropdown } from "@/components/ui/Dropdown";
import { useStudent } from "@/components/dashboard/StudentStore";
import { Empty, Field, Pill, btnPrimary, btnSecondary, inputClass } from "@/components/employer/ui";
import { cn } from "@/lib/utils";

const unique = (v: string[]) => Array.from(new Set(v)).sort((a, b) => a.localeCompare(b));
const CATEGORIES = unique(ALL_JOBS.map((j) => j.category));
const LOCATIONS = unique(ALL_JOBS.map((j) => j.location.split(",").at(-1)!.trim()));
const TYPES = unique(ALL_JOBS.map((j) => j.type));
const FREQUENCIES: JobAlert["frequency"][] = ["Instant", "Daily", "Weekly"];
const CHANNELS: JobAlert["channels"][number][] = ["Email", "WhatsApp", "In-app"];

export const alertMatches = (a: Pick<JobAlert, "keywords" | "category" | "location" | "type">) => {
  const k = a.keywords.trim().toLowerCase();
  return ALL_JOBS.filter(
    (j) =>
      (!k || [j.title, j.company, j.description].some((v) => v.toLowerCase().includes(k))) &&
      (!a.category || j.category === a.category) &&
      (!a.location || j.location.includes(a.location)) &&
      (!a.type || j.type === a.type)
  );
};

const EMPTY_FORM = { keywords: "", category: "", location: "", type: "", frequency: "Daily" as JobAlert["frequency"], channels: ["Email", "In-app"] as JobAlert["channels"] };

export const JobAlertsView: React.FC = () => {
  const { alerts, addAlert, toggleAlert, removeAlert } = useStudent();
  const { showToast } = useApp();
  const [form, setForm] = useState(EMPTY_FORM);
  const matches = alertMatches(form).length;
  const hasCriteria = Boolean(form.keywords.trim() || form.category || form.location || form.type);
  const valid = hasCriteria && form.channels.length > 0;

  const describe = (a: Pick<JobAlert, "keywords" | "category" | "location" | "type">) =>
    [a.keywords.trim() && `“${a.keywords.trim()}”`, a.category, a.type, a.location && `in ${a.location}`].filter(Boolean).join(" · ") || "All jobs";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    const name = [form.keywords.trim() || form.category || form.type || "Jobs", form.location && `in ${form.location}`].filter(Boolean).join(" ");
    addAlert({ ...form, name });
    showToast(`Alert created — ${form.frequency.toLowerCase()} updates via ${form.channels.join(", ")}.`);
    setForm(EMPTY_FORM);
  };

  return (
    <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
      <form onSubmit={submit} className="card-soft p-4 sm:p-6">
        <h2 className="text-[16px] font-semibold text-ink">Create a job alert</h2>
        <p className="mt-0.5 text-[12.5px] text-body">Tell us what you&apos;re looking for and we&apos;ll notify you the moment a matching job is posted.</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Keywords" className="sm:col-span-2">
            <input value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} placeholder="e.g. Analyst, SQL, Marketing" className={inputClass} />
          </Field>
          <div>
            <span className="text-[12.5px] font-medium text-ink-light">Category</span>
            <div className="mt-1.5">
              <Dropdown label="Category" placeholder="Any category" icon={LayoutGrid} value={form.category} options={CATEGORIES} onChange={(v) => setForm({ ...form, category: v })} />
            </div>
          </div>
          <div>
            <span className="text-[12.5px] font-medium text-ink-light">Location</span>
            <div className="mt-1.5">
              <Dropdown label="Location" placeholder="Anywhere" icon={MapPin} value={form.location} options={LOCATIONS} onChange={(v) => setForm({ ...form, location: v })} />
            </div>
          </div>
          <div>
            <span className="text-[12.5px] font-medium text-ink-light">Job type</span>
            <div className="mt-1.5">
              <Dropdown label="Job type" placeholder="Any type" icon={BriefcaseBusiness} value={form.type} options={TYPES} onChange={(v) => setForm({ ...form, type: v })} />
            </div>
          </div>
          <fieldset>
            <legend className="text-[12.5px] font-medium text-ink-light">How often</legend>
            <div className="mt-1.5 flex h-11 rounded-xl border border-hairline bg-surface-soft/60 p-1">
              {FREQUENCIES.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={form.frequency === f}
                  onClick={() => setForm({ ...form, frequency: f })}
                  className={cn(
                    "flex-1 rounded-lg text-[12.5px] font-medium transition-colors cursor-pointer",
                    form.frequency === f ? "bg-white text-primary shadow-[0_4px_12px_-6px_rgba(30,64,175,0.5)]" : "text-body hover:text-ink"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="sm:col-span-2">
            <legend className="text-[12.5px] font-medium text-ink-light">Notify me by</legend>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {CHANNELS.map((c) => {
                const on = form.channels.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    onClick={() => setForm({ ...form, channels: on ? form.channels.filter((x) => x !== c) : [...form.channels, c] })}
                    className={cn(
                      "rounded-full px-4 py-2 text-[12.5px] font-medium transition-colors cursor-pointer",
                      on ? "bg-primary text-white" : "border border-hairline bg-white text-body hover:border-primary/40 hover:text-primary"
                    )}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-5">
          <p className="text-[12.5px] text-body" aria-live="polite">
            {hasCriteria ? (
              <>
                <b className="font-semibold tabular-nums text-ink">{matches}</b> {matches === 1 ? "job matches" : "jobs match"} right now
              </>
            ) : (
              "Add at least one keyword or filter."
            )}
          </p>
          <button type="submit" className={btnPrimary} disabled={!valid}>
            <BellRing className="h-3.5 w-3.5" aria-hidden /> Create alert
          </button>
        </div>
      </form>

      <section className="space-y-3" aria-label="Your job alerts">
        <p className="px-1 text-[13px] font-semibold text-ink">
          Your alerts <span className="font-normal text-muted">· {alerts.filter((a) => a.active).length} active</span>
        </p>
        {alerts.length === 0 ? (
          <Empty icon={BellRing} title="No alerts yet" text="Create one and we'll do the searching for you." />
        ) : (
          alerts.map((a) => {
            const n = alertMatches(a).length;
            return (
              <div key={a.id} className={cn("card-soft p-4", !a.active && "opacity-60")}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-ink">{a.name}</p>
                    <p className="mt-0.5 text-[12px] text-body">{describe(a)}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={a.active}
                    aria-label={`${a.active ? "Pause" : "Resume"} alert ${a.name}`}
                    onClick={() => {
                      toggleAlert(a.id);
                      showToast(a.active ? "Alert paused." : "Alert resumed.");
                    }}
                    className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors cursor-pointer", a.active ? "bg-primary" : "bg-surface-strong")}
                  >
                    <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all", a.active ? "left-[22px]" : "left-0.5")} />
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <Pill tone="blue">{a.frequency}</Pill>
                  {a.channels.map((c) => (
                    <Pill key={c}>{c}</Pill>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-hairline pt-3">
                  <a href="#jobs" className="text-[12.5px] font-semibold text-primary hover:underline">
                    View {n} {n === 1 ? "match" : "matches"}
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      removeAlert(a.id);
                      showToast("Alert deleted.");
                    }}
                    className={cn(btnSecondary, "min-h-[32px] px-3 hover:text-rose-600")}
                    aria-label={`Delete alert ${a.name}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden /> Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};
