// Mock data for the employer (recruiter) dashboard at /employer.

export type JobStatus = "Active" | "Paused" | "Closed";

export interface EmployerJob {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Internship" | "Contract";
  experience: string;
  salary: string;
  openings: number;
  status: JobStatus;
  postedOn: string;
  views: number;
}

export type Stage = "applied" | "shortlisted" | "interview" | "offered" | "hired" | "rejected";
export type Source = "Jobsinfo.world" | "Campus drive" | "Referral" | "LinkedIn";

export interface Interview {
  date: string;
  time: string;
  mode: "Video call" | "In person" | "Phone";
  round: string;
  status: "Requested" | "Confirmed" | "Completed";
}

export interface Offer {
  ctc: string;
  sentOn: string;
  status: "Pending" | "Accepted" | "Declined";
  joiningDate: string;
}

export interface Candidate {
  id: string;
  name: string;
  headline: string;
  location: string;
  experienceYears: number;
  education: string;
  skills: string[];
  expectedCtc: string;
  noticePeriod: string;
  source: Source;
  /** Job applied for; null means the profile is only in the CV repository. */
  jobId: string | null;
  stage: Stage;
  appliedOn: string;
  match: number;
  interview?: Interview;
  offer?: Offer;
  hiredOn?: string;
}

export const EMPLOYER_JOBS: EmployerJob[] = [
  { id: "ej-1", title: "HR Executive", department: "People", location: "Hitec City, Hyderabad", type: "Full-time", experience: "0–2 yrs", salary: "₹3.2–4.5 LPA", openings: 4, status: "Active", postedOn: "12 Sep 2026", views: 1840 },
  { id: "ej-2", title: "Associate Product Analyst", department: "Product", location: "Hitec City, Hyderabad", type: "Full-time", experience: "Fresher", salary: "₹7.5–9.5 LPA", openings: 3, status: "Active", postedOn: "5 Sep 2026", views: 2310 },
  { id: "ej-3", title: "Full-Stack Developer", department: "Engineering", location: "Madhapur, Hyderabad", type: "Full-time", experience: "1–3 yrs", salary: "₹8–14 LPA", openings: 5, status: "Active", postedOn: "28 Aug 2026", views: 3120 },
  { id: "ej-4", title: "Digital Marketing Intern", department: "Marketing", location: "Remote", type: "Internship", experience: "Fresher", salary: "₹15,000 / month", openings: 6, status: "Paused", postedOn: "20 Aug 2026", views: 960 },
  { id: "ej-5", title: "Financial Analyst", department: "Finance", location: "Financial District, Hyderabad", type: "Full-time", experience: "1–3 yrs", salary: "₹9–12 LPA", openings: 2, status: "Active", postedOn: "18 Sep 2026", views: 1270 },
  { id: "ej-6", title: "Customer Success Associate", department: "Operations", location: "Gachibowli, Hyderabad", type: "Contract", experience: "0–1 yrs", salary: "₹3–4 LPA", openings: 3, status: "Closed", postedOn: "2 Jul 2026", views: 1480 },
];

