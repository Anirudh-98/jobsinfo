export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  experience: "Fresher" | "1-3 yrs" | "3+ yrs";
  salary: string;
  salaryNum: number; // in LPA
  category: "IT & Tech" | "Office & Admin" | "Sales & Marketing" | "Finance & Accounting" | "HR & Operations";
  type: "Full-time" | "Internship" | "Contract";
  datePosted: string;
  openings: number;
  featured?: boolean;
  description: string;
  requirements: string[];
  responsibilities: string[];
  perks: string[];
  mbaRelevant?: boolean;
}

export interface Company {
  id: string;
  name: string;
  sector: string;
  vacancies: number;
  avgSalary: string;
  hiringRoles: string[];
  location: string;
  stages: string[];
  logoText: string;
  color: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorRole: string;
  category: "Data & AI" | "Corporate Finance" | "Full-Stack Tech" | "HR Management" | "Product & Strategy";
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  studentsCount: number;
  rating: number;
  price: string;
  description: string;
  modules: string[];
  badge?: string;
}

export interface Project {
  id: string;
  title: string;
  domain: string;
  techStack: string[];
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  mentor: string;
  enrolledStudents: number;
  description: string;
  deliverables: string[];
  learningOutcomes: string[];
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  expertise: string[];
  rating: number;
  reviewsCount: number;
  hourlyRate: string;
  experienceYears: number;
  availableDays: string[];
  bio: string;
  avatarText: string;
}

export interface Masterclass {
  id: string;
  title: string;
  host: string;
  hostRole: string;
  hostCompany: string;
  isLive: boolean;
  liveViewers?: number;
  date: string;
  time: string;
  duration: string;
  category: string;
  description: string;
  agenda: string[];
  recordingUrl?: string;
}

