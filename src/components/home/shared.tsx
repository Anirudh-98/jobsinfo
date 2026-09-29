"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/** Fades content up once it scrolls into view. Disabled by prefers-reduced-motion in globals.css. */
export const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children,
  className,
  delay = 0,
}) => {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      className={cn("reveal", inView && "reveal-in", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/** Counts from 0 to `value` when first visible. */
export const CountUp: React.FC<{ value: number; suffix?: string; duration?: number }> = ({
  value,
  suffix = "",
  duration = 1400,
}) => {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = reduced ? 1 : Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
};

export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-white/80 px-4 py-1.5 text-[13px] font-medium text-primary shadow-[0_6px_16px_-10px_rgba(37,99,235,0.5)] backdrop-blur",
      className
    )}
  >
    {children}
  </span>
);

export const SectionHeading: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: "center" | "left";
  id?: string;
}> = ({ eyebrow, title, sub, align = "center", id }) => (
  <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 id={id} className="mt-4 text-[28px] sm:text-[36px] font-bold leading-[1.15] tracking-[-0.02em] text-ink text-balance">
      {title}
    </h2>
    {sub && <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-body text-pretty">{sub}</p>}
  </div>
);