export const CANDIDATES: Candidate[] = [
  { id: "c-1", name: "Sneha Reddy", headline: "B.Com graduate · HR internship at Cyient", location: "Hyderabad", experienceYears: 0, education: "B.Com, Osmania University (2026)", skills: ["Recruitment", "MS Excel", "Communication", "Onboarding"], expectedCtc: "₹3.6 LPA", noticePeriod: "Immediate", source: "Jobsinfo.world", jobId: "ej-1", stage: "applied", appliedOn: "27 Sep 2026", match: 92 },
  { id: "c-2", name: "Arjun Varma", headline: "MBA HR · Talent acquisition trainee", location: "Secunderabad", experienceYears: 1, education: "MBA HR, ICFAI Business School (2025)", skills: ["Sourcing", "ATS", "Interviewing", "HR Analytics"], expectedCtc: "₹4.2 LPA", noticePeriod: "30 days", source: "LinkedIn", jobId: "ej-1", stage: "shortlisted", appliedOn: "24 Sep 2026", match: 88 },
  { id: "c-3", name: "Kavya Nair", headline: "Data analyst intern · SQL & PowerBI", location: "Hyderabad", experienceYears: 0, education: "B.Tech CSE, JNTU Hyderabad (2026)", skills: ["SQL", "PowerBI", "Python", "Product Analytics"], expectedCtc: "₹8.5 LPA", noticePeriod: "Immediate", source: "Campus drive", jobId: "ej-2", stage: "interview", appliedOn: "15 Sep 2026", match: 94, interview: { date: "2 Oct 2026", time: "11:00 AM", mode: "Video call", round: "Case study round", status: "Confirmed" } },
  { id: "c-4", name: "Rahul Teja", headline: "Full-stack developer · Next.js, Node", location: "Madhapur, Hyderabad", experienceYears: 2, education: "B.Tech IT, CBIT (2024)", skills: ["React", "Next.js", "Node.js", "PostgreSQL"], expectedCtc: "₹12 LPA", noticePeriod: "45 days", source: "Referral", jobId: "ej-3", stage: "offered", appliedOn: "1 Sep 2026", match: 90, offer: { ctc: "₹12.5 LPA", sentOn: "22 Sep 2026", status: "Pending", joiningDate: "3 Nov 2026" } },
  { id: "c-5", name: "Priya Menon", headline: "Frontend engineer · TypeScript", location: "Gachibowli, Hyderabad", experienceYears: 3, education: "B.E. ECE, Osmania University (2023)", skills: ["TypeScript", "React", "Tailwind", "Testing"], expectedCtc: "₹13 LPA", noticePeriod: "60 days", source: "LinkedIn", jobId: "ej-3", stage: "hired", appliedOn: "29 Aug 2026", match: 87, offer: { ctc: "₹13 LPA", sentOn: "10 Sep 2026", status: "Accepted", joiningDate: "1 Oct 2026" }, hiredOn: "14 Sep 2026" },
  { id: "c-6", name: "Mohammed Irfan", headline: "CA Inter · FP&A analyst", location: "Hyderabad", experienceYears: 2, education: "B.Com (Hons), Nizam College (2024)", skills: ["Financial Modelling", "Excel", "Forecasting", "SAP"], expectedCtc: "₹10 LPA", noticePeriod: "30 days", source: "Jobsinfo.world", jobId: "ej-5", stage: "shortlisted", appliedOn: "21 Sep 2026", match: 91 },
  { id: "c-7", name: "Divya Lakshmi", headline: "MBA Finance · Equity research intern", location: "Kukatpally, Hyderabad", experienceYears: 1, education: "MBA Finance, Osmania University (2025)", skills: ["Valuation", "Excel", "Bloomberg", "Reporting"], expectedCtc: "₹9 LPA", noticePeriod: "Immediate", source: "Campus drive", jobId: "ej-5", stage: "interview", appliedOn: "19 Sep 2026", match: 85, interview: { date: "1 Oct 2026", time: "3:30 PM", mode: "In person", round: "Technical round", status: "Requested" } },
  { id: "c-8", name: "Vikram Goud", headline: "Growth marketer · SEO & paid ads", location: "Remote", experienceYears: 0, education: "BBA, St. Mary's College (2026)", skills: ["SEO", "Google Ads", "Content", "Analytics"], expectedCtc: "₹15,000 / month", noticePeriod: "Immediate", source: "Jobsinfo.world", jobId: "ej-4", stage: "applied", appliedOn: "25 Sep 2026", match: 83 },
  { id: "c-9", name: "Ananya Rao", headline: "Product analyst · A/B testing", location: "Hyderabad", experienceYears: 1, education: "B.Tech, IIIT Hyderabad (2025)", skills: ["SQL", "Experimentation", "Amplitude", "Python"], expectedCtc: "₹9 LPA", noticePeriod: "15 days", source: "Referral", jobId: "ej-2", stage: "applied", appliedOn: "28 Sep 2026", match: 96 },
  { id: "c-10", name: "Sai Kiran", headline: "Backend developer · Java, Spring", location: "Hitec City, Hyderabad", experienceYears: 3, education: "B.Tech CSE, VNR VJIET (2023)", skills: ["Java", "Spring Boot", "AWS", "Microservices"], expectedCtc: "₹14 LPA", noticePeriod: "60 days", source: "LinkedIn", jobId: "ej-3", stage: "interview", appliedOn: "10 Sep 2026", match: 82, interview: { date: "30 Sep 2026", time: "10:00 AM", mode: "Video call", round: "System design", status: "Confirmed" } },
  { id: "c-11", name: "Fatima Begum", headline: "Customer support lead · 2 yrs", location: "Gachibowli, Hyderabad", experienceYears: 2, education: "B.Sc, Osmania University (2024)", skills: ["CRM", "Zendesk", "Escalations", "Communication"], expectedCtc: "₹4 LPA", noticePeriod: "Immediate", source: "Jobsinfo.world", jobId: "ej-6", stage: "hired", appliedOn: "8 Jul 2026", match: 89, offer: { ctc: "₹3.8 LPA", sentOn: "25 Jul 2026", status: "Accepted", joiningDate: "18 Aug 2026" }, hiredOn: "28 Jul 2026" },
  { id: "c-12", name: "Naveen Kumar", headline: "HR generalist · payroll & compliance", location: "Warangal", experienceYears: 2, education: "MBA HR, Kakatiya University (2024)", skills: ["Payroll", "Compliance", "HRMS", "Employee Relations"], expectedCtc: "₹4.5 LPA", noticePeriod: "30 days", source: "Referral", jobId: "ej-1", stage: "offered", appliedOn: "14 Sep 2026", match: 84, offer: { ctc: "₹4.4 LPA", sentOn: "26 Sep 2026", status: "Pending", joiningDate: "20 Oct 2026" } },
  { id: "c-13", name: "Harika Chowdary", headline: "UI engineer · design systems", location: "Hyderabad", experienceYears: 1, education: "B.Des, NIFT Hyderabad (2025)", skills: ["Figma", "React", "CSS", "Accessibility"], expectedCtc: "₹8 LPA", noticePeriod: "Immediate", source: "Jobsinfo.world", jobId: null, stage: "applied", appliedOn: "—", match: 80 },
  { id: "c-14", name: "Rohit Vangapalli", headline: "MBA Finance & Systems · analyst", location: "Hyderabad", experienceYears: 0, education: "MBA Finance & Systems, Osmania University (2026)", skills: ["Financial Analysis", "SQL", "Product Roadmapping", "Business Development"], expectedCtc: "₹8 LPA", noticePeriod: "Immediate", source: "Jobsinfo.world", jobId: null, stage: "applied", appliedOn: "—", match: 86 },
  { id: "c-15", name: "Meghana Pillai", headline: "Marketing associate · social media", location: "Bengaluru", experienceYears: 1, education: "BMS, Christ University (2025)", skills: ["Social Media", "Canva", "Copywriting", "Meta Ads"], expectedCtc: "₹4 LPA", noticePeriod: "15 days", source: "LinkedIn", jobId: null, stage: "applied", appliedOn: "—", match: 78 },
  { id: "c-16", name: "Karthik Chenna", headline: "Data engineer · Spark, Airflow", location: "Hyderabad", experienceYears: 4, education: "M.Tech, University of Hyderabad (2022)", skills: ["Spark", "Airflow", "Python", "SQL"], expectedCtc: "₹18 LPA", noticePeriod: "90 days", source: "Referral", jobId: null, stage: "applied", appliedOn: "—", match: 75 },
  { id: "c-18", name: "Ramesh Yadav", headline: "Office assistant · data entry & filing", location: "Hyderabad", experienceYears: 2, education: "SSC (10th), ZPHS Medchal (2019)", skills: ["Data Entry", "Filing", "MS Office", "Telugu & Hindi"], expectedCtc: "₹1.8 LPA", noticePeriod: "Immediate", source: "Jobsinfo.world", jobId: null, stage: "applied", appliedOn: "—", match: 72 },
  { id: "c-19", name: "Swathi Goud", headline: "Front desk executive · customer care", location: "Secunderabad", experienceYears: 1, education: "SSC (10th), Govt. Girls High School (2021)", skills: ["Reception", "Customer Care", "Scheduling", "English"], expectedCtc: "₹2 LPA", noticePeriod: "15 days", source: "Campus drive", jobId: null, stage: "applied", appliedOn: "—", match: 74 },
  { id: "c-20", name: "Praveen Kumar", headline: "Sales trainee · field sales", location: "Hyderabad", experienceYears: 1, education: "Intermediate (12th) MPC, Sri Chaitanya (2023)", skills: ["Field Sales", "Lead Generation", "Negotiation", "Two-wheeler licence"], expectedCtc: "₹2.6 LPA", noticePeriod: "Immediate", source: "Jobsinfo.world", jobId: null, stage: "applied", appliedOn: "—", match: 77 },
  { id: "c-21", name: "Bhavani Reddy", headline: "Telecaller · inside sales", location: "Kukatpally, Hyderabad", experienceYears: 0, education: "Intermediate (12th) CEC, Narayana Junior College (2025)", skills: ["Telecalling", "CRM", "Communication", "Follow-ups"], expectedCtc: "₹2.2 LPA", noticePeriod: "Immediate", source: "Referral", jobId: null, stage: "applied", appliedOn: "—", match: 79 },
  { id: "c-22", name: "Srinivas Naik", headline: "Electrician · industrial wiring", location: "Patancheru", experienceYears: 3, education: "ITI Electrician, Govt. ITI Mallepally (2022)", skills: ["Industrial Wiring", "Panel Maintenance", "Safety", "PLC Basics"], expectedCtc: "₹3 LPA", noticePeriod: "30 days", source: "Jobsinfo.world", jobId: null, stage: "applied", appliedOn: "—", match: 81 },
  { id: "c-23", name: "Imran Pasha", headline: "Fitter · CNC operations", location: "Jeedimetla", experienceYears: 2, education: "ITI Fitter, Govt. ITI Shantinagar (2023)", skills: ["CNC", "Fitting", "Measuring Tools", "Quality Checks"], expectedCtc: "₹2.8 LPA", noticePeriod: "15 days", source: "Campus drive", jobId: null, stage: "applied", appliedOn: "—", match: 76 },
  { id: "c-24", name: "Anil Kumar", headline: "Junior site engineer · civil", location: "Hyderabad", experienceYears: 2, education: "Diploma in Civil Engineering, Govt. Polytechnic Masab Tank (2023)", skills: ["AutoCAD", "Site Supervision", "Estimation", "BOQ"], expectedCtc: "₹3.5 LPA", noticePeriod: "30 days", source: "LinkedIn", jobId: null, stage: "applied", appliedOn: "—", match: 80 },
  { id: "c-25", name: "Sravani Devi", headline: "Hardware & network technician", location: "Hitec City, Hyderabad", experienceYears: 1, education: "Diploma in Computer Engineering, JNGP Ramanthapur (2024)", skills: ["Networking", "Hardware", "Windows Admin", "Troubleshooting"], expectedCtc: "₹3 LPA", noticePeriod: "Immediate", source: "Jobsinfo.world", jobId: null, stage: "applied", appliedOn: "—", match: 83 },
  { id: "c-26", name: "Lakshmi Prasanna", headline: "Content writer · English & Telugu", location: "Hyderabad", experienceYears: 1, education: "B.A. English Literature, Osmania University (2025)", skills: ["Content Writing", "Editing", "SEO Basics", "Translation"], expectedCtc: "₹3.2 LPA", noticePeriod: "Immediate", source: "Jobsinfo.world", jobId: null, stage: "applied", appliedOn: "—", match: 82 },
  { id: "c-27", name: "Suresh Babu", headline: "HR assistant · employee records", location: "Warangal", experienceYears: 2, education: "B.A. Economics, Kakatiya University (2023)", skills: ["HR Records", "Excel", "Payroll Support", "Communication"], expectedCtc: "₹3 LPA", noticePeriod: "30 days", source: "Referral", jobId: null, stage: "applied", appliedOn: "—", match: 78 },
  { id: "c-28", name: "Nikhil Rao", headline: "Lab analyst · quality control", location: "Genome Valley, Hyderabad", experienceYears: 1, education: "M.Sc Chemistry, University of Hyderabad (2025)", skills: ["HPLC", "QC Testing", "Documentation", "GMP"], expectedCtc: "₹4.5 LPA", noticePeriod: "Immediate", source: "LinkedIn", jobId: null, stage: "applied", appliedOn: "—", match: 79 },
  { id: "c-17", name: "Lavanya Devi", headline: "Recruitment coordinator", location: "Hyderabad", experienceYears: 1, education: "BBA, Osmania University (2025)", skills: ["Scheduling", "Sourcing", "Excel", "Communication"], expectedCtc: "₹3.4 LPA", noticePeriod: "Immediate", source: "Campus drive", jobId: "ej-1", stage: "rejected", appliedOn: "13 Sep 2026", match: 70 },
];

