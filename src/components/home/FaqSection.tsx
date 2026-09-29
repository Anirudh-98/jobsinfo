"use client";

import React from "react";
import { FaqAccordion } from "@/components/quietly/FaqAccordion";

export const FaqSection: React.FC = () => {
  const faqItems = [
    {
      question: "How does Quietly verify employers and job circulars?",
      answer:
        "Every hiring partner on Quietly undergoes business registration checks and HR identity verification. We enforce salary transparency and ensure direct interview communication without third-party recruitment spam.",
    },
    {
      question: "Is Quietly free for job seekers and student placement cohorts?",
      answer:
        "Yes, Quietly is 100% free for candidates, students, and job seekers. You can apply for verified roles, join live masterclasses, and take basic HR assessments without any charges.",
    },
    {
      question: "What is the Payments Simplified escrow guarantee?",
      answer:
        "For contract and project-based hires, Quietly holds funds securely in escrow until agreed milestones are approved. Once verified, payments are disbursed immediately via direct bank transfer or UPI with zero withholding delays.",
    },
    {
      question: "How can colleges and MBA placement cells partner with Quietly?",
      answer:
        "Institutions can register their placement cell on our MBA Placement portal to gain unified access to pooled recruitment drives, student tracking dashboards, and automated interview scorecards.",
    },
    {
      question: "How do 1-on-1 mentor sessions work?",
      answer:
        "You can browse verified industry advisors by domain, select an available date, and book a focused session for resume reviews, behavioral HR prep, or compensation negotiation strategies.",
    },
  ];

  return (
    <section className="w-full bg-canvas py-16 border-t border-hairline">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full mb-3 inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="text-display-lg text-ink font-bold leading-[1.25]">
            Everything You Need to Know
          </h2>
          <p className="mt-2 text-body-lg text-body">
            Common questions about job applications, hiring verification, and escrow payments.
          </p>
        </div>

        <FaqAccordion items={faqItems} />
      </div>
    </section>
  );
};
