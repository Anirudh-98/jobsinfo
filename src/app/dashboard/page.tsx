"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, LogOut, Search } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ACTIVITY, PROFILE_VIEWS, WEEKLY_LEVELS } from "@/data/dashboardData";
import { VIEWS, ViewId, isViewId } from "@/components/dashboard/views";
import { DashboardSidebar, DashboardMobileNav } from "@/components/dashboard/DashboardSidebar";
import { StatCards, Stat } from "@/components/dashboard/StatCards";
import { ApplicationChart } from "@/components/dashboard/ApplicationChart";
import { RecommendedJobs } from "@/components/dashboard/RecommendedJobs";
import { ApplicationPipeline } from "@/components/dashboard/ApplicationPipeline";
import { AlertsCard, ProfileStrengthCard, SavedJobsCard } from "@/components/dashboard/DashboardSideCards";
import { DashboardJobsView } from "@/components/dashboard/DashboardJobsView";
import { CoursesView, MasterclassesView, MentorsView } from "@/components/dashboard/DashboardLearningViews";
import { DashboardProfileView } from "@/components/dashboard/DashboardProfileView";
import { StudentProvider, useStudent } from "@/components/dashboard/StudentStore";
import { JobAlertsView } from "@/components/dashboard/JobAlertsView";
import { MessagesView } from "@/components/dashboard/MessagesView";
import { ResumeBuilderView } from "@/components/dashboard/ResumeBuilderView";
import { LiveProjectsView, NotificationsView, StudentInterviewsView } from "@/components/dashboard/StudentActivityViews";
import { INTERNSHIPS } from "@/data/studentData";
import { JOBS_DATA } from "@/data/mockData";

const pctChange = (now: number, before: number) => (before ? Math.round(((now - before) / before) * 100) : 0);

const { points, current } = ACTIVITY.Monthly;
const [prev, now] = [points[current - 1], points[current]];

const STATS: Stat[] = [
  { label: "Applications sent", value: now.applied, change: pctChange(now.applied, prev.applied), weeks: WEEKLY_LEVELS.applied, tone: "blue" },
  { label: "Interviews", value: now.interviews, change: pctChange(now.interviews, prev.interviews), weeks: WEEKLY_LEVELS.interviews, tone: "sky" },
  {
    label: "Profile views",
    value: PROFILE_VIEWS.thisMonth,
    change: pctChange(PROFILE_VIEWS.thisMonth, PROFILE_VIEWS.lastMonth),
    weeks: PROFILE_VIEWS.weeks,
    tone: "emerald",
  },
];

// Anchors inside the overview (e.g. #upcoming) show the overview and scroll to that card.
const OVERVIEW_ANCHORS = ["upcoming"];

// Internships view: dedicated internship listings plus any regular job posted as an internship.
const INTERNSHIP_LIST = [...INTERNSHIPS, ...JOBS_DATA.filter((j) => j.type === "Internship")];

