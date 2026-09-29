"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";
import { Star, Clock, Video, CheckCircle2, Shield } from "lucide-react";

export const MentorBookingModal: React.FC = () => {
  const {
    isMentorBookingOpen,
    closeMentorBooking,
    selectedMentor,
    bookMentorSession,
  } = useApp();

  const [selectedDay, setSelectedDay] = useState("Sept 21, Sat");
  const [selectedTime, setSelectedTime] = useState("4:00 PM IST");
  const [sessionTopic, setSessionTopic] = useState("1:1 Mock HR Interview & Scorecard");
  const [candidateNotes, setCandidateNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isMentorBookingOpen || !selectedMentor) return null;

  const dates = [
    { label: "Fri, Sep 20", value: "Sept 20, Fri" },
    { label: "Sat, Sep 21", value: "Sept 21, Sat" },
    { label: "Sun, Sep 22", value: "Sept 22, Sun" },
    { label: "Mon, Sep 23", value: "Sept 23, Mon" },
    { label: "Wed, Sep 25", value: "Sept 25, Wed" },
  ];

  const timeSlots = [
    "10:30 AM IST",
    "2:00 PM IST",
    "4:00 PM IST",
    "6:30 PM IST",
    "8:00 PM IST",
  ];

  const topics = [
    "1:1 Mock HR Interview & Scorecard",
    "Executive Resume & Portfolio Review",
    "Corporate Salary Negotiation Strategy",
    "System Design & Technical Deep-Dive",
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      bookMentorSession({
        date: selectedDay,
        time: selectedTime,
        topic: sessionTopic,
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <Modal
      isOpen={isMentorBookingOpen}
      onClose={closeMentorBooking}
      maxWidth="2xl"
      title={
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-ink text-white font-bold text-sm flex items-center justify-center">
            {selectedMentor.avatarText}
          </div>
          <div>
            <h3 className="text-xl font-bold text-ink">Book Mentorship Session</h3>
            <p className="text-xs text-muted">
              {selectedMentor.name} • {selectedMentor.role} at {selectedMentor.company}
            </p>
          </div>
        </div>
      }
    >
      <form onSubmit={handleBooking} className="space-y-5">
        {/* Mentor Overview Bar */}
        <div className="flex items-center justify-between p-3.5 rounded-md bg-slate-50 border border-hairline text-xs">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-ink fill-current" />
            <span className="font-semibold text-ink">{selectedMentor.rating}</span>
            <span className="text-muted">({selectedMentor.reviewsCount} reviews)</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-muted">45 mins 1:1 Video</span>
          </div>
          <div className="font-bold text-ink text-sm">
            {selectedMentor.hourlyRate}
          </div>
        </div>

        {/* Select Session Type */}
        <div>
          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
            1. Select Session Focus Area
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {topics.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSessionTopic(t)}
                className={`p-2.5 rounded-sm border text-xs text-left font-medium transition-all cursor-pointer ${
                  sessionTopic === t
                    ? "border-primary bg-blue-50/60 text-primary font-semibold shadow-xs"
                    : "border-hairline bg-white text-ink hover:border-slate-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
            2. Choose Date
          </label>
          <div className="flex flex-wrap gap-2">
            {dates.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => setSelectedDay(d.value)}
                className={`px-3 py-2 rounded-sm text-xs font-medium border transition-colors cursor-pointer ${
                  selectedDay === d.value
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-white text-ink border-hairline hover:border-slate-300"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
            3. Choose Time Slot
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {timeSlots.map((ts) => (
              <button
                key={ts}
                type="button"
                onClick={() => setSelectedTime(ts)}
                className={`py-2 px-1 text-center rounded-sm text-xs font-medium border transition-colors cursor-pointer ${
                  selectedTime === ts
                    ? "bg-ink text-white border-ink shadow-xs"
                    : "bg-white text-ink border-hairline hover:border-slate-300"
                }`}
              >
                {ts}
              </button>
            ))}
          </div>
        </div>

        {/* Candidate Context */}
        <div>
          <label className="block text-xs font-semibold text-ink mb-1">
            Questions or target company for the mentor (optional)
          </label>
          <input
            type="text"
            value={candidateNotes}
            onChange={(e) => setCandidateNotes(e.target.value)}
            placeholder="e.g. Preparing for Deloitte FP&A interview round next week..."
            className="w-full px-3 py-2 text-sm rounded-sm border border-hairline focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="p-3 rounded-sm bg-slate-50 border border-hairline flex items-center justify-between text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <Video className="h-4 w-4 text-primary" /> Google Meet link will be emailed automatically
          </span>
          <span className="flex items-center gap-1">
            <Shield className="h-3.5 w-3.5 text-emerald-600" /> 100% Satisfaction Guarantee
          </span>
        </div>

        <div className="pt-2 border-t border-hairline flex items-center justify-end gap-3">
          <Button type="button" variant="secondary" onClick={closeMentorBooking}>
            Cancel
          </Button>
          <Button type="submit" variant="cta" isLoading={isSubmitting} className="font-semibold shadow-elevation-resting">
            Confirm Booking ({selectedDay})
          </Button>
        </div>
      </form>
    </Modal>
  );
};