/**
 * CV repository folders, in display order. A candidate goes into the first group whose pattern matches
 * their education; anything unmatched (e.g. B.Des) lands in "Other".
 */
export const EDUCATION_GROUPS = [
  { id: "ssc", title: "10th / SSC", subtitle: "Secondary school", match: /\b(SSC|10th)\b/i },
  { id: "inter", title: "12th / Intermediate", subtitle: "Higher secondary", match: /\b(Intermediate|12th|HSC)\b/i },
  { id: "iti", title: "ITI", subtitle: "Industrial training", match: /\bITI\b/i },
  { id: "diploma", title: "Diploma", subtitle: "Polytechnic", match: /\bDiploma\b/i },
  { id: "ba", title: "B.A", subtitle: "Bachelor of Arts", match: /\bB\.A\b/i },
  { id: "bcom", title: "B.Com", subtitle: "Bachelor of Commerce", match: /\bB\.Com\b/i },
  { id: "bsc", title: "B.Sc", subtitle: "Bachelor of Science", match: /\bB\.Sc\b/i },
  { id: "btech", title: "B.Tech / B.E", subtitle: "Engineering", match: /\b(B\.Tech|B\.E)\b/i },
  { id: "bba", title: "BBA / BMS", subtitle: "Business studies", match: /\b(BBA|BMS)\b/i },
  { id: "mba", title: "MBA", subtitle: "Post-graduate management", match: /\bMBA\b/i },
  { id: "pg", title: "M.Tech / M.Sc", subtitle: "Post-graduate", match: /\b(M\.Tech|M\.Sc|M\.E|MCA|M\.Com|M\.A)\b/i },
  { id: "other", title: "Other", subtitle: "All other qualifications", match: /.*/ },
] as const;

