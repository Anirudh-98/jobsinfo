// Homepage copy for Jobsinfo.world. Kept separate from components so content
// can be edited (or later fetched from a CMS) without touching layout code.

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Jobs",
    href: "/jobs",
    children: [
      { label: "Browse Jobs", href: "/jobs" },
      { label: "Job Alerts", href: "/jobs#alerts" },
      { label: "Salary Insights", href: "/jobs#salary" },
    ],
  },
  {
    label: "Students",
    href: "/#journeys",
    children: [
      { label: "Join as Student", href: "/#journeys" },
      { label: "Real-Time Projects", href: "/projects" },
      { label: "Learning Resources", href: "/courses" },
    ],
  },
  {
    label: "Colleges",
    href: "/#journeys",
    children: [
      { label: "Enhance Opportunities", href: "/#journeys" },
      { label: "Faculty Portal", href: "/#journeys" },
      { label: "Placement Support", href: "/mba-placement" },
    ],
  },
  {
    label: "Employers",
    href: "/hr-solutions",
    children: [
      { label: "Post a Job", href: "/hr-solutions" },
      { label: "Find Talent", href: "/hr-solutions" },
      { label: "Recruitment Tools", href: "/hr-solutions" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "Browse Projects", href: "/projects" },
      { label: "Project Categories", href: "/projects" },
      { label: "Case Studies", href: "/projects" },
    ],
  },
  {
    label: "Business Clinic",
    href: "/business-navigator",
    children: [
      { label: "Get Consulting", href: "/business-navigator" },
      { label: "Business Navigator", href: "/business-navigator" },
      { label: "Expert Support", href: "/business-navigator" },
    ],
  },
  {
    label: "Experts",
    href: "/mentors",
    children: [
      { label: "Become an Expert", href: "/mentors" },
      { label: "Expert Directory", href: "/mentors" },
      { label: "Mentorship", href: "/mentors" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Mission", href: "/about#our-mission" },
      { label: "Team", href: "/about" },
      { label: "Impact Stories", href: "/#stories" },
      { label: "Newsroom", href: "/about" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const ANNOUNCEMENTS = [
  "1,586 New Jobs Added Today",
  "325+ New Projects Open",
  "Limited Time Offer: ₹2,000 Expert Learning Support (BBA/BBM/B.Com/M.Com/MBA Students)",
];

export const STATS = [
  {
    key: "seekers",
    value: 25000,
    suffix: "+",
    label: "Active Job Seekers",
    sub: "Verified Profiles Ready to Work",
    insight: "You're hiring from an active, engaged pool.",
  },
  {
    key: "vacancies",
    value: 1586,
    suffix: "",
    label: "Live Vacancies",
    sub: "Updated Daily",
    insight: "Fresh opportunities are added every hour.",
  },
  {
    key: "employers",
    value: 128,
    suffix: "",
    label: "Trusted Employers",
    sub: "Verified Organizations",
    insight: "Only quality employers, no spammers.",
  },
  {
    key: "placed",
    value: 10000,
    suffix: "+",
    label: "Students Placed",
    sub: "In First Jobs & Projects",
    insight: "A proven track record of success.",
  },
] as const;

export const PROBLEMS = [
  {
    challenge: "Weak Communication Skills",
    audience: "Students",
    challengeText: "Great ideas get lost when students can't present them confidently to recruiters or clients.",
    solution: "Regular Public Interaction & Professional Programs",
    points: ["Live presentations & group sessions", "Structured soft-skill programs", "Feedback from industry mentors"],
  },
  {
    challenge: "Students Don't Know Where to Look for Jobs",
    audience: "Students",
    challengeText: "Openings are scattered across portals, and most freshers can't tell which ones are genuine.",
    solution: "Structured Employment Profile & Verified Opportunities",
    points: ["One profile for every application", "Only verified employers", "Matches based on your skills"],
  },
  {
    challenge: "Employers Can't Find Qualified Talent Fast",
    audience: "Employers",
    challengeText: "Hundreds of unfiltered resumes slow hiring down and still miss the right fit.",
    solution: "AI-Powered Skill-Based Candidate Search",
    points: ["Search by assessed skills", "Pre-screened candidate pool", "Shortlist in days, not weeks"],
  },
  {
    challenge: "Freshers Lack Real Industry Experience",
    audience: "Students",
    challengeText: "Every job asks for experience, but nobody offers the first opportunity to gain it.",
    solution: "Supervised Experiential Assignments with Mentors",
    points: ["Guided, real assignments", "A mentor on every project", "Experience you can show on a resume"],
  },
  {
    challenge: "Academic Projects Become Theoretical",
    audience: "Students",
    challengeText: "Classroom learning doesn't prepare you for real work. Academic projects stay disconnected from industry reality.",
    solution: "Real-World Project Opportunities with Real Organizations",
    points: ["Real organizations, real problems", "Mentorship from industry experts", "Performance-based earnings"],
  },
  {
    challenge: "Students Miss Industry Interaction",
    audience: "Students",
    challengeText: "Few students ever speak to a hiring manager or business owner before they graduate.",
    solution: "Direct Employer & Business Engagement",
    points: ["Meet employers on live projects", "Industry sessions every week", "Build a professional network early"],
  },
  {
    challenge: "MSMEs Can't Afford Expert Consulting",
    audience: "Businesses",
    challengeText: "Small businesses need finance, legal and IT advice but can't pay consulting-firm fees.",
    solution: "Free Business Clinic & Navigator Ecosystem",
    points: ["Free initial consultations", "Experts across 8 business areas", "Practical, actionable guidance"],
  },
  {
    challenge: "Entrepreneurs Need Guidance & Support",
    audience: "Businesses",
    challengeText: "First-time founders face every decision alone, from compliance to fundraising.",
    solution: "Expert Mentoring & Business Development Programs",
    points: ["One-on-one founder mentoring", "Growth & expansion planning", "Access to a support network"],
  },
  {
    challenge: "Job Seekers Need Career Guidance",
    audience: "Job seekers",
    challengeText: "Without direction, job seekers apply everywhere and hear back from nowhere.",
    solution: "HR/Career Guidance & Personalized Support",
    points: ["Personalized career guidance", "Resume & interview preparation", "Advice from HR professionals"],
  },
  {
    challenge: "Businesses Need Multidisciplinary Solutions",
    audience: "Businesses",
    challengeText: "Growth problems rarely fit a single specialty, and coordinating separate advisors is slow.",
    solution: "Business Navigator Ecosystem",
    points: ["One point of contact", "Multidisciplinary expert teams", "Coordinated end-to-end support"],
  },
];

export type Journey = {
  id: string;
  tab: string;
  entryTitle: string;
  entrySub: string;
  steps: { title: string; detail: string }[];
  outcome: string;
  highlights: string[];
  cta: { label: string; href: string };
};

export const JOURNEYS: Journey[] = [
  {
    id: "job-seekers",
    tab: "Job Seekers",
    entryTitle: "Sign Up Free",
    entrySub: "Create Your Profile",
    steps: [
      { title: "Build Your Professional Profile", detail: "Skills, Experience, Qualifications" },
      { title: "Get Matched with Opportunities", detail: "Based on your skills & preferences" },
      { title: "Interview & Assessment", detail: "Direct connection with employers" },
      { title: "Land Your Job", detail: "Join verified organizations" },
    ],
    outcome: "Skilled & Confident in Your Dream Role",
    highlights: ["2,456 students hired this quarter", "Typical journey: 2–3 weeks per step"],
    cta: { label: "Browse Jobs Now", href: "/jobs" },
  },
  {
    id: "students",
    tab: "Students",
    entryTitle: "Join as Student — 100% Free",
    entrySub: "Real Skills, Real Projects, Real Earnings",
    steps: [
      { title: "Get Oriented & Assessed", detail: "Skill evaluation, career mentoring" },
      { title: "Choose Your Real Project", detail: "From 325+ live industry projects" },
      { title: "Learn, Execute & Earn", detail: "Complete projects, get certified, earn" },
      { title: "Build Portfolio & Get Placed", detail: "Employment or entrepreneurship" },
    ],
    outcome: "From Student to Professional in 24 Months",
    highlights: ["₹25,000 – ₹5,00,000+ earned by students", "Join 10,000+ students already growing"],
    cta: { label: "Start Your Journey", href: "/projects" },
  },
  {
    id: "employers",
    tab: "Employers",
    entryTitle: "Post a Job",
    entrySub: "Find Verified, Pre-Assessed Talent",
    steps: [
      { title: "Post Your Vacancy", detail: "Describe requirements, set salary" },
      { title: "Browse Pre-Screened Candidates", detail: "78,542 verified profiles with assessments" },
      { title: "Interview & Shortlist", detail: "Direct candidate communication" },
      { title: "Hire the Best Talent", detail: "Get your team faster" },
    ],
    outcome: "Skilled & Confident Talent Acquired",
    highlights: ["1,586 vacancies filled this month", "Average 15 qualified applications per job"],
    cta: { label: "Post a Job Now", href: "/hr-solutions" },
  },
  {
    id: "colleges",
    tab: "Colleges",
    entryTitle: "Enhance Opportunities",
    entrySub: "For Your Students",
    steps: [
      { title: "Onboard Your Institution", detail: "Faculty & nodal officer coordination" },
      { title: "Enroll Students in Programs", detail: "Real projects, skill development" },
      { title: "Monitor & Support Growth", detail: "Track progress, provide guidance" },
      { title: "Build Industry Connect", detail: "Direct employer partnerships" },
    ],
    outcome: "Better Placements, Industry-Ready Graduates",
    highlights: ["Placement rate improvement: +35%", "Zero investment, full support"],
    cta: { label: "Explore for Colleges", href: "/mba-placement" },
  },
  {
    id: "experts",
    tab: "Experts",
    entryTitle: "Share Your Expertise",
    entrySub: "Mentor the Next Generation",
    steps: [
      { title: "Create Expert Profile", detail: "Your credentials, areas of expertise" },
      { title: "Start Mentoring Students", detail: "Guide 10,000+ learners" },
      { title: "Lead Expert Sessions", detail: "Live masterclasses, workshops" },
      { title: "Build Your Community", detail: "Thought leadership platform" },
    ],
    outcome: "Recognized as an Industry Expert",
    highlights: ["500+ experts already guiding", "Live masterclasses every week"],
    cta: { label: "Become an Expert", href: "/mentors" },
  },
];

export const FEATURES = [
  {
    key: "jobs",
    title: "Job Marketplace",
    desc: "1,586 verified job opportunities across 128 trusted organizations. Real roles, real companies, no spam.",
    benefits: ["143 new jobs added every day", "Filter by location, qualification, role", "One-click apply with pre-filled profile"],
    metric: "25,000+ Job Seekers Browsing",
    hover: ["Avg. 15 applications per job", "35% of applicants get interviews"],
    cta: { label: "Browse Jobs", href: "/jobs" },
  },
  {
    key: "projects",
    title: "Real-Time Projects",
    desc: "Choose from 325+ live industry projects. Learn by doing. Earn while you learn. Build your portfolio.",
    benefits: ["325+ projects in 15+ domains", "Complete real work for real organizations", "Performance-based earnings (₹5K–₹50K+ per project)"],
    metric: "10,000+ Students Learning Right Now",
    hover: ["Avg. duration: 2–3 months", "88% completion rate", "Top performers earn ₹5,00,000+"],
    cta: { label: "Explore Projects", href: "/projects" },
  },
  {
    key: "experts",
    title: "Expert Network",
    desc: "500+ industry experts, professors and mentors ready to guide your career. Learn from the best.",
    benefits: ["1-on-1 mentorship sessions", "Live masterclasses & webinars", "Expert guidance on projects"],
    metric: "500+ Active Experts · 2,000+ Hours of Content",
    hover: ["45+ expertise areas", "Avg. response time: 2–4 hours", "98% satisfaction rating"],
    cta: { label: "Connect with Experts", href: "/mentors" },
  },
  {
    key: "assessment",
    title: "Smart Assessment System",
    desc: "AI-powered skill assessment, personality tests and industry certifications. Prove your competence.",
    benefits: ["Technical skill tests", "Personality & aptitude assessment", "Industry-recognized certifications"],
    metric: "78,542+ Verified Profiles",
    hover: ["400+ unique skill tests", "Certification valid for 3 years", "Used by 128+ employers in hiring"],
    cta: { label: "Get Assessed", href: "/courses" },
  },
  {
    key: "business",
    title: "Business Clinic & Navigator",
    desc: "Free business consulting for startups & MSMEs. Expert support in finance, legal, IT and growth strategy.",
    benefits: ["Free initial consultation", "Expert support in 8 business areas", "Growth & expansion planning"],
    metric: "100+ Businesses Supported",
    hover: ["Avg. issue resolution: 2 weeks", "First 5 consultations free", "80% of MSMEs report growth"],
    cta: { label: "Get Business Help", href: "/business-navigator" },
  },
] as const;

export const STORIES = [
  {
    initials: "RK",
    photo: "/images/home/story-ramesh.webp",
    name: "Ramesh Kumar",
    role: "B.Com Student",
    location: "Hyderabad",
    type: "Student",
    from: "0 professional experience",
    to: "5 real projects completed + ₹75,000 earned",
    quote: "Jobsinfo.world gave me real experience that no internship could have. I feel confident applying for jobs now.",
    time: "8 months to success",
  },
  {
    initials: "SR",
    photo: "/images/home/story-sujatha.webp",
    name: "Sujatha Reddy",
    role: "MBA (HR)",
    location: "Hyderabad",
    type: "Job Seeker",
    from: "Unemployed for 3 months",
    to: "HR Executive hired at Aditya Hospitals",
    quote: "Jobsinfo helped me find a role aligned with my qualifications. The process was smooth and transparent.",
    time: "3 weeks to job offer",
  },
  {
    initials: "AD",
    name: "Amazon Development Center",
    role: "IT / Software",
    location: "Hyderabad",
    type: "Employer",
    from: "Needed 45 software developers",
    to: "Hired the full team via Jobsinfo.world",
    quote: "Jobsinfo gave us access to pre-assessed talent. Onboarding was 40% faster than traditional hiring.",
    time: "4 weeks to team built",
  },
];

export const PILLARS = [
  {
    key: "learn",
    title: "Learn",
    desc: "Gain cutting-edge skills through expert mentorship and real-world knowledge sharing.",
    steps: [
      ["Get Expert Guidance", "Access 500+ industry experts"],
      ["Structured Learning Path", "Guided projects with milestones"],
      ["Real Knowledge Application", "Apply learning immediately"],
    ],
    metrics: ["2,000+ hours of expert content", "45+ skill categories", "3–6 months average duration"],
    cta: { label: "Explore Learning Programs", href: "/courses" },
  },
  {
    key: "do",
    title: "Do",
    desc: "Apply your skills on real projects with real organizations. Build practical experience that matters.",
    steps: [
      ["Choose Your Project", "From 325+ live opportunities"],
      ["Execute with Support", "Mentorship while working"],
      ["Deliver Real Results", "Solve actual business problems"],
    ],
    metrics: ["325+ active projects", "Real organizations hiring", "88% project completion rate"],
    cta: { label: "Browse Real Projects", href: "/projects" },
  },
  {
    key: "earn",
    title: "Earn",
    desc: "Get paid for every project completed. Performance-based earnings reward the quality of your work.",
    steps: [
      ["Complete Quality Work", "Deliver measurable results"],
      ["Get Reviewed", "Feedback on performance"],
      ["Receive Payment", "Direct to your account"],
    ],
    metrics: ["₹5,000 – ₹50,000 per project", "Avg. ₹2,40,000 per student / year", "Top performers: ₹5,00,000+"],
    cta: { label: "Start Earning Now", href: "/projects" },
  },
  {
    key: "lead",
    title: "Lead",
    desc: "Develop leadership qualities and an entrepreneurial mindset. Become tomorrow's leader today.",
    steps: [
      ["Build Professional Network", "Connect with mentors & peers"],
      ["Lead Projects & Teams", "Take ownership & manage teams"],
      ["Start Your Journey", "Job placement or entrepreneurship"],
    ],
    metrics: ["25,000+ professional network", "85%+ placement rate", "150+ startups launched"],
    cta: { label: "Build Your Leadership Path", href: "/support" },
  },
] as const;

export const BADGES = [
  { key: "free", title: "100% Free for Job Seekers & Students", text: "No registration fee, no hidden charges. Free forever for job seekers and students." },
  { key: "verified", title: "Verified Opportunities Only", text: "Every job and project is vetted. Verified employers only. No spam." },
  { key: "cert", title: "Industry-Recognized Certifications", text: "Accepted by 128+ employers across India. Valid for 3 years." },
  { key: "secure", title: "Secure & Confidential", text: "Your data is encrypted and protected to international security standards." },
  { key: "success", title: "10,000+ Success Stories", text: "Over 10,000 students placed in jobs or completed paid projects." },
  { key: "mentors", title: "Expert Mentors", text: "500+ industry experts providing personalized guidance." },
  { key: "rating", title: "4.8/5 Average Rating", text: "Rated highly by students, job seekers and employers." },
  { key: "india", title: "Pan-India Presence", text: "Operating in 30+ cities with 1,248 registered employers." },
] as const;

export const ACTIVITY = [
  { text: "Ramesh Kumar got hired as Account Executive at Akash Enterprises", time: "2 hours ago" },
  { text: "Supriya Sharma completed a Marketing Project & earned ₹25,000", time: "1 hour ago" },
  { text: "Amazon Development Center posted 45 Software Developer roles", time: "45 minutes ago" },
  { text: "500+ students joined the Digital Marketing project this month", time: "30 minutes ago" },
  { text: "Anita Devi earned ₹15,000 from a Finance Analysis Project", time: "15 minutes ago" },
  { text: "Business Clinic helped TechStart Solutions raise ₹50L funding", time: "10 minutes ago" },
  { text: "Dr. Ravi Kumar mentored 50 students this week", time: "5 minutes ago" },
  { text: "New HR Executive roles open at Aditya Hospitals & Clinics", time: "Now" },
];

export const ROLE_CTAS = [
  {
    key: "students",
    audience: "Students & Job Seekers",
    title: "Join Now — 100% Free",
    pitch: "Register in 2 minutes. Start earning in 2 days. Build a career in 2 months.",
    button: "Join Now",
    href: "signup",
    trust: ["No credit card required", "Get matched within 24 hours", "Join 25,000+ already earning"],
  },
  {
    key: "employers",
    audience: "Employers",
    title: "Post a Vacancy",
    pitch: "Find qualified talent in days, not months.",
    button: "Post Now",
    href: "/hr-solutions",
    trust: ["25,000+ verified candidates", "Pre-screened for skills", "Hire in half the time"],
  },
  {
    key: "colleges",
    audience: "Colleges",
    title: "Explore College Programs",
    pitch: "Improve placements by 35%. Zero investment.",
    button: "Explore",
    href: "/mba-placement",
    trust: ["50+ colleges already partnered", "Proven placement improvement", "Full platform support"],
  },
  {
    key: "experts",
    audience: "Experts & Mentors",
    title: "Become an Expert Mentor",
    pitch: "Share your knowledge. Help 10,000+ learners.",
    button: "Register Now",
    href: "/mentors",
    trust: ["500+ experts already guiding", "Build your personal brand", "Recognition + opportunities"],
  },
];

export const FOOTER_COLUMNS = [
  {
    heading: "For Students",
    links: [
      ["Browse Projects (325+ Active)", "/projects"],
      ["Explore Jobs (1,586+ Openings)", "/jobs"],
      ["Find Mentors (500+ Experts)", "/mentors"],
      ["Skill Assessment", "/courses"],
      ["Learning Resources", "/courses"],
      ["Career Guidance", "/support"],
      ["Blog & Articles", "/about"],
      ["FAQ", "/support"],
    ],
  },
  {
    heading: "For Employers",
    links: [
      ["Post a Job", "/hr-solutions"],
      ["Browse Candidates", "/hr-solutions"],
      ["Recruitment Solutions", "/hr-solutions"],
      ["Pricing & Plans", "/hr-solutions"],
      ["Success Stories", "/#stories"],
      ["Help Center", "/support"],
      ["Contact Sales", "/contact"],
    ],
  },
  {
    heading: "For Institutions",
    links: [
      ["Overview", "/mba-placement"],
      ["Student Benefits", "/mba-placement"],
      ["Faculty Portal", "/mba-placement"],
      ["Placement Support", "/mba-placement"],
      ["Partnership Process", "/contact"],
      ["Case Studies", "/#stories"],
      ["Request Demo", "/contact"],
    ],
  },
  {
    heading: "Resources",
    links: [
      ["Blog & News", "/about"],
      ["Expert Sessions (Video)", "/masterclass"],
      ["Webinars & Workshops", "/masterclass"],
      ["Download Apps", "/support"],
      ["API Documentation", "/support"],
    ],
  },
] as const;

export const LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Cookie Policy", "Refund Policy", "Report Security Issue"];
