"use client";

import React, { useState } from "react";
import { ChevronDown, LifeBuoy, Mail, MessageSquare, Phone, Plus, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useEmployer } from "@/components/employer/EmployerStore";
import { Field, Pill, btnPrimary, btnSecondary, inputClass } from "@/components/employer/ui";
import { cn } from "@/lib/utils";

const SectionCard: React.FC<{ title: string; sub?: string; children: React.ReactNode; className?: string }> = ({ title, sub, children, className }) => (
  <section className={cn("card-soft p-4 sm:p-6", className)} aria-label={title}>
    <h2 className="text-[16px] font-semibold text-ink">{title}</h2>
    {sub && <p className="mt-0.5 text-[12.5px] text-body">{sub}</p>}
    <div className="mt-5">{children}</div>
  </section>
);

/* ---------- Company profile ---------- */

export const CompanyProfileView: React.FC = () => {
  const { company, updateCompany } = useEmployer();
  const { showToast } = useApp();
  const [form, setForm] = useState(company);
  const [benefit, setBenefit] = useState("");
  const dirty = JSON.stringify(form) !== JSON.stringify(company);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const addBenefit = () => {
    const b = benefit.trim();
    if (!b || form.benefits.includes(b)) return;
    setForm((f) => ({ ...f, benefits: [...f.benefits, b] }));
    setBenefit("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateCompany(form);
        showToast("Company profile saved.");
      }}
      className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_360px]"
    >
      <SectionCard title="Company details" sub="Shown to candidates on every job you post.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company name">
            <input required value={form.name} onChange={set("name")} className={inputClass} />
          </Field>
          <Field label="Industry">
            <input value={form.industry} onChange={set("industry")} className={inputClass} />
          </Field>
          <Field label="Company size">
            <input value={form.size} onChange={set("size")} className={inputClass} />
          </Field>
          <Field label="Founded">
            <input value={form.founded} onChange={set("founded")} className={inputClass} />
          </Field>
          <Field label="Website">
            <input value={form.website} onChange={set("website")} className={inputClass} />
          </Field>
          <Field label="Headquarters">
            <input value={form.headquarters} onChange={set("headquarters")} className={inputClass} />
          </Field>
          <Field label="About the company" className="sm:col-span-2">
            <textarea
              rows={4}
              value={form.about}
              onChange={set("about")}
              className="w-full rounded-xl border border-hairline bg-white px-3.5 py-3 text-[13.5px] leading-relaxed text-ink outline-none transition-colors hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </Field>
        </div>

        <p className="mt-6 text-[13px] font-semibold text-ink">Benefits</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {form.benefits.map((b) => (
            <li key={b} className="inline-flex items-center gap-1 rounded-full bg-primary-light py-1 pl-3 pr-1 text-[12.5px] font-medium text-primary">
              {b}
              <button
                type="button"
                aria-label={`Remove ${b}`}
                onClick={() => setForm((f) => ({ ...f, benefits: f.benefits.filter((x) => x !== b) }))}
                className="grid h-5 w-5 place-items-center rounded-full hover:bg-white cursor-pointer"
              >
                <X className="h-3 w-3" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex max-w-md gap-2">
          <label className="min-w-0 flex-1">
            <span className="sr-only">Add a benefit</span>
            <input
              value={benefit}
              onChange={(e) => setBenefit(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addBenefit();
                }
              }}
              placeholder="e.g. Free lunch"
              className={cn(inputClass, "h-10")}
            />
          </label>
          <button type="button" onClick={addBenefit} className={btnSecondary}>
            <Plus className="h-3.5 w-3.5" aria-hidden /> Add
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-2 border-t border-hairline pt-5">
          <button type="button" className={btnSecondary} disabled={!dirty} onClick={() => setForm(company)}>
            Discard
          </button>
          <button type="submit" className={btnPrimary} disabled={!dirty}>
            Save changes
          </button>
        </div>
      </SectionCard>

      {/* Live preview of how candidates see the company */}
      <SectionCard title="Candidate preview">
        <div className="rounded-2xl bg-gradient-to-br from-[#e8f0ff] to-[#f5f9ff] p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-[14px] font-bold text-primary shadow-sm">
              {form.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold text-ink">{form.name || "Company name"}</p>
              <p className="truncate text-[12px] text-body">{form.industry}</p>
            </div>
          </div>
          <p className="mt-3 line-clamp-4 text-[12.5px] leading-relaxed text-body">{form.about}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {[form.size, form.headquarters].filter(Boolean).map((t) => (
              <span key={t} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-body">
                {t}
              </span>
            ))}
          </div>
        </div>
      </SectionCard>
    </form>
  );
};

/* ---------- Account settings ---------- */

const NOTIFICATIONS = [
  { key: "applicants", label: "New applicants", hint: "Email me when someone applies to my jobs" },
  { key: "interviews", label: "Interview updates", hint: "When candidates confirm or reschedule" },
  { key: "offers", label: "Offer responses", hint: "When an offer is accepted or declined" },
  { key: "digest", label: "Weekly hiring digest", hint: "A Monday summary of your pipeline" },
] as const;

export const AccountSettingsView: React.FC = () => {
  const { recruiter, updateRecruiter } = useEmployer();
  const { showToast } = useApp();
  const [form, setForm] = useState(recruiter);
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwError, setPwError] = useState("");
  const [notify, setNotify] = useState<Record<string, boolean>>({ applicants: true, interviews: true, offers: true, digest: false });
  const dirty = JSON.stringify(form) !== JSON.stringify(recruiter);

  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pw.current) return setPwError("Enter your current password.");
    if (pw.next.length < 8) return setPwError("Use at least 8 characters for the new password.");
    if (pw.next !== pw.confirm) return setPwError("The new passwords don't match.");
    setPwError("");
    setPw({ current: "", next: "", confirm: "" });
    showToast("Password updated.");
  };

  return (
    <div className="grid items-start gap-4 xl:grid-cols-2">
      <SectionCard title="Your details" sub="Used on interview invites and offer letters.">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateRecruiter(form);
            showToast("Account details saved.");
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <Field label="Full name">
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Job title">
            <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Work email">
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Phone">
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
          </Field>
          <div className="flex justify-end sm:col-span-2">
            <button type="submit" className={btnPrimary} disabled={!dirty}>
              Save details
            </button>
          </div>
        </form>
      </SectionCard>

      <SectionCard title="Change password">
        <form onSubmit={changePassword} className="grid gap-4" noValidate>
          <Field label="Current password">
            <input type="password" autoComplete="current-password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} className={inputClass} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="New password">
              <input type="password" autoComplete="new-password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} className={inputClass} />
            </Field>
            <Field label="Confirm new password">
              <input type="password" autoComplete="new-password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} className={inputClass} />
            </Field>
          </div>
          {pwError && (
            <p role="alert" className="text-[12.5px] font-medium text-rose-600">
              {pwError}
            </p>
          )}
          <div className="flex justify-end">
            <button type="submit" className={btnPrimary}>
              Update password
            </button>
          </div>
        </form>
      </SectionCard>

      <SectionCard title="Notifications" className="xl:col-span-2">
        <ul className="divide-y divide-hairline">
          {NOTIFICATIONS.map(({ key, label, hint }) => (
            <li key={key} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <div>
                <p className="text-[13.5px] font-medium text-ink">{label}</p>
                <p className="text-[12px] text-body">{hint}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notify[key]}
                aria-label={label}
                onClick={() => setNotify((n) => ({ ...n, [key]: !n[key] }))}
                className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors cursor-pointer", notify[key] ? "bg-primary" : "bg-surface-strong")}
              >
                <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all", notify[key] ? "left-[22px]" : "left-0.5")} />
              </button>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
};

/* ---------- Support center ---------- */

const FAQS = [
  { q: "How do I post a job?", a: "Open Job postings and select “Post a job”. Fill in the title, department, location, salary and openings, then publish. It goes live immediately." },
  { q: "What is the CV / Profile repository?", a: "It's every candidate profile on Jobsinfo.world — including people who haven't applied to your jobs. Search by skills, experience, location or source and shortlist directly." },
  { q: "How do interview requests work?", a: "From Shortlisted profiles, choose “Request interview”, pick a date, time and mode. The candidate is notified and the request moves to Interview requests." },
  { q: "Can I pause a job without losing applicants?", a: "Yes. Pausing hides the job from new applicants; everyone already in your pipeline stays where they are. Resume it at any time." },
  { q: "Is posting jobs free?", a: "Posting and receiving applications is free. Premium repository search and featured listings are available on paid plans — contact us for pricing." },
];

type Ticket = { id: string; subject: string; status: "Open" | "Resolved"; date: string };

export const SupportView: React.FC = () => {
  const { showToast } = useApp();
  const [open, setOpen] = useState<number | null>(0);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([{ id: "T-1042", subject: "Bulk upload of job descriptions", status: "Resolved", date: "18 Sep 2026" }]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    const id = `T-${1043 + tickets.length}`;
    setTickets((t) => [{ id, subject: subject.trim(), status: "Open", date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) }, ...t]);
    setSubject("");
    setMessage("");
    showToast(`Ticket ${id} created — we usually reply within 4 working hours.`);
  };

  return (
    <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_400px]">
      <SectionCard title="Frequently asked questions">
        <ul className="divide-y divide-hairline">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-3.5 text-left text-[14px] font-medium text-ink hover:text-primary cursor-pointer"
                >
                  {f.q}
                  <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted transition-transform", isOpen && "rotate-180 text-primary")} aria-hidden />
                </button>
                {isOpen && <p className="pb-4 text-[13px] leading-relaxed text-body">{f.a}</p>}
              </li>
            );
          })}
        </ul>
      </SectionCard>

      <div className="space-y-4">
        <SectionCard title="Contact support" sub="Mon–Sat, 9 AM – 7 PM IST">
          <div className="grid gap-2 text-[13px] text-body">
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" aria-hidden /> +91 40 4000 1234</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" aria-hidden /> employers@jobsinfo.world</p>
          </div>
          <form onSubmit={submit} className="mt-5 grid gap-3 border-t border-hairline pt-5">
            <Field label="Subject">
              <input required value={subject} onChange={(e) => setSubject(e.target.value)} className={inputClass} />
            </Field>
            <Field label="How can we help?">
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl border border-hairline bg-white px-3.5 py-3 text-[13.5px] text-ink outline-none transition-colors hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </Field>
            <button type="submit" className={btnPrimary} disabled={!subject.trim() || !message.trim()}>
              <MessageSquare className="h-3.5 w-3.5" aria-hidden /> Create ticket
            </button>
          </form>
        </SectionCard>

        <SectionCard title="Your tickets">
          <ul className="divide-y divide-hairline">
            {tickets.map((t) => (
              <li key={t.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                <LifeBuoy className="h-4 w-4 shrink-0 text-muted" aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-ink">{t.subject}</p>
                  <p className="text-[11.5px] text-muted">
                    {t.id} · {t.date}
                  </p>
                </div>
                <Pill tone={t.status === "Open" ? "amber" : "green"}>{t.status}</Pill>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
};