export type EducationGroupId = (typeof EDUCATION_GROUPS)[number]["id"];

export const educationGroup = (c: Pick<Candidate, "education">): EducationGroupId =>
  EDUCATION_GROUPS.find((g) => g.match.test(c.education))!.id;

export const RECRUITER = {
  name: "Priya Sharma",
  email: "priya.s@darwinbox.in",
  phone: "+91 90000 12345",
  role: "Talent Acquisition Lead",
  photo: "/generated/blue/avatars/testimonial-woman-2.webp",
};

export const COMPANY = {
  name: "Darwinbox Technologies",
  industry: "HR Technology (SaaS)",
  size: "1,000–5,000 employees",
  founded: "2015",
  website: "www.darwinbox.com",
  headquarters: "Hitec City, Hyderabad",
  about:
    "Darwinbox builds the HR platform used by 900+ enterprises across Asia. Our Hyderabad teams work on product, engineering, customer success and people operations.",
  benefits: ["Health insurance + OPD", "Hybrid work", "₹50k learning budget", "ESOPs for all levels"],
};

/** Applications received per month (reports view). */
export const APPLICATIONS_BY_MONTH = [
  { label: "Apr", value: 142 },
  { label: "May", value: 168 },
  { label: "Jun", value: 155 },
  { label: "Jul", value: 210 },
  { label: "Aug", value: 248 },
  { label: "Sep", value: 286 },
];

/** Where hires-to-date came from; order fixes the chart colour. */
export const SOURCES: { label: Source; value: number }[] = [
  { label: "Jobsinfo.world", value: 48 },
  { label: "Campus drive", value: 22 },
  { label: "Referral", value: 18 },
  { label: "LinkedIn", value: 12 },
];

export const TIME_TO_HIRE_DAYS = { current: 18, previous: 24 };