export const JOBS_DATA: Job[] = [
  {
    id: "job-1",
    title: "Associate Product Analyst",
    company: "Darwinbox Tech Solutions",
    location: "Hitec City, Hyderabad",
    experience: "Fresher",
    salary: "₹7.5 - 9.5 LPA",
    salaryNum: 8.5,
    category: "IT & Tech",
    type: "Full-time",
    datePosted: "1 day ago",
    openings: 8,
    featured: true,
    mbaRelevant: true,
    description: "Join Hyderabad's leading HR tech unicorn to analyze platform telemetry, assist in product roadmapping, and interface with enterprise enterprise client implementations.",
    requirements: ["B.Tech/MBA from recognized Telangana institution", "Proficiency in SQL and Data Visualization (PowerBI/Tableau)", "Clear presentation and stakeholder communication"],
    responsibilities: ["Break down functional specifications into user stories", "Perform cohort retention analysis", "Assist Senior PMs during sprint planning"],
    perks: ["Health insurance + OPD", "Annual training budget ₹50k", "Hybrid work policy"]
  },
  {
    id: "job-2",
    title: "HR Business Partner Trainee",
    company: "Cyient Global Services",
    location: "Gachibowli, Hyderabad",
    experience: "Fresher",
    salary: "₹5.5 - 7.0 LPA",
    salaryNum: 6.2,
    category: "HR & Operations",
    type: "Full-time",
    datePosted: "2 days ago",
    openings: 14,
    featured: true,
    mbaRelevant: true,
    description: "Support our aerospace & defense engineering division's talent acquisition, employee onboarding, and performance management pipelines.",
    requirements: ["MBA in HR / Personnel Management (2025/2026)", "Understanding of Indian labor laws and POSH guidelines", "Strong verbal negotiation skills"],
    responsibilities: ["Coordinate recruitment drives across Telangana engineering colleges", "Manage employee engagement pulses", "Oversee onboarding lifecycle"],
    perks: ["Shuttle services across Hyderabad", "Performance bonuses", "Corporate gym access"]
  },
  {
    id: "job-3",
    title: "Financial Planning & Analysis (FP&A) Analyst",
    company: "Deloitte USI Hyderabad",
    location: "Financial District, Hyderabad",
    experience: "1-3 yrs",
    salary: "₹9.0 - 12.0 LPA",
    salaryNum: 10.5,
    category: "Finance & Accounting",
    type: "Full-time",
    datePosted: "3 days ago",
    openings: 22,
    featured: true,
    mbaRelevant: true,
    description: "Deliver variance analysis, annual operating plans, and rolling financial forecasts for Fortune 500 technology accounts.",
    requirements: ["MBA Finance / M.Com / CA Inter", "Advanced Microsoft Excel, Financial Modelling, and Alteryx", "Experience in budget forecasting"],
    responsibilities: ["Consolidate P&L performance for regional business heads", "Analyze operational cost drivers", "Prepare quarterly executive decks"],
    perks: ["Comprehensive health cover for family", "Education sponsorship", "Wellness allowances"]
  },
  {
    id: "job-4",
    title: "Full-Stack Next.js Developer",
    company: "T-Hub Innovative Solutions",
    location: "Madhapur, Hyderabad",
    experience: "1-3 yrs",
    salary: "₹8.0 - 14.0 LPA",
    salaryNum: 11.0,
    category: "IT & Tech",
    type: "Full-time",
    datePosted: "Today",
    openings: 6,
    featured: true,
    mbaRelevant: false,
    description: "Build scalable web portals and developer dashboards for Telangana's largest startup incubator ecosystem.",
    requirements: ["Hands-on React, Next.js App Router, TypeScript, and Tailwind CSS", "Experience connecting REST/GraphQL APIs and PostgreSQL", "Knowledge of cloud deployment on AWS or Vercel"],
    responsibilities: ["Develop responsive UI components with modern UX aesthetics", "Ensure 90+ Lighthouse performance scores", "Write clean, modular code with automated tests"],
    perks: ["Unlimited mentorship access at T-Hub", "Flexible hours", "Quarterly hackathon awards"]
  },
  {
    id: "job-5",
    title: "Corporate Sales & Account Executive",
    company: "Apollo Health & Wellness Enterprise",
    location: "Banjara Hills, Hyderabad",
    experience: "Fresher",
    salary: "₹4.5 - 6.5 LPA + Incentives",
    salaryNum: 5.5,
    category: "Sales & Marketing",
    type: "Full-time",
    datePosted: "4 days ago",
    openings: 35,
    featured: false,
    mbaRelevant: true,
    description: "Spearhead corporate healthcare wellness subscriptions across industrial hubs in Hyderabad, Shamshabad, and Patancheru.",
    requirements: ["MBA Marketing / BBA Graduate", "Fluency in English, Telugu, and Hindi", "Goal-oriented approach with strong pitching capabilities"],
    responsibilities: ["Generate enterprise leads through cold outreach and trade events", "Conduct product presentations to CHROs and HR Heads", "Achieve quarterly revenue targets"],
    perks: ["Attractive uncapped incentive structure", "Fuel reimbursement", "Career fast-track program"]
  },
  {
    id: "job-6",
    title: "Management Trainee - Supply Chain Operations",
    company: "Dr. Reddy's Laboratories",
    location: "Bachupally, Hyderabad",
    experience: "Fresher",
    salary: "₹6.5 - 8.0 LPA",
    salaryNum: 7.2,
    category: "HR & Operations",
    type: "Full-time",
    datePosted: "5 days ago",
    openings: 18,
    featured: true,
    mbaRelevant: true,
    description: "Accelerate your career in pharmaceutical manufacturing logistics, vendor governance, and cold-chain inventory analytics.",
    requirements: ["MBA in Operations / Supply Chain / Logistics", "Analytical acumen with ERP/SAP familiarity", "Willingness to handle plant logistics"],
    responsibilities: ["Monitor production schedules and inventory buffer levels", "Coordinate with raw material vendors across South India", "Implement lean Six Sigma process improvements"],
    perks: ["Subsidized campus cafeteria", "Life insurance cover", "Annual performance incentives"]
  },
  {
    id: "job-7",
    title: "Digital Marketing & Growth Associate",
    company: "Swiggy Regional Office",
    location: "Madhapur, Hyderabad",
    experience: "1-3 yrs",
    salary: "₹6.0 - 8.5 LPA",
    salaryNum: 7.2,
    category: "Sales & Marketing",
    type: "Full-time",
    datePosted: "1 week ago",
    openings: 5,
    featured: false,
    mbaRelevant: true,
    description: "Drive consumer acquisition campaigns, hyper-local social media strategies, and influencer partnerships across Telangana circles.",
    requirements: ["BBA/MBA with 1+ years in performance marketing or social advertising", "Hands-on with Meta Ads Manager, Google Analytics, and Canva", "Creative copy drafting skills"],
    responsibilities: ["Plan and execute regional promo campaigns", "Track customer acquisition cost (CAC) and ROAS", "Collaborate with local merchant partners"],
    perks: ["Monthly Swiggy credits", "MacBook provided", "Generous leave policy"]
  },
  {
    id: "job-8",
    title: "Operations & Admin Executive",
    company: "Tech Mahindra IT Sez",
    location: "Bahadurpally, Hyderabad",
    experience: "Fresher",
    salary: "₹3.8 - 5.0 LPA",
    salaryNum: 4.4,
    category: "Office & Admin",
    type: "Full-time",
    datePosted: "3 days ago",
    openings: 20,
    featured: false,
    mbaRelevant: true,
    description: "Manage campus facility coordination, vendor procurement, and employee support operations for a 5,000+ seat IT campus.",
    requirements: ["Graduate in any discipline / BBA / MBA", "Good knowledge of MS Office (Word, Excel, Outlook)", "Strong organization and multitasking skills"],
    responsibilities: ["Manage visitor passes and security clearance logs", "Coordinate facility maintenance and supplies inventory", "Generate weekly admin reports"],
    perks: ["Transportation pick-and-drop", "Medical insurance", "Gratuity and PF"]
  },
  {
    id: "job-9",
    title: "Cloud DevOps & Infrastructure Intern",
    company: "CtrlS Datacenters",
    location: "Financial District, Hyderabad",
    experience: "Fresher",
    salary: "₹25,000 / month (PPO up to ₹7 LPA)",
    salaryNum: 3.0,
    category: "IT & Tech",
    type: "Internship",
    datePosted: "Just now",
    openings: 10,
    featured: false,
    mbaRelevant: false,
    description: "Hands-on internship assisting senior cloud architects in Kubernetes cluster monitoring, Linux server hardening, and CI/CD pipelines.",
    requirements: ["B.Tech Computer Science / IT / ECE (Final year or recent grad)", "Foundational Linux commands, Docker basics, and Python scripting", "Fast learner with curiosity for cloud systems"],
    responsibilities: ["Assist in server uptime telemetry monitoring", "Script automated backup routines", "Document infrastructure configurations"],
    perks: ["Direct PPO conversion based on 6-month performance", "Free datacenter cafeteria meals", "Certification voucher"]
  },
  {
    id: "job-10",
    title: "Senior Tax Consultant",
    company: "PwC India Advisory",
    location: "Hitec City, Hyderabad",
    experience: "3+ yrs",
    salary: "₹14.0 - 18.5 LPA",
    salaryNum: 16.0,
    category: "Finance & Accounting",
    type: "Full-time",
    datePosted: "6 days ago",
    openings: 12,
    featured: true,
    mbaRelevant: true,
    description: "Lead corporate tax advisory, transfer pricing compliance, and GST audit advisory for high-growth tech firms in Telangana.",
    requirements: ["Chartered Accountant (CA) or MBA Finance with 3+ years post-qualification experience", "Deep knowledge of Indian Direct & Indirect Tax codes", "Team leadership and audit experience"],
    responsibilities: ["Advise clients on tax-efficient holding structures", "Review statutory returns and reply to assessment notices", "Mentor junior associates and trainees"],
    perks: ["Annual executive health checkup", "Performance bonus (up to 20%)", "International mobility opportunities"]
  }
];