const StudentDashboard: React.FC = () => {
  const { user, setPersona, showToast } = useApp();
  const { unreadCount, enrolledCourses, enrollCourse, registeredClasses, registerClass } = useStudent();
  const router = useRouter();
  const [view, setView] = useState<ViewId>("overview");
  const [jobSearch, setJobSearch] = useState({ query: "", key: 0 });
  const [topQuery, setTopQuery] = useState("");

  const firstName = user.name.split(" ")[0];
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  // Every section lives in this page; the URL hash picks which one is shown, so Back/Forward work.
  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.slice(1);
      if (isViewId(hash)) {
        setView(hash);
        window.scrollTo({ top: 0 });
      } else if (OVERVIEW_ANCHORS.includes(hash)) {
        setView("overview");
        requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }));
      } else {
        setView("overview");
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const searchJobs = (e: React.FormEvent) => {
    e.preventDefault();
    setJobSearch((s) => ({ query: topQuery.trim(), key: s.key + 1 }));
    window.location.hash = "jobs";
  };

  const signOut = () => {
    setPersona("mba-placement"); // the app's signed-out default
    router.push("/");
    showToast("You've signed out. See you soon!");
  };

  const viewLabel = VIEWS.find((v) => v.id === view)?.label;

  return (
    <div className="hero-bg relative min-h-screen pb-2 sm:pb-3">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />

      {/* Full-width workspace: the glass frame spans the viewport and is at least one screen tall */}
      <div className="relative px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="flex min-h-[calc(100dvh-1.25rem)] flex-col rounded-[28px] border border-white/80 bg-white/55 p-1.5 shadow-[0_40px_80px_-40px_rgba(30,64,175,0.45)] backdrop-blur-xl sm:p-2">
          <div className="flex flex-1 rounded-[22px] bg-[#f7f9fd]/90">
            <div className="hidden border-r border-hairline/70 lg:block">
              <DashboardSidebar active={view} onSignOut={signOut} />
            </div>

            <div className="min-w-0 flex-1 p-3 sm:p-6 2xl:p-8">
              {/* Top bar */}
              <header className="flex flex-wrap items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold tracking-tight text-ink">
                    Jobsinfo<span className="text-primary">.world</span>
                    <span className="font-medium text-muted"> · Student</span>
                  </p>
                  <h1 className="mt-1 truncate text-[22px] font-bold tracking-[-0.02em] text-ink sm:text-[26px]">
                    {view === "overview" ? (
                      <>
                        Welcome back, <span className="text-primary">{firstName}</span>
                      </>
                    ) : (
                      viewLabel
                    )}
                  </h1>
                  {view === "overview" && <p className="mt-0.5 text-[13px] text-body">Here&apos;s how your job search is going this month.</p>}
                </div>

                <form role="search" onSubmit={searchJobs} className="relative order-last w-full lg:order-none lg:w-72">
                  <label className="block">
                    <span className="sr-only">Search jobs</span>
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
                    <input
                      type="search"
                      value={topQuery}
                      onChange={(e) => setTopQuery(e.target.value)}
                      placeholder="Search jobs, companies, skills…"
                      className="h-11 w-full rounded-full border border-hairline bg-white pl-10 pr-4 text-[13px] text-ink outline-none transition-colors placeholder:text-muted hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/15"
                    />
                  </label>
                </form>
                <a
                  href="#notifications"
                  aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
                  className="relative grid h-11 w-11 place-items-center rounded-full border border-hairline bg-white text-body transition-colors hover:text-primary"
                >
                  <Bell className="h-4 w-4" aria-hidden />
                  {unreadCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full border-2 border-white bg-orange-500 px-1 text-[10px] font-bold text-white" aria-hidden>
                      {unreadCount}
                    </span>
                  )}
                </a>
                <a
                  href="#profile"
                  className="flex items-center gap-2.5 rounded-full border border-hairline bg-white py-1 pl-1 pr-1 transition-colors hover:border-primary/40 sm:pr-4"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-sky-400 text-[12px] font-bold text-white">
                    {initials}
                  </span>
                  <span className="hidden leading-tight sm:block">
                    <span className="block text-[13px] font-semibold text-ink">{user.name}</span>
                    <span className="block max-w-[180px] truncate text-[11.5px] text-body">{user.qualification}</span>
                  </span>
                </a>
                <button
                  type="button"
                  onClick={signOut}
                  className="inline-flex h-11 items-center gap-1.5 rounded-full border border-hairline bg-white px-4 text-[13px] font-semibold text-ink-light transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" aria-hidden />
                  <span className="hidden sm:inline">Sign out</span>
                  <span className="sr-only sm:hidden">Sign out</span>
                </button>
              </header>

              <div className="mt-5">
                <DashboardMobileNav active={view} />
              </div>

              <div className="md:mt-1">
                {view === "overview" && (
                  <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_360px] 2xl:grid-cols-[minmax(0,1fr)_400px]">
                    <div className="min-w-0 space-y-4">
                      <StatCards stats={STATS} />
                      <ApplicationChart />
                      <ApplicationPipeline />
                    </div>
                    <div className="space-y-4">
                      <RecommendedJobs />
                      <ProfileStrengthCard />
                      <SavedJobsCard />
                      <AlertsCard />
                    </div>
                  </div>
                )}
                {view === "jobs" && <DashboardJobsView key={jobSearch.key} initialQuery={jobSearch.query} />}
                {view === "internships" && (
                  <DashboardJobsView key="internships" source={INTERNSHIP_LIST} intro="Paid internships with a certificate and a chance at a pre-placement offer." />
                )}
                {view === "projects" && <LiveProjectsView />}
                {view === "saved" && <DashboardJobsView key="saved" savedOnly />}
                {view === "alerts" && <JobAlertsView />}
                {view === "applications" && <ApplicationPipeline />}
                {view === "interviews" && <StudentInterviewsView />}
                {view === "messages" && <MessagesView />}
                {view === "courses" && <CoursesView enrolled={enrolledCourses} onEnroll={enrollCourse} />}
                {view === "mentors" && <MentorsView />}
                {view === "masterclasses" && <MasterclassesView registered={registeredClasses} onRegister={registerClass} />}
                {view === "notifications" && <NotificationsView />}
                {view === "resume" && <ResumeBuilderView />}
                {view === "profile" && <DashboardProfileView />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <StudentProvider>
      <StudentDashboard />
    </StudentProvider>
  );
}
