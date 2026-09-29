"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  Bookmark,
  SlidersHorizontal,
  Grid,
  List,
  X,
  Sparkles,
  CheckCircle2,
  DollarSign
} from "lucide-react";
import { JOBS_DATA, Job } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function JobsPage() {
  const {
    savedJobIds,
    toggleSaveJob,
    setSelectedJobForModal,
    setIsQuickApplyOpen,
    applications,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedExperience, setSelectedExperience] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState<number>(9);

  const categories = [
    { id: "all", label: "All Sectors" },
    { id: "IT & Tech", label: "IT & Tech" },
    { id: "Finance & Accounting", label: "Finance & Accounts" },
    { id: "HR & Operations", label: "HR & Operations" },
    { id: "Sales & Marketing", label: "Sales & Marketing" },
    { id: "Office & Admin", label: "Office & Admin" },
  ];

  const locations = [
    { id: "all", label: "All Telangana" },
    { id: "Hitec City", label: "Hitec City" },
    { id: "Gachibowli", label: "Gachibowli" },
    { id: "Madhapur", label: "Madhapur" },
    { id: "Financial District", label: "Financial District" },
  ];

  const experiences = [
    { id: "all", label: "Any Experience" },
    { id: "Fresher", label: "Fresher / Campus" },
    { id: "1-3 yrs", label: "1 - 3 Years" },
    { id: "3+ yrs", label: "3+ Years" },
  ];

  const types = [
    { id: "all", label: "Any Type" },
    { id: "Full-time", label: "Full-Time" },
    { id: "Internship", label: "Internship" },
  ];

  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job) => {
      const matchesQuery =
        !searchQuery.trim() ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || job.category === selectedCategory;

      const matchesLocation =
        selectedLocation === "all" ||
        job.location.toLowerCase().includes(selectedLocation.toLowerCase());

      const matchesExperience =
        selectedExperience === "all" || job.experience === selectedExperience;

      const matchesType = selectedType === "all" || job.type === selectedType;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesLocation &&
        matchesExperience &&
        matchesType
      );
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedLocation,
    selectedExperience,
    selectedType,
  ]);

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedLocation !== "all" ? 1 : 0) +
    (selectedExperience !== "all" ? 1 : 0) +
    (selectedType !== "all" ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLocation("all");
    setSelectedExperience("all");
    setSelectedType("all");
  };

  const handleOpenDetail = (job: Job) => {
    setSelectedJobForModal(job);
  };

  const handleQuickApply = (e: React.MouseEvent, job: Job) => {
    e.stopPropagation();
    setSelectedJobForModal(job);
    setIsQuickApplyOpen(true);
  };

  const handleToggleSave = (e: React.MouseEvent, jobId: string) => {
    e.stopPropagation();
    toggleSaveJob(jobId);
  };

  return (
    <div className="w-full min-h-screen bg-canvas pb-20">
      {/* Top Hero Banner */}
      <div className="bg-canvas border-b border-hairline py-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold mb-3">
              <Sparkles className="h-3.5 w-3.5" /> Verified Job Circulars
            </div>
            <h1 className="text-display-md sm:text-display-lg font-bold text-ink leading-tight">
              Explore 4,053+ Active Vacancies
            </h1>
            <p className="mt-2 text-body-md text-body">
              Filter by industry domain, hiring tech parks, or experience level. Fast 1-click application directly to recruiter panels.
            </p>
          </div>

          {/* Prominent Search Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search job title, company name, skill, or area (e.g. 'Analyst', 'Darwinbox', 'Hitec City')..."
                className="w-full pl-12 pr-10 py-3 rounded-md bg-canvas border border-hairline text-ink placeholder:text-muted focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-3.5 text-muted hover:text-ink cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <Button
              variant="primary"
              className="w-full sm:w-auto h-11 px-6 font-semibold shrink-0"
              onClick={() => {}}
            >
              Search Jobs
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Chips Bar (Horizontal scroll per deisgn.md) */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-hairline py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2.5">
          {/* First Row: Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-xs font-bold text-muted uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filter:
            </span>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                  selectedCategory === c.id
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-white text-ink-secondary border-hairline hover:border-slate-300"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Second Row: Locations & Experience Chips */}
          <div className="flex items-center justify-between gap-4 flex-wrap pt-1">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[11px] font-bold text-muted uppercase tracking-wider shrink-0">
                Area:
              </span>
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc.id)}
                  className={`px-2.5 py-1 rounded-sm text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                    selectedLocation === loc.id
                      ? "bg-ink text-white border-ink"
                      : "bg-white text-ink border-hairline hover:border-slate-300"
                  }`}
                >
                  {loc.label}
                </button>
              ))}

              <span className="text-[11px] font-bold text-muted uppercase tracking-wider shrink-0 ml-2">
                Level:
              </span>
              {experiences.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => setSelectedExperience(exp.id)}
                  className={`px-2.5 py-1 rounded-sm text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                    selectedExperience === exp.id
                      ? "bg-ink text-white border-ink"
                      : "bg-white text-ink border-hairline hover:border-slate-300"
                  }`}
                >
                  {exp.label}
                </button>
              ))}
            </div>

            {/* View Mode Toggle & Results Count */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="flex items-center border border-hairline rounded-sm overflow-hidden bg-white">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 transition-colors cursor-pointer ${
                    viewMode === "grid" ? "bg-primary text-white" : "text-muted hover:text-ink"
                  }`}
                  title="Grid view"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 transition-colors cursor-pointer ${
                    viewMode === "list" ? "bg-primary text-white" : "text-muted hover:text-ink"
                  }`}
                  title="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Applied Filters Row */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 pt-1 border-t border-hairline text-xs">
              <span className="text-muted font-medium">Applied filters:</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-primary border border-blue-100 font-medium">
                  &quot;{searchQuery}&quot;
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-primary border border-blue-100 font-medium">
                  {selectedCategory}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                </span>
              )}
              {selectedLocation !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-primary border border-blue-100 font-medium">
                  {selectedLocation}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedLocation("all")} />
                </span>
              )}
              {selectedExperience !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-primary border border-blue-100 font-medium">
                  {selectedExperience}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedExperience("all")} />
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-xs font-bold text-primary hover:underline ml-2 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-semibold text-ink">
            Showing <span className="text-primary">{filteredJobs.length}</span> verified vacancies
          </p>
          <span className="text-xs text-muted">Sorted by: Most Relevant First</span>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-md border border-hairline p-8">
            <Briefcase className="h-12 w-12 text-muted mx-auto mb-3" />
            <h3 className="text-lg font-bold text-ink">No matching vacancies found</h3>
            <p className="text-sm text-muted mt-1 max-w-md mx-auto">
              We couldn&apos;t find roles matching your current filter set. Try removing some filters or searching for broader terms.
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={clearAllFilters}
              className="mt-5"
            >
              Reset All Filters
            </Button>
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View (3-cols desktop, 2-cols tablet, 1-col mobile) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredJobs.slice(0, visibleCount).map((job) => {
              const isSaved = savedJobIds.includes(job.id);
              const isApplied = applications.some((app) => app.jobId === job.id);

              return (
                <Card
                  key={job.id}
                  hoverable
                  onClick={() => handleOpenDetail(job)}
                  className="cursor-pointer flex flex-col justify-between p-6 relative group bg-white"
                >
                  <div>
                    {/* Top Row */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-md bg-blue-50 text-primary border border-blue-100 flex items-center justify-center font-bold text-sm shrink-0">
                          {job.company.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-primary flex items-center gap-1">
                            <Building2 className="h-3 w-3" /> {job.company}
                          </p>
                          <span className="text-[11px] text-muted">{job.datePosted}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {job.mbaRelevant && (
                          <Badge variant="default" className="text-[10px]">
                            MBA Cohort
                          </Badge>
                        )}
                        <button
                          onClick={(e) => handleToggleSave(e, job.id)}
                          className={`p-2 rounded-full border transition-colors cursor-pointer ${
                            isSaved
                              ? "bg-accent text-white border-accent"
                              : "bg-white text-muted border-hairline hover:text-ink hover:border-slate-300"
                          }`}
                          title={isSaved ? "Saved" : "Save Job"}
                        >
                          <Bookmark className={`h-3.5 w-3.5 ${isSaved ? "fill-current" : ""}`} />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-ink group-hover:text-primary transition-colors leading-snug line-clamp-1">
                      {job.title}
                    </h3>

                    <div className="mt-3 space-y-1.5 text-xs text-muted">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{job.experience} • {job.type}</span>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-ink-secondary line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-hairline flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-muted block uppercase tracking-wider font-semibold">
                        Package
                      </span>
                      <span className="text-sm font-bold text-ink">{job.salary}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isApplied ? (
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-sm border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Applied
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          variant="cta"
                          onClick={(e) => handleQuickApply(e, job)}
                          className="font-semibold text-xs shadow-xs"
                        >
                          Quick Apply
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="space-y-3">
            {filteredJobs.slice(0, visibleCount).map((job) => {
              const isSaved = savedJobIds.includes(job.id);
              const isApplied = applications.some((app) => app.jobId === job.id);

              return (
                <div
                  key={job.id}
                  onClick={() => handleOpenDetail(job)}
                  className="p-5 rounded-md bg-white border border-hairline hover:border-slate-300 hover:shadow-elevation-resting transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-md bg-blue-50 text-primary border border-blue-100 flex items-center justify-center font-bold text-base shrink-0">
                      {job.company.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-ink hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        {job.mbaRelevant && (
                          <Badge variant="default" className="text-[10px]">
                            MBA Priority
                          </Badge>
                        )}
                        <span className="text-xs text-muted">• {job.company}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted mt-1.5 flex-wrap">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-primary" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3.5 w-3.5 text-primary" /> {job.experience}
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-ink">
                          <DollarSign className="h-3.5 w-3.5 text-primary" /> {job.salary}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-0 pt-3 sm:pt-0 border-hairline">
                    <button
                      onClick={(e) => handleToggleSave(e, job.id)}
                      className={`p-2 rounded-full border transition-colors cursor-pointer ${
                        isSaved
                          ? "bg-accent text-white border-accent"
                          : "bg-white text-muted border-hairline hover:text-ink hover:border-slate-300"
                      }`}
                      title={isSaved ? "Saved" : "Save Job"}
                    >
                      <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                    </button>

                    {isApplied ? (
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-sm border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Applied
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        variant="cta"
                        onClick={(e) => handleQuickApply(e, job)}
                        className="font-semibold text-xs shadow-xs"
                      >
                        Quick Apply
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button / Pagination */}
        {filteredJobs.length > visibleCount && (
          <div className="mt-12 text-center">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="font-semibold"
            >
              Load More Vacancies ({filteredJobs.length - visibleCount} remaining)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