export const COMPANIES_DATA: Company[] = [
  {
    id: "comp-1",
    name: "Darwinbox",
    sector: "HR Tech Unicorn",
    vacancies: 142,
    avgSalary: "₹8.5 LPA",
    hiringRoles: ["Product Analyst", "Implementation Specialist", "HR Consultant", "Account Executive"],
    location: "Hitec City, Hyderabad",
    stages: ["Applied", "Online Assessment", "Case Presentation", "HR Final", "Offer"],
    logoText: "DB",
    color: "#1E5BA8"
  },
  {
    id: "comp-2",
    name: "Deloitte USI",
    sector: "Consulting & Financial Services",
    vacancies: 620,
    avgSalary: "₹9.2 LPA",
    hiringRoles: ["Tax Analyst", "Risk & Financial Advisory", "Technology Analyst", "Strategy Associate"],
    location: "Financial District, Hyderabad",
    stages: ["Resume Shortlist", "Aptitude Test", "Technical Interview", "Partner Round", "Offer"],
    logoText: "DT",
    color: "#10B981"
  },
  {
    id: "comp-3",
    name: "Dr. Reddy's",
    sector: "Pharmaceuticals & Life Sciences",
    vacancies: 285,
    avgSalary: "₹7.4 LPA",
    hiringRoles: ["Management Trainee", "Supply Chain Analyst", "Regulatory Affairs", "Sales Officer"],
    location: "Bachupally / Banjara Hills",
    stages: ["Group Discussion", "Domain Interview", "HR Behavioral", "Offer"],
    logoText: "DR",
    color: "#2563EB"
  },
  {
    id: "comp-4",
    name: "Cyient",
    sector: "Engineering & Technology Solutions",
    vacancies: 310,
    avgSalary: "₹6.2 LPA",
    hiringRoles: ["HR Trainee", "Operations Analyst", "Technical Recruiter", "Business Analyst"],
    location: "Gachibowli, Hyderabad",
    stages: ["Aptitude Test", "Technical Round", "Managerial Interview", "HR Fitment"],
    logoText: "CY",
    color: "#0F172A"
  },
  {
    id: "comp-5",
    name: "Tech Mahindra",
    sector: "IT Services & Digital Transformation",
    vacancies: 850,
    avgSalary: "₹5.8 LPA",
    hiringRoles: ["Associate Software Engineer", "Admin Trainee", "Process Executive", "Sales Trainee"],
    location: "Bahadurpally / Hitec City",
    stages: ["Online Coding/Aptitude", "Technical Panel", "HR Round", "Offer Letter"],
    logoText: "TM",
    color: "#1E3A8A"
  },
  {
    id: "comp-6",
    name: "T-Hub Ecosystem Startups",
    sector: "Venture & Tech Incubator",
    vacancies: 340,
    avgSalary: "₹7.8 LPA",
    hiringRoles: ["Full-Stack Dev", "Growth Hacker", "Founder's Office Associate", "Product Designer"],
    location: "Madhapur, Hyderabad",
    stages: ["Take-home Task", "Founder Chat", "Offer"],
    logoText: "TH",
    color: "#2563EB"
  },
  {
    id: "comp-7",
    name: "Apollo Hospitals Enterprise",
    sector: "Healthcare & Corporate Wellness",
    vacancies: 190,
    avgSalary: "₹5.2 LPA",
    hiringRoles: ["Healthcare Admin", "Corporate Sales Executive", "Customer Relations", "Billing Lead"],
    location: "Jubilee Hills / Panjagutta",
    stages: ["Interview Round 1", "HR Round", "Document Verification", "Offer"],
    logoText: "AP",
    color: "#0284C7"
  },
  {
    id: "comp-8",
    name: "PwC India",
    sector: "Audit, Tax & Advisory",
    vacancies: 420,
    avgSalary: "₹10.5 LPA",
    hiringRoles: ["Tax Associate", "Assurance Trainee", "Management Consultant", "Cybersecurity Trainee"],
    location: "Hitec City, Hyderabad",
    stages: ["Aptitude", "Case Study Round", "Director Interview", "Partner Interview"],
    logoText: "PW",
    color: "#0F172A"
  }
];

