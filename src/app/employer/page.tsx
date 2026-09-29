"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Plus } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { EmployerProvider, useEmployer } from "@/components/employer/EmployerStore";
import { EMPLOYER_VIEWS, EmployerMobileNav, EmployerSidebar, EmployerViewId, isEmployerView } from "@/components/employer/EmployerNav";
import { OverviewView } from "@/components/employer/OverviewView";
import { JobsView } from "@/components/employer/JobsView";
import { HiredView, InterviewsView, OfferedView, ShortlistedView } from "@/components/employer/CandidateViews";
import { RepositoryView } from "@/components/employer/RepositoryView";
import { ReportsView } from "@/components/employer/ReportsView";
import { AccountSettingsView, CompanyProfileView, SupportView } from "@/components/employer/SettingsViews";
import { Avatar } from "@/components/employer/ui";

const VIEW_COMPONENTS: Record<EmployerViewId, React.FC> = {
  overview: OverviewView,
  jobs: JobsView,
  repository: RepositoryView,
  shortlisted: ShortlistedView,
  interviews: InterviewsView,
  offered: OfferedView,
  hired: HiredView,
  reports: ReportsView,
  company: CompanyProfileView,
  settings: AccountSettingsView,
  support: SupportView,
};

const EmployerDashboard: React.FC = () => {
  const { showToast } = useApp();
  const { recruiter, company } = useEmployer();
  const router = useRouter();
  const [view, setView] = useState<EmployerViewId>("overview");

  // The URL hash selects the section, so Back/Forward and deep links work without leaving the page.
  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.slice(1);
      setView(isEmployerView(hash) ? hash : "overview");
      window.scrollTo({ top: 0 });
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const logout = () => {
    router.push("/");
    showToast("You've logged out of the employer dashboard.");
  };

  const View = VIEW_COMPONENTS[view];
  const label = EMPLOYER_VIEWS.find((v) => v.id === view)!.label;

  return (
    <div className="hero-bg relative min-h-screen pb-2 sm:pb-3">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="flex min-h-[calc(100dvh-1.25rem)] flex-col rounded-[28px] border border-white/80 bg-white/55 p-1.5 shadow-[0_40px_80px_-40px_rgba(30,64,175,0.45)] backdrop-blur-xl sm:p-2">
          <div className="flex flex-1 rounded-[22px] bg-[#f7f9fd]/90">
            <div className="hidden border-r border-hairline/70 lg:block">
              <EmployerSidebar active={view} onLogout={logout} />
            </div>

            <div className="min-w-0 flex-1 p-3 sm:p-6 2xl:p-8">
              <header className="flex flex-wrap items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold tracking-tight text-ink">
                    Jobsinfo<span className="text-primary">.world</span>
                    <span className="font-medium text-muted"> · Employer</span>
                  </p>
                  <h1 className="mt-1 truncate text-[22px] font-bold tracking-[-0.02em] text-ink sm:text-[26px]">
                    {view === "overview" ? (
                      <>
                        Good to see you, <span className="text-primary">{recruiter.name.split(" ")[0]}</span>
                      </>
                    ) : (
                      label
                    )}
                  </h1>
                  {view === "overview" && <p className="mt-0.5 text-[13px] text-body">Here&apos;s your hiring pipeline at {company.name} today.</p>}
                </div>
                {view !== "jobs" && (
                  <a href="#jobs" className="btn-gradient inline-flex h-11 items-center gap-1.5 rounded-full px-5 text-[13px] font-semibold">
                    <Plus className="h-4 w-4" aria-hidden /> <span className="hidden sm:inline">Post a job</span>
                    <span className="sr-only sm:hidden">Post a job</span>
                  </a>
                )}
                <a href="#settings" className="flex items-center gap-2.5 rounded-full border border-hairline bg-white py-1 pl-1 pr-1 transition-colors hover:border-primary/40 sm:pr-4">
                  <Avatar name={recruiter.name} size="sm" src={recruiter.photo} />
                  <span className="hidden leading-tight sm:block">
                    <span className="block text-[13px] font-semibold text-ink">{recruiter.name}</span>
                    <span className="block max-w-[180px] truncate text-[11.5px] text-body">{company.name}</span>
                  </span>
                </a>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex h-11 items-center gap-1.5 rounded-full border border-hairline bg-white px-4 text-[13px] font-semibold text-ink-light transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 lg:hidden cursor-pointer"
                >
                  <LogOut className="h-4 w-4" aria-hidden />
                  <span className="hidden sm:inline">Logout</span>
                  <span className="sr-only sm:hidden">Logout</span>
                </button>
              </header>

              <div className="mt-5">
                <EmployerMobileNav active={view} />
              </div>
              <View />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function EmployerPage() {
  return (
    <EmployerProvider>
      <EmployerDashboard />
    </EmployerProvider>
  );
}
