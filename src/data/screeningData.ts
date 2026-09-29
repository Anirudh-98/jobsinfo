// HR prescreening done by MBA / BBA students (/mbadashboard): question bank, rating scale and sample evaluations.

export const HR_QUESTIONS = [
  { id: "intro", q: "Tell me about yourself.", hint: "Listen for a clear, structured story: education → experience → why this role." },
  { id: "motivation", q: "Why are you interested in this role and company?", hint: "Have they researched the company? Is the motivation specific?" },
  { id: "strengths", q: "What are your key strengths and one area you're improving?", hint: "Look for self-awareness and real examples, not buzzwords." },
  { id: "challenge", q: "Describe a challenge you faced and how you handled it.", hint: "Use STAR: Situation, Task, Action, Result." },
  { id: "teamwork", q: "Tell me about a time you worked in a team.", hint: "What was their role? How did they handle disagreement?" },
  { id: "goals", q: "Where do you see yourself in three years?", hint: "Realistic ambition that fits the role." },
  { id: "salary", q: "What are your salary expectations and notice period?", hint: "Confirm against the data collected above." },
  { id: "questions", q: "Do you have any questions for us?", hint: "Good questions show genuine interest." },
] as const;

export type QuestionId = (typeof HR_QUESTIONS)[number]["id"];

export const COMPETENCIES = [
  { id: "communication", label: "Communication", hint: "Clarity, structure, listening" },
  { id: "confidence", label: "Confidence & presence", hint: "Composure, eye contact, body language" },
  { id: "knowledge", label: "Domain knowledge", hint: "Understands their field and the role" },
  { id: "attitude", label: "Attitude & motivation", hint: "Energy, ownership, eagerness to learn" },
  { id: "fit", label: "Culture fit", hint: "Values, teamwork, professionalism" },
] as const;

export type CompetencyId = (typeof COMPETENCIES)[number]["id"];

export const RATING_LABELS = ["", "Poor", "Below average", "Average", "Good", "Excellent"];

export const RECOMMENDATIONS = [
  { id: "strong", label: "Strong hire", tone: "green" },
  { id: "shortlist", label: "Shortlist", tone: "blue" },
  { id: "hold", label: "On hold", tone: "amber" },
  { id: "reject", label: "Not suitable", tone: "rose" },
] as const;

export type RecommendationId = (typeof RECOMMENDATIONS)[number]["id"];

export interface CollectedDetails {
  currentLocation: string;
  expectedCtc: string;
  noticePeriod: string;
  relocate: "Yes" | "No" | "Maybe";
  languages: string;
  preferredRole: string;
}

export interface Evaluation {
  id: string;
  candidateId: string;
  interviewer: string;
  submittedAt: string;
  durationMin: number;
  details: CollectedDetails;
  notes: Partial<Record<QuestionId, string>>;
  asked: QuestionId[];
  ratings: Record<CompetencyId, number>;
  strengths: string;
  concerns: string;
  recommendation: RecommendationId;
  /** Candidate photo captured during the interview (object URL), when they had none on file. */
  photo?: string;
}

export const overallScore = (r: Record<CompetencyId, number>) => {
  const v = Object.values(r);
  return v.length ? Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 10) / 10 : 0;
};

/** Two earlier prescreens so the dashboard has history on first visit. */
export const SAMPLE_EVALUATIONS: Evaluation[] = [
  {
    id: "ev-1",
    candidateId: "c-6",
    interviewer: "Rohit Vangapalli",
    submittedAt: "27 Sep 2026, 4:20 PM",
    durationMin: 22,
    details: { currentLocation: "Hyderabad", expectedCtc: "₹10 LPA", noticePeriod: "30 days", relocate: "Yes", languages: "English, Hindi, Urdu", preferredRole: "FP&A Analyst" },
    notes: { intro: "Clear walkthrough of CA Inter + FP&A work.", challenge: "Automated month-end close — cut 2 days." },
    asked: ["intro", "motivation", "challenge", "salary"],
    ratings: { communication: 4, confidence: 4, knowledge: 5, attitude: 4, fit: 4 },
    strengths: "Strong modelling skills, crisp answers.",
    concerns: "Limited stakeholder-facing experience.",
    recommendation: "strong",
  },
  {
    id: "ev-2",
    candidateId: "c-8",
    interviewer: "Rohit Vangapalli",
    submittedAt: "26 Sep 2026, 11:05 AM",
    durationMin: 15,
    details: { currentLocation: "Remote", expectedCtc: "₹15,000 / month", noticePeriod: "Immediate", relocate: "Maybe", languages: "English, Telugu", preferredRole: "Digital Marketing Intern" },
    notes: { intro: "Nervous at first, settled in.", goals: "Wants to move into performance marketing." },
    asked: ["intro", "strengths", "goals"],
    ratings: { communication: 3, confidence: 2, knowledge: 3, attitude: 4, fit: 3 },
    strengths: "Hands-on with Google Ads.",
    concerns: "Needs more confidence; thin portfolio.",
    recommendation: "hold",
  },
];
