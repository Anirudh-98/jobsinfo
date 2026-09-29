"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  BellRing,
  Bell,
  BookOpen,
  CalendarClock,
  CheckCheck,
  Clock,
  FolderKanban,
  Lightbulb,
  MessageSquare,
  Send,
  UserRound,
  Users,
  Video,
} from "lucide-react";
import { PROJECTS_DATA } from "@/data/mockData";
import { NotificationKind } from "@/data/studentData";
import { useApp } from "@/context/AppContext";
import { useStudent } from "@/components/dashboard/StudentStore";
import { Empty, Pill, btnPrimary, btnSecondary } from "@/components/employer/ui";
import { cn } from "@/lib/utils";

/* ---------- Notifications ---------- */

const KIND: Record<NotificationKind, { icon: React.ElementType; tone: string }> = {
  application: { icon: Send, tone: "bg-primary-light text-primary" },
  interview: { icon: CalendarClock, tone: "bg-orange-50 text-orange-600" },
  alert: { icon: BellRing, tone: "bg-sky-100 text-sky-600" },
  message: { icon: MessageSquare, tone: "bg-violet-50 text-violet-600" },
  learning: { icon: BookOpen, tone: "bg-emerald-50 text-emerald-600" },
};

export const NotificationsView: React.FC = () => {
  const { notifications, unreadCount, markRead, markAllRead } = useStudent();
  const [filter, setFilter] = useState<"All" | "Unread">("All");
  const list = notifications.filter((n) => filter === "All" || !n.read);

  return (
    <div className="space-y-4">
      <div className="card-soft flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
        <div className="flex gap-1.5" role="group" aria-label="Filter notifications">
          {(["All", "Unread"] as const).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors cursor-pointer",
                filter === f ? "bg-primary text-white" : "border border-hairline bg-white text-body hover:border-primary/40 hover:text-primary"
              )}
            >
              {f} {f === "Unread" && <span className="tabular-nums opacity-70">{unreadCount}</span>}
            </button>
          ))}
        </div>
        <button type="button" className={btnSecondary} onClick={markAllRead} disabled={unreadCount === 0}>
          <CheckCheck className="h-3.5 w-3.5" aria-hidden /> Mark all as read
        </button>
      </div>

      {list.length === 0 ? (
        <Empty icon={Bell} title="You're all caught up" text="New updates about your applications, interviews and alerts appear here." />
      ) : (
        <ul className="card-soft divide-y divide-hairline overflow-hidden">
          {list.map((n) => {
            const { icon: Icon, tone } = KIND[n.kind];
            return (
              <li key={n.id}>
                <a
                  href={`#${n.view}`}
                  onClick={() => markRead(n.id)}
                  className={cn("flex items-start gap-3 p-4 transition-colors hover:bg-primary-light/30 sm:px-5", !n.read && "bg-primary-light/20")}
                >
                  <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", tone)}>
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={cn("block text-[13.5px]", n.read ? "text-ink-light" : "font-semibold text-ink")}>{n.text}</span>
                    <span className="mt-0.5 block text-[11.5px] text-muted">{n.time}</span>
                  </span>
                  {!n.read && <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-label="Unread" />}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

/* ---------- Interviews ---------- */

export const StudentInterviewsView: React.FC = () => {
  const { interviews, requestReschedule } = useStudent();
  const { showToast } = useApp();
  const upcoming = interviews.filter((i) => i.status !== "Completed");
  const past = interviews.filter((i) => i.status === "Completed");

  const renderCard = (i: (typeof interviews)[number]) => (
    <li key={i.id} className="card-soft p-4 sm:p-5">
      <div className="flex flex-wrap items-start gap-4">
        <span className="grid w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#e8f0ff] to-[#f5f9ff] py-2.5 text-center">
          <span className="text-[22px] font-bold leading-none text-ink">{i.date.split(" ")[0]}</span>
          <span className="mt-1 text-[11px] font-semibold uppercase text-primary">{i.date.split(" ")[1]}</span>
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[15px] font-semibold text-ink">{i.company}</p>
            <Pill tone={i.status === "Upcoming" ? "blue" : i.status === "Completed" ? "green" : "amber"}>{i.status}</Pill>
          </div>
          <p className="text-[12.5px] text-body">
            {i.role} · {i.round}
          </p>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-body">
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-muted" aria-hidden />{i.time}</span>
            <span className="inline-flex items-center gap-1"><Video className="h-3.5 w-3.5 text-muted" aria-hidden />{i.mode}</span>
            <span className="inline-flex items-center gap-1"><UserRound className="h-3.5 w-3.5 text-muted" aria-hidden />{i.interviewer}</span>
          </p>
        </div>
        {i.status !== "Completed" && (
          <div className="flex w-full flex-wrap gap-2 sm:w-auto">
            {i.status === "Upcoming" && (
              <button
                type="button"
                className={btnSecondary}
                onClick={() => {
                  requestReschedule(i.id);
                  showToast(`Reschedule request sent to ${i.company}.`);
                }}
              >
                Request reschedule
              </button>
            )}
            <button type="button" className={btnPrimary} onClick={() => showToast(`The ${i.mode.toLowerCase()} link opens 10 minutes before ${i.time}.`)}>
              {i.mode === "In person" ? "Get directions" : "Join"} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        )}
      </div>
      <div className="mt-4 rounded-xl bg-surface-soft/70 p-3">
        <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-ink">
          <Lightbulb className="h-4 w-4 text-amber-500" aria-hidden /> {i.status === "Completed" ? "Follow-up" : "How to prepare"}
        </p>
        <ul className="mt-1.5 list-disc space-y-0.5 pl-5 text-[12.5px] text-body">
          {i.tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </li>
  );

  return (
    <div className="space-y-4">
      <p className="px-1 text-[13px] font-semibold text-ink">
        Upcoming <span className="font-normal text-muted">· {upcoming.length}</span>
      </p>
      {upcoming.length === 0 ? (
        <Empty icon={CalendarClock} title="No upcoming interviews" text="When a recruiter schedules one, it shows up here." />
      ) : (
        <ul className="grid gap-4 xl:grid-cols-2">
          {upcoming.map(renderCard)}
        </ul>
      )}
      {past.length > 0 && (
        <>
          <p className="px-1 pt-2 text-[13px] font-semibold text-ink">
            Past <span className="font-normal text-muted">· {past.length}</span>
          </p>
          <ul className="grid gap-4 xl:grid-cols-2">
            {past.map(renderCard)}
          </ul>
        </>
      )}
    </div>
  );
};

/* ---------- Live projects ---------- */

// Demo progress for enrolled projects: milestones done out of four.
const PROGRESS: Record<string, number> = { "proj-1": 3 };

export const LiveProjectsView: React.FC = () => {
  const { enrolledProjects, enrollProject } = useStudent();
  const { showToast } = useApp();
  const mine = PROJECTS_DATA.filter((p) => enrolledProjects.includes(p.id));
  const open = PROJECTS_DATA.filter((p) => !enrolledProjects.includes(p.id));

  return (
    <div className="space-y-4">
      <div className="card-soft p-4 sm:p-5">
        <p className="text-[13.5px] text-body">
          Work on real briefs from real organisations with a mentor, and earn a certificate and portfolio piece.{" "}
          <b className="font-semibold text-ink">{mine.length} active</b> · {open.length} open to join.
        </p>
      </div>

      {mine.length > 0 && (
        <ul className="grid gap-4 xl:grid-cols-2">
          {mine.map((p) => {
            const done = PROGRESS[p.id] ?? 0;
            return (
              <li key={p.id} className="card-soft p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone="green">Enrolled</Pill>
                  <Pill tone="blue">{p.domain}</Pill>
                </div>
                <p className="mt-3 text-[15px] font-semibold text-ink">{p.title}</p>
                <p className="mt-0.5 text-[12.5px] text-body">Mentor: {p.mentor}</p>
                <div className="mt-4">
                  <div className="flex justify-between text-[12px] text-body">
                    <span>{done} of 4 milestones done</span>
                    <span className="font-semibold tabular-nums text-ink">{done * 25}%</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-surface-soft">
                    <div className="h-2 rounded-full bg-gradient-to-r from-primary to-sky-400" style={{ width: `${done * 25}%` }} />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button type="button" className={btnPrimary} onClick={() => showToast(`Opening your workspace for “${p.title}”.`)}>
                    Continue project <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {open.length === 0 ? (
        <Empty icon={FolderKanban} title="You've joined every live project" text="New projects are added every week." />
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {open.map((p) => (
            <li key={p.id} className="card-soft flex flex-col p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="blue">{p.domain}</Pill>
                <Pill>{p.difficulty}</Pill>
              </div>
              <p className="mt-3 text-[15px] font-semibold leading-snug text-ink">{p.title}</p>
              <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-body">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.techStack.map((t) => (
                  <span key={t} className="rounded-full border border-hairline px-2.5 py-1 text-[11px] font-medium text-body">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex-1" aria-hidden />
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-hairline pt-4">
                <p className="flex flex-wrap gap-x-3 text-[12px] text-body">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-muted" aria-hidden />{p.duration}</span>
                  <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5 text-muted" aria-hidden />{p.enrolledStudents}</span>
                </p>
                <button
                  type="button"
                  className={btnPrimary}
                  onClick={() => {
                    enrollProject(p.id);
                    showToast(`You've joined “${p.title}”. Your mentor will reach out within 24 hours.`);
                  }}
                >
                  Join project
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
