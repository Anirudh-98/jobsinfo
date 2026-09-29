"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";
import { CheckCircle2, FileText, Upload, Sparkles } from "lucide-react";

export const QuickApplyModal: React.FC = () => {
  const {
    isQuickApplyOpen,
    setIsQuickApplyOpen,
    selectedJobForModal,
    setSelectedJobForModal,
    user,
    applyToJob
  } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [coverNote, setCoverNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isQuickApplyOpen || !selectedJobForModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const success = applyToJob(selectedJobForModal, { name, email, phone });
      setIsSubmitting(false);
      if (success) {
        setIsQuickApplyOpen(false);
        setSelectedJobForModal(null);
      }
    }, 600);
  };

  return (
    <Modal
      isOpen={isQuickApplyOpen}
      onClose={() => setIsQuickApplyOpen(false)}
      maxWidth="lg"
      title={
        <div>
          <span className="text-xs uppercase tracking-wider text-primary font-bold">1-Click Fast Apply</span>
          <h3 className="text-xl font-bold text-ink">Application for {selectedJobForModal.title}</h3>
          <p className="text-sm text-muted">{selectedJobForModal.company} • {selectedJobForModal.location}</p>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 rounded-md bg-blue-50/60 border border-blue-100 flex items-start gap-3">
          <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-ink-secondary">
            Your profile details and verified academic credentials will be transmitted directly to the campus hiring panel at{" "}
            <strong>{selectedJobForModal.company}</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-ink mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm rounded-sm border border-hairline focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm rounded-sm border border-hairline focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 text-sm rounded-sm border border-hairline focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Resume Preview */}
        <div>
          <label className="block text-xs font-semibold text-ink mb-1">Attached Resume</label>
          <div className="flex items-center justify-between p-3 rounded-sm border border-hairline bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded bg-primary-light text-primary flex items-center justify-center">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-ink">Rohit_Vangapalli_Resume_2026.pdf</p>
                <p className="text-[11px] text-muted">1.4 MB • Verified by College Placement Cell</p>
              </div>
            </div>
            <span className="text-xs text-primary font-medium flex items-center gap-1 cursor-pointer hover:underline">
              <Upload className="h-3 w-3" /> Replace
            </span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink mb-1">
            Brief Note or Relevant Experience (Optional)
          </label>
          <textarea
            rows={3}
            value={coverNote}
            onChange={(e) => setCoverNote(e.target.value)}
            placeholder="Highlight 1 or 2 reasons why you are excited about this role..."
            className="w-full px-3 py-2 text-sm rounded-sm border border-hairline focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="pt-3 border-t border-hairline flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsQuickApplyOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="cta"
            isLoading={isSubmitting}
            className="font-semibold shadow-elevation-resting hover:shadow-elevation-raised"
          >
            Submit Application
          </Button>
        </div>
      </form>
    </Modal>
  );
};
