"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, BriefcaseBusiness, GraduationCap, Rocket, Check, ArrowRight, BadgeCheck, IndianRupee, MoreHorizontal, TrendingUp } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Eyebrow } from "@/components/home/shared";
import { HeroVideo } from "@/components/home/HeroVideo";

type HeroAction = {
  title: string;
  sub: string;
  hover: string;
  icon: React.ElementType;
  tone: string;
  href?: string;
  signup?: boolean;
};

// Blue-family tones keep the four paths distinguishable while staying on-brand.
const ACTIONS: HeroAction[] = [
  { title: "Find a Job", sub: "Browse 1,586+ verified opportunities", hover: "Quick Apply with your profile", icon: Search, tone: "bg-primary text-white", href: "/jobs" },
  { title: "Post a Job", sub: "Hire the right talent fast", hover: "Reach 25,000+ verified candidates", icon: BriefcaseBusiness, tone: "bg-sky-500 text-white", href: "/hr-solutions" },
  { title: "Join as Student", sub: "Learn • Do • Earn", hover: "24-month journey · real projects", icon: GraduationCap, tone: "bg-[#0b1f4d] text-white", signup: true },
  { title: "Start a Project", sub: "Real-time opportunities", hover: "325+ projects · performance-based pay", icon: Rocket, tone: "bg-cyan-600 text-white", href: "/projects" },
];

const TRUST = ["100% free for job seekers & students", "Verified opportunities only", "No hidden costs"];

export const HeroSection: React.FC = () => {
  const { setIsAuthModalOpen, setAuthTab, setPersona } = useApp();

  const cardClass =
    "card-glow group relative flex min-h-[48px] items-center gap-3 rounded-[20px] border border-white bg-white p-3 sm:p-4 text-left shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_-24px_rgba(30,64,175,0.35)] transition-all duration-300 hover:-translate-y-1 cursor-pointer";

  const renderInner = (a: HeroAction) => (
    <>
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${a.tone} transition-transform group-hover:scale-105`}>
        <a.icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1 text-[15px] font-semibold text-ink">
          {a.title}
          <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 text-primary" aria-hidden />
        </span>
        <span className="relative block h-[18px] overflow-hidden text-[12.5px] text-body">
          <span className="block transition-transform duration-300 group-hover:-translate-y-full group-focus-visible:-translate-y-full">{a.sub}</span>
          <span className="absolute inset-0 block translate-y-full text-primary font-medium transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
            {a.hover}
          </span>
        </span>
      </span>
    </>
  );

  return (
    <section className="hero-bg relative overflow-hidden" aria-labelledby="hero-title">
      <Image src="/images/home/hero-bg.webp" alt="" fill preload sizes="100vw" className="pointer-events-none object-cover opacity-45" aria-hidden />
      {/* White wash keeps the headline readable over the blue shapes */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(255,255,255,0.9),rgba(255,255,255,0.35)_70%,transparent)]" aria-hidden />
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />

      {/* Floating proof cards — decorative, desktop only */}
      <div className="pointer-events-none absolute left-[3%] top-[190px] hidden min-[1400px]:block animate-float" aria-hidden>
        <div className="-rotate-6 rounded-2xl border border-white bg-white/90 p-3.5 shadow-elevated backdrop-blur w-[200px]">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-ink">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary-light text-primary">
              <BadgeCheck className="h-4 w-4" />
            </span>
            New jobs today
          </div>
          <p className="mt-2 text-[26px] font-bold text-ink leading-none">+1,586</p>
          <div className="mt-3 flex h-8 items-end gap-1">
            {[40, 65, 35, 80, 55, 95, 70].map((h, i) => (
              <span key={i} className="flex-1 rounded-sm bg-gradient-to-t from-primary to-sky-400" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute right-[3%] top-[220px] hidden min-[1400px]:block animate-float [animation-delay:1.5s]" aria-hidden>
        <div className="rotate-6 w-[236px] rounded-[20px] border border-white bg-white/95 p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-24px_rgba(30,64,175,0.45)] backdrop-blur">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <IndianRupee className="h-4 w-4" />
            </span>
            <span className="text-[13px] font-medium text-ink-light">Supriya earned</span>
            <MoreHorizontal className="ml-auto h-4 w-4 text-muted" />
          </div>
          <div className="mt-3 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[28px] font-bold leading-none tracking-tight tabular-nums text-ink">₹25,000</p>
              <p className="mt-2 flex items-center gap-1 text-[11.5px] font-medium text-emerald-600">
                <TrendingUp className="h-3.5 w-3.5" />
                Marketing project
              </p>
            </div>
            <div className="flex h-8 items-end gap-[3px]">
              {[30, 45, 40, 62, 55, 100].map((h, i, arr) => (
                <span
                  key={i}
                  className={i === arr.length - 1 ? "w-[5px] rounded-full bg-emerald-500" : "w-[5px] rounded-full bg-emerald-500/40"}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-[120px] sm:pt-[136px] pb-4 text-center">
        <Eyebrow className="bg-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
          Learn • Do • Earn • Lead
        </Eyebrow>

        <h1
          id="hero-title"
          className="mx-auto mt-6 max-w-4xl text-[34px] sm:text-[46px] lg:text-[56px] font-bold leading-[1.12] tracking-[-0.03em] text-ink text-balance"
        >
          The Global{" "}
          <span className="bg-gradient-to-r from-primary via-blue-500 to-sky-500 bg-clip-text text-transparent">
            Career, Business &amp; Leadership
          </span>{" "}
          Ecosystem
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-[15px] sm:text-[17px] leading-relaxed text-body text-pretty">
          Connecting Students, Job Seekers, Employers, Colleges, Businesses &amp; Experts through one integrated ecosystem.
          Get real-world skills, complete real projects, earn while learning and build your professional future.{" "}
          <strong className="font-semibold text-ink">100% free for students &amp; job seekers.</strong>
        </p>

        {/* Glass frame echoes the reference's dashboard panel */}
        <div className="mx-auto mt-10 max-w-5xl rounded-[28px] border border-white/80 bg-white/45 p-2.5 sm:p-3 shadow-[0_30px_60px_-30px_rgba(30,64,175,0.45)] backdrop-blur-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {ACTIONS.map((a, i) =>
              a.signup ? (
                <button
                  key={a.title}
                  type="button"
                  className={cardClass}
                  onClick={() => {
                    setPersona("student");
                    setAuthTab("signup");
                    setIsAuthModalOpen(true);
                  }}
                >
                  {renderInner(a)}
                </button>
              ) : (
                <Link key={a.title} href={a.href!} className={`${cardClass} ${i === 0 ? "is-featured animate-soft-pulse" : ""}`}>
                  {renderInner(a)}
                </Link>
              )
            )}
          </div>
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-medium text-ink-light">
          {TRUST.map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-primary text-white">
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative px-4 sm:px-6 pb-12 sm:pb-16">
        <HeroVideo />
      </div>
    </section>
  );
};
