"use client";

import React, { useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { APPLICATIONS_BY_MONTH, SOURCES, TIME_TO_HIRE_DAYS } from "@/data/employerData";
import { useEmployer } from "@/components/employer/EmployerStore";
import { cn } from "@/lib/utils";

// Categorical order validated with the dataviz palette checker (CVD + contrast); colour follows the source, never its rank.
const SOURCE_COLORS = ["#2563eb", "#f97316", "#0d9488", "#a855f7"];

const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);

const Card: React.FC<{ title: string; sub?: string; children: React.ReactNode; table: React.ReactNode; className?: string }> = ({
  title,
  sub,
  children,
  table,
  className,
}) => (
  <section className={cn("card-soft p-4 sm:p-6", className)} aria-label={title}>
    <h2 className="text-[16px] font-semibold text-ink">{title}</h2>
    {sub && <p className="mt-0.5 text-[12.5px] text-body">{sub}</p>}
    <div className="mt-5">{children}</div>
    <details className="mt-4 text-[12.5px] text-body">
      <summary className="cursor-pointer font-medium text-primary">View as table</summary>
      <div className="mt-2 overflow-x-auto">{table}</div>
    </details>
  </section>
);

const DataTable: React.FC<{ head: [string, string]; rows: [string, string | number][] }> = ({ head, rows }) => (
  <table className="w-full text-left">
    <thead>
      <tr className="border-b border-hairline text-muted">
        <th className="py-1.5 font-medium">{head[0]}</th>
        <th className="py-1.5 text-right font-medium">{head[1]}</th>
      </tr>
    </thead>
    <tbody>
      {rows.map(([k, v]) => (
        <tr key={k} className="border-b border-hairline/60">
          <td className="py-1.5">{k}</td>
          <td className="py-1.5 text-right tabular-nums text-ink">{v}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const Kpi: React.FC<{ label: string; value: string; delta?: { text: string; good: boolean }; note: string }> = ({ label, value, delta, note }) => (
  <div className="card-soft p-4 sm:p-5">
    <p className="text-[12.5px] font-medium text-ink-light">{label}</p>
    <p className="mt-2 text-[28px] font-bold leading-none tracking-tight tabular-nums text-ink">{value}</p>
    <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[11.5px] text-muted">
      {delta && (
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-semibold",
            delta.good ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}
        >
          {delta.good ? <TrendingUp className="h-3 w-3" aria-hidden /> : <TrendingDown className="h-3 w-3" aria-hidden />}
          {delta.text}
        </span>
      )}
      {note}
    </p>
  </div>
);

/* Applications per month: single-series column chart with a per-bar hover tooltip. */
const MonthlyChart: React.FC = () => {
  const data = APPLICATIONS_BY_MONTH;
  const max = Math.ceil(Math.max(...data.map((d) => d.value)) / 100) * 100;
  const ticks = [max, max / 2, 0];
  const [hover, setHover] = useState<number | null>(null);
  const last = data.length - 1;

  return (
    <div className="flex">
      <div className="relative h-[200px] w-9 shrink-0 text-[10.5px] tabular-nums text-muted" aria-hidden>
        {ticks.map((t, k) => (
          <span key={t} className="absolute left-0 -translate-y-1/2" style={{ top: `${(k / (ticks.length - 1)) * 100}%` }}>
            {t}
          </span>
        ))}
      </div>
      <div className="relative min-w-0 flex-1">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[200px]" aria-hidden>
          {ticks.map((t, k) => (
            <span
              key={t}
              className={cn("absolute inset-x-0 border-t", k === ticks.length - 1 ? "border-hairline" : "border-dashed border-hairline/70")}
              style={{ top: `${(k / (ticks.length - 1)) * 100}%` }}
            />
          ))}
        </div>
        <div className="relative flex gap-2 sm:gap-4" onMouseLeave={() => setHover(null)}>
          {data.map((d, i) => {
            const active = hover === i;
            return (
              <div
                key={d.label}
                tabIndex={0}
                role="img"
                aria-label={`${d.label}: ${d.value} applications`}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                className="group relative flex min-w-0 flex-1 cursor-default flex-col items-center outline-none"
              >
                <div className="flex h-[200px] w-full items-end justify-center">
                  <div
                    className={cn(
                      "w-full max-w-[44px] rounded-t-[4px] transition-colors",
                      active || (hover === null && i === last) ? "bg-primary" : "bg-primary/35 group-focus-visible:bg-primary"
                    )}
                    style={{ height: `${(d.value / max) * 100}%` }}
                  />
                </div>
                <span className={cn("mt-2 text-[11px]", i === last ? "font-semibold text-ink" : "text-muted")}>{d.label}</span>
                {/* Direct label on the latest month only */}
                {i === last && hover === null && (
                  <span className="absolute text-[11.5px] font-semibold tabular-nums text-ink" style={{ bottom: `calc(${(d.value / max) * 200}px + 1.9rem)` }}>
                    {d.value}
                  </span>
                )}
                {active && (
                  <span
                    className="pointer-events-none absolute z-10 whitespace-nowrap rounded-lg border border-hairline bg-white px-2.5 py-1.5 text-[11.5px] shadow-[0_12px_24px_-12px_rgba(15,23,42,0.35)]"
                    style={{ bottom: `calc(${(d.value / max) * 200}px + 2rem)` }}
                  >
                    <b className="tabular-nums text-ink">{d.value}</b> <span className="text-body">applications · {d.label}</span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* Hiring funnel from the live pipeline: magnitude, one hue. */
const Funnel: React.FC<{ steps: { label: string; value: number }[] }> = ({ steps }) => {
  const top = steps[0]?.value || 1;
  return (
    <ul className="space-y-3">
      {steps.map((s, i) => (
        <li key={s.label} className="grid grid-cols-[96px_minmax(0,1fr)_auto] items-center gap-3 sm:grid-cols-[120px_minmax(0,1fr)_auto]">
          <span className="text-[12.5px] text-ink-light">{s.label}</span>
          <span className="h-3 rounded-r-[4px] bg-surface-soft" title={`${s.label}: ${s.value}`}>
            <span className="block h-3 rounded-r-[4px] bg-primary" style={{ width: `${Math.max((s.value / top) * 100, s.value ? 2 : 0)}%` }} />
          </span>
          <span className="w-[92px] text-right text-[12.5px] tabular-nums text-body">
            <b className="font-semibold text-ink">{s.value}</b>
            {i > 0 && <span className="text-muted"> · {pct(s.value, steps[i - 1].value)}%</span>}
          </span>
        </li>
      ))}
    </ul>
  );
};

/* Share of hires by source: one 100% bar, 2px gaps, every segment labelled in the legend. */
const SourceBar: React.FC = () => {
  const total = SOURCES.reduce((s, d) => s + d.value, 0);
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div>
      <div className="relative flex h-4 gap-[2px]" onMouseLeave={() => setHover(null)}>
        {SOURCES.map((s, i) => (
          <span
            key={s.label}
            tabIndex={0}
            role="img"
            aria-label={`${s.label}: ${pct(s.value, total)}%`}
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            className={cn("h-full outline-none transition-opacity first:rounded-l-[4px] last:rounded-r-[4px]", hover !== null && hover !== i && "opacity-40")}
            style={{ width: `${(s.value / total) * 100}%`, background: SOURCE_COLORS[i] }}
          />
        ))}
        {hover !== null && (
          <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-hairline bg-white px-2.5 py-1.5 text-[11.5px] shadow-[0_12px_24px_-12px_rgba(15,23,42,0.35)]">
            <b className="text-ink">{SOURCES[hover].label}</b> <span className="text-body">· {pct(SOURCES[hover].value, total)}% of candidates</span>
          </span>
        )}
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {SOURCES.map((s, i) => (
          <li key={s.label} className="flex items-center gap-2 text-[12.5px] text-body">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: SOURCE_COLORS[i] }} aria-hidden />
            {s.label}
            <span className="ml-auto font-semibold tabular-nums text-ink">{pct(s.value, total)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ReportsView: React.FC = () => {
  const { candidates, jobs } = useEmployer();
  const applicants = candidates.filter((c) => c.jobId);
  const reached = (stages: string[]) => applicants.filter((c) => stages.includes(c.stage)).length;
  const steps = [
    { label: "Applied", value: applicants.length },
    { label: "Shortlisted", value: reached(["shortlisted", "interview", "offered", "hired"]) },
    { label: "Interviewed", value: reached(["interview", "offered", "hired"]) },
    { label: "Offered", value: reached(["offered", "hired"]) },
    { label: "Hired", value: reached(["hired"]) },
  ];
  const offers = candidates.filter((c) => c.offer);
  const decided = offers.filter((c) => c.offer!.status !== "Pending");
  const accepted = decided.filter((c) => c.offer!.status === "Accepted").length;
  const [prev, now] = APPLICATIONS_BY_MONTH.slice(-2);
  const appDelta = pct(now.value - prev.value, prev.value);
  const tthDelta = TIME_TO_HIRE_DAYS.current - TIME_TO_HIRE_DAYS.previous;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Applications this month" value={String(now.value)} delta={{ text: `${appDelta >= 0 ? "+" : ""}${appDelta}%`, good: appDelta >= 0 }} note={`vs ${prev.label}`} />
        <Kpi label="Offer acceptance" value={`${pct(accepted, decided.length)}%`} note={`${accepted} of ${decided.length} decided offers`} />
        <Kpi
          label="Time to hire"
          value={`${TIME_TO_HIRE_DAYS.current} days`}
          delta={{ text: `${tthDelta} days`, good: tthDelta <= 0 }}
          note="vs last quarter"
        />
        <Kpi label="Active jobs" value={String(jobs.filter((j) => j.status === "Active").length)} note={`${jobs.length} posted in total`} />
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-2">
        <Card
          title="Applications per month"
          sub="Across all your job postings"
          table={<DataTable head={["Month", "Applications"]} rows={APPLICATIONS_BY_MONTH.map((d) => [d.label, d.value])} />}
        >
          <MonthlyChart />
        </Card>
        <Card
          title="Hiring funnel"
          sub="Live from your pipeline · % is conversion from the previous step"
          table={<DataTable head={["Stage", "Candidates"]} rows={steps.map((s) => [s.label, s.value])} />}
        >
          <Funnel steps={steps} />
        </Card>
      </div>

      <Card
        title="Candidates by source"
        sub="Where this year's applicants found you"
        table={<DataTable head={["Source", "Share"]} rows={SOURCES.map((s) => [s.label, `${s.value}%`])} />}
      >
        <SourceBar />
      </Card>
    </div>
  );
};
