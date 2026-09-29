import React from "react";
import { MOCK_TESTIMONIALS } from "@/data/mockData";
import { Quote, Star, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";

export const SuccessStories: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-20 bg-canvas-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold text-accent-warm uppercase tracking-[0.14em] mb-3">
            Real Outcomes
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink-display tracking-tight">
            Trusted by Candidates, Colleges & Employers
          </h2>
          <p className="mt-2 text-sm text-muted">
            See how the JobsInfo.world ecosystem is accelerating careers and hiring across Telangana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TESTIMONIALS.map((item, index) => (
            <Card
              key={index}
              className="p-6 flex flex-col justify-between relative bg-white border-none shadow-none"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-accent-warm" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-ink-display bg-canvas-warm px-2.5 py-1 rounded-full">
                    {item.package}
                  </span>
                </div>

                <Quote className="h-6 w-6 text-slate-200 mb-2" />
                <p className="text-xs sm:text-sm text-ink-secondary italic leading-relaxed">
                  &quot;{item.quote}&quot;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-hairline flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-canvas-warm flex items-center justify-center font-bold text-xs text-ink-display">
                  {item.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-xs font-bold text-ink-display">{item.name}</p>
                  <p className="text-[11px] text-muted">{item.role}</p>
                  <p className="text-[10px] text-accent-warm font-medium flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="h-3 w-3" /> {item.college}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
