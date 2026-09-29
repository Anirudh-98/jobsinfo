import {
  LayoutGrid,
  Search,
  BriefcaseBusiness,
  FolderKanban,
  Bookmark,
  BellPlus,
  Send,
  CalendarClock,
  MessageSquare,
  GraduationCap,
  Users,
  Video,
  Bell,
  FileText,
  UserRound,
} from "lucide-react";

// Every section of the student dashboard. Each renders inside /dashboard, selected by the URL hash (#jobs, #courses…).
export const VIEWS = [
  { id: "overview", label: "Overview", icon: LayoutGrid, group: "home" },
  { id: "jobs", label: "Search jobs", icon: Search, group: "find" },
  { id: "internships", label: "Internships", icon: BriefcaseBusiness, group: "find" },
  { id: "projects", label: "Live projects", icon: FolderKanban, group: "find" },
  { id: "saved", label: "Saved jobs", icon: Bookmark, group: "find" },
  { id: "alerts", label: "Create job alert", icon: BellPlus, group: "find" },
  { id: "applications", label: "Applied jobs", icon: Send, group: "apply" },
  { id: "interviews", label: "Interviews", icon: CalendarClock, group: "apply" },
  { id: "messages", label: "Recruiter messages", icon: MessageSquare, group: "apply" },
  { id: "courses", label: "Courses", icon: GraduationCap, group: "learn" },
  { id: "mentors", label: "Mentors", icon: Users, group: "learn" },
  { id: "masterclasses", label: "Masterclasses", icon: Video, group: "learn" },
  { id: "notifications", label: "Notifications", icon: Bell, group: "account" },
  { id: "resume", label: "Build your resume", icon: FileText, group: "account" },
  { id: "profile", label: "Profile", icon: UserRound, group: "account" },
] as const;

export const GROUP_TITLES: Record<(typeof VIEWS)[number]["group"], string> = {
  home: "Dashboard",
  find: "Find work",
  apply: "My applications",
  learn: "Learning",
  account: "Profile & updates",
};

export type ViewId = (typeof VIEWS)[number]["id"];

export const isViewId = (value: string): value is ViewId => VIEWS.some((v) => v.id === value);
