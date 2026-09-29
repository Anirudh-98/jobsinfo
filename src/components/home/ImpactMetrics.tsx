import React from "react";

export const ImpactMetrics: React.FC = () => {
  const stats = [
    { value: "4,053+", label: "Active job seekers use JobsInfo daily to grow their careers.", variant: "light" as const },
    { value: "28", label: "From startups to global enterprises, trusted employers post jobs on JobsInfo.", variant: "dark" as const },
    { value: "95%", label: "Our smart tools simplify the hiring journey for seekers and recruiters.", variant: "light" as const },
  ];

  return (
    <section className="w-full bg-canvas-warm py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-bold text-accent-warm mb-3">Who We Are</p>
        <p className="text-lg sm:text-xl text-ink-secondary leading-relaxed">
          At JobsInfo.world, we&apos;re redefining how people find jobs and how companies discover talent. Our mission is to make job searching simple, efficient, and empowering — connecting professionals with opportunities that match their skills and aspirations.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-xl p-6 text-left ${
                stat.variant === "dark"
                  ? "bg-accent-warm text-white sm:scale-105 shadow-elevation-raised"
                  : "bg-white text-ink-display"
              }`}
            >
              <p className="font-display text-3xl sm:text-4xl font-semibold tabular-nums">
                {stat.value}
              </p>
              <p className={`mt-2 text-xs leading-snug ${stat.variant === "dark" ? "text-white/85" : "text-muted"}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
