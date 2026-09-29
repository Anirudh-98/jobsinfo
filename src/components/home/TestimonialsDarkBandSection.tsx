"use client";

import React from "react";
import { TestimonialCard } from "@/components/quietly/TestimonialCard";

export const TestimonialsDarkBandSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        "Through Quietly's verified placement cohort, I secured a Product Analyst role at Salesforce within 3 weeks of graduating.",
      authorName: "Ananya Deshmukh",
      authorTitle: "Product Analyst",
      companyOrCollege: "Salesforce (IBS Hyderabad '25)",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote:
        "The milestone verification and transparent scorecards make Quietly our primary channel for recruiting vetted software engineers in Hyderabad.",
      authorName: "Sanjay Varma",
      authorTitle: "VP of Engineering",
      companyOrCollege: "Phenom People",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote:
        "Quietly transformed how our business school orchestrates campus recruitment. 100% of our cohort accessed transparent offers.",
      authorName: "Dr. P. Radhakrishna",
      authorTitle: "Dean of Corporate Relations",
      companyOrCollege: "Vishwa Vishwani Institute",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote:
        "Zero clutter, clean UI, and fast feedback loops. The mock HR scorecard gave me the exact confidence needed for technical rounds.",
      authorName: "Karthik Reddy",
      authorTitle: "Cloud DevOps Associate",
      companyOrCollege: "Cognizant",
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <section className="w-full bg-[#111827] text-white py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-light bg-white/10 px-3 py-1 rounded-full mb-3 inline-block">
            Verified Outcomes
          </span>
          <h2 className="text-3xl sm:text-[32px] font-bold text-white tracking-tight leading-tight">
            Trusted by Candidates, Colleges &amp; Employers
          </h2>
          <p className="mt-3 text-[16px] text-white/70">
            See how the Quietly ecosystem is accelerating career journeys and transparent hiring.
          </p>
        </div>

        {/* 4-Column Desktop Grid / 2-Column Tablet / 1-Column Mobile with 16px Gutter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((t, idx) => (
            <TestimonialCard
              key={idx}
              quote={t.quote}
              authorName={t.authorName}
              authorTitle={t.authorTitle}
              companyOrCollege={t.companyOrCollege}
              avatarUrl={t.avatarUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
