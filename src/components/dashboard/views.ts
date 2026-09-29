import { LayoutGrid, Search, Send, Bookmark, GraduationCap, Users, Video, UserRound } from "lucide-react";

// Every section of the student dashboard. Each renders inside /dashboard, selected by the URL hash (#jobs, #courses…).
export const VIEWS = [
  { id: "overview", label: "Overview", icon: LayoutGrid, group: "main" },
  { id: "jobs", label: "Find jobs", icon: Search, group: "main" },
  { id: "applications", label: "Applications", icon: Send, group: "main" },
  { id: "saved", label: "Saved jobs", icon: Bookmark, group: "main" },
  { id: "courses", label: "Courses", icon: GraduationCap, group: "learn" },
  { id: "mentors", label: "Mentors", icon: Users, group: "learn" },
  { id: "masterclasses", label: "Masterclasses", icon: Video, group: "learn" },
  { id: "profile", label: "Profile", icon: UserRound, group: "account" },
] as const;

export type ViewId = (typeof VIEWS)[number]["id"];

export const isViewId = (value: string): value is ViewId => VIEWS.some((v) => v.id === value);
