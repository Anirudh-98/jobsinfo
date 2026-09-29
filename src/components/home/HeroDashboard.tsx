import React from "react";
import {
  LayoutGrid,
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  MessageSquare,
  Wallet,
  Search,
  Bell,
  Settings,
  ChevronDown,
  Send,
  CalendarCheck,
  IndianRupee,
  TrendingUp,
  MoreHorizontal,
  Bookmark,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Illustrative student / job-seeker dashboard shown under the hero. Decorative only.

const NAV = [LayoutGrid, BriefcaseBusiness, FolderKanban, GraduationCap, MessageSquare, Wallet];

const STATS = [
  { label: "Applications sent", value: "24", delta: "+6 this week", icon: Send, tone: "bg-primary-light text-primary", bar: "bg-primary", bars: [3, 5, 4, 7, 6, 9] },
  { label: "Interviews lined up", value: "5", delta: "+2 this week", icon: CalendarCheck, tone: "bg-sky-100 text-sky-600", bar: "bg-sky-500", bars: [1, 2, 1, 3, 2, 4] },
  { label: "Project earnings", value: "₹18,500", delta: "+₹6,000", icon: IndianRupee, tone: "bg-emerald-50 text-emerald-600", bar: "bg-emerald-500", bars: [2, 3, 5, 4, 6, 8] },
];

// Applications per month; index 6 (Jul) is the highlighted month
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const APPS = [9, 7, 12, 10, 14, 11, 26, 13, 16, 12, 18, 15];
const HIGHLIGHT = 6;

const MiniBars: React.FC<{ values: readonly number[]; className: string }> = ({ values, className }) => {
  const max = Math.max(...values);
  return (
    <div className="flex h-7 items-end gap-[3px]">
      {values.map((v, i) => (
        <span key={i} className={cn("w-[5px] rounded-full", className, i < values.length - 1 && "opacity-40")} style={{ height: `${(v / max) * 100}%` }} />
      ))}
    </div>
  );
};

export const HeroDashboard: React.FC = () => (
  <div className="relative mx-auto mt-14 max-w-6xl px-2 sm:px-0" aria-hidden>
    {/* Soft glow behind the panel */}
    <div className="pointer-events-none absolute inset-x-10 -top-6 bottom-10 rounded-[40px] bg-primary/15 blur-3xl" />

    <div className="relative overflow-hidden rounded-[28px] border border-white/90 bg-white/70 p-2 shadow-[0_40px_80px_-40px_rgba(30,64,175,0.55)] backdrop-blur-xl sm:p-2.5">
      <div className="flex rounded-[22px] bg-[#f7f9fd] text-left">
        {/* Sidebar */}
        <aside className="hidden w-[68px] shrink-0 flex-col items-center gap-3 border-r border-hairline/70 py-5 md:flex">
          {NAV.map((Icon, i) => (
            <span
              key={i}
              className={cn(
                "grid h-10 w-10 place-items-center rounded-xl",
                i === 0 ? "btn-gradient" : "text-body"
              )}
            >
              <Icon className="h-[18px] w-[18px]" />
            </span>
          ))}
        </aside>

        <div className="min-w-0 flex-1 p-3 sm:p-5">
          {/* Top bar */}
          <div className="flex items-center gap-3">
            <div className="min-w-0">
              <p className="truncate text-[15px] sm:text-[17px] font-semibold text-ink">Good morning, Sneha</p>
              <p className="truncate text-[11.5px] sm:text-[12px] text-body">Here&apos;s your career progress this week</p>
            </div>
            <div className="ml-auto hidden h-9 w-64 items-center gap-2 rounded-full border border-hairline bg-white px-3.5 text-[12px] text-muted lg:flex">
              <Search className="h-3.5 w-3.5" /> Search jobs, projects, mentors…
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <span className="hidden h-9 w-9 place-items-center rounded-full border border-hairline bg-white text-body sm:grid">
                <Settings className="h-4 w-4" />
              </span>
              <span className="relative grid h-9 w-9 place-items-center rounded-full border border-hairline bg-white text-body">
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-orange-500" />
              </span>
              <span className="flex items-center gap-2 rounded-full border border-hairline bg-white py-1 pl-1 pr-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary to-sky-400 text-[11px] font-bold text-white">SR</span>
                <span className="hidden leading-tight sm:block">
                  <span className="block text-[11.5px] font-semibold text-ink">Sneha Reddy</span>
                  <span className="block text-[10.5px] text-body">B.Com · Hyderabad</span>
                </span>
                <ChevronDown className="hidden h-3.5 w-3.5 text-muted sm:block" />
              </span>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0 space-y-3 sm:space-y-4">
              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {STATS.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white bg-white p-2.5 sm:p-4 shadow-[0_10px_24px_-18px_rgba(30,64,175,0.35)]">
                    <div className="flex items-center gap-2">
                      <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-lg", s.tone)}>
                        <s.icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="hidden truncate text-[12px] font-medium text-ink-light sm:block">{s.label}</span>
                      <MoreHorizontal className="ml-auto hidden h-4 w-4 text-muted sm:block" />
                    </div>
                    <div className="mt-3 flex items-end justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[17px] sm:text-[22px] font-bold leading-none tabular-nums text-ink">{s.value}</p>
                        <p className="mt-1.5 truncate text-[10.5px] sm:text-[11px] font-medium text-emerald-600">
                          <TrendingUp className="mr-0.5 inline h-3 w-3" />
                          {s.delta}
                        </p>
                      </div>
                      <div className="hidden sm:block">
                        <MiniBars values={s.bars} className={s.bar} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Activity chart */}
              <div className="rounded-2xl border border-white bg-white p-3 sm:p-4 shadow-[0_10px_24px_-18px_rgba(30,64,175,0.35)]">
                <div className="flex items-center gap-3">
                  <p className="text-[13px] sm:text-[14px] font-semibold text-ink">Application activity</p>
                  <span className="ml-auto hidden items-center gap-1.5 text-[11px] text-body sm:flex">
                    <span className="h-2 w-2 rounded-full bg-primary" /> Applications
                  </span>
                  <span className="hidden items-center gap-1.5 text-[11px] text-body sm:flex">
                    <span className="h-2 w-2 rounded-full bg-orange-400" /> Interviews
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-hairline px-2.5 py-1 text-[11px] text-body sm:ml-0">
                    2026 <ChevronDown className="h-3 w-3" />
                  </span>
                </div>

                <div className="relative mt-4 flex h-[150px] sm:h-[170px]">
                  <div className="flex w-6 shrink-0 flex-col justify-between pb-5 text-[10px] tabular-nums text-muted">
                    <span>30</span>
                    <span>20</span>
                    <span>10</span>
                    <span>0</span>
                  </div>
                  <div className="relative flex-1">
                    {[0, 1, 2, 3].map((k) => (
                      <span key={k} className="absolute inset-x-0 border-t border-dashed border-hairline" style={{ top: `${(k / 3) * (100 - 13)}%` }} />
                    ))}
                    <div className="absolute inset-x-0 bottom-5 top-0 flex items-end justify-between gap-1 sm:gap-2">
                      {APPS.map((v, i) => (
                        <div key={MONTHS[i]} className="relative flex h-full flex-1 items-end justify-center">
                          <span
                            className={cn(
                              "w-full max-w-[30px] rounded-full",
                              i === HIGHLIGHT
                                ? "bg-gradient-to-b from-primary to-sky-300 shadow-[0_10px_20px_-8px_rgba(37,99,235,0.7)]"
                                : "bg-gradient-to-b from-primary/25 to-primary/[0.04]"
                            )}
                            style={{ height: `${(v / 30) * 100}%` }}
                          />
                          {i === HIGHLIGHT && (
                            <>
                              <span className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white bg-orange-400 shadow" style={{ bottom: `${(7 / 30) * 100}%` }} />
                              <span className="absolute left-[calc(50%+14px)] z-10 hidden w-[118px] rounded-xl border border-hairline bg-white p-2 text-[10.5px] shadow-[0_12px_24px_-12px_rgba(15,23,42,0.35)] sm:block" style={{ bottom: "34%" }}>
                                <span className="flex items-center justify-between text-body">
                                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Applied</span>
                                  <b className="tabular-nums text-ink">26</b>
                                </span>
                                <span className="mt-1 flex items-center justify-between text-body">
                                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-orange-400" />Interviews</span>
                                  <b className="tabular-nums text-ink">7</b>
                                </span>
                              </span>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex justify-between gap-1 sm:gap-2 text-[9.5px] sm:text-[10px] text-muted">
                      {MONTHS.map((m, i) => (
                        <span key={m} className={cn("flex-1 text-center", i === HIGHLIGHT && "font-semibold text-primary")}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended column */}
            <div className="hidden min-w-0 flex-col gap-3 lg:flex">
              <div className="rounded-2xl border border-white bg-white p-4 shadow-[0_10px_24px_-18px_rgba(30,64,175,0.35)]">
                <div className="flex items-center justify-between">
                  <p className="text-[14px] font-semibold text-ink">Recommended for you</p>
                  <MoreHorizontal className="h-4 w-4 text-muted" />
                </div>
                <div className="mt-3 rounded-xl bg-gradient-to-br from-[#eaf1ff] to-[#f5f9ff] p-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-[12px] font-bold text-primary shadow-sm">AH</span>
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-semibold text-ink">Aditya Hospitals</p>
                      <p className="flex items-center gap-1 text-[11px] text-body"><MapPin className="h-3 w-3" /> Hyderabad</p>
                    </div>
                    <Bookmark className="ml-auto h-4 w-4 text-primary" />
                  </div>
                  <p className="mt-3 text-[14px] font-semibold text-ink">HR Executive</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {["Full time", "Fresher", "On-site"].map((t) => (
                      <span key={t} className="rounded-full bg-white px-2.5 py-1 text-[10.5px] font-medium text-body">{t}</span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-[13px] font-bold text-ink">₹3.2–4.5 LPA</p>
                    <span className="btn-gradient inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold">
                      Quick Apply <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white bg-white p-4 shadow-[0_10px_24px_-18px_rgba(30,64,175,0.35)]">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-ink">Live project</p>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-600">On track</span>
                </div>
                <p className="mt-1.5 text-[12px] text-body">Digital Marketing Campaign · Milestone 3 of 4</p>
                <div className="mt-3 h-1.5 rounded-full bg-surface-strong">
                  <div className="h-1.5 w-3/4 rounded-full bg-gradient-to-r from-primary to-sky-400" />
                </div>
                <p className="mt-2 text-[11px] text-body">Payout on completion: <b className="text-ink">₹12,000</b></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
