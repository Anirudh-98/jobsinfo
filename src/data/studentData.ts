// Mock data for the student dashboard pages added on top of mockData (internships, interviews, alerts, messages…).

import { JOBS_DATA, Job } from "@/data/mockData";

const internship = (j: Omit<Job, "type" | "experience" | "requirements" | "responsibilities" | "perks"> & Partial<Job>): Job => ({
  type: "Internship",
  experience: "Fresher",
  requirements: ["Final-year or recent graduate", "Available for the full duration", "Good written and spoken English"],
  responsibilities: ["Work on a live project with a mentor", "Weekly progress reviews", "Present a final report"],
  perks: ["Internship certificate", "Letter of recommendation", "Pre-placement offer for top performers"],
  ...j,
});

export const INTERNSHIPS: Job[] = [
  internship({ id: "int-1", title: "HR Operations Intern", company: "Cyient Global Services", location: "Gachibowli, Hyderabad", salary: "₹12,000 / month · 3 months", salaryNum: 1.4, category: "HR & Operations", datePosted: "Today", openings: 6, featured: true, mbaRelevant: true, description: "Support onboarding, HR records and employee engagement for a 5,000-person engineering team." }),
  internship({ id: "int-2", title: "Financial Analyst Intern", company: "Deloitte USI Hyderabad", location: "Financial District, Hyderabad", salary: "₹20,000 / month · 6 months", salaryNum: 2.4, category: "Finance & Accounting", datePosted: "2 days ago", openings: 10, mbaRelevant: true, description: "Assist the FP&A team with monthly variance reports, forecasting models and client decks." }),
  internship({ id: "int-3", title: "Digital Marketing Intern", company: "Swiggy Regional Office", location: "Madhapur, Hyderabad", salary: "₹15,000 / month · 3 months", salaryNum: 1.8, category: "Sales & Marketing", datePosted: "1 day ago", openings: 8, description: "Plan and run local social campaigns, track performance and report weekly growth metrics." }),
  internship({ id: "int-4", title: "Frontend Developer Intern", company: "T-Hub Innovative Solutions", location: "Madhapur, Hyderabad", salary: "₹18,000 / month · 4 months", salaryNum: 2.2, category: "IT & Tech", datePosted: "3 days ago", openings: 4, description: "Build React components and dashboards for startups in the T-Hub incubator." }),
  internship({ id: "int-5", title: "Office Administration Intern", company: "Tech Mahindra IT Sez", location: "Bahadurpally, Hyderabad", salary: "₹10,000 / month · 2 months", salaryNum: 1.2, category: "Office & Admin", datePosted: "4 days ago", openings: 5, description: "Coordinate facilities, vendor bills and front-office operations at a large IT campus." }),
];

/** Every job the student can browse or save: regular openings plus internships. */
export const ALL_JOBS: Job[] = [...JOBS_DATA, ...INTERNSHIPS];

export interface StudentInterview {
  id: string;
  company: string;
  role: string;
  round: string;
  date: string;
  time: string;
  mode: "Video call" | "In person" | "Phone";
  interviewer: string;
  status: "Upcoming" | "Completed" | "Reschedule requested";
  tips: string[];
}

export const INTERVIEWS: StudentInterview[] = [
  { id: "iv-1", company: "Deloitte USI Hyderabad", role: "Financial Planning & Analysis (FP&A) Analyst", round: "Partner interview", date: "2 Oct 2026", time: "3:00 PM", mode: "Video call", interviewer: "Ananya Iyer, Partner", status: "Upcoming", tips: ["Revise three-statement modelling basics", "Prepare one example of a forecast you built", "Keep questions ready about the team's clients"] },
  { id: "iv-2", company: "Darwinbox Tech Solutions", role: "Associate Product Analyst", round: "Online evaluation", date: "6 Oct 2026", time: "11:00 AM", mode: "Video call", interviewer: "Campus TA team", status: "Upcoming", tips: ["Practise SQL joins and window functions", "Read about Darwinbox's HR modules", "Test your camera and internet a day before"] },
  { id: "iv-3", company: "Cyient Global Services", role: "HR Business Partner Trainee", round: "HR round", date: "22 Sep 2026", time: "10:30 AM", mode: "In person", interviewer: "Ravi Teja, HRBP", status: "Completed", tips: ["Send a thank-you note", "Note the questions you found hard"] },
];

export type NotificationKind = "application" | "interview" | "alert" | "message" | "learning";

export interface StudentNotification {
  id: string;
  kind: NotificationKind;
  text: string;
  time: string;
  /** Dashboard view to open when the notification is clicked. */
  view: string;
  read: boolean;
}