export const COURSES_DATA: Course[] = [
  {
    id: "course-1",
    title: "Executive MBA Placement Mastery & HR Round Cracker",
    instructor: "Srinivas Rao Varma",
    instructorRole: "Former VP HR at Infosys & Corporate Coach",
    category: "HR Management",
    level: "Intermediate",
    duration: "6 Weeks (Live & On-demand)",
    studentsCount: 2840,
    rating: 4.9,
    price: "Free for Verified Students",
    badge: "Most Popular",
    description: "Step-by-step masterclass covering the STAR method, handling stress questions, salary negotiation strategies, and simulated mock interviews for Hyderabad placements.",
    modules: [
      "Deconstructing Behavioral Questions & The STAR Framework",
      "Handling Gaps, Low CGPA & Career Transitions",
      "Executive Presence, Body Language & Video Etiquette",
      "Mock HR Panel Simulation with Live Scorecards"
    ]
  },
  {
    id: "course-2",
    title: "Financial Modelling & Corporate Valuation for Analysts",
    instructor: "Pooja Reddy, CA",
    instructorRole: "Senior Manager - Deals & Strategy, Big 4",
    category: "Corporate Finance",
    level: "Advanced",
    duration: "8 Weeks",
    studentsCount: 1650,
    rating: 4.8,
    price: "₹3,999",
    badge: "Industry Certified",
    description: "Build three-statement financial models from scratch, discounted cash flow (DCF) models, and merger models for high-paying FP&A roles.",
    modules: [
      "Excel Power-user Shortcuts & Dynamic Formulas",
      "Three-Statement Integration (P&L, Balance Sheet, Cash Flow)",
      "DCF & Comparable Company Analysis (Comps)",
      "Cap Table & Startup Pitch Valuation"
    ]
  },
  {
    id: "course-3",
    title: "Data Analytics with SQL, PowerBI & Python",
    instructor: "Karthik Chenna",
    instructorRole: "Principal Data Architect, Microsoft IDC",
    category: "Data & AI",
    level: "Beginner",
    duration: "10 Weeks",
    studentsCount: 3420,
    rating: 4.9,
    price: "₹4,499",
    badge: "High Placement Rate",
    description: "Zero-to-hero curriculum designed for students and professionals wanting to transition into high-growth Business Analyst and Data Analyst careers.",
    modules: [
      "PostgreSQL & Complex Joins, Window Functions",
      "Interactive Dashboarding with PowerBI & DAX",
      "Exploratory Data Analysis with Pandas & Seaborn",
      "End-to-End Capstone with Real Hyderabad Retail Data"
    ]
  },
  {
    id: "course-4",
    title: "Modern Full-Stack Engineering (Next.js, TypeScript & Cloud)",
    instructor: "Aditya Mohan",
    instructorRole: "Staff Engineer at Swiggy",
    category: "Full-Stack Tech",
    level: "Intermediate",
    duration: "12 Weeks",
    studentsCount: 1980,
    rating: 4.9,
    price: "₹5,999",
    badge: "Job Guarantee Cohort",
    description: "Master modern production architecture: Next.js App Router, Tailwind CSS, PostgreSQL with Prisma/Drizzle, and containerized Docker deployments.",
    modules: [
      "TypeScript Architecture & Strict Type-Safety",
      "Next.js Server Components, Server Actions & Cache",
      "Auth, RBAC & Cloud Database Integrations",
      "Production CI/CD Pipelines & AWS Deployment"
    ]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj-1",
    title: "Telangana Agri-Tech Supply Chain Intelligence Portal",
    domain: "Supply Chain & Analytics",
    techStack: ["React", "Python", "FastAPI", "PostgreSQL", "PowerBI"],
    duration: "4 Weeks",
    difficulty: "Intermediate",
    mentor: "K. Murali Krishna, Ex-ITC Agri",
    enrolledStudents: 142,
    description: "Build a real-time marketplace analytics dashboard tracking crop prices, logistics turnaround, and warehousing capacity across Telangana districts.",
    deliverables: ["Interactive geo-spatial dashboard", "REST API for daily mandi pricing feed", "Comprehensive project report & portfolio repository"],
    learningOutcomes: ["Hands-on spatial data visualization", "Data pipeline automation with Python", "Portfolio project ready for supply chain interviews"]
  },
  {
    id: "proj-2",
    title: "Autonomous HR Candidate Screening & Resume Scoring Engine",
    domain: "Artificial Intelligence / HR Tech",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "LangChain", "Gemini API"],
    duration: "6 Weeks",
    difficulty: "Advanced",
    mentor: "Dr. Ananya Sen, AI Researcher",
    enrolledStudents: 98,
    description: "Architect an automated recruitment copilot that parses candidate resumes, computes job description semantic alignment, and generates customized HR interview questions.",
    deliverables: ["Multi-page recruitment dashboard", "Resume parsing & semantic vector scoring module", "Automated interview question generator"],
    learningOutcomes: ["Practical generative AI & embedding models", "Building production UX for enterprise HR teams", "End-to-end full-stack state management"]
  },
  {
    id: "proj-3",
    title: "Healthcare Clinic Operations & Patient Workflow System",
    domain: "HealthTech & Enterprise ERP",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    duration: "4 Weeks",
    difficulty: "Beginner",
    mentor: "P. Rajesh, Senior Engineering Lead",
    enrolledStudents: 215,
    description: "Develop a HIPAA-conscious patient appointment booking, doctor availability schedule, and automated SMS reminder framework for Hyderabad diagnostics centers.",
    deliverables: ["Patient & Doctor role portals", "Appointment slot allocation logic", "Prescription PDF generation"],
    learningOutcomes: ["Full-stack CRUD architecture", "Role-based access control (RBAC)", "Real-world healthcare workflows"]
  }
];

