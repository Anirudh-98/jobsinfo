"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserPlus, ClipboardList, GraduationCap } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

/** Bottom action bar for small screens; appears once the hero CTAs have scrolled away. */
export const MobileStickyCta: React.FC = () => {
  const { setIsAuthModalOpen, setAuthTab, setPersona } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const join = () => {
    setPersona("student");
    setAuthTab("signup");
    setIsAuthModalOpen(true);
  };

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-white/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur md:hidden transition-transform duration-300",
        visible ? "translate-y-0" : "translate-y-full"
      )}
      aria-hidden={!visible}
    >
      <div className="grid grid-cols-[1.3fr_1fr_auto] gap-2">
        <button
          type="button"
          onClick={join}
          tabIndex={visible ? 0 : -1}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-primary text-[14px] font-semibold text-white cursor-pointer"
        >
          <UserPlus className="h-4 w-4" aria-hidden /> Join Now
        </button>
        <Link
          href="/hr-solutions"
          tabIndex={visible ? 0 : -1}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-primary/25 bg-primary-light/50 text-[14px] font-semibold text-primary"
        >
          <ClipboardList className="h-4 w-4" aria-hidden /> Post Job
        </Link>
        <Link
          href="/mba-placement"
          tabIndex={visible ? 0 : -1}
          aria-label="For colleges"
          className="grid min-h-[48px] w-12 place-items-center rounded-xl border border-hairline text-primary"
        >
          <GraduationCap className="h-5 w-5" aria-hidden />
        </Link>
      </div>
    </div>
  );
};
