import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { SectionHeading, Reveal } from "@/components/home/shared";

const POINTS = [
  "Verified jobs from Hyderabad, Bengaluru, Mumbai & beyond",
  "Quick Apply with your saved profile",
  "Instant alerts when a matching role goes live",
];

export const AppShowcaseSection: React.FC = () => (
  <section className="py-20 sm:py-28" aria-labelledby="showcase-title">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[32px] border border-primary/10 shadow-[0_30px_60px_-40px_rgba(30,64,175,0.4)] bg-gradient-to-br from-[#eef4ff] via-white to-[#f0f9ff] px-5 py-12 sm:px-10 lg:px-14">
        <Image
          src="/images/home/icons-3d.webp"
          alt=""
          width={1400}
          height={788}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="pointer-events-none absolute -bottom-24 left-[30%] w-[50%] max-w-[560px] opacity-30"
          aria-hidden
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              id="showcase-title"
              align="left"
              eyebrow="Smart job search"
              title="Your next job, right in your pocket"
              sub="Search, save and apply to verified opportunities from any device — no paperwork, no middlemen."
            />
            <ul className="mt-6 space-y-3">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2 text-[15px] text-ink-light">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-white">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <Link
              href="/jobs"
              className="group mt-8 inline-flex min-h-[48px] items-center gap-2 btn-gradient rounded-full px-6 text-[15px] font-semibold"
            >
              Browse jobs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>

          <Reveal delay={100} className="mx-auto w-full max-w-[420px]">
            <Image
              src="/images/home/phone-job-search.webp"
              alt="Jobsinfo job search app on a phone, showing recent jobs in Bengaluru and Mumbai"
              width={1000}
              height={1325}
              sizes="(min-width: 1024px) 420px, 90vw"
              className="h-auto w-full rounded-3xl shadow-[0_30px_60px_-30px_rgba(37,99,235,0.6)]"
            />
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
