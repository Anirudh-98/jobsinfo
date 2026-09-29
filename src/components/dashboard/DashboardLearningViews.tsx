"use client";

import React, { useState } from "react";
import { ArrowRight, CalendarDays, Check, Clock, PlayCircle, Radio, Star, Users } from "lucide-react";
import { COURSES_DATA, MASTERCLASSES_DATA, MENTORS_DATA } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

// The page's h1 already names the view, so this bar carries only the description and filters.
const ViewHeader: React.FC<{ sub: string; children?: React.ReactNode }> = ({ sub, children }) => (
  <div className="card-soft flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
    <p className="text-[13.5px] text-body">{sub}</p>
    {children}
  </div>
);

const Pills: React.FC<{ options: string[]; value: string; onChange: (v: string) => void; label: string }> = ({ options, value, onChange, label }) => (
  <div className="no-scrollbar flex gap-1.5 overflow-x-auto" role="group" aria-label={label}>
    {["All", ...options].map((o) => {
      const active = (o === "All" && !value) || o === value;
      return (
        <button
          key={o}
          type="button"
          aria-pressed={active}
          onClick={() => onChange(o === "All" ? "" : o)}
          className={cn(
            "shrink-0 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors cursor-pointer",
            active ? "bg-primary text-white" : "border border-hairline bg-white text-body hover:border-primary/40 hover:text-primary"
          )}
        >
          {o}
        </button>
      );
    })}
  </div>
);

/* ---------- Courses ---------- */

const COURSE_CATEGORIES = Array.from(new Set(COURSES_DATA.map((c) => c.category)));

