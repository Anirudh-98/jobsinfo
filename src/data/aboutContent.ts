// About page copy. Numbers match homeContent.ts so the site tells one consistent story.

export const ABOUT_HERO = {
  title: "We close the gap between",
  accent: "learning and earning.",
  intro:
    "Jobsinfo.world is one place where students, job seekers, employers, colleges, businesses and experts meet — so skills turn into real work, real income and, in time, leadership.",
};

export const STORY = {
  eyebrow: "Our story",
  title: "It started with a simple question:",
  accent: "why is the first job so hard to get?",
  paragraphs: [
    "Talented graduates were leaving college with degrees but no real experience. Employers were drowning in applications but couldn't find people ready to work. Colleges wanted better placements but had no bridge to industry.",
    "We began as a placement desk for MBA students in Hyderabad. Every problem we solved uncovered the next one — so we kept building, until one platform covered the whole journey from classroom to career.",
  ],
  milestones: [
    { title: "A placement desk for MBA cohorts", text: "Connecting business-school students with local recruiters, one drive at a time." },
    { title: "Open to every student & job seeker", text: "Verified jobs for freshers from any college, any stream — free, forever." },
    { title: "Real projects that pay", text: "Live briefs from real organisations, with mentors, so students earn while they learn." },
    { title: "A clinic for small businesses", text: "Affordable expert help for MSMEs — and more real work for our students." },
  ],
};

export const MISSION = {
  mission: {
    label: "Our mission",
    title: "Every student experiences the real world before they graduate.",
    text: "Not through lectures about work, but through actual work — projects, mentors, feedback and a first pay cheque.",
  },
  vision: {
    label: "Our vision",
    title: "An India where talent, not connections, decides who gets hired.",
    text: "Where a B.Com graduate from a tier-3 town has the same shot at a great career as anyone in a metro.",
  },
};

export type Audience = {
  key: string;
  label: string;
  headline: string;
  text: string;
  points: string[];
  cta: { label: string; href: string };
};

export const AUDIENCES: Audience[] = [
  {
    key: "students",
    label: "Students",
    headline: "Graduate with experience, not just a degree",
    text: "Learn from 500+ industry experts, work on live projects and earn while you study — all free.",
    points: ["325+ live, paid projects", "Mentors who work in the jobs you want", "Certificates recognised by 128+ employers"],
    // "signup" opens the free sign-up modal instead of navigating.
    cta: { label: "Join free as a student", href: "signup" },
  },
  {
    key: "seekers",
    label: "Job seekers",
    headline: "Only verified jobs. No fees. No spam.",
    text: "Every opening is checked before it goes live, and you can apply in one click with your profile.",
    points: ["1,586 live vacancies, updated daily", "Salary shown upfront", "Interview prep with real recruiters"],
    cta: { label: "Browse jobs", href: "/jobs" },
  },
  {
    key: "employers",
    label: "Employers",
    headline: "Hire people who are ready on day one",
    text: "Reach 25,000+ verified candidates who've already done real work, and hire in half the time.",
    points: ["Pre-screened, skill-verified profiles", "Campus drives across partner colleges", "Interview scorecards built in"],
    cta: { label: "Post a job", href: "/hr-solutions" },
  },
  {
    key: "colleges",
    label: "Colleges",
    headline: "Better placements, zero investment",
    text: "Give your students industry exposure and a direct line to recruiters — tracked in one dashboard.",
    points: ["50+ colleges already partnered", "Placement drives with verified employers", "Student progress you can see"],
    cta: { label: "Partner with us", href: "/mba-placement" },
  },
  {
    key: "business",
    label: "Businesses",
    headline: "Expert help, without consultant fees",
    text: "The Business Clinic gives MSMEs and founders practical guidance on growth, funding and compliance.",
    points: ["Step-by-step growth roadmaps", "Access to vetted experts", "Student talent for real projects"],
    cta: { label: "Visit the Business Clinic", href: "/business-navigator" },
  },
  {
    key: "experts",
    label: "Experts",
    headline: "Share what you know, shape a career",
    text: "Mentor learners, run masterclasses and build your professional brand while giving back.",
    points: ["Guide 10,000+ learners", "Paid sessions on your schedule", "Recognition across the network"],
    cta: { label: "Become a mentor", href: "/mentors" },
  },
];

export const PRINCIPLES = [
  { key: "verified", title: "Verified, always", text: "Every job, project and employer is checked before it reaches you. If it isn't real, it isn't here." },
  { key: "free", title: "Free for learners", text: "Students and job seekers never pay — no registration fees, no hidden charges, ever." },
  { key: "outcomes", title: "Outcomes over hype", text: "We measure ourselves by one thing: did someone get closer to a real offer or a real pay cheque?" },
  { key: "everyone", title: "Built for everyone", text: "Tier-2 and tier-3 colleges, first-generation graduates, career switchers — this is your platform too." },
];
