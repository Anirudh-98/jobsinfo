"use client";

import React, { useState } from "react";
import { FileText, Plus, X } from "lucide-react";
import { useApp, UserProfile } from "@/context/AppContext";
import { ProfileStrengthCard } from "@/components/dashboard/DashboardSideCards";

type Editable = Pick<UserProfile, "name" | "email" | "phone" | "collegeOrCompany" | "qualification" | "city">;

const FIELDS: { key: keyof Editable; label: string; type?: string }[] = [
  { key: "name", label: "Full name" },
  { key: "email", label: "Email", type: "email" },
  { key: "phone", label: "Phone", type: "tel" },
  { key: "city", label: "City" },
  { key: "collegeOrCompany", label: "College / University" },
  { key: "qualification", label: "Qualification" },
];

export const DashboardProfileView: React.FC = () => {
  const { user, updateUser, showToast } = useApp();
  const [form, setForm] = useState<Editable>(() => ({
    name: user.name,
    email: user.email,
    phone: user.phone,
    city: user.city,
    collegeOrCompany: user.collegeOrCompany,
    qualification: user.qualification,
  }));
  const [skill, setSkill] = useState("");
  const dirty = FIELDS.some(({ key }) => form[key] !== user[key]);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(form);
    showToast("Profile saved.");
  };

  const addSkill = () => {
    const s = skill.trim();
    if (!s || user.skills.some((k) => k.toLowerCase() === s.toLowerCase())) return;
    updateUser({ skills: [...user.skills, s] });
    setSkill("");
  };

  return (
    <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_360px] 2xl:grid-cols-[minmax(0,1fr)_400px]">
      <form onSubmit={save} className="card-soft p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-[18px] font-semibold text-ink">Your profile</h2>
            <p className="mt-0.5 text-[13px] text-body">Recruiters see this when you apply.</p>
          </div>
          <button
            type="submit"
            disabled={!dirty}
            className="btn-gradient inline-flex min-h-[40px] items-center rounded-full px-5 text-[13px] font-semibold cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save changes
          </button>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {FIELDS.map(({ key, label, type }) => (
            <label key={key} className="block">
              <span className="text-[12.5px] font-medium text-ink-light">{label}</span>
              <input
                type={type ?? "text"}
                value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className="mt-1.5 h-11 w-full rounded-xl border border-hairline bg-white px-3.5 text-[13.5px] text-ink outline-none transition-colors hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </label>
          ))}
        </div>

        <div className="mt-6 border-t border-hairline pt-5">
          <p className="text-[14px] font-semibold text-ink">Skills</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {user.skills.map((s) => (
              <li key={s} className="inline-flex items-center gap-1 rounded-full bg-primary-light py-1 pl-3 pr-1 text-[12.5px] font-medium text-primary">
                {s}
                <button
                  type="button"
                  onClick={() => updateUser({ skills: user.skills.filter((k) => k !== s) })}
                  aria-label={`Remove ${s}`}
                  className="grid h-5 w-5 place-items-center rounded-full hover:bg-white cursor-pointer"
                >
                  <X className="h-3 w-3" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex max-w-md gap-2">
            <label className="min-w-0 flex-1">
              <span className="sr-only">Add a skill</span>
              <input
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Add a skill, e.g. Excel"
                className="h-10 w-full rounded-xl border border-hairline bg-white px-3.5 text-[13px] text-ink outline-none placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </label>
            <button type="button" onClick={addSkill} className="btn-soft inline-flex h-10 items-center gap-1 rounded-xl px-4 text-[12.5px] font-semibold cursor-pointer">
              <Plus className="h-3.5 w-3.5" aria-hidden /> Add
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-surface-soft/70 p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-sm">
            <FileText className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-ink">Resume</p>
            <p className="text-[12px] text-body">{user.resumeUploaded ? "Uploaded · shared with employers you apply to" : "Not uploaded yet"}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              updateUser({ resumeUploaded: true });
              showToast("Resume updated.");
            }}
            className="btn-soft inline-flex min-h-[36px] shrink-0 items-center rounded-full px-4 text-[12.5px] font-semibold cursor-pointer"
          >
            {user.resumeUploaded ? "Replace" : "Upload"}
          </button>
        </div>
      </form>

      <ProfileStrengthCard />
    </div>
  );
};
