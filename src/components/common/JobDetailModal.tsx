"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";
import {
  MapPin,
  Briefcase,
  Calendar,
  Building2,
  CheckCircle2,
  Bookmark,
  Share2,
  DollarSign,
  Users
} from "lucide-react";

export const JobDetailModal: React.FC = () => {
  const {
    selectedJobForModal,
    setSelectedJobForModal,
    isQuickApplyOpen,
    setIsQuickApplyOpen,
    savedJobIds,
    toggleSaveJob,
    applications,
    showToast,
  } = useApp();

  if (!selectedJobForModal || isQuickApplyOpen) return null;

  const isSaved = savedJobIds.includes(selectedJobForModal.id);
  const isApplied = applications.some((app) => app.jobId === selectedJobForModal.id);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast("Job link copied to clipboard!");
  };

  return (
    <Modal
      isOpen={!!selectedJobForModal && !isQuickApplyOpen}
      onClose={() => setSelectedJobForModal(null)}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-hairline">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-md bg-primary text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
              {selectedJobForModal.company.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-ink">
                  {selectedJobForModal.title}
                </h2>
                {selectedJobForModal.featured && (
                  <Badge variant="dark">Verified</Badge>
                )}
                {selectedJobForModal.mbaRelevant && (
                  <Badge variant="default">MBA Cohort Priority</Badge>
                )}
              </div>
              <p className="text-sm font-semibold text-primary mt-1 flex items-center gap-1.5">
                <Building2 className="h-4 w-4" /> {selectedJobForModal.company}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => toggleSaveJob(selectedJobForModal.id)}
              className={`p-2 rounded-sm border transition-colors cursor-pointer ${
                isSaved
                  ? "bg-accent text-white border-accent"
                  : "bg-white text-ink border-hairline hover:border-slate-300"
              }`}
              title={isSaved ? "Remove from bookmarks" : "Save job"}
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-sm bg-white text-ink border border-hairline hover:border-slate-300 transition-colors cursor-pointer"
              title="Share job"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick Meta Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-md bg-slate-50 border border-hairline text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            <div>
              <p className="text-muted">Location</p>
              <p className="font-semibold text-ink">{selectedJobForModal.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary shrink-0" />
            <div>
              <p className="text-muted">Salary Range</p>
              <p className="font-semibold text-ink">{selectedJobForModal.salary}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary shrink-0" />
            <div>
              <p className="text-muted">Experience</p>
              <p className="font-semibold text-ink">{selectedJobForModal.experience}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary shrink-0" />
            <div>
              <p className="text-muted">Openings</p>
              <p className="font-semibold text-ink">{selectedJobForModal.openings} positions</p>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-4 text-sm text-ink-secondary leading-relaxed">
          <div>
            <h4 className="text-sm font-bold text-ink uppercase tracking-wider mb-2">About the Role</h4>
            <p>{selectedJobForModal.description}</p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-ink uppercase tracking-wider mb-2">Key Responsibilities</h4>
            <ul className="space-y-1.5">
              {selectedJobForModal.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-ink uppercase tracking-wider mb-2">Requirements & Eligibility</h4>
            <ul className="space-y-1.5">
              {selectedJobForModal.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-ink uppercase tracking-wider mb-2">Benefits & Growth Perks</h4>
            <div className="flex flex-wrap gap-2">
              {selectedJobForModal.perks.map((perk, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-slate-100 text-xs font-medium text-ink-secondary border border-hairline"
                >
                  ✦ {perk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-4 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-3 bg-white">
          <p className="text-xs text-muted flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> Posted {selectedJobForModal.datePosted}
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="secondary"
              onClick={() => setSelectedJobForModal(null)}
              className="flex-1 sm:flex-none"
            >
              Close
            </Button>
            {isApplied ? (
              <Button disabled variant="secondary" className="flex-1 sm:flex-none bg-emerald-50 text-emerald-700 border-emerald-200">
                <CheckCircle2 className="h-4 w-4 mr-1.5" /> Already Applied
              </Button>
            ) : (
              <Button
                variant="cta"
                onClick={() => setIsQuickApplyOpen(true)}
                className="flex-1 sm:flex-none font-semibold shadow-elevation-raised"
              >
                Apply to {selectedJobForModal.company}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
