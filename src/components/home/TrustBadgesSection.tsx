import React from "react";
import { BadgeCheck, ShieldCheck, Award, Lock, Trophy, Users, Star, Globe, Wallet } from "lucide-react";
import { BADGES } from "@/data/homeContent";
import { SectionHeading, Reveal } from "@/components/home/shared";

const ICONS: Record<(typeof BADGES)[number]["key"], React.ElementType> = {
  free: Wallet,
  verified: ShieldCheck,
  cert: Award,
  secure: Lock,
  success: Trophy,
  mentors: Users,
  rating: Star,
  india: Globe,
};

export const TrustBadgesSection: React.FC = () => (
  <section className="py-20 sm:py-28" aria-labelledby="trust-title">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[0.9fr_1.5fr] lg:items-start">
      <div className="lg:sticky lg:top-28">
        <SectionHeading
          id="trust-title"
          align="left"
          eyebrow="Why trust us"
          title={
            <>
              Trusted by <span className="text-primary">25,000+ students</span>, 128+ employers &amp; growing
            </>
          }
          sub="Every opportunity is verified, every profile is protected, and it costs students and job seekers nothing."
        />
        <div className="card-soft mt-8 flex items-center gap-4 p-5 max-w-sm">
          <div className="text-[40px] font-bold leading-none text-ink">4.8</div>
          <div>
            <div className="flex gap-0.5" role="img" aria-label="4.8 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
              ))}
            </div>
            <p className="mt-1 text-[13px] text-body">Average rating from students, job seekers &amp; employers</p>
          </div>
        </div>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {BADGES.map((b, i) => {
          const Icon = ICONS[b.key];
          return (
            <li key={b.key}>
              <Reveal delay={(i % 2) * 80} className="h-full">
                <div className="card-soft card-glow group flex h-full gap-4 p-5 transition-all hover:-translate-y-0.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="flex items-center gap-1.5 text-[15px] font-semibold text-ink">
                      {b.title}
                      <BadgeCheck className="h-4 w-4 text-primary" aria-hidden />
                    </h3>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-body">{b.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);
