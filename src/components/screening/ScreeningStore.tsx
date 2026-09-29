"use client";

import React, { createContext, useContext, useState } from "react";
import { Evaluation, SAMPLE_EVALUATIONS } from "@/data/screeningData";

interface ScreeningStore {
  evaluations: Evaluation[];
  submitEvaluation: (e: Omit<Evaluation, "id" | "submittedAt">) => void;
  evaluationFor: (candidateId: string) => Evaluation | undefined;
}

const Ctx = createContext<ScreeningStore | null>(null);

// Holds the prescreen evaluations submitted in this session (demo data, resets on reload).
export const ScreeningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [evaluations, setEvaluations] = useState(SAMPLE_EVALUATIONS);

  const store: ScreeningStore = {
    evaluations,
    submitEvaluation: (e) =>
      setEvaluations((all) => [
        {
          ...e,
          id: `ev-${Date.now()}`,
          submittedAt: new Date().toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }),
        },
        // One evaluation per candidate: a re-interview replaces the earlier one.
        ...all.filter((x) => x.candidateId !== e.candidateId),
      ]),
    evaluationFor: (id) => evaluations.find((e) => e.candidateId === id),
  };

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
};

export const useScreening = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useScreening must be used inside ScreeningProvider");
  return ctx;
};
