"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  GraduationCap,
  TrendingUp,
  Award,
  Users,
  Search,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BarChart3,
  Calendar,
  Layers
} from "lucide-react";
import { COMPANIES_DATA, Company } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";

export default function MbaPlacementPage() {
  const { applications } = useApp();
  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const sectors = [
    { id: "all", label: "All 28 Organizations" },
    { id: "HR Tech Unicorn", label: "HR Tech & SaaS" },
    { id: "Consulting & Financial Services", label: "Big 4 & Advisory" },
    { id: "Pharmaceuticals & Life Sciences", label: "Pharma & Healthcare" },
    { id: "Engineering & Technology Solutions", label: "Engineering & Tech" },
    { id: "Venture & Tech Incubator", label: "T-Hub Startups" },
  ];

  const filteredCompanies = COMPANIES_DATA.filter((comp) => {
    const matchesSector = sectorFilter === "all" || comp.sector === sectorFilter;
    const matchesQuery =
      !searchQuery.trim() ||
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.hiringRoles.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSector && matchesQuery;
  });

  return (
    <div className="w-full min-h-screen bg-canvas pb-20">
      {/* Top Hero Banner */}
      <div className="bg-canvas border-b border-hairline py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5" /> 2026 Campus Placement Cohort Hub
              </div>
              <h1 className="text-display-md sm:text-display-lg font-bold text-ink leading-tight">
                MBA Placement Portal — Telangana
              </h1>
              <p className="text-body-md sm:text-body-lg text-body leading-relaxed">
                Direct hiring pipeline connecting top business colleges and universities with 28 premier recruiting organizations.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/hr-solutions">
                  <Button variant="primary" size="md" className="gap-2 font-semibold shadow-xs">
                    <Award className="h-4 w-4" />
                    <span>Master Your HR Round</span>
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="secondary" size="md" className="font-semibold">
                    <span>Track Pipeline ({applications.length} active)</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Live Placement Pipeline Stepper Card */}
            <div className="w-full lg:w-96 p-5 rounded-md bg-slate-50 border border-hairline shadow-elevation-resting">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-ink uppercase tracking-wider">
                  Recruitment Pipeline
                </span>
                <Badge variant="default">Cohort 2026</Badge>
              </div>

              {/* 4-Stage Stepper */}
              <div className="space-y-3 pt-2">
                {[
                  { stage: "1. Campus Registration", status: "Completed", note: "Student credentials verified" },
                  { stage: "2. Written / Aptitude", status: "Active Now", note: "Deloitte & Cyient drives open" },
                  { stage: "3. HR Behavioral Round", status: "Upcoming", note: "STAR interview rubrics" },
                  { stage: "4. Final Offer Release", status: "Scheduled", note: "Target ₹6.5L - ₹14L CTC" },
                ].map((st, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        i === 0
                          ? "bg-emerald-600 text-white"
                          : i === 1
                          ? "bg-primary text-white"
                          : "bg-slate-200 text-muted"
                      }`}
                    >
                      {i === 0 ? "✓" : i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-ink">{st.stage}</p>
                        <span
                          className={`text-[10px] font-semibold ${
                            i === 0
                              ? "text-emerald-700"
                              : i === 1
                              ? "text-primary"
                              : "text-muted"
                          }`}
                        >
                          {st.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted">{st.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics / Statistics Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-ink flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" /> Placement Analytics & Trends
            </h2>
            <p className="text-xs text-muted">Real-time statistics across active corporate recruiters</p>
          </div>
          <span className="text-xs text-muted">Updated today at 9:00 AM IST</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-5 bg-white">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">Partner Companies</p>
            <p className="text-3xl font-extrabold text-ink mt-2">28</p>
            <p className="text-xs text-emerald-700 font-medium mt-1">✦ 4 new drives this week</p>
          </Card>

          <Card className="p-5 bg-white">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">Total MBA Openings</p>
            <p className="text-3xl font-extrabold text-ink mt-2">4,053+</p>
            <p className="text-xs text-primary font-medium mt-1">✦ Full-time & trainee roles</p>
          </Card>

          <Card className="p-5 bg-white">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">Average Package CTC</p>
            <p className="text-3xl font-extrabold text-ink mt-2">₹7.2 LPA</p>
            <p className="text-xs text-muted font-medium mt-1">✦ Up 14% from 2025 cohort</p>
          </Card>

          <Card className="p-5 bg-white">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">Highest Package</p>
            <p className="text-3xl font-extrabold text-ink mt-2">₹18.5 LPA</p>
            <p className="text-xs text-primary font-medium mt-1">✦ Big 4 Strategy & Advisory</p>
          </Card>
        </div>

        {/* Distribution Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* By Specialization */}
          <Card className="p-6 bg-white">
            <h3 className="text-sm font-bold text-ink uppercase tracking-wider mb-4 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" /> Vacancy Share by Specialization
            </h3>
            <div className="space-y-3.5">
              {[
                { name: "MBA Marketing & Corporate Sales", pct: 36, roles: "1,450 roles" },
                { name: "MBA Finance & FP&A / Advisory", pct: 28, roles: "1,135 roles" },
                { name: "MBA HR & People Operations", pct: 22, roles: "890 roles" },
                { name: "Supply Chain & Operations Analytics", pct: 14, roles: "578 roles" },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-ink">{item.name}</span>
                    <span className="text-muted font-medium">{item.roles} ({item.pct}%)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* By Tech Park / Location */}
          <Card className="p-6 bg-white">
            <h3 className="text-sm font-bold text-ink uppercase tracking-wider mb-4 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" /> Hubs & Work Locations
            </h3>
            <div className="space-y-3.5">
              {[
                { name: "Hitec City / Madhapur (Cyberabad)", pct: 45, vacancies: "1,820 vacancies" },
                { name: "Financial District / Gachibowli", pct: 32, vacancies: "1,300 vacancies" },
                { name: "Banjara Hills / Begumpet / Somajiguda", pct: 15, vacancies: "610 vacancies" },
                { name: "Medchal / Bachupally / Shamshabad", pct: 8, vacancies: "323 vacancies" },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-ink">{item.name}</span>
                    <span className="text-muted font-medium">{item.vacancies} ({item.pct}%)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-ink rounded-full"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Partner Organizations Directory */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" /> Hiring Organizations Directory
              </h2>
              <p className="text-xs text-muted">
                Explore campus partners, live vacancies, and specific selection rounds.
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search company or role..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-sm bg-white border border-hairline text-ink focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Sector Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
            {sectors.map((s) => (
              <button
                key={s.id}
                onClick={() => setSectorFilter(s.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                  sectorFilter === s.id
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-white text-ink-secondary border-hairline hover:border-slate-300"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Company Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredCompanies.map((company) => (
              <Card
                key={company.id}
                hoverable
                className="p-5 flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div
                      className="h-11 w-11 rounded-md text-white font-bold flex items-center justify-center text-sm shadow-xs"
                      style={{ backgroundColor: company.color }}
                    >
                      {company.logoText}
                    </div>
                    <Badge variant="default">
                      {company.vacancies} Open Roles
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-ink">{company.name}</h3>
                  <p className="text-xs text-primary font-medium">{company.sector}</p>
                  <p className="text-[11px] text-muted mt-1">{company.location}</p>

                  <div className="mt-4 pt-3 border-t border-hairline">
                    <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">
                      Key Hiring Profiles:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {company.hiringRoles.map((r, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-slate-50 text-[10px] font-medium text-ink-secondary border border-hairline"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-hairline">
                    <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-1.5">
                      Evaluation Stages:
                    </p>
                    <p className="text-[11px] text-slate-600 font-mono">
                      {company.stages.join(" → ")}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-hairline flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-muted block uppercase">Avg CTC</span>
                    <span className="text-xs font-bold text-ink">{company.avgSalary}</span>
                  </div>

                  <Link href="/jobs">
                    <Button size="sm" variant="primary" className="text-xs">
                      View Openings
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* HR Round Interview Prep Banner */}
        <div className="mt-14 p-8 rounded-xl bg-white border border-hairline shadow-elevation-resting flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <Badge variant="default">HR Evaluation Framework</Badge>
            <h3 className="text-2xl font-bold text-ink">
              Prepare for Final HR Behavioral Rounds
            </h3>
            <p className="text-xs sm:text-sm text-muted">
              90% of campus placement drop-offs happen in the final behavioral interview. Learn the STAR answering methodology, use our rubric scorecard, and practice video mock simulations.
            </p>
          </div>

          <Link href="/hr-solutions" className="shrink-0">
            <Button variant="primary" size="lg" className="font-semibold shadow-xs">
              <span>Access HR Scorecard & Rubrics</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
