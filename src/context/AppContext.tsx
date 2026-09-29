"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Job, Mentor, JOBS_DATA, MENTORS_DATA } from "@/data/mockData";

export type PersonaType =
  | "student"
  | "job-seeker"
  | "mba-placement"
  | "employer"
  | "educator"
  | "entrepreneur";

export interface ApplicationRecord {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: "Applied" | "Shortlisted" | "Interview" | "Offer";
  stageNotes: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  collegeOrCompany: string;
  qualification: string;
  city: string;
  profileCompletion: number;
  resumeUploaded: boolean;
  skills: string[];
  /** Profile photo shown in the student dashboard. */
  photo?: string;
  /** Set when the student signs in through the MBA / BBA portal. */
  program?: "MBA" | "BBA";
}

interface AppContextType {
  persona: PersonaType;
  setPersona: (p: PersonaType) => void;
  savedJobIds: string[];
  toggleSaveJob: (jobId: string) => void;
  applications: ApplicationRecord[];
  applyToJob: (job: Job, applicantData?: Partial<UserProfile>) => boolean;
  selectedJobForModal: Job | null;
  setSelectedJobForModal: (job: Job | null) => void;
  isQuickApplyOpen: boolean;
  setIsQuickApplyOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authTab: "signin" | "signup";
  setAuthTab: (tab: "signin" | "signup") => void;
  selectedMentor: Mentor | null;
  isMentorBookingOpen: boolean;
  openMentorBooking: (mentor: Mentor) => void;
  closeMentorBooking: () => void;
  bookMentorSession: (details: { date: string; time: string; topic: string }) => boolean;
  user: UserProfile;
  updateUser: (data: Partial<UserProfile>) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [persona, setPersonaState] = useState<PersonaType>("mba-placement");
  const [savedJobIds, setSavedJobIds] = useState<string[]>(["job-1", "job-3"]);
  const [selectedJobForModal, setSelectedJobForModal] = useState<Job | null>(null);
  const [isQuickApplyOpen, setIsQuickApplyOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isMentorBookingOpen, setIsMentorBookingOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [applications, setApplications] = useState<ApplicationRecord[]>([
    {
      id: "app-101",
      jobId: "job-1",
      jobTitle: "Associate Product Analyst",
      company: "Darwinbox Tech Solutions",
      location: "Hitec City, Hyderabad",
      salary: "₹7.5 - 9.5 LPA",
      appliedDate: "Yesterday",
      status: "Shortlisted",
      stageNotes: "Profile screened by Campus TA lead. Online evaluation scheduled."
    },
    {
      id: "app-102",
      jobId: "job-3",
      jobTitle: "Financial Planning & Analysis (FP&A) Analyst",
      company: "Deloitte USI Hyderabad",
      location: "Financial District, Hyderabad",
      salary: "₹9.0 - 12.0 LPA",
      appliedDate: "3 days ago",
      status: "Interview",
      stageNotes: "Technical round cleared. Partner video interview on Friday at 3 PM."
    }
  ]);

  const [user, setUser] = useState<UserProfile>({
    name: "Rohit Vangapalli",
    email: "rohit.v@osmania.edu",
    phone: "+91 98490 12345",
    collegeOrCompany: "Osmania University MBA Placement Cohort",
    qualification: "MBA Finance & Systems (2026)",
    city: "Hyderabad, Telangana",
    profileCompletion: 85,
    photo: "/generated/blue/avatars/testimonial-man-1.webp",
    resumeUploaded: true,
    skills: ["Financial Analysis", "SQL", "Product Roadmapping", "Business Development"]
  });

  const setPersona = (p: PersonaType) => {
    setPersonaState(p);
    showToast(`Switched view to ${getPersonaLabel(p)}`);
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      const exists = prev.includes(jobId);
      const updated = exists ? prev.filter((id) => id !== jobId) : [...prev, jobId];
      showToast(exists ? "Removed from saved jobs" : "Saved to your dashboard bookmarks");
      return updated;
    });
  };

  const applyToJob = (job: Job, applicantData?: Partial<UserProfile>): boolean => {
    if (applications.some((app) => app.jobId === job.id)) {
      showToast("You have already submitted an application for this role.");
      return false;
    }

    const newApp: ApplicationRecord = {
      id: `app-${job.id}-${applications.length + 1}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      appliedDate: "Just now",
      status: "Applied",
      stageNotes: "Application submitted. Employer recruitment team has received your profile."
    };

    setApplications((prev) => [newApp, ...prev]);
    if (applicantData) {
      setUser((prev) => ({ ...prev, ...applicantData }));
    }
    showToast(`Application successfully sent to ${job.company}!`);
    return true;
  };

  const openMentorBooking = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsMentorBookingOpen(true);
  };

  const closeMentorBooking = () => {
    setIsMentorBookingOpen(false);
    setSelectedMentor(null);
  };

  const bookMentorSession = (details: { date: string; time: string; topic: string }): boolean => {
    showToast(`Mentorship session confirmed with ${selectedMentor?.name || "Expert"} on ${details.date} at ${details.time}!`);
    closeMentorBooking();
    return true;
  };

  const updateUser = (data: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...data }));
    showToast("Profile information updated successfully.");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Global hotkey Ctrl+K / Cmd+K for search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        persona,
        setPersona,
        savedJobIds,
        toggleSaveJob,
        applications,
        applyToJob,
        selectedJobForModal,
        setSelectedJobForModal,
        isQuickApplyOpen,
        setIsQuickApplyOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authTab,
        setAuthTab,
        selectedMentor,
        isMentorBookingOpen,
        openMentorBooking,
        closeMentorBooking,
        bookMentorSession,
        user,
        updateUser,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export function getPersonaLabel(persona: PersonaType): string {
  switch (persona) {
    case "student":
      return "College Student";
    case "job-seeker":
      return "Fresher & Job Seeker";
    case "mba-placement":
      return "MBA Placement Cohort";
    case "employer":
      return "Employer / Recruiter";
    case "educator":
      return "College & Educator";
    case "entrepreneur":
      return "Entrepreneur & Founder";
    default:
      return "Job Seeker";
  }
}
