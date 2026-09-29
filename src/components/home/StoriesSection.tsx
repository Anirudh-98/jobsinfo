import React from "react";
import Image from "next/image";
import { Star, Clock, MapPin, ArrowDown, Quote } from "lucide-react";
import { STORIES } from "@/data/homeContent";
import { SectionHeading, Reveal } from "@/components/home/shared";
import { cn } from "@/lib/utils";

export const StoriesSection: React.FC = () => (
  <section id="stories" className="scroll-mt-24 bg-gradient-to-b from-white via-[#f4f8ff] to-white py-20 sm:py-28" aria-labelledby="stories-title">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        id="stories-title"
        eyebrow="Success stories"
        title="Real People, Real Results"
        sub="Students, job seekers and employers who used Jobsinfo.world — and what changed for them."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {STORIES.map((s, i) => (
          <Reveal key={s.name} delay={i * 80}>
            <article
              className={cn(
                "card-soft card-glow flex h-full flex-col p-6 sm:p-7 transition-all hover:-translate-y-1",
                i === 1 && "is-featured md:-translate-y-4 md:hover:-translate-y-5"
              )}
            >
              <div className="flex items-center gap-3">
                {s.photo ? (
                  <Image
                    src={s.photo}
                    alt={`Photo of ${s.name}`}
                    width={56}
                    height={56}
                    className="h-14 w-14 shrink-0 rounded-full object-cover object-top ring-2 ring-primary-light"
                  />
                ) : (
                  <span
                    className={cn(
                      "grid h-14 w-14 shrink-0 place-items-center font-bold text-white text-[17px]",
                      s.type === "Employer" ? "rounded-2xl bg-[#0b1f4d]" : "rounded-full bg-gradient-to-br from-primary to-sky-400"
                    )}
                    aria-hidden
                  >
                    {s.initials}
                  </span>
                )}
                <div className="min-w-0">
                  <h3 className="text-[16px] font-semibold leading-snug text-ink text-balance">{s.name}</h3>
                  <p className="flex flex-wrap items-center gap-x-1 text-[13px] text-body">
                    <span className="whitespace-nowrap">{s.role} ·</span>
                    <span className="inline-flex items-center gap-1 whitespace-nowrap">
                      <MapPin className="h-3 w-3" aria-hidden /> {s.location}
                    </span>
                  </p>
                </div>
                <span className="ml-auto shrink-0 self-start whitespace-nowrap rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-semibold text-primary">{s.type}</span>
              </div>

              <div className="mt-6 rounded-2xl bg-surface-soft p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted">{s.type === "Employer" ? "Challenge" : "From"}</p>
                <p className="mt-0.5 text-[14px] text-ink-light">{s.from}</p>
                <ArrowDown className="my-2 h-4 w-4 text-primary" aria-hidden />
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary">{s.type === "Employer" ? "Solution" : "To"}</p>
                <p className="mt-0.5 text-[15px] font-semibold text-ink">{s.to}</p>
              </div>

              <div className="mt-5 flex gap-0.5" role="img" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
                ))}
              </div>
              <blockquote className="relative mt-3 flex-1 text-[15px] leading-relaxed text-ink-light">
                <Quote className="absolute -left-1 -top-1 h-6 w-6 text-primary/10" aria-hidden />
                <span className="relative">&ldquo;{s.quote}&rdquo;</span>
              </blockquote>

              <p className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-primary/15 bg-primary-light/50 px-3 py-1.5 text-[13px] font-semibold text-primary">
                <Clock className="h-4 w-4" aria-hidden /> {s.time}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
