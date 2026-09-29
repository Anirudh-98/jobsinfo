"use client";

import React, { createContext, useContext, useState } from "react";
import {
  CANDIDATES,
  COMPANY,
  EMPLOYER_JOBS,
  RECRUITER,
  Candidate,
  EmployerJob,
  Interview,
  JobStatus,
  Offer,
} from "@/data/employerData";

type Company = typeof COMPANY;
type Recruiter = typeof RECRUITER;

interface EmployerStore {
  jobs: EmployerJob[];
  candidates: Candidate[];
  company: Company;
  recruiter: Recruiter;
  addJob: (job: Omit<EmployerJob, "id" | "status" | "postedOn" | "views">) => void;
  setJobStatus: (id: string, status: JobStatus) => void;
  shortlist: (id: string) => void;
  reject: (id: string) => void;
  requestInterview: (id: string, interview: Omit<Interview, "status">) => void;
  setInterviewStatus: (id: string, status: Interview["status"]) => void;
  makeOffer: (id: string, offer: Pick<Offer, "ctc" | "joiningDate">) => void;
  setOfferStatus: (id: string, status: Offer["status"]) => void;
  markHired: (id: string) => void;
  updateCompany: (data: Partial<Company>) => void;
  updateRecruiter: (data: Partial<Recruiter>) => void;
}

const Ctx = createContext<EmployerStore | null>(null);

const today = () => new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

// Single source of truth for the employer dashboard, so a candidate moved in one view updates every other view.
export const EmployerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState(EMPLOYER_JOBS);
  const [candidates, setCandidates] = useState(CANDIDATES);
  const [company, setCompany] = useState(COMPANY);
  const [recruiter, setRecruiter] = useState(RECRUITER);

  const patch = (id: string, fn: (c: Candidate) => Candidate) => setCandidates((all) => all.map((c) => (c.id === id ? fn(c) : c)));

  const store: EmployerStore = {
    jobs,
    candidates,
    company,
    recruiter,
    addJob: (job) =>
      setJobs((all) => [{ ...job, id: `ej-${Date.now()}`, status: "Active", postedOn: today(), views: 0 }, ...all]),
    setJobStatus: (id, status) => setJobs((all) => all.map((j) => (j.id === id ? { ...j, status } : j))),
    shortlist: (id) => patch(id, (c) => ({ ...c, stage: "shortlisted" })),
    reject: (id) => patch(id, (c) => ({ ...c, stage: "rejected" })),
    requestInterview: (id, interview) => patch(id, (c) => ({ ...c, stage: "interview", interview: { ...interview, status: "Requested" } })),
    setInterviewStatus: (id, status) => patch(id, (c) => (c.interview ? { ...c, interview: { ...c.interview, status } } : c)),
    makeOffer: (id, offer) => patch(id, (c) => ({ ...c, stage: "offered", offer: { ...offer, sentOn: today(), status: "Pending" } })),
    setOfferStatus: (id, status) => patch(id, (c) => (c.offer ? { ...c, offer: { ...c.offer, status } } : c)),
    markHired: (id) =>
      patch(id, (c) => ({ ...c, stage: "hired", hiredOn: today(), offer: c.offer ? { ...c.offer, status: "Accepted" } : c.offer })),
    updateCompany: (data) => setCompany((c) => ({ ...c, ...data })),
    updateRecruiter: (data) => setRecruiter((r) => ({ ...r, ...data })),
  };

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
};

export const useEmployer = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useEmployer must be used inside EmployerProvider");
  return ctx;
};
