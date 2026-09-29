"use client";

import React, { useState } from "react";
import {
  Layers,
  Clock,
  Users,
  Code2,
  CheckCircle2,
  ArrowRight,
  UserCheck
} from "lucide-react";
import { PROJECTS_DATA, Project } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { useApp } from "@/context/AppContext";
import { PageHeaderBand } from "@/components/common/PageHeaderBand";

export default function ProjectsPage() {
  const { showToast } = useApp();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [appliedProjects, setAppliedProjects] = useState<string[]>(["proj-1"]);

  const difficulties = [
    { id: "all", label: "All Difficulties" },
    { id: "Beginner", label: "Beginner" },
    { id: "Intermediate", label: "Intermediate" },
    { id: "Advanced", label: "Advanced" },
  ];

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    return selectedDifficulty === "all" || p.difficulty === selectedDifficulty;
  });

  const handleApply = (project: Project) => {
    if (appliedProjects.includes(project.id)) {
      showToast(`You have already submitted an application for ${project.title}.`);
      return;
    }
    setAppliedProjects((prev) => [...prev, project.id]);
    setSelectedProject(null);
    showToast(`Successfully enrolled in ${project.title}! Mentor details sent to your dashboard.`);
  };

  return (
    <div className="w-full min-h-screen bg-canvas pb-20">
      <PageHeaderBand
        kicker="Hands-on Industry Portfolios"
        title="Real-Time Projects Marketplace"
        subtitle="Work on live enterprise codebases, Telangana regional problem statements, and real-world supply chain architectures under direct mentorship from senior engineers."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter Chips */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-hairline mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted uppercase tracking-wider">
              Difficulty:
            </span>
            {difficulties.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDifficulty(d.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
                  selectedDifficulty === d.id
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-white text-ink-secondary border-hairline hover:border-slate-300"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <p className="text-xs text-muted">
            Showing <span className="font-bold text-ink">{filteredProjects.length}</span> live projects
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const isEnrolled = appliedProjects.includes(project.id);

            return (
              <Card
                key={project.id}
                hoverable
                className="p-6 bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Badge variant="default">{project.domain}</Badge>
                    <Badge
                      variant={
                        project.difficulty === "Advanced"
                          ? "dark"
                          : project.difficulty === "Intermediate"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {project.difficulty}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-ink leading-snug">
                    {project.title}
                  </h3>

                  <p className="mt-2.5 text-xs text-ink-secondary line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-mono font-medium text-ink-secondary border border-hairline"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Mentor Strip */}
                  <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between text-xs text-muted">
                    <span className="flex items-center gap-1.5">
                      <UserCheck className="h-3.5 w-3.5 text-primary" /> {project.mentor}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {project.duration}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between">
                  <span className="text-xs text-muted flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-primary" /> {project.enrolledStudents} students
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setSelectedProject(project)}
                      className="text-xs"
                    >
                      Details
                    </Button>
                    {isEnrolled ? (
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded border border-emerald-200">
                        Enrolled
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleApply(project)}
                        className="text-xs font-semibold"
                      >
                        Apply
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          maxWidth="2xl"
          title={
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                {selectedProject.domain} • {selectedProject.difficulty}
              </span>
              <h3 className="text-xl font-bold text-ink mt-0.5">{selectedProject.title}</h3>
            </div>
          }
        >
          <div className="space-y-4 text-xs sm:text-sm text-ink-secondary">
            <div>
              <h4 className="font-bold text-ink uppercase tracking-wider text-xs mb-1">
                Project Overview
              </h4>
              <p className="leading-relaxed">{selectedProject.description}</p>
            </div>

            <div>
              <h4 className="font-bold text-ink uppercase tracking-wider text-xs mb-1">
                Required Tech Stack & Tooling
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-slate-50 border border-hairline font-mono text-xs font-semibold text-ink"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-ink uppercase tracking-wider text-xs mb-1">
                Deliverables for Your Portfolio
              </h4>
              <ul className="space-y-1.5">
                {selectedProject.deliverables.map((del, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-ink uppercase tracking-wider text-xs mb-1">
                Learning Outcomes
              </h4>
              <ul className="space-y-1.5">
                {selectedProject.learningOutcomes.map((out, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-hairline flex items-center justify-between">
              <div>
                <p className="text-xs text-muted">Direct Mentor:</p>
                <p className="font-bold text-ink">{selectedProject.mentor}</p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setSelectedProject(null)}
                >
                  Close
                </Button>
                <Button
                  variant="cta"
                  onClick={() => handleApply(selectedProject)}
                  className="font-semibold"
                >
                  Confirm Enrollment
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