export const CoursesView: React.FC<{ enrolled: string[]; onEnroll: (id: string) => void }> = ({ enrolled, onEnroll }) => {
  const { showToast } = useApp();
  const [category, setCategory] = useState("");
  const courses = COURSES_DATA.filter((c) => !category || c.category === category);

  return (
    <div className="space-y-4">
      <ViewHeader sub={`${enrolled.length} enrolled · learn the skills recruiters ask for`}>
        <Pills label="Course category" options={COURSE_CATEGORIES} value={category} onChange={setCategory} />
      </ViewHeader>

      <ul className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {courses.map((c) => {
          const isEnrolled = enrolled.includes(c.id);
          return (
            <li key={c.id} className="card-soft flex flex-col p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-medium text-primary">{c.category}</span>
                <span className="rounded-full border border-hairline px-2.5 py-1 text-[11px] font-medium text-body">{c.level}</span>
                {c.badge && <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-orange-600">{c.badge}</span>}
              </div>
              <h3 className="mt-3 text-[15px] font-semibold leading-snug text-ink">{c.title}</h3>
              <p className="mt-1 text-[12.5px] text-body">
                {c.instructor} · <span className="text-muted">{c.instructorRole}</span>
              </p>
              <p className="mt-3 line-clamp-2 text-[12.5px] leading-relaxed text-body">{c.description}</p>
              <ul className="mt-3 space-y-1.5">
                {c.modules.slice(0, 3).map((m) => (
                  <li key={m} className="flex items-start gap-2 text-[12px] text-ink-light">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden /> {m}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-body">
                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-muted" aria-hidden />{c.duration}</span>
                <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />{c.rating}</span>
                <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5 text-muted" aria-hidden />{c.studentsCount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex-1" aria-hidden />
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-hairline pt-4">
                <p className="text-[14px] font-bold text-ink">{c.price}</p>
                {isEnrolled ? (
                  <button
                    type="button"
                    onClick={() => showToast(`Resuming ${c.title}.`)}
                    className="btn-soft inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-4 text-[12.5px] font-semibold cursor-pointer"
                  >
                    <PlayCircle className="h-4 w-4 text-primary" aria-hidden /> Continue
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onEnroll(c.id);
                      showToast(`Enrolled in ${c.title}.`);
                    }}
                    className="btn-gradient inline-flex min-h-[36px] items-center gap-1 rounded-full px-4 text-[12.5px] font-semibold cursor-pointer"
                  >
                    Enroll <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/* ---------- Mentors ---------- */

export const MentorsView: React.FC = () => {
  const { openMentorBooking } = useApp();

  return (
    <div className="space-y-4">
      <ViewHeader sub="Book 1:1 sessions with hiring managers and industry leaders." />
      <ul className="grid gap-4 lg:grid-cols-2">
        {MENTORS_DATA.map((m) => (
          <li key={m.id} className="card-soft flex flex-col p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-sky-400 text-[14px] font-bold text-white">
                {m.avatarText}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-semibold text-ink">{m.name}</h3>
                <p className="text-[12.5px] text-body">
                  {m.role} · {m.company}
                </p>
                <p className="mt-1 flex items-center gap-1 text-[12px] text-body">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
                  <b className="font-semibold text-ink">{m.rating}</b> ({m.reviewsCount} reviews) · {m.experienceYears} yrs
                </p>
              </div>
            </div>
            <p className="mt-3 text-[12.5px] leading-relaxed text-body">{m.bio}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {m.expertise.map((e) => (
                <span key={e} className="rounded-full border border-hairline px-2.5 py-1 text-[11px] font-medium text-body">
                  {e}
                </span>
              ))}
            </div>
            <div className="flex-1" aria-hidden />
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-hairline pt-4">
              <div>
                <p className="text-[14px] font-bold text-ink">{m.hourlyRate}</p>
                <p className="text-[11.5px] text-muted">Available {m.availableDays.join(", ")}</p>
              </div>
              <button
                type="button"
                onClick={() => openMentorBooking(m)}
                className="btn-gradient inline-flex min-h-[36px] items-center gap-1 rounded-full px-4 text-[12.5px] font-semibold cursor-pointer"
              >
                Book session <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ---------- Masterclasses ---------- */

export const MasterclassesView: React.FC<{ registered: string[]; onRegister: (id: string) => void }> = ({ registered, onRegister }) => {
  const { showToast } = useApp();

  return (
    <div className="space-y-4">
      <ViewHeader sub="Live and upcoming sessions with recruiters and industry experts." />
      <ul className="grid gap-4 lg:grid-cols-2">
        {MASTERCLASSES_DATA.map((mc) => {
          const isRegistered = registered.includes(mc.id);
          return (
            <li
              key={mc.id}
              className={cn("card-soft flex flex-col p-4 sm:p-5", mc.isLive && "ring-1 ring-rose-200")}
            >
              <div className="flex flex-wrap items-center gap-2">
                {mc.isLive ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-600">
                    <Radio className="h-3.5 w-3.5 animate-live-pulse" aria-hidden /> Live now · {mc.liveViewers} watching
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-medium text-primary">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden /> {mc.date}
                  </span>
                )}
                <span className="rounded-full border border-hairline px-2.5 py-1 text-[11px] font-medium text-body">{mc.category}</span>
              </div>
              <h3 className="mt-3 text-[15px] font-semibold leading-snug text-ink">{mc.title}</h3>
              <p className="mt-1 text-[12.5px] text-body">
                {mc.host} · <span className="text-muted">{mc.hostRole}</span>
              </p>
              <p className="mt-3 line-clamp-2 text-[12.5px] leading-relaxed text-body">{mc.description}</p>
              <div className="flex-1" aria-hidden />
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-hairline pt-4">
                <p className="inline-flex items-center gap-1 text-[12.5px] text-body">
                  <Clock className="h-3.5 w-3.5 text-muted" aria-hidden /> {mc.time} · {mc.duration}
                </p>
                {isRegistered ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3.5 py-2 text-[12.5px] font-semibold text-emerald-600">
                    <Check className="h-3.5 w-3.5" aria-hidden /> {mc.isLive ? "Joined" : "Registered"}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onRegister(mc.id);
                      showToast(mc.isLive ? `Joined “${mc.title}”.` : `Registered — we'll remind you before ${mc.date.toLowerCase()}.`);
                    }}
                    className="btn-gradient inline-flex min-h-[36px] shrink-0 items-center gap-1 rounded-full px-4 text-[12.5px] font-semibold cursor-pointer"
                  >
                    {mc.isLive ? "Join now" : "Register"} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
