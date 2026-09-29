import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ProblemSolutionSection } from "@/components/home/ProblemSolutionSection";
import { JourneySection } from "@/components/home/JourneySection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { AppShowcaseSection } from "@/components/home/AppShowcaseSection";
import { StoriesSection } from "@/components/home/StoriesSection";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { TrustBadgesSection } from "@/components/home/TrustBadgesSection";
import { ActivityTicker } from "@/components/home/ActivityTicker";
import { RoleCtaSection } from "@/components/home/RoleCtaSection";
import { MobileStickyCta } from "@/components/home/MobileStickyCta";

export default function HomePage() {
  return (
    <div className="w-full bg-canvas text-ink">
      <HeroSection />
      <StatsSection />
      <PhilosophySection variant="compact" />
      <ProblemSolutionSection />
      <JourneySection />
      <FeaturesSection />
      <AppShowcaseSection />
      <StoriesSection />
      <TrustBadgesSection />
      <ActivityTicker />
      <RoleCtaSection />
      <MobileStickyCta />
    </div>
  );
}