export const NOTIFICATIONS: StudentNotification[] = [
  { id: "n-1", kind: "interview", text: "Deloitte scheduled your partner interview for Fri, 2 Oct at 3:00 PM.", time: "10 min ago", view: "interviews", read: false },
  { id: "n-2", kind: "message", text: "Priya from Darwinbox sent you a message about your online evaluation.", time: "1 hour ago", view: "messages", read: false },
  { id: "n-3", kind: "alert", text: "3 new jobs match your alert “Finance roles in Hyderabad”.", time: "3 hours ago", view: "jobs", read: false },
  { id: "n-4", kind: "application", text: "Your application to Darwinbox moved to Shortlisted.", time: "Yesterday", view: "applications", read: true },
  { id: "n-5", kind: "learning", text: "New module unlocked in Executive MBA Placement Mastery.", time: "2 days ago", view: "courses", read: true },
  { id: "n-6", kind: "application", text: "Cyient viewed your profile.", time: "3 days ago", view: "applications", read: true },
];

export interface Message {
  from: "me" | "them";
  text: string;
  time: string;
}

export interface Thread {
  id: string;
  recruiter: string;
  company: string;
  role: string;
  unread: number;
  messages: Message[];
}

export const THREADS: Thread[] = [
  {
    id: "t-1",
    recruiter: "Priya Sharma",
    company: "Darwinbox Tech Solutions",
    role: "Associate Product Analyst",
    unread: 1,
    messages: [
      { from: "them", text: "Hi Rohit, thanks for applying! You've been shortlisted for the Associate Product Analyst role.", time: "Yesterday, 4:10 PM" },
      { from: "me", text: "Thank you, Priya! I'm excited about the role. What are the next steps?", time: "Yesterday, 4:32 PM" },
      { from: "them", text: "Next is an online evaluation on 6 Oct at 11 AM — SQL and a short product case. You'll get the link by email.", time: "1 hour ago" },
    ],
  },
  {
    id: "t-2",
    recruiter: "Ananya Iyer",
    company: "Deloitte USI Hyderabad",
    role: "FP&A Analyst",
    unread: 0,
    messages: [
      { from: "them", text: "Congratulations on clearing the technical round. The partner interview is on Friday at 3 PM.", time: "Mon, 11:05 AM" },
      { from: "me", text: "Thank you! Could you share who will be on the panel?", time: "Mon, 11:20 AM" },
      { from: "them", text: "It will be me and one senior manager from the FP&A practice.", time: "Mon, 12:02 PM" },
    ],
  },
  {
    id: "t-3",
    recruiter: "Ravi Teja",
    company: "Cyient Global Services",
    role: "HR Business Partner Trainee",
    unread: 0,
    messages: [{ from: "them", text: "Thanks for coming in for the HR round. We'll share feedback within a week.", time: "22 Sep, 1:15 PM" }],
  },
];

export interface JobAlert {
  id: string;
  name: string;
  keywords: string;
  category: string;
  location: string;
  type: string;
  frequency: "Instant" | "Daily" | "Weekly";
  channels: ("Email" | "WhatsApp" | "In-app")[];
  active: boolean;
}

export const DEFAULT_ALERTS: JobAlert[] = [
  { id: "a-1", name: "Finance roles in Hyderabad", keywords: "Analyst", category: "Finance & Accounting", location: "Hyderabad", type: "Full-time", frequency: "Daily", channels: ["Email", "In-app"], active: true },
  { id: "a-2", name: "HR internships", keywords: "", category: "HR & Operations", location: "", type: "Internship", frequency: "Instant", channels: ["WhatsApp", "In-app"], active: true },
];

/** Starting content for the resume builder (the rest comes from the student's profile). */
export const RESUME_DEFAULTS = {
  summary:
    "MBA Finance & Systems graduate with hands-on experience in financial analysis, SQL reporting and product roadmapping. Looking for analyst roles where data drives business decisions.",
  education: [
    { degree: "MBA, Finance & Systems", school: "Osmania University", year: "2024 – 2026", score: "CGPA 8.4" },
    { degree: "B.Com (Computers)", school: "Nizam College", year: "2021 – 2024", score: "82%" },
  ],
  experience: [
    { title: "Finance Intern", company: "Hyderabad Metro Rail", period: "May – Jul 2025", points: "Built a monthly cost dashboard in PowerBI\nAutomated vendor reconciliation, saving 6 hours a week" },
  ],
  projects: [{ name: "Telangana Agri-Tech Supply Chain Portal", detail: "Live project · crop-price analytics dashboard with Python and PowerBI" }],
  certifications: "NISM Research Analyst · Google Data Analytics",
  languages: "English, Telugu, Hindi",
};
