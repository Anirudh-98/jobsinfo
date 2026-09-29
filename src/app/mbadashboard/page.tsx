"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FolderSearch, LayoutGrid, LogOut } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { CANDIDATES, EducationGroupId } from "@/data/employerData";
import { Avatar } from "@/components/employer/ui";
import { ScreeningProvider, useScreening } from "@/components/screening/ScreeningStore";
import { ScreeningOverview } from "@/components/screening/ScreeningOverview";
import { ProfilesView, jobTitleFor } from "@/components/screening/ProfilesView";
import { InterviewForm } from "@/components/screening/InterviewForm";
import { cn } from "@/lib/utils";

const NAV = [
  { id: "overview", label: "Dashboard", icon: LayoutGrid },
  { id: "profiles", label: "Profiles", icon: FolderSearch },
] as const;

type Route = { view: "overview" } | { view: "profiles" } | { view: "interview"; id: string };

// "#profiles", "#interview=c-3", anything else → dashboard.
const parseHash = (hash: string): Route => {
  const h = hash.replace(/^#/, "");
  if (h === "profiles") return { view: "profiles" };
  if (h.startsWith("interview=")) {
    const id = h.slice("interview=".length);
    if (CANDIDATES.some((c) => c.id === id)) return { view: "interview", id };
  }
  return { view: "overview" };
};

const ScreeningApp: React.FC = () => {
  const { user, showToast, setPersona } = useApp();
  const { evaluations } = useScreening();
  const router = useRouter();
  const [route, setRoute] = useState<Route>({ view: "overview" });
  const [folder, setFolder] = useState<EducationGroupId | null>(null);

  // The URL hash picks the view, so Back/Forward move between dashboard, profiles and an interview.
  useEffect(() => {
    const sync = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0 });
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const startInterview = (id: string) => {
    window.location.hash = `interview=${id}`;
  };

  const logout = () => {
    setPersona("mba-placement");
    router.push("/");
    showToast("You've logged out of HR Screening.");
  };

  const active = route.view === "interview" ? "profiles" : route.view;
  const candidate = route.view === "interview" ? CANDIDATES.find((c) => c.id === route.id)! : null;
  const heading = route.view === "overview" ? null : route.view === "profiles" ? "Student profiles" : "HR interview";
  const role = user.program ? `${user.program} HR screener` : "HR screener";

  return (
    <div className="hero-bg relative min-h-screen pb-2 sm:pb-3">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="flex min-h-[calc(100dvh-1.25rem)] flex-col rounded-[28px] border border-white/80 bg-white/55 p-1.5 shadow-[0_40px_80px_-40px_rgba(30,64,175,0.45)] backdrop-blur-xl sm:p-2">
          <div className="flex flex-1 rounded-[22px] bg-[#f7f9fd]/90">
            {/* Sidebar */}
            <div className="hidden border-r border-hairline/70 lg:block">
              <nav aria-label="HR screening" className="sticky top-3 flex min-h-[calc(100dvh-2.5rem)] w-[240px] flex-col px-3 py-5">
                <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">HR screening</p>
                {NAV.map(({ id, label, icon: Icon }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    aria-current={active === id ? "page" : undefined}
                    className={cn(
                      "mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-colors",
                      active === id ? "btn-gradient" : "text-ink-light hover:bg-primary-light hover:text-primary"
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden /> {label}
                  </a>
                ))}

                <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#e8f0ff] to-[#f5f9ff] p-4">
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-primary">Your progress</p>
                  <p className="mt-2 text-[24px] font-bold leading-none tabular-nums text-ink">
                    {evaluations.length}
                    <span className="text-[13px] font-medium text-muted"> / {CANDIDATES.length}</span>
                  </p>
                  <p className="mt-1 text-[12px] text-body">profiles prescreened</p>
                  <div className="mt-3 h-1.5 rounded-full bg-white">
                    <div className="h-1.5 rounded-full bg-gradient-to-r from-primary to-sky-400" style={{ width: `${(evaluations.length / CANDIDATES.length) * 100}%` }} />
                  </div>
                </div>

                <div className="mt-auto border-t border-hairline pt-4">
                  <button
                    type="button"
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-ink-light transition-colors hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
                  >
                    <LogOut className="h-[18px] w-[18px]" aria-hidden /> Logout
                  </button>
                </div>
              </nav>
            </div>

            <div className="min-w-0 flex-1 p-3 sm:p-6 2xl:p-8">
              <header className="flex flex-wrap items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold tracking-tight text-ink">
                    Jobsinfo<span className="text-primary">.world</span>
                    <span className="font-medium text-muted"> · HR Screening</span>
                  </p>
                  <h1 className="mt-1 truncate text-[22px] font-bold tracking-[-0.02em] text-ink sm:text-[26px]">
                    {heading ?? (
                      <>
                        Welcome, <span className="text-primary">{user.name.split(" ")[0]}</span>
                      </>
                    )}
                  </h1>
                  {route.view === "overview" && <p className="mt-0.5 text-[13px] text-body">Prescreen student applicants and help recruiters shortlist faster.</p>}
                </div>
                <div className="flex items-center gap-2.5 rounded-full border border-hairline bg-white py-1 pl-1 pr-1 sm:pr-4">
                  <Avatar name={user.name} size="sm" src={user.photo} />
                  <span className="hidden leading-tight sm:block">
                    <span className="block text-[13px] font-semibold text-ink">{user.name}</span>
                    <span className="block max-w-[180px] truncate text-[11.5px] text-body">{role}</span>
                  </span>
                </div>
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

              {/* Tabs for tablets and phones */}
              <nav aria-label="HR screening" className="mb-4 mt-5 flex gap-2 lg:hidden">
                {NAV.map(({ id, label, icon: Icon }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    aria-current={active === id ? "page" : undefined}
                    className={cn(
                      "inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium",
                      active === id ? "btn-gradient" : "border border-hairline bg-white text-body"
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden /> {label}
                  </a>
                ))}
              </nav>

              <div className="lg:mt-5">
                {route.view === "overview" && <ScreeningOverview onInterview={startInterview} />}
                {route.view === "profiles" && <ProfilesView onInterview={startInterview} folder={folder} setFolder={setFolder} />}
                {candidate && (
                  <InterviewForm
                    key={candidate.id}
                    candidate={candidate}
                    jobTitle={jobTitleFor(candidate.jobId)}
                    onExit={() => {
                      window.location.hash = "profiles";
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MbaDashboardPage() {
  return (
    <ScreeningProvider>
      <ScreeningApp />
    </ScreeningProvider>
  );
}
