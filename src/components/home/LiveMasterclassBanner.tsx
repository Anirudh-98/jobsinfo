import React from "react";
import Link from "next/link";
import { Video, Users, ArrowRight, Play } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const LiveMasterclassBanner: React.FC = () => {
  return (
    <section className="w-full py-12 bg-canvas-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-ink-display text-white p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-elevation-raised">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <Badge variant="live" isPulse>
                LIVE BROADCAST
              </Badge>
              <span className="flex items-center gap-1.5 text-xs text-white/60 font-medium">
                <Users className="h-3.5 w-3.5 text-accent-warm" /> 842 MBA Candidates Watching
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-tight">
              Cracking the 2026 Campus Placement HR Round: Live Scorecards & Traps
            </h3>

            <p className="text-sm text-white/70 leading-relaxed">
              Hosted by <strong>Vikramaditya Goud</strong> (Senior Director Talent Acquisition, ServiceNow) and guest corporate panelists. Watch live mock interview breakdowns and download evaluation rubrics.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-white/50">
              <span>✦ Duration: 90 Mins</span>
              <span>✦ Real-Time Live Chat</span>
              <span>✦ Placement Officer Endorsed</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
            <Link href="/masterclass">
              <Button
                size="lg"
                className="w-full bg-accent-warm text-white hover:bg-accent-warm-active font-bold gap-2 shadow-lg"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>Join Live Stream</span>
              </Button>
            </Link>

            <Link href="/masterclass">
              <Button
                variant="secondary"
                size="lg"
                className="w-full bg-white/10 hover:bg-white/15 text-white border-white/15 text-xs"
              >
                <span>View Masterclass Schedule</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