export const MENTORS_DATA: Mentor[] = [
  {
    id: "mentor-1",
    name: "Vikramaditya Goud",
    role: "Senior Director of Talent Acquisition",
    company: "ServiceNow Hyderabad",
    expertise: ["HR Interview Mastery", "Executive Resume Review", "Salary Negotiation", "Leadership Hiring"],
    rating: 4.96,
    reviewsCount: 184,
    hourlyRate: "₹1,200 / session",
    experienceYears: 16,
    availableDays: ["Mon", "Wed", "Sat"],
    bio: "Have recruited over 3,500 engineers and business analysts across Hyderabad. Passionate about transforming student confidence for campus and off-campus placements.",
    avatarText: "VG"
  },
  {
    id: "mentor-2",
    name: "Sneha Mandava",
    role: "Lead Product Manager",
    company: "Microsoft IDC",
    expertise: ["Product Management", "Case Study Frameworks", "Design Thinking", "Tech Transitions"],
    rating: 4.92,
    reviewsCount: 138,
    hourlyRate: "₹1,500 / session",
    experienceYears: 11,
    availableDays: ["Tue", "Thu", "Sun"],
    bio: "IIM Ahmedabad alumna with experience launching products for millions of daily active enterprise users. I help aspiring PMs master product rounds.",
    avatarText: "SM"
  },
  {
    id: "mentor-3",
    name: "Arjun Teja",
    role: "Principal Architect",
    company: "Amazon Web Services (AWS)",
    expertise: ["System Design", "Cloud Infrastructure", "Full-Stack Tech Interviews", "LeetCode Strategy"],
    rating: 4.98,
    reviewsCount: 220,
    hourlyRate: "₹1,800 / session",
    experienceYears: 14,
    availableDays: ["Fri", "Sat", "Sun"],
    bio: "Deep background in distributed systems and high-throughput microservices. Conducted 400+ bar-raiser engineering interviews at Amazon.",
    avatarText: "AT"
  },
  {
    id: "mentor-4",
    name: "Priyanka Nambiar",
    role: "VP of Strategic Finance & Investor Relations",
    company: "Zenoti",
    expertise: ["FP&A", "Corporate Finance", "Venture Pitching", "Startup Valuations"],
    rating: 4.89,
    reviewsCount: 94,
    hourlyRate: "₹1,400 / session",
    experienceYears: 12,
    availableDays: ["Wed", "Sat"],
    bio: "Assisting MBA finance graduates land top-bracket IB and corporate finance jobs with rigorous modeling drill-downs and real balance-sheet breakdowns.",
    avatarText: "PN"
  }
];

