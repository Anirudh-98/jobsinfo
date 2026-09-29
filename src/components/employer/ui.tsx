"use client";

import React, { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { Stage } from "@/data/employerData";
import { cn } from "@/lib/utils";

export const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export const Avatar: React.FC<{ name: string; size?: "sm" | "md" | "lg" }> = ({ name, size = "md" }) => (
  <span
    className={cn(
      "grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-sky-400 font-bold text-white",
      size === "sm" && "h-8 w-8 text-[11px]",
      size === "md" && "h-10 w-10 text-[12px]",
      size === "lg" && "h-14 w-14 text-[16px]"
    )}
    aria-hidden
  >
    {initials(name)}
  </span>
);

const STAGE_STYLE: Record<Stage, [string, string]> = {
  applied: ["New", "bg-surface-soft text-body"],
  shortlisted: ["Shortlisted", "bg-primary-light text-primary"],
  interview: ["Interview", "bg-orange-50 text-orange-600"],
  offered: ["Offered", "bg-violet-50 text-violet-600"],
  hired: ["Hired", "bg-emerald-50 text-emerald-600"],
  rejected: ["Not selected", "bg-rose-50 text-rose-600"],
};

export const StageBadge: React.FC<{ stage: Stage }> = ({ stage }) => {
  const [label, tone] = STAGE_STYLE[stage];
  return <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold", tone)}>{label}</span>;
};

export const Pill: React.FC<{ children: React.ReactNode; tone?: "neutral" | "blue" | "green" | "amber" | "rose" }> = ({ children, tone = "neutral" }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
      tone === "neutral" && "border border-hairline text-body",
      tone === "blue" && "bg-primary-light text-primary",
      tone === "green" && "bg-emerald-50 text-emerald-600",
      tone === "amber" && "bg-amber-50 text-amber-700",
      tone === "rose" && "bg-rose-50 text-rose-600"
    )}
  >
    {children}
  </span>
);

export const Intro: React.FC<{ text: string; children?: React.ReactNode }> = ({ text, children }) => (
  <div className="card-soft flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
    <p className="max-w-2xl text-[13.5px] text-body">{text}</p>
    {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
  </div>
);

export const Empty: React.FC<{ icon: React.ElementType; title: string; text: string; children?: React.ReactNode }> = ({ icon: Icon, title, text, children }) => (
  <div className="card-soft px-6 py-14 text-center">
    <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary-light text-primary">
      <Icon className="h-5 w-5" aria-hidden />
    </span>
    <p className="mt-4 text-[15px] font-semibold text-ink">{title}</p>
    <p className="mt-1 text-[13px] text-body">{text}</p>
    {children && <div className="mt-5">{children}</div>}
  </div>
);

export const btnPrimary = "btn-gradient inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-full px-4 text-[12.5px] font-semibold cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";
export const btnSecondary = "btn-soft inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-full px-4 text-[12.5px] font-semibold cursor-pointer";
export const btnDanger = "inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-full border border-hairline bg-white px-4 text-[12.5px] font-semibold text-ink-light transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 cursor-pointer";
export const inputClass =
  "h-11 w-full rounded-xl border border-hairline bg-white px-3.5 text-[13.5px] text-ink outline-none transition-colors placeholder:text-muted hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/15";

export const Field: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({ label, children, className }) => (
  <label className={cn("block", className)}>
    <span className="text-[12.5px] font-medium text-ink-light">{label}</span>
    <span className="mt-1.5 block">{children}</span>
  </label>
);

// Centred modal with scrim, Escape to close, focus moved in and restored on close.
export const Dialog: React.FC<{
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  wide?: boolean;
}> = ({ title, onClose, children, footer, wide }) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("input, select, textarea, button:not([data-close])")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <div className="absolute inset-0 bg-[#0b1f4d]/40 backdrop-blur-sm animate-[panel-in_0.2s_ease-out]" onClick={onClose} aria-hidden />
      <div
        ref={panelRef}
        className={cn(
          "relative flex max-h-[calc(100dvh-1.5rem)] w-full flex-col overflow-hidden rounded-[24px] border border-white bg-white shadow-[0_40px_80px_-20px_rgba(15,23,42,0.45)] animate-[panel-in_0.25s_ease-out]",
          wide ? "max-w-2xl" : "max-w-lg"
        )}
      >
        <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-4 sm:px-6">
          <h2 id={titleId} className="text-[16px] font-semibold text-ink">
            {title}
          </h2>
          <button
            type="button"
            data-close
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface-soft hover:text-ink cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-5 sm:px-6">{children}</div>
        {footer && <div className="flex flex-wrap justify-end gap-2 border-t border-hairline bg-surface-soft/40 px-5 py-4 sm:px-6">{footer}</div>}
      </div>
    </div>
  );
};
