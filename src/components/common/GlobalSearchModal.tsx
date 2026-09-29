"use client";

import React, { useState, useMemo } from "react";
import { Search, Briefcase, Building2, GraduationCap, Users, ArrowRight, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { JOBS_DATA, COMPANIES_DATA, COURSES_DATA, MENTORS_DATA } from "@/data/mockData";
import Link from "next/link";

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setSelectedJobForModal } = useApp();
  const [query, setQuery] = useState("");

  const filteredResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    const jobs = JOBS_DATA.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.category.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
    ).slice(0, 4);

    const companies = COMPANIES_DATA.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.sector.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
    ).slice(0, 3);

    const courses = COURSES_DATA.filter(
      (cr) =>
        cr.title.toLowerCase().includes(q) ||
        cr.category.toLowerCase().includes(q) ||
        cr.instructor.toLowerCase().includes(q)
    ).slice(0, 3);

    const mentors = MENTORS_DATA.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.company.toLowerCase().includes(q) ||
        m.expertise.some((exp) => exp.toLowerCase().includes(q))
    ).slice(0, 3);

    return { jobs, companies, courses, mentors };
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      {/* Quietly Scrim */}
      <div
        className="fixed inset-0 bg-black/40"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Search dialog */}
      <div className="relative z-10 w-full max-w-2xl rounded-sm bg-canvas border border-hairline shadow-modal overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-hairline bg-white">
          <Search className="h-5 w-5 text-muted shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jobs, companies, courses, mentors, or skills (e.g., 'Product', 'Darwinbox', 'Finance')..."
            className="w-full bg-transparent text-base text-ink placeholder:text-muted focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-muted hover:text-ink mr-2"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs text-muted bg-surface-muted rounded border border-hairline font-mono">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query.trim() ? (
            <div className="py-8 text-center">
              <p className="text-sm text-muted">Type anything to explore Hyderabad & Telangana careers</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["Darwinbox", "Product Analyst", "MBA Placements", "Deloitte", "Financial Modelling", "System Design"].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="text-xs px-3 py-1.5 rounded-full bg-surface-muted text-ink-secondary hover:bg-primary-light hover:text-primary transition-colors cursor-pointer"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Jobs Matches */}
              {filteredResults?.jobs && filteredResults.jobs.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-primary" /> Active Job Vacancies
                    </span>
                    <Link
                      href="/jobs"
                      onClick={() => setIsSearchOpen(false)}
                      className="text-primary hover:underline"
                    >
                      View all
                    </Link>
                  </div>
                  <div className="space-y-1">
                    {filteredResults.jobs.map((job) => (
                      <div
                        key={job.id}
                        onClick={() => {
                          setSelectedJobForModal(job);
                          setIsSearchOpen(false);
                        }}
                        className="flex items-center justify-between p-2.5 rounded-sm hover:bg-surface-muted cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="text-sm font-semibold text-ink">{job.title}</p>
                          <p className="text-xs text-muted">
                            {job.company} • {job.location} • {job.salary}
                          </p>
                        </div>
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-50 text-primary border border-blue-100">
                          {job.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Companies Matches */}
              {filteredResults?.companies && filteredResults.companies.length > 0 && (
                <div>
                  <div className="flex items-center text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                    <Building2 className="h-3.5 w-3.5 text-primary mr-1.5" /> Hiring Organizations
                  </div>
                  <div className="space-y-1">
                    {filteredResults.companies.map((comp) => (
                      <Link
                        key={comp.id}
                        href="/mba-placement"
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-sm hover:bg-surface-muted cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="h-7 w-7 rounded flex items-center justify-center text-xs font-bold text-white"
                            style={{ backgroundColor: comp.color }}
                          >
                            {comp.logoText}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-ink">{comp.name}</p>
                            <p className="text-xs text-muted">{comp.sector} • {comp.location}</p>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-ink bg-slate-100 px-2 py-0.5 rounded">
                          {comp.vacancies} open roles
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses Matches */}
              {filteredResults?.courses && filteredResults.courses.length > 0 && (
                <div>
                  <div className="flex items-center text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                    <GraduationCap className="h-3.5 w-3.5 text-primary mr-1.5" /> Courses & Programs
                  </div>
                  <div className="space-y-1">
                    {filteredResults.courses.map((course) => (
                      <Link
                        key={course.id}
                        href="/courses"
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-sm hover:bg-surface-muted cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="text-sm font-semibold text-ink">{course.title}</p>
                          <p className="text-xs text-muted">Instructor: {course.instructor} • {course.duration}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Mentors Matches */}
              {filteredResults?.mentors && filteredResults.mentors.length > 0 && (
                <div>
                  <div className="flex items-center text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                    <Users className="h-3.5 w-3.5 text-primary mr-1.5" /> Mentors & Industry Leaders
                  </div>
                  <div className="space-y-1">
                    {filteredResults.mentors.map((mentor) => (
                      <Link
                        key={mentor.id}
                        href="/mentors"
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-sm hover:bg-surface-muted cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-7 w-7 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center">
                            {mentor.avatarText}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-ink">{mentor.name}</p>
                            <p className="text-xs text-muted">{mentor.role} at {mentor.company}</p>
                          </div>
                        </div>
                        <span className="text-xs text-primary font-medium">{mentor.hourlyRate}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {filteredResults &&
                filteredResults.jobs.length === 0 &&
                filteredResults.companies.length === 0 &&
                filteredResults.courses.length === 0 &&
                filteredResults.mentors.length === 0 && (
                  <div className="py-8 text-center text-muted text-sm">
                    No results found matching &quot;{query}&quot;. Try broader terms like &quot;Tech&quot;, &quot;MBA&quot;, or &quot;HR&quot;.
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