export const MASTERCLASSES_DATA: Masterclass[] = [
  {
    id: "mc-1",
    title: "Cracking the 2026 Campus Placement HR Round: Live Panel & Scorecards",
    host: "Vikramaditya Goud & Guest HR Panel",
    hostRole: "Senior Director Talent Acquisition, ServiceNow",
    hostCompany: "ServiceNow & JobsInfo.world",
    isLive: true,
    liveViewers: 842,
    date: "Happening Right Now",
    time: "4:00 PM - 5:30 PM IST",
    duration: "90 Mins",
    category: "Career & Placements",
    description: "Live interactive broadcast deconstructing how top Hyderabad employers evaluate communication, situational problem solving, and cultural fit in the final HR round.",
    agenda: [
      "Top 10 Trap Questions in Campus HR Rounds & How to Turn Them into Wins",
      "Live Student Mock Interview with Instant Scorecard Analysis",
      "Negotiating Non-Monetary Perks and Location Preferences",
      "Audience Q&A with Senior Hiring Managers"
    ]
  },
  {
    id: "mc-2",
    title: "GenAI for Product Managers: From Prompting to Enterprise Workflows",
    host: "Sneha Mandava",
    hostRole: "Lead PM, Microsoft IDC",
    hostCompany: "Microsoft IDC",
    isLive: false,
    date: "Tomorrow, Sept 18",
    time: "6:00 PM IST",
    duration: "75 Mins",
    category: "Technology & AI",
    description: "Learn how modern PMs utilize foundational models, evaluation harnesses, and latency optimization to build enterprise-ready AI features.",
    agenda: [
      "Understanding Model Tradeoffs: Flash vs Pro Models",
      "Constructing Robust Few-Shot Prompt Templates",
      "Product Metrics for AI Copilots",
      "Hands-on Case Study Walkthrough"
    ]
  },
  {
    id: "mc-3",
    title: "How to Build a ₹10 Cr MSME Business in Telangana: Grants & Growth",
    host: "Harish Reddy",
    hostRole: "Managing Partner, Telangana Seed Angels",
    hostCompany: "T-Seed Network",
    isLive: false,
    date: "Saturday, Sept 20",
    time: "11:00 AM IST",
    duration: "90 Mins",
    category: "Entrepreneurship & MSME",
    description: "Essential guide for local entrepreneurs covering Telangana MSME subsidies, T-PRIDE benefits, bank collateral-free loans, and investor readiness.",
    agenda: [
      "State-sponsored Subsidies & Industrial Parks",
      "Navigating CGTMSE Collateral-Free Loans",
      "Structuring Your Cap Table Before Seed Funding",
      "Direct Q&A with Angel Investors"
    ]
  }
];

export const MOCK_TESTIMONIALS = [
  {
    quote: "JobsInfo.world was the turning point in my MBA placement. The company-specific HR interview prep and placement portal gave me clear visibility into Darwinbox's hiring rounds. I received my offer letter with an 8.5 LPA package!",
    name: "Rohit Vangapalli",
    role: "Associate Product Analyst at Darwinbox",
    college: "Osmania University MBA Cohort",
    package: "₹8.5 LPA"
  },
  {
    quote: "As a college placement officer, JobsInfo.world has reduced our coordination overhead by 60%. We can track which organizations are actively hiring across Telangana and prepare our students with exact corporate scorecards.",
    name: "Dr. K. Swarnalatha",
    role: "Head of Training & Placements",
    college: "Telangana Engineering & Management Colleges Consortium",
    package: "Partner College"
  },
  {
    quote: "We hired 18 top-caliber management trainees through the JobsInfo verified placement cohort in under 3 weeks. The pre-evaluated behavioral assessments saved our HR panel dozens of interviewing hours.",
    name: "Meenakshi Sundaram",
    role: "VP Talent Acquisition",
    college: "Leading IT Solutions Provider, Hyderabad",
    package: "18 Hires"
  }
];
