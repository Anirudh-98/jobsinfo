"use client";

import React from "react";
import { ShieldCheck, CreditCard, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const PaymentsSimplifiedSection: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Guaranteed Escrow Protection",
      description:
        "Every hire and project contract is backed by verified escrow, ensuring timely payment upon deliverable milestone approval.",
    },
    {
      icon: CreditCard,
      title: "Direct Multi-Rail Payouts",
      description:
        "Instant settlement via direct deposit, UPI, and international wire transfers with transparent fee breakdown.",
    },
    {
      icon: Clock,
      title: "Automated Invoicing & Taxes",
      description:
        "Seamless generation of tax-compliant GST/TDS invoices with one-click export for accountants and candidates.",
    },
  ];

  return (
    <section className="w-full bg-[#f0f7ff] border-y border-hairline py-16 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Column: Headlines & Call to action */}
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full mb-4">
              Financial Transparency
            </span>
            <h2 className="text-3xl sm:text-[32px] font-bold text-ink leading-tight tracking-tight">
              Payments Simplified for Recruiters &amp; Candidates
            </h2>
            <p className="mt-4 text-[16px] text-body leading-relaxed">
              Quietly eliminates uncertainty from hiring contracts and freelance projects. Experience transparent compensation benchmarks, instant milestone verification, and frictionless payouts.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link href="/jobs">
                <Button variant="primary" size="md">
                  Explore Verified Roles
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" size="md">
                  Learn How Escrow Works
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Feature Cards */}
          <div className="w-full lg:max-w-lg space-y-3.5">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 sm:p-5 rounded-sm bg-white border border-hairline shadow-rest hover:shadow-hover transition-all duration-200"
                >
                  <div className="h-10 w-10 min-h-[40px] min-w-[40px] rounded-sm bg-primary-light text-primary flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-ink leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-[14px] text-body-secondary mt-1 leading-snug">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
