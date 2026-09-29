import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Compass, Eye, Gift, HeartHandshake, Star, Target, TrendingUp, Users } from "lucide-react";
import { STATS } from "@/data/homeContent";
import { ABOUT_HERO, MISSION, PRINCIPLES, STORY } from "@/data/aboutContent";
import { CountUp, Eyebrow, Reveal } from "@/components/home/shared";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { AudienceExplorer } from "@/components/about/AudienceExplorer";
import { JoinButton } from "@/components/about/JoinButton";

export const metadata: Metadata = {
  title: "About us — Jobsinfo.world",
  description: ABOUT_HERO.intro,
};

const PRINCIPLE_ICONS: Record<string, React.ElementType> = { verified: BadgeCheck, free: Gift, outcomes: Target, everyone: HeartHandshake };
const STAT_ICONS: Record<string, React.ElementType> = { seekers: Users, vacancies: TrendingUp, employers: BadgeCheck, placed: Star };

export default function AboutPage() {
  return (
    <div className="w-full bg-canvas text-ink">
      {/* Hero */}
      <section className="hero-bg relative overflow-hidden" aria-labelledby="about-title">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-[120px] sm:px-6 sm:pb-20 sm:pt-[136px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:px-8">
          <div>
            <h1 id="about-title" className="text-[34px] font-bold leading-[1.1] tracking-[-0.03em] text-ink text-balance sm:text-[46px] lg:text-[54px]">
              {ABOUT_HERO.title}{" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-sky-500 bg-clip-text text-transparent">{ABOUT_HERO.accent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-body text-pretty sm:text-[17px]">{ABOUT_HERO.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <JoinButton>Join free</JoinButton>
              <Link href="/contact" className="btn-soft inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold">
                Partner with us
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium text-ink-light">
              {["Hyderabad roots, 30+ cities", "100% free for learners", "4.8/5 average rating"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <BadgeCheck className="h-4 w-4 text-primary" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>

          {/* One photo, no frame */}
          <div className="mx-auto w-full max-w-[440px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-[#dbeafe] shadow-[0_40px_80px_-40px_rgba(30,64,175,0.55)]">
              <Image
                src="/images/auth/student-2.webp"
                alt="A smiling student holding her laptop and notebooks"
                fill
                priority
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover object-bottom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="px-4 sm:px-6 lg:px-8" aria-label="Jobsinfo.world in numbers">
        <Reveal className="mx-auto -mt-2 max-w-7xl">
          <div className="card-soft grid grid-cols-2 overflow-hidden lg:grid-cols-4">
            {STATS.map((s, i) => {
              const Icon = STAT_ICONS[s.key];
              return (
                <div
                  key={s.key}
                  className={`p-5 sm:p-7 ${i % 2 === 1 ? "border-l border-hairline" : ""} ${i >= 2 ? "border-t border-hairline lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-light text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="mt-5 text-[28px] font-bold leading-none tracking-tight text-ink sm:text-[36px]">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-[14px] font-semibold text-ink">{s.label}</p>
                  <p className="mt-0.5 text-[12.5px] text-body">{s.sub}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* Story + milestones */}
      <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8" aria-labelledby="story-title">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <Eyebrow>{STORY.eyebrow}</Eyebrow>
            <h2 id="story-title" className="mt-4 text-[28px] font-bold leading-[1.12] tracking-[-0.025em] text-ink text-balance sm:text-[40px]">
              {STORY.title} <span className="text-primary">{STORY.accent}</span>
            </h2>
            {STORY.paragraphs.map((p) => (
              <p key={p} className="mt-5 max-w-xl text-[15px] leading-relaxed text-body text-pretty sm:text-[16px]">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <ol className="card-soft relative p-6 sm:p-8" aria-label="How we got here">
              <p className="text-[13px] font-semibold uppercase tracking-wide text-primary">How we got here</p>
              {STORY.milestones.map((m, i) => (
                <li key={m.title} className="relative flex gap-4 pt-6">
                  {i < STORY.milestones.length - 1 && <span className="absolute left-[19px] top-[3.75rem] h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-primary/40 to-primary/5" aria-hidden />}
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-[14px] font-bold ${i === STORY.milestones.length - 1 ? "btn-gradient" : "bg-primary-light text-primary"}`}>
                    {i + 1}
                  </span>
                  <div className="pb-1">
                    <p className="text-[15.5px] font-semibold text-ink">{m.title}</p>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-body">{m.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Mission & vision: one connected split panel */}
      <section className="px-4 sm:px-6 lg:px-8" id="mission" aria-label="Mission and vision">
        <Reveal className="mx-auto max-w-7xl">
          <div className="card-soft grid overflow-hidden md:grid-cols-2">
            {[
              { ...MISSION.mission, icon: Compass, tone: "bg-white" },
              { ...MISSION.vision, icon: Eye, tone: "bg-gradient-to-br from-[#e8f0ff] via-[#f1f6ff] to-[#e0f2fe]" },
            ].map((b, i) => (
              <div key={b.label} className={`relative p-7 sm:p-10 ${b.tone} ${i === 1 ? "border-t border-hairline md:border-l md:border-t-0" : ""}`}>
                <span className="grid h-11 w-11 place-items-center rounded-2xl btn-gradient">
                  <b.icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-6 text-[13px] font-semibold uppercase tracking-wide text-primary">{b.label}</p>
                <h2 className="mt-2 text-[22px] font-bold leading-snug tracking-[-0.02em] text-ink text-balance sm:text-[28px]">{b.title}</h2>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-body">{b.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Who we serve */}
      <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8" aria-labelledby="serve-title">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <Eyebrow>Who we serve</Eyebrow>
              <h2 id="serve-title" className="mt-4 text-[28px] font-bold leading-[1.1] tracking-[-0.025em] text-ink text-balance sm:text-[40px]">
                One platform. <span className="text-primary">Six ways in.</span>
              </h2>
            </div>
            <p className="max-w-[44ch] text-[15px] leading-relaxed text-body text-pretty lg:pb-1.5">
              Everyone in the ecosystem helps someone else move forward. Pick where you fit to see what&apos;s in it for you.
            </p>
          </div>
          <Reveal className="mt-10">
            <AudienceExplorer />
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="px-4 pb-4 sm:px-6 lg:px-8" aria-labelledby="principles-title">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <Eyebrow>What we stand for</Eyebrow>
              <h2 id="principles-title" className="mt-4 text-[28px] font-bold leading-[1.1] tracking-[-0.025em] text-ink text-balance sm:text-[40px]">
                Four promises <span className="text-primary">we don&apos;t break.</span>
              </h2>
            </div>
            <p className="max-w-[44ch] text-[15px] leading-relaxed text-body text-pretty lg:pb-1.5">
              They shape every feature we build and every partner we accept.
            </p>
          </div>
          <Reveal className="mt-10">
            <div className="card-soft grid overflow-hidden sm:grid-cols-2">
              {PRINCIPLES.map((p, i) => {
                const Icon = PRINCIPLE_ICONS[p.key];
                return (
                  <div
                    key={p.key}
                    className={`group flex gap-4 p-6 transition-colors hover:bg-primary-light/30 sm:p-8 ${i % 2 === 1 ? "sm:border-l sm:border-hairline" : ""} ${i > 0 ? "border-t border-hairline" : ""} ${i === 1 ? "sm:border-t-0" : ""}`}
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-[17px] font-semibold text-ink">{p.title}</h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-body">{p.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* The Learn → Do → Earn → Lead journey (linked from the homepage) */}
      <PhilosophySection variant="full" id="our-mission" />

      {/* Closing CTA */}
      <section className="px-4 pb-20 sm:px-6 sm:pb-28" aria-labelledby="about-cta-title">
        <Reveal className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#e8f0ff] via-[#f4f8ff] to-[#e0f2fe] px-5 py-14 text-center sm:px-10 sm:py-16">
            <Image src="/images/home/cta-bg.webp" alt="" fill sizes="(min-width: 1280px) 1280px, 100vw" className="pointer-events-none object-cover" aria-hidden />
            <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
            <div className="relative mx-auto max-w-2xl">
              <Eyebrow>Be part of it</Eyebrow>
              <h2 id="about-cta-title" className="mt-4 text-[28px] font-bold leading-tight tracking-[-0.02em] text-ink text-balance sm:text-[40px]">
                Your next step starts <span className="text-primary">today.</span>
              </h2>
              <p className="mt-3 text-[15px] text-body">Join 25,000+ learners and 128 hiring partners already growing on Jobsinfo.world.</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <JoinButton>Join free</JoinButton>
                <Link href="/jobs" className="btn-soft inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold">
                  Browse jobs <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link href="/contact" className="inline-flex h-12 items-center rounded-full px-4 text-[15px] font-semibold text-primary hover:underline">
                  Talk to our team
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
