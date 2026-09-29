import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COMPANIES_DATA } from "@/data/mockData";

export const OrganizationsSpotlight: React.FC = () => {
  const featured = COMPANIES_DATA.slice(0, 6);

  return (
    <section className="w-full bg-canvas-warm py-16 sm:py-20 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold text-accent-warm uppercase tracking-[0.14em] mb-3">
              What sets us apart
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink-display tracking-tight">
              28 organizations hiring right now
            </h2>
            <p className="mt-2 text-sm text-muted max-w-md">
              4,053 verified openings across Hyderabad and Telangana — 292 new vacancies posted today alone.
            </p>
          </div>
          <Link href="/mba-placement" className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-display shrink-0">
            View all organizations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {featured.map((company) => (
            <div key={company.id} className="rounded-lg bg-white p-4 text-center">
              <div
                className="h-10 w-10 rounded-full mx-auto flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: company.color }}
              >
                {company.logoText}
              </div>
              <p className="text-xs font-bold text-ink-display mt-2.5 truncate">{company.name}</p>
              <p className="text-[11px] text-muted mt-0.5">{company.vacancies} openings</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
