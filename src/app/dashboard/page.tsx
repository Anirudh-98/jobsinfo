"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Briefcase,
  Bookmark,
  Bell,
  CheckCircle2,
  Clock,
  ArrowRight,
  Upload,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2
} from "lucide-react";
import { useApp, getPersonaLabel } from "@/context/AppContext";
import { JOBS_DATA } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function DashboardPage() {
  const {
    user,
    updateUser,
    persona,
    applications,
    savedJobIds,
    toggleSaveJob,
    setSelectedJobForModal,
    setIsQuickApplyOpen,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"applications" | "recommended" | "activity">("applications");

  // Filter saved jobs
  const savedJobs = JOBS_DATA.filter((j) => savedJobIds.includes(j.id));

  // Recommended jobs based on persona
  const recommendedJobs = JOBS_DATA.slice(0, 3);

  const handleStepComplete = (stepName: string) => {
    const newCompletion = Math.min(100, user.profileCompletion + 15);
    updateUser({ profileCompletion: newCompletion });
    showToast(`Completed ${stepName}! Profile strength increased to ${newCompletion}%.`);
  };

  return (
    <div className="w-full min-h-screen bg-canvas pb-20">
      {/* Top Welcome Banner */}
      <div className="bg-white border-b border-hairline py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-slate-900 text-white font-extrabold text-xl flex items-center justify-center shadow-xs shrink-0">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-extrabold text-ink">
                    Welcome back, {user.name}
                  </h1>
                  <Badge variant="default">{getPersonaLabel(persona)}</Badge>
                </div>
                <p className="text-xs text-muted mt-1">
                  {user.collegeOrCompany} • {user.city}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Link href="/jobs">
                <Button variant="primary" size="sm" className="font-semibold">
                  <span>Browse Jobs</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main 70/30 Dashboard Grid (PRD Section 6.2 & deisgn.md) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Primary Column (~70%, 8 of 12 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Navigation Tabs */}
            <div className="flex border-b border-hairline bg-white p-2 rounded-md shadow-elevation-resting">
              {[
                { id: "applications", label: `Application Pipeline (${applications.length})` },
                { id: "recommended", label: "Recommended For You" },
                { id: "activity", label: "Recent Activity Log" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "applications" | "recommended" | "activity")}
                  className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-semibold rounded transition-colors cursor-pointer text-center ${
                    activeTab === tab.id
                      ? "bg-primary text-white shadow-xs"
                      : "text-muted hover:text-ink hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Application Pipeline */}
            {activeTab === "applications" && (
              <div className="space-y-4">
                {applications.length === 0 ? (
                  <Card className="p-8 text-center bg-white">
                    <Briefcase className="h-10 w-10 text-muted mx-auto mb-2" />
                    <p className="text-sm font-bold text-ink">No active applications yet</p>
                    <p className="text-xs text-muted mt-1">Explore our 4,053+ vacancies to start your campus pipeline.</p>
                    <Link href="/jobs">
                      <Button size="sm" variant="primary" className="mt-4">
                        Explore Jobs
                      </Button>
                    </Link>
                  </Card>
                ) : (
                  applications.map((app) => (
                    <Card key={app.id} className="p-6 bg-white space-y-4">
                      {/* App Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 border-b border-hairline">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-ink">{app.jobTitle}</h3>
                            <Badge
                              variant={
                                app.status === "Interview"
                                  ? "live"
                                  : app.status === "Shortlisted"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {app.status}
                            </Badge>
                          </div>
                          <p className="text-xs font-semibold text-primary mt-0.5">
                            {app.company} • {app.location}
                          </p>
                        </div>
                        <span className="text-xs text-muted">Applied {app.appliedDate}</span>
                      </div>

                      {/* 4-Stage Stepper Progress Bar */}
                      <div>
                        <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold uppercase tracking-wider mb-1.5">
                          <span className="text-emerald-700">1. Applied</span>
                          <span
                            className={
                              app.status === "Shortlisted" || app.status === "Interview" || app.status === "Offer"
                                ? "text-emerald-700"
                                : "text-muted"
                            }
                          >
                            2. Shortlisted
                          </span>
                          <span
                            className={
                              app.status === "Interview" || app.status === "Offer"
                                ? "text-primary font-extrabold"
                                : "text-muted"
                            }
                          >
                            3. Interview
                          </span>
                          <span className={app.status === "Offer" ? "text-emerald-700" : "text-muted"}>
                            4. Offer
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="h-1.5 rounded-full bg-emerald-600" />
                          <div
                            className={`h-1.5 rounded-full ${
                              app.status === "Shortlisted" || app.status === "Interview" || app.status === "Offer"
                                ? "bg-emerald-600"
                                : "bg-surface-muted"
                            }`}
                          />
                          <div
                            className={`h-1.5 rounded-full ${
                              app.status === "Interview" || app.status === "Offer"
                                ? "bg-primary"
                                : "bg-surface-muted"
                            }`}
                          />
                          <div
                            className={`h-1.5 rounded-full ${
                              app.status === "Offer" ? "bg-emerald-600" : "bg-surface-muted"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Stage Notes */}
                      <div className="p-3 rounded-md bg-slate-50 border border-hairline text-xs">
                        <p className="font-bold text-ink uppercase text-[10px]">Hiring Panel Update:</p>
                        <p className="text-ink-secondary mt-0.5">{app.stageNotes}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 text-xs">
                        <span className="text-muted font-medium">Package: {app.salary}</span>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => showToast(`Contacted recruiter at ${app.company}.`)}
                          className="text-xs"
                        >
                          Message Recruiter
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}

            {/* Tab 2: Recommended Opportunities */}
            {activeTab === "recommended" && (
              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <Card
                    key={job.id}
                    hoverable
                    onClick={() => setSelectedJobForModal(job)}
                    className="p-5 bg-white cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-ink hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <Badge variant="default">96% Profile Match</Badge>
                      </div>
                      <p className="text-xs text-primary font-semibold mt-0.5">
                        {job.company} • {job.location}
                      </p>
                      <p className="text-xs text-muted mt-1">{job.salary} • {job.experience}</p>
                    </div>

                    <Button
                      size="sm"
                      variant="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJobForModal(job);
                        setIsQuickApplyOpen(true);
                      }}
                      className="shrink-0 text-xs font-semibold"
                    >
                      1-Click Apply
                    </Button>
                  </Card>
                ))}
              </div>
            )}

            {/* Tab 3: Recent Activity Log */}
            {activeTab === "activity" && (
              <Card className="p-6 bg-white space-y-4">
                <h3 className="text-sm font-bold text-ink uppercase tracking-wider">
                  Timestamped Account Actions
                </h3>
                <div className="space-y-3 text-xs">
                  {[
                    { action: "Application submitted to Darwinbox", time: "Yesterday, 3:15 PM" },
                    { action: "Attended Live Masterclass on Campus Placements", time: "2 days ago" },
                    { action: "Saved 2 vacancies in Hitec City", time: "3 days ago" },
                    { action: "Completed STAR Behavioral Framework diagnostic", time: "5 days ago" },
                  ].map((act, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-hairline">
                      <span className="font-semibold text-ink">{act.action}</span>
                      <span className="text-muted">{act.time}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Right Rail (~30%, 4 of 12 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Completion Meter */}
            <Card className="p-5 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-ink uppercase tracking-wider">
                  Profile Strength
                </span>
                <span
                  className={`text-sm font-extrabold ${
                    user.profileCompletion >= 100 ? "text-emerald-700" : "text-primary"
                  }`}
                >
                  {user.profileCompletion}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    user.profileCompletion >= 100 ? "bg-emerald-600" : "bg-primary"
                  }`}
                  style={{ width: `${user.profileCompletion}%` }}
                />
              </div>

              {user.profileCompletion < 100 && (
                <div className="space-y-2 text-xs">
                  <p className="text-[11px] font-bold text-muted uppercase">Recommended Actions:</p>
                  <button
                    onClick={() => handleStepComplete("Upload Video Pitch")}
                    className="w-full text-left p-2 rounded bg-slate-50 hover:bg-blue-50/70 border border-hairline transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Record 60s Video Intro (+15%)</span>
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </button>
                  <button
                    onClick={() => handleStepComplete("Add College Roll")}
                    className="w-full text-left p-2 rounded bg-slate-50 hover:bg-blue-50/70 border border-hairline transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Verify University Hall Ticket (+10%)</span>
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </button>
                </div>
              )}
            </Card>

            {/* Saved Jobs Bookmarks */}
            <Card className="p-5 bg-white">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-hairline">
                <div className="flex items-center gap-1.5">
                  <Bookmark className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold text-ink uppercase tracking-wider">
                    Saved Jobs ({savedJobs.length})
                  </span>
                </div>
                <Link href="/jobs" className="text-[11px] text-primary hover:underline">
                  Browse
                </Link>
              </div>

              {savedJobs.length === 0 ? (
                <p className="text-xs text-muted py-4 text-center">No bookmarked jobs yet.</p>
              ) : (
                <div className="space-y-2.5">
                  {savedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-2.5 rounded bg-slate-50 border border-hairline hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-bold text-ink line-clamp-1">{job.title}</p>
                          <p className="text-[11px] text-muted">{job.company} • {job.salary}</p>
                        </div>
                        <button
                          onClick={() => toggleSaveJob(job.id)}
                          className="text-muted hover:text-red-600 p-1 cursor-pointer"
                          title="Remove bookmark"
                        >
                          ×
                        </button>
                      </div>
                      <div className="mt-2 pt-2 border-t border-hairline flex items-center justify-between">
                        <span className="text-[10px] text-muted">{job.location}</span>
                        <Button
                          size="sm"
                          variant="cta"
                          onClick={() => {
                            setSelectedJobForModal(job);
                            setIsQuickApplyOpen(true);
                          }}
                          className="h-6 px-2 text-[10px]"
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Notification Summary */}
            <Card className="p-5 bg-white">
              <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-hairline">
                <Bell className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold text-ink uppercase tracking-wider">
                  Campus TA Alerts
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-2 rounded bg-blue-50/60 border border-blue-100">
                  <p className="font-bold text-primary">Deloitte Interview Window</p>
                  <p className="text-[11px] text-ink-secondary mt-0.5">
                    Your scheduled slot is Friday, Sept 22 at 3:00 PM IST.
                  </p>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-hairline">
                  <p className="font-bold text-ink">New Opening: Cyient HR</p>
                  <p className="text-[11px] text-muted mt-0.5">
                    Matches your MBA HR specialization.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
