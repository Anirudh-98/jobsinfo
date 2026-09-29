"use client";

import React from "react";
import { TeamHireCard } from "@/components/quietly/TeamHireCard";
import { useApp } from "@/context/AppContext";
import { MENTORS_DATA } from "@/data/mockData";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const TeamHireSection: React.FC = () => {
  const { openMentorBooking } = useApp();

  const mentors = MENTORS_DATA.slice(0, 3);
  const mentorPhotos = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  ];

  return (
    <section className="w-full bg-canvas py-16 border-t border-hairline">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full mb-3 inline-block">
              Dedicated Mentorship
            </span>
            <h2 className="text-display-lg text-ink font-bold leading-[1.25]">
              Meet Quietly Career Mentors
            </h2>
            <p className="mt-2 text-body-lg text-body">
              Book 1-on-1 resume reviews, mock interviews, and personalized career roadmaps.
            </p>
          </div>

          <Link href="/mentors">
            <Button variant="secondary" size="md">
              View All Mentors
            </Button>
          </Link>
        </div>

        {/* 3-Column Desktop Grid / 2-Column Tablet / 1-Column Mobile with 16px Gutter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mentors.map((mentor, idx) => (
            <TeamHireCard
              key={mentor.id}
              name={mentor.name}
              role={`${mentor.role} · ${mentor.company}`}
              bio={mentor.bio}
              avatarUrl={mentorPhotos[idx % mentorPhotos.length]}
              onConnect={() => openMentorBooking(mentor)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
