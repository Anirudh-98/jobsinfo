"use client";

import React, { createContext, useContext, useRef, useState } from "react";
import {
  DEFAULT_ALERTS,
  INTERVIEWS,
  JobAlert,
  NOTIFICATIONS,
  RESUME_DEFAULTS,
  StudentInterview,
  StudentNotification,
  THREADS,
  Thread,
} from "@/data/studentData";

type Resume = typeof RESUME_DEFAULTS;

interface StudentStore {
  alerts: JobAlert[];
  addAlert: (alert: Omit<JobAlert, "id" | "active">) => void;
  toggleAlert: (id: string) => void;
  removeAlert: (id: string) => void;

  notifications: StudentNotification[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;

  threads: Thread[];
  openThread: (id: string) => void;
  sendMessage: (id: string, text: string) => void;

  interviews: StudentInterview[];
  requestReschedule: (id: string) => void;

  enrolledProjects: string[];
  enrollProject: (id: string) => void;
  enrolledCourses: string[];
  enrollCourse: (id: string) => void;
  registeredClasses: string[];
  registerClass: (id: string) => void;

  resume: Resume;
  updateResume: (data: Partial<Resume>) => void;
}

const Ctx = createContext<StudentStore | null>(null);

const now = () => new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

// State for the student dashboard pages, kept above the views so it survives switching between them.
export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState(DEFAULT_ALERTS);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [threads, setThreads] = useState(THREADS);
  const [interviews, setInterviews] = useState(INTERVIEWS);
  const [enrolledProjects, setEnrolledProjects] = useState<string[]>(["proj-1"]);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(["course-1"]);
  const [registeredClasses, setRegisteredClasses] = useState<string[]>([]);
  const [resume, setResume] = useState(RESUME_DEFAULTS);
  const nextId = useRef(100);

  const store: StudentStore = {
    alerts,
    addAlert: (a) => setAlerts((all) => [{ ...a, id: `a-${nextId.current++}`, active: true }, ...all]),
    toggleAlert: (id) => setAlerts((all) => all.map((a) => (a.id === id ? { ...a, active: !a.active } : a))),
    removeAlert: (id) => setAlerts((all) => all.filter((a) => a.id !== id)),

    notifications,
    unreadCount: notifications.filter((n) => !n.read).length,
    markRead: (id) => setNotifications((all) => all.map((n) => (n.id === id ? { ...n, read: true } : n))),
    markAllRead: () => setNotifications((all) => all.map((n) => ({ ...n, read: true }))),

    threads,
    openThread: (id) => setThreads((all) => all.map((t) => (t.id === id ? { ...t, unread: 0 } : t))),
    sendMessage: (id, text) => {
      setThreads((all) => all.map((t) => (t.id === id ? { ...t, messages: [...t.messages, { from: "me", text, time: now() }] } : t)));
      // Demo: the recruiter acknowledges a moment later.
      window.setTimeout(() => {
        setThreads((all) =>
          all.map((t) =>
            t.id === id
              ? { ...t, messages: [...t.messages, { from: "them", text: "Thanks for your message — I'll get back to you shortly.", time: now() }] }
              : t
          )
        );
      }, 1500);
    },

    interviews,
    requestReschedule: (id) => setInterviews((all) => all.map((i) => (i.id === id ? { ...i, status: "Reschedule requested" } : i))),

    enrolledProjects,
    enrollProject: (id) => setEnrolledProjects((p) => (p.includes(id) ? p : [...p, id])),
    enrolledCourses,
    enrollCourse: (id) => setEnrolledCourses((c) => (c.includes(id) ? c : [...c, id])),
    registeredClasses,
    registerClass: (id) => setRegisteredClasses((r) => (r.includes(id) ? r : [...r, id])),

    resume,
    updateResume: (data) => setResume((r) => ({ ...r, ...data })),
  };

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
};

export const useStudent = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStudent must be used inside StudentProvider");
  return ctx;
};
