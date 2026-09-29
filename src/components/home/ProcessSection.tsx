import React from "react";
import { CheckCircle2, Upload, CalendarClock } from "lucide-react";

export const ProcessSection: React.FC = () => {
  return (
    <section className="w-full bg-canvas-warm py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-10">
          <p className="text-xs font-bold text-accent-warm uppercase tracking-[0.14em] mb-3">
            How it works
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink-display tracking-tight uppercase">
            Effortless Process, Exceptional Results
          </h2>
          <p className="mt-2 text-sm text-muted">
            Our streamlined approach consistently delivers standout results with clarity and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Complete your profile — checklist card */}
          <div className="rounded-xl bg-white p-6">
            <ul className="space-y-3">
              {[
                { label: "Curriculum Vitae", meta: "PDF" },
                { label: "Personal Data", meta: "Text file" },
                { label: "Academic Information", meta: "Text file/PDF" },
              ].map((row) => (
                <li key={row.label} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-semibold text-ink-display">{row.label}</p>
                    <p className="text-xs text-muted">{row.meta}</p>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-hairline">
              <p className="text-sm font-bold text-ink-display">Complete Your Profile</p>
              <p className="text-xs text-muted mt-1">
                To increase your chances of catching the attention of recruiters.
              </p>
            </div>
          </div>

          {/* Portfolio upload — orange gradient dominant card */}
          <div className="rounded-xl bg-accent-warm text-white p-6 flex flex-col justify-between">
            <div className="h-20 w-20 rounded-full bg-white/15 flex items-center justify-center mx-auto">
              <Upload className="h-8 w-8" />
            </div>
            <div className="mt-6">
              <p className="text-sm font-bold">Directly Portfolio Upload</p>
              <p className="text-xs text-white/80 mt-1">
                To increase your chances of capturing the interest of recruiters, uploading your portfolio is essential.
              </p>
            </div>
          </div>

          {/* Scheduling & interview — calendar card */}
          <div className="rounded-xl bg-white p-6">
            <div className="flex items-center gap-2 text-ink-display">
              <CalendarClock className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wide text-muted">September</span>
            </div>
            <div className="mt-3 rounded-lg bg-canvas-warm p-3 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center text-xs font-bold text-ink-display shrink-0">
                JD
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-ink-display truncate">Upcoming Interview</p>
                <p className="text-[11px] text-muted">Wednesday · 10:30 AM</p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-hairline">
              <p className="text-sm font-bold text-ink-display">Scheduling &amp; Interview Select Candidate</p>
              <p className="text-xs text-muted mt-1">
                Easily schedule interviews for your selected candidates who fit your role perfectly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
