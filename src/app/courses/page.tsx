"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Clock,
  Users,
  Star,
  BookOpen,
  CheckCircle2,
  Search,
  ArrowRight
} from "lucide-react";
import { COURSES_DATA, Course } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";
import { PageHeaderBand } from "@/components/common/PageHeaderBand";

export default function CoursesPage() {
  const { showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(["course-1"]);

  const categories = [
    { id: "all", label: "All Disciplines" },
    { id: "HR Management", label: "Placement & HR" },
    { id: "Corporate Finance", label: "Finance & FP&A" },
    { id: "Data & AI", label: "Data & AI Analytics" },
    { id: "Full-Stack Tech", label: "Full-Stack Tech" },
  ];

  const levels = [
    { id: "all", label: "All Levels" },
    { id: "Beginner", label: "Beginner" },
    { id: "Intermediate", label: "Intermediate" },
    { id: "Advanced", label: "Advanced" },
  ];

  const filteredCourses = COURSES_DATA.filter((c) => {
    const matchesCategory =
      selectedCategory === "all" || c.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || c.level === selectedLevel;
    return matchesCategory && matchesLevel;
  });

  const handleEnroll = (course: Course) => {
    if (enrolledCourses.includes(course.id)) {
      showToast(`You are already enrolled in ${course.title}. Check your dashboard.`);
      return;
    }
    setEnrolledCourses((prev) => [...prev, course.id]);
    showToast(`Successfully enrolled in ${course.title}! Added to your learning dashboard.`);
  };

  return (
    <div className="w-full min-h-screen bg-canvas pb-20">
      <PageHeaderBand
        kicker="Career Upskilling Programs"
        title="Skill Development & Placement Curriculums"
        subtitle="Practitioner-led bootcamps and certifications mapped directly to corporate hiring criteria across Hyderabad's leading enterprises."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Curated Learning Paths Preview */}
        <div className="mb-12">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" /> Curated Role-Based Learning Paths
              </h2>
              <p className="text-xs text-muted">Sequential milestone tracks designed for high-demand careers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: "Campus to Corporate: MBA Placement Accelerator",
                duration: "8 Weeks",
                modulesCount: "14 Modules",
                target: "Osmania & JNTU MBA / BBA cohorts",
                skills: ["STAR Framework", "Aptitude Tests", "Mock Interviews", "Salary Negotiation"],
                progress: 65,
              },
              {
                title: "Enterprise Data & Business Intelligence Analyst",
                duration: "10 Weeks",
                modulesCount: "18 Modules",
                target: "Aspiring BI, Data & Product Analysts",
                skills: ["PostgreSQL", "PowerBI DAX", "Python Pandas", "Executive Dashboards"],
                progress: 0,
              },
              {
                title: "Modern Full-Stack Systems & Cloud Architect",
                duration: "12 Weeks",
                modulesCount: "22 Modules",
                target: "Software Engineers & Tech Freshers",
                skills: ["Next.js App Router", "TypeScript", "PostgreSQL", "Docker on AWS"],
                progress: 0,
              },
            ].map((path, idx) => (
              <Card key={idx} hoverable className="p-6 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-muted mb-2">
                    <span className="font-semibold text-primary">{path.duration}</span>
                    <span>{path.modulesCount}</span>
                  </div>
                  <h3 className="text-base font-bold text-ink">{path.title}</h3>
                  <p className="text-xs text-muted mt-1">{path.target}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {path.skills.map((s, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-50 border border-hairline text-[10px] font-medium text-ink-secondary"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-hairline">
                  {path.progress > 0 ? (
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-emerald-700 font-semibold">Enrolled • In Progress</span>
                        <span className="font-bold text-ink">{path.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full"
                          style={{ width: `${path.progress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => showToast(`Enrolled in ${path.title} learning path!`)}
                      className="w-full text-xs font-semibold"
                    >
                      Start Learning Path
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Course Catalog Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-hairline mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-muted uppercase tracking-wider shrink-0 mr-1">
              Sector:
            </span>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                  selectedCategory === c.id
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-white text-ink-secondary border-hairline hover:border-slate-300"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted uppercase tracking-wider shrink-0">
              Level:
            </span>
            {levels.map((l) => (
              <button
                key={l.id}
                onClick={() => setSelectedLevel(l.id)}
                className={`px-2.5 py-1 rounded-sm text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                  selectedLevel === l.id
                    ? "bg-ink text-white border-ink"
                    : "bg-white text-ink border-hairline hover:border-slate-300"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledCourses.includes(course.id);

            return (
              <Card
                key={course.id}
                hoverable
                className="p-6 bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="default">{course.category}</Badge>
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                    {course.badge && <Badge variant="dark">{course.badge}</Badge>}
                  </div>

                  <h3 className="text-lg font-bold text-ink leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-primary font-semibold mt-1">
                    {course.instructor} • <span className="text-muted font-normal">{course.instructorRole}</span>
                  </p>

                  <p className="mt-3 text-xs text-ink-secondary leading-relaxed">
                    {course.description}
                  </p>

                  {/* Modules Outline */}
                  <div className="mt-4 p-3 rounded-md bg-slate-50 border border-hairline text-xs">
                    <p className="font-bold text-ink uppercase tracking-wider text-[10px] mb-2">
                      Key Curriculum Modules:
                    </p>
                    <ul className="space-y-1.5">
                      {course.modules.map((mod, i) => (
                        <li key={i} className="flex items-center gap-2 text-ink-secondary">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Meta Strip */}
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-primary" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-primary" /> {course.studentsCount} enrolled
                    </span>
                    <span className="flex items-center gap-1 font-bold text-ink">
                      <Star className="h-3.5 w-3.5 text-primary fill-current" /> {course.rating}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-muted block uppercase font-semibold">Pricing</span>
                    <span className="text-sm font-extrabold text-ink">{course.price}</span>
                  </div>

                  <Button
                    size="sm"
                    variant={isEnrolled ? "secondary" : "cta"}
                    onClick={() => handleEnroll(course)}
                    className="font-semibold text-xs"
                  >
                    {isEnrolled ? "Access Course" : "Enroll Now"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
