"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

// YouTube video ID (the part after "youtu.be/" or "watch?v=").
const VIDEO_ID = "Ih-Fr67qdkE";
const TITLE = "Jobsinfo.world introduction video";

// Small video card; clicking it plays the video in a centred modal with a Cancel button.
export const IntroVideo: React.FC<{ className?: string }> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Play ${TITLE}`}
        className={`group relative block w-full overflow-hidden rounded-2xl border border-white bg-[#0b1f4d] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_-20px_rgba(30,64,175,0.45)] ring-1 ring-hairline transition-transform duration-300 hover:-translate-y-0.5 cursor-pointer ${className ?? ""}`}
      >
        <span className="relative block aspect-video">
          <Image
            src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`}
            alt=""
            fill
            sizes="320px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[#0b1f4d]/70 via-transparent to-transparent" aria-hidden />
          <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-primary shadow-lg transition-transform group-hover:scale-110" aria-hidden>
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </span>
          <span className="absolute bottom-2 left-3 text-[12px] font-semibold text-white">Watch: how Jobsinfo.world works</span>
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={TITLE}>
          <div className="absolute inset-0 bg-[#0b1f4d]/60 backdrop-blur-sm animate-[panel-in_0.2s_ease-out]" onClick={() => setOpen(false)} aria-hidden />
          <div className="relative w-full max-w-4xl animate-[panel-in_0.25s_ease-out]">
            <div className="overflow-hidden rounded-[22px] border border-white/20 bg-black shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                  title={TITLE}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                ref={cancelRef}
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-white px-6 text-[14px] font-semibold text-ink shadow-lg transition-colors hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
