"use client";

import React, { useState } from "react";
import {
  Users,
  Star,
  Building2,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Shield,
  Clock
} from "lucide-react";
import { MENTORS_DATA, Mentor } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";
import { PageHeaderBand } from "@/components/common/PageHeaderBand";

export default function MentorsPage() {
  const { openMentorBooking } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filters = [
    { id: "all", label: "All Experts" },
    { id: "hr", label: "HR & Placement Mastery" },
    { id: "product", label: "Product & Strategy" },
    { id: "tech", label: "System Design & Cloud" },
    { id: "finance", label: "Finance & Venture" },
  ];

  const filteredMentors = MENTORS_DATA.filter((m) => {
    if (selectedFilter === "hr") return m.expertise.some((e) => e.includes("HR"));
    if (selectedFilter === "product") return m.expertise.some((e) => e.includes("Product"));
    if (selectedFilter === "tech") return m.expertise.some((e) => e.includes("System") || e.includes("Cloud"));
    if (selectedFilter === "finance") return m.expertise.some((e) => e.includes("Finance") || e.includes("FP&A"));
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-canvas pb-20">
      <PageHeaderBand
        kicker="1:1 Executive Guidance"
        title="Learn Directly From Hyderabad's Industry Leaders"
        subtitle="Book personalized 1:1 video mock interviews, resume critiques, and placement strategy sessions with senior engineering leads and Talent Acquisition directors."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                selectedFilter === f.id
                  ? "bg-primary text-white border-primary shadow-xs"
                  : "bg-white text-ink-secondary border-hairline hover:border-slate-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMentors.map((mentor) => (
            <Card
              key={mentor.id}
              hoverable
              className="p-6 bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="h-14 w-14 rounded-full bg-slate-900 text-white font-extrabold text-lg flex items-center justify-center shrink-0 shadow-xs">
                      {mentor.avatarText}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-ink">{mentor.name}</h3>
                      <p className="text-xs font-semibold text-primary">{mentor.role}</p>
                      <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
                        <Building2 className="h-3 w-3" /> {mentor.company} • {mentor.experienceYears}+ yrs exp
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="flex items-center justify-end gap-1 text-xs font-bold text-ink">
                      <Star className="h-4 w-4 text-primary fill-current" />
                      <span>{mentor.rating}</span>
                    </div>
                    <span className="text-[11px] text-muted">({mentor.reviewsCount} reviews)</span>
                  </div>
                </div>

                <p className="text-xs text-ink-secondary leading-relaxed line-clamp-3">
                  {mentor.bio}
                </p>

                {/* Expertise Badges */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {mentor.expertise.map((exp, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-slate-50 border border-hairline text-[10px] font-medium text-ink-secondary"
                    >
                      {exp}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between text-xs text-muted">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-primary" /> Slots: {mentor.availableDays.join(", ")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" /> 45 min 1:1 Session
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-muted block uppercase font-semibold">Session Fee</span>
                  <span className="text-base font-extrabold text-ink">{mentor.hourlyRate}</span>
                </div>

                <Button
                  size="sm"
                  variant="cta"
                  onClick={() => openMentorBooking(mentor)}
                  className="font-semibold text-xs shadow-xs"
                >
                  Book a Session
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Quality Guarantee Strip */}
        <div className="mt-12 p-6 rounded-xl bg-white border border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-secondary">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-blue-50 text-primary flex items-center justify-center shrink-0">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-ink text-sm">JobsInfo 100% Satisfaction Guarantee</p>
              <p className="text-muted">If your mentorship session doesn&apos;t meet your learning expectations, we will provide a full reschedule with another expert of your choice.</p>
            </div>
          </div>
          <span className="font-semibold text-primary whitespace-nowrap">Verified Mentors Only</span>
        </div>
      </div>
    </div>
  );
}
