"use client";

import React from "react";
import { CheckCircle2, Info } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-md bg-ink text-white shadow-elevation-raised border border-slate-700 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shrink-0">
        <CheckCircle2 className="h-4 w-4" />
      </div>
      <p className="text-sm font-medium tracking-tight pr-2">{toastMessage}</p>
    </div>
  );
};
