"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { PageHeaderBand } from "@/components/common/PageHeaderBand";
import { Button } from "@/components/ui/Button";

const FAQ_CATEGORIES = [
  {
    category: "For Candidates & Students",
    items: [
      {
        q: "How do I apply for a job or placement drive?",
        a: "Find a job that matches your profile and click 'Apply Now'. Complete your contact details, upload your CV, and your application is routed directly to the recruiter's panel.",
      },
      {
        q: "Is there any fee to use Quietly as a job seeker?",
        a: "No. Applying for jobs, attending placement drives, and watching live masterclasses on Quietly is 100% free for candidates.",
      },
      {
        q: "How do I book a mentor session?",
        a: "Navigate to the Mentors page, select an advisor, and choose an available date and time slot. You'll receive a confirmation email with calendar and video meeting links.",
      },
    ],
  },
  {
    category: "For Colleges & Placement Cells",
    items: [
      {
        q: "How does my college join the MBA Placement consortium?",
        a: "Reach out via our Contact page or register your placement cell directly on the MBA Placement portal. Our team will verify your institutional credentials and set up your student tracking dashboard.",
      },
      {
        q: "Can we run exclusive campus drives through Quietly?",
        a: "Yes. Employers can host private drives open only to students of your college or open them to regional partner institutions.",
      },
    ],
  },
  {
    category: "For Employers & Recruiters",
    items: [
      {
        q: "How do I post a verified opening?",
        a: "Submit your company registration and job details. Postings are verified within 2 hours by our team to maintain platform quality.",
      },
      {
        q: "How do candidate scorecards work?",
        a: "Candidates completing our HR Solutions modules receive structured performance scorecards across problem-solving, domain knowledge, and communication.",
      },
    ],
  },
];

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen bg-canvas pb-20 text-ink">
      <PageHeaderBand
        kicker="Support"
        title="How can we help?"
        subtitle="Answers to the questions candidates, colleges, and employers ask us most."
      />

      <div className="max-w-[780px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-10">
        {FAQ_CATEGORIES.map((cat) => (
          <div key={cat.category}>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider bg-primary-light px-3 py-1 rounded-full mb-4 inline-block">
              {cat.category}
            </span>
            <div className="rounded-sm bg-canvas border border-hairline divide-y divide-hairline shadow-rest overflow-hidden">
              {cat.items.map((item) => {
                const id = `${cat.category}-${item.q}`;
                const isOpen = openIndex === id;
                return (
                  <div key={id}>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : id)}
                      className="w-full min-h-[52px] flex items-center justify-between gap-4 text-left px-5 py-4 cursor-pointer hover:bg-surface-soft transition-colors"
                    >
                      <span className="text-[15px] font-semibold text-ink">{item.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-muted shrink-0 transition-transform ${isOpen ? "rotate-180 text-primary" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-[14px] text-body-secondary leading-relaxed bg-surface-soft/50">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="rounded-sm bg-[#111827] text-white p-8 text-center shadow-rest">
          <h2 className="text-display-sm sm:text-display-md font-bold tracking-tight">
            Still need help?
          </h2>
          <p className="mt-2 text-body-md text-white/70">
            Our support team responds within 1 business day.
          </p>
          <Link href="/contact" className="inline-block mt-5">
            <Button variant="primary" size="md">
              <span>Contact Support</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
