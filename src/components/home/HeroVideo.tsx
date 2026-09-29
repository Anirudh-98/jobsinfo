import React from "react";

// YouTube video ID (the part after "youtu.be/" or "watch?v=").
const VIDEO_ID = "Ih-Fr67qdkE";

// Intro video shown under the hero, framed in the same glass panel style.
export const HeroVideo: React.FC = () => (
  <div className="relative mx-auto mt-14 max-w-5xl px-2 sm:px-0">
    {/* Soft glow behind the panel */}
    <div className="pointer-events-none absolute inset-x-10 -top-6 bottom-10 rounded-[40px] bg-primary/15 blur-3xl" aria-hidden />

    <div className="relative overflow-hidden rounded-[28px] border border-white/90 bg-white/70 p-2 shadow-[0_40px_80px_-40px_rgba(30,64,175,0.55)] backdrop-blur-xl sm:p-2.5">
      <div className="relative aspect-video overflow-hidden rounded-[22px] bg-[#0b1f4d]">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
          title="Jobsinfo.world introduction video"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  </div>
);
