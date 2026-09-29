"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { JOBS_DATA, Job } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { JobCircularCard } from "@/components/quietly/JobCircularCard";
import { Button } from "@/components/ui/Button";

export const JobCircularsSection: React.FC = () => {
  const { setSelectedJobForModal, setIsQuickApplyOpen } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Openings" },
    { id: "IT & Tech", label: "Technology" },
    { id: "Sales & Marketing", label: "Marketing & Growth" },
    { id: "Finance & Accounting", label: "Finance & Accounting" },
  ];

  const filteredJobs = useMemo(() => {
    const list =
      activeCategory === "all"
        ? JOBS_DATA
        : JOBS_DATA.filter((j) => j.category === activeCategory);
    return list.slice(0, 8); // 8 cards (2 rows of 4 on desktop)
  }, [activeCategory]);

  const handleApply = (job: Job) => {
    setSelectedJobForModal(job);
    setIsQuickApplyOpen(true);
  };

  const handleView = (job: Job) => {
    setSelectedJobForModal(job);
  };

  // Mock diverse imagery for job circular cards
  const jobImages = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
  ];

  return (
    <section className="w-full bg-canvas py-16 border-t border-hairline">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full mb-3 inline-block">
              Verified Openings
            </span>
            <h2 className="text-display-lg text-ink font-bold leading-[1.25]">
              Featured Job Circulars
            </h2>
            <p className="mt-2 text-body-lg text-body">
              Verified employer positions with immediate interview schedules and transparent salary ranges.
            </p>
          </div>

          <Link href="/jobs">
            <Button variant="secondary" size="md">
              View All 4,053+ Jobs
            </Button>
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`min-h-[36px] px-4 py-2 rounded-full text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-rest"
                  : "bg-surface-soft text-body hover:bg-surface-strong border border-hairline"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 4-Column Desktop Grid / 2-Column Tablet / 1-Column Mobile with 16px Gutter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredJobs.map((job, idx) => (
            <JobCircularCard
              key={job.id}
              id={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              type={job.type}
              salary={job.salary}
              imageUrl={jobImages[idx % jobImages.length]}
              featuredBadge={idx % 2 === 0 ? "Featured" : "Immediate"}
              onApply={() => handleApply(job)}
              onViewDetails={() => handleView(job)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
