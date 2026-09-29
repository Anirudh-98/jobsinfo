import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, Sparkles, Target } from "lucide-react";
import { PageHeaderBand } from "@/components/common/PageHeaderBand";
import { Button } from "@/components/ui/Button";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Verified Openings Only",
    description: "Every job, placement drive, and corporate partner is rigorously verified. Zero spam or ghost postings.",
  },
  {
    icon: Users,
    title: "Accessible to Everyone",
    description: "Built for every candidate — from tier-2/3 college freshers to experienced leads looking for their next milestone.",
  },
  {
    icon: Sparkles,
    title: "Outcome-Driven Programs",
    description: "Courses, mock scorecards, and live masterclasses built around what recruiters actually test for in interviews.",
  },
  {
    icon: Target,
    title: "Regional Focus, Global Quality",
    description: "Designed specifically for Hyderabad and Telangana's expanding tech, life sciences, and corporate ecosystem.",
  },
];

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-canvas pb-20 text-ink">
      <PageHeaderBand
        kicker="About Us"
        title="Connecting careers with opportunity across Telangana"
        subtitle="Quietly is a modern career and business ecosystem for students, job seekers, MBA cohorts, employers, colleges, and mentors — all in one transparent place."
      />

      {/* Our Story */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full mb-3 inline-block">
              Our Story
            </span>
            <h2 className="text-display-md sm:text-display-lg font-bold text-ink leading-tight">
              Built to close Hyderabad&apos;s campus-to-career gap
            </h2>
            <p className="mt-4 text-body-lg text-body leading-relaxed">
              Quietly started as an MBA placement portal connecting Hyderabad colleges with local employers. Today it has grown into a full hiring ecosystem — 28 partner organizations, 4,053+ active vacancies, HR interview training, live masterclasses, real-time project mentorship, and escrow guarantees.
            </p>
            <p className="mt-4 text-body-lg text-body leading-relaxed">
              We measure success the same way we did on day one: did the candidate on the other end of the screen gain transparent clarity and get closer to a real offer?
            </p>
          </div>
          <div className="relative rounded-sm overflow-hidden min-h-[280px] sm:min-h-[360px] border border-hairline shadow-rest">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Quietly team at work"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Impact stats */}
      <div className="bg-surface-soft border-y border-hairline py-14 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { value: "4,053+", label: "Active verified vacancies" },
            { value: "28", label: "Partner organizations" },
            { value: "12,500+", label: "Candidates placed" },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-sm bg-canvas border border-hairline shadow-rest">
              <p className="text-3xl sm:text-4xl font-bold text-ink tabular-nums">{stat.value}</p>
              <p className="text-xs text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-14 sm:py-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full mb-3 inline-block">
            What we believe
          </span>
          <h2 className="text-display-md sm:text-display-lg font-bold text-ink leading-tight">
            The principles behind the platform
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="rounded-sm bg-canvas border border-hairline shadow-rest p-6 hover:shadow-hover transition-all duration-200">
                <div className="h-10 w-10 rounded-sm bg-primary-light text-primary flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-[18px] font-semibold text-ink leading-tight">{value.title}</h3>
                <p className="text-[14px] text-body-secondary mt-1.5 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA band */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="rounded-sm bg-[#111827] text-white p-8 sm:p-12 text-center shadow-rest">
          <h2 className="text-display-md sm:text-display-lg font-bold tracking-tight">
            Ready to find your next opportunity?
          </h2>
          <p className="mt-2 text-body-md text-white/70 max-w-md mx-auto">
            Join thousands of candidates and 28 hiring partners already active on Quietly.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/jobs">
              <Button variant="primary" size="md">
                <span>Browse Vacancies</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="md" className="bg-transparent text-white border-white hover:bg-white/10 hover:text-white">
                <span>Contact Team</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
