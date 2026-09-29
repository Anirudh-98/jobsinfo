"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { JOBS_DATA, Job } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";

export const PopularJobsSection: React.FC = () => {
  const { setSelectedJobForModal, setIsQuickApplyOpen } = useApp();
  const [activeTab, setActiveTab] = useState<string>("all");

  const tabs = [
    { id: "all", label: "All" },
    { id: "IT & Tech", label: "IT & Tech" },
    { id: "Sales & Marketing", label: "Marketing" },
    { id: "Finance & Accounting", label: "Finance" },
  ];

  const filteredJobs = useMemo(() => {
    const list = activeTab === "all" ? JOBS_DATA : JOBS_DATA.filter((j) => j.category === activeTab);
    return list.slice(0, 3);
  }, [activeTab]);

  const handleQuickApply = (e: React.MouseEvent, job: Job) => {
    e.stopPropagation();
    setSelectedJobForModal(job);
    setIsQuickApplyOpen(true);
  };

  return (
    <section className="w-full bg-canvas-warm py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink-display tracking-tight uppercase">
              Most Popular Job For You
            </h2>
            <p className="mt-2 text-sm text-muted max-w-md">
              Discover the top job opportunities tailored to your skills and interests — handpicked to help you take the next step in your career.
            </p>
          </div>
          <Link href="/jobs">
            <Button variant="secondary" size="sm" className="font-semibold shrink-0">
              View All
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "bg-ink-display text-white"
                  : "bg-white text-ink-secondary hover:bg-black/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredJobs.map((job, idx) => {
            const featured = idx === 1;
            return (
              <div
                key={job.id}
                onClick={() => setSelectedJobForModal(job)}
                className={`rounded-xl p-5 cursor-pointer transition-transform hover:-translate-y-0.5 ${
                  featured ? "bg-accent-warm text-white" : "bg-white text-ink-display"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`h-9 w-9 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                        featured ? "bg-white/20 text-white" : "bg-canvas-warm text-ink-display"
                      }`}
                    >
                      {job.company.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate">{job.title}</p>
                      <p className={`text-xs mt-0.5 truncate ${featured ? "text-white/75" : "text-muted"}`}>
                        {job.company}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full shrink-0 ${
                      featured ? "bg-white/20" : "bg-canvas-warm"
                    }`}
                  >
                    {job.type}
                  </span>
                </div>

                <div className={`flex items-center gap-1.5 mt-4 text-xs ${featured ? "text-white/80" : "text-muted"}`}>
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>

                <div
                  className={`mt-4 pt-4 flex items-center justify-between border-t ${
                    featured ? "border-white/20" : "border-hairline"
                  }`}
                >
                  <span className="text-sm font-bold">{job.salary}</span>
                  <button
                    onClick={(e) => handleQuickApply(e, job)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                      featured
                        ? "bg-white text-ink-display hover:bg-white/90"
                        : "bg-ink-display text-white hover:bg-black"
                    }`}
                  >
                    Apply
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
