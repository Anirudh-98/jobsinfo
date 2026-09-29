"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Rocket, ClipboardList, GraduationCap, Star, Check, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ROLE_CTAS } from "@/data/homeContent";
import { Reveal, Eyebrow } from "@/components/home/shared";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ElementType> = {
  students: Rocket,
  employers: ClipboardList,
  colleges: GraduationCap,
  experts: Star,
};

export const RoleCtaSection: React.FC = () => {
  const { setIsAuthModalOpen, setAuthTab, setPersona } = useApp();

  return (
    <section className="px-4 sm:px-6 py-20 sm:py-28" aria-labelledby="cta-title">
      <Reveal className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#e8f0ff] via-[#f4f8ff] to-[#e0f2fe] px-5 py-14 sm:px-10 sm:py-16 lg:px-14">
          <Image src="/images/home/cta-bg.webp" alt="" fill sizes="(min-width: 1280px) 1280px, 100vw" className="pointer-events-none object-cover" aria-hidden />
          <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" aria-hidden />

          <div className="relative mx-auto max-w-2xl text-center">
            <Eyebrow>Let&apos;s get started</Eyebrow>
            <h2 id="cta-title" className="mt-4 text-[28px] sm:text-[40px] font-bold leading-tight tracking-[-0.02em] text-ink text-balance">
              Ready to Transform Your Career &amp; Life?
            </h2>
            <p className="mt-3 text-[15px] text-body">Choose where you fit — each path takes you straight to the right place.</p>
          </div>

          <div className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROLE_CTAS.map((c) => {
              const Icon = ICONS[c.key];
              const primary = c.key === "students";
              const buttonClass = cn(
                "group mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full text-[15px] font-semibold transition-colors cursor-pointer",
                primary ? "bg-white text-primary hover:bg-primary-light" : "btn-gradient"
              );
              const buttonInner = (
                <>
                  {c.button}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </>
              );
              return (
                <article
                  key={c.key}
                  className={cn(
                    "flex flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1",
                    primary
                      ? "bg-gradient-to-br from-primary to-[#0b3aa8] text-white shadow-[0_30px_60px_-25px_rgba(37,99,235,0.8)]"
                      : "card-soft card-glow bg-white/90 backdrop-blur"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "grid h-11 w-11 place-items-center rounded-xl",
                        primary ? "bg-white/15 ring-1 ring-white/25" : "bg-primary-light text-primary"
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    {primary && <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold">Most popular</span>}
                  </div>
                  <p className={cn("mt-5 text-[12px] font-semibold uppercase tracking-[0.08em]", primary ? "text-sky-200" : "text-primary")}>
                    For {c.audience}
                  </p>
                  <h3 className={cn("mt-1 text-[20px] font-bold leading-snug", primary ? "text-white" : "text-ink")}>{c.title}</h3>
                  <p className={cn("mt-2 text-[14px] leading-relaxed", primary ? "text-blue-100" : "text-body")}>{c.pitch}</p>
                  <ul className="mt-5 space-y-2">
                    {c.trust.map((t) => (
                      <li key={t} className={cn("flex items-start gap-2 text-[13.5px]", primary ? "text-white" : "text-ink-light")}>
                        <Check className={cn("mt-0.5 h-4 w-4 shrink-0", primary ? "text-sky-300" : "text-primary")} strokeWidth={2.5} aria-hidden />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    {c.href === "signup" ? (
                      <button
                        type="button"
                        className={buttonClass}
                        onClick={() => {
                          setPersona("student");
                          setAuthTab("signup");
                          setIsAuthModalOpen(true);
                        }}
                      >
                        {buttonInner}
                      </button>
                    ) : (
                      <Link href={c.href} className={buttonClass}>
                        {buttonInner}
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
};
