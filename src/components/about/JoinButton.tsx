"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

/** Opens the free student sign-up modal. */
export const JoinButton: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const { setIsAuthModalOpen, setAuthTab, setPersona } = useApp();
  return (
    <button
      type="button"
      onClick={() => {
        setPersona("student");
        setAuthTab("signup");
        setIsAuthModalOpen(true);
      }}
      className={cn("btn-gradient inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold cursor-pointer", className)}
    >
      {children} <ArrowRight className="h-4 w-4" aria-hidden />
    </button>
  );
};
