"use client";

import React, { useState } from "react";
import {
  Award,
  CheckCircle2,
  HelpCircle,
  BarChart2,
  Download,
  BookOpen,
  MessageSquare,
  Sliders,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";
import { PageHeaderBand } from "@/components/common/PageHeaderBand";

export default function HrSolutionsPage() {
  const { showToast } = useApp();

  // Interactive Scorecard Evaluator State
  const [commScore, setCommScore] = useState(8);
  const [starScore, setStarScore] = useState(7);
  const [problemScore, setProblemScore] = useState(8);
  const [cultureScore, setCultureScore] = useState(9);

  const totalScore = Math.round(((commScore + starScore + problemScore + cultureScore) / 40) * 100);

  const getEvaluationTier = (score: number) => {
    if (score >= 85) {
      return {
        label: "Tier-1 Ready (Big 4 & Product Unicorns)",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        advice: "Exceptional behavioral narrative. Your STAR framing is crisp and aligns directly with senior partner expectations.",
      };
    }
    if (score >= 70) {
      return {
        label: "Competitive Finalist (MNC Campus Drive)",
        color: "text-primary bg-blue-50 border-blue-200",
        advice: "Strong technical foundation. Sharpen the 'Results' metric in your STAR stories with quantifiable numbers.",
      };
    }
    return {
      label: "Needs Structured Mock Practice",
      color: "text-slate-800 bg-slate-100 border-slate-300",
      advice: "Practice active listening and avoid generalized answers. Use our 1:1 expert mentor mock sessions.",
    };
  };

  const evaluation = getEvaluationTier(totalScore);

  const starFramework = [
    {
      letter: "S",
      title: "Situation",
      desc: "Set the context and baseline scenario. Specify the company, project, or campus team context in 1-2 concise sentences.",
      sample: "During our 2nd semester supply chain capstone, our team faced a 30% delay in retail survey responses...",
    },
    {
      letter: "T",
      title: "Task",
      desc: "Define your exact personal accountability. What was your objective versus the collective group's responsibility?",
      sample: "My goal as analytics lead was to restructure the outreach funnel and recover 200 data points within 48 hours...",
    },
    {
      letter: "A",
      title: "Action",
      desc: "Detail the specific decisions, tools, and interpersonal actions you spearheaded. Highlight initiative and leadership.",
      sample: "I wrote an automated WhatsApp verification script and coordinated directly with 4 Hyderabad distributor leads...",
    },
    {
      letter: "R",
      title: "Result",
      desc: "Quantify the outcome and personal learning. What impact was created? Numbers, percentages, or awards.",
      sample: "We secured 260 responses, submitted the model 2 days early, and won Best Research Project across our cohort.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-canvas pb-20">
      <PageHeaderBand
        kicker="Corporate Evaluation Framework"
        title="Master Your HR Behavioral Interview Round"
        subtitle="Designed in partnership with Heads of Talent Acquisition across ServiceNow, Darwinbox, Cyient, and Deloitte to benchmark candidate readiness."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Interactive Competency Scorecard Tool */}
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-hairline shadow-elevation-resting">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-hairline">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Self-Assessment Diagnostic
              </span>
              <h2 className="text-2xl font-bold text-ink mt-1">
                Candidate Competency Benchmark Evaluator
              </h2>
              <p className="text-xs text-muted mt-1">
                Adjust sliders based on your recent mock interviews to simulate an HR panel scoring sheet.
              </p>
            </div>

            {/* Score Pill */}
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-md border border-hairline">
              <div>
                <span className="text-[10px] text-muted block uppercase font-bold">Overall Rating</span>
                <span className="text-3xl font-extrabold text-ink">{totalScore} <span className="text-sm text-muted">/ 100</span></span>
              </div>
              <div className={`px-3 py-1.5 rounded-sm border text-xs font-bold ${evaluation.color}`}>
                {evaluation.label}
              </div>
            </div>
          </div>

          {/* 4 Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div className="space-y-6">
              {/* Slider 1 */}
              <div>
                <div className="flex justify-between text-xs font-bold text-ink mb-1.5">
                  <span>1. Executive Communication & Presence</span>
                  <span className="text-primary font-bold">{commScore} / 10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={commScore}
                  onChange={(e) => setCommScore(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-slate-100 rounded-lg cursor-pointer"
                />
                <p className="text-[11px] text-muted mt-1">
                  Clarity, vocal pacing, professional body language, and avoidance of filler words.
                </p>
              </div>

              {/* Slider 2 */}
              <div>
                <div className="flex justify-between text-xs font-bold text-ink mb-1.5">
                  <span>2. STAR Method Structuring & Clarity</span>
                  <span className="text-primary font-bold">{starScore} / 10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={starScore}
                  onChange={(e) => setStarScore(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-slate-100 rounded-lg cursor-pointer"
                />
                <p className="text-[11px] text-muted mt-1">
                  Does your narrative cleanly articulate Situation, Task, Action, and quantifiable Result?
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Slider 3 */}
              <div>
                <div className="flex justify-between text-xs font-bold text-ink mb-1.5">
                  <span>3. Situational Agility & Problem Solving</span>
                  <span className="text-primary font-bold">{problemScore} / 10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={problemScore}
                  onChange={(e) => setProblemScore(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-slate-100 rounded-lg cursor-pointer"
                />
                <p className="text-[11px] text-muted mt-1">
                  Handling curveball scenarios, cross-functional conflicts, and resource constraints.
                </p>
              </div>

              {/* Slider 4 */}
              <div>
                <div className="flex justify-between text-xs font-bold text-ink mb-1.5">
                  <span>4. Cultural Fit & Values Alignment</span>
                  <span className="text-primary font-bold">{cultureScore} / 10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={cultureScore}
                  onChange={(e) => setCultureScore(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-slate-100 rounded-lg cursor-pointer"
                />
                <p className="text-[11px] text-muted mt-1">
                  Authenticity, resilience, long-term intent, and humility in receiving feedback.
                </p>
              </div>
            </div>
          </div>

          {/* Feedback Banner */}
          <div className="mt-8 p-4 rounded-md bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-primary uppercase">Panel Feedback Summary</p>
              <p className="text-xs text-ink-secondary mt-0.5">{evaluation.advice}</p>
            </div>
            <Button
              size="sm"
              variant="primary"
              onClick={() => showToast("Interview rubric scorecard generated and saved to your dashboard.")}
              className="shrink-0 font-semibold gap-1.5 text-xs"
            >
              <Download className="h-3.5 w-3.5" /> Save Diagnostic
            </Button>
          </div>
        </div>

        {/* The STAR Method Breakdown */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ink">The STAR Behavioral Framework</h2>
            <p className="text-xs text-muted">
              How Fortune 500 interview panels break down behavioral competency responses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {starFramework.map((item) => (
              <Card key={item.letter} className="p-6 bg-white flex flex-col justify-between">
                <div>
                  <div className="h-12 w-12 rounded-md bg-primary text-white font-extrabold text-xl flex items-center justify-center mb-4 shadow-xs">
                    {item.letter}
                  </div>
                  <h3 className="text-base font-bold text-ink">{item.title}</h3>
                  <p className="text-xs text-muted mt-2 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-hairline bg-slate-50 p-2.5 rounded text-[11px] text-ink-secondary italic">
                  &quot;{item.sample}&quot;
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Top 5 Trap Questions in Campus HR Rounds */}
        <div className="p-6 rounded-xl bg-white border border-hairline">
          <h2 className="text-xl font-bold text-ink mb-2">
            Top 4 Trap Questions in Hyderabad Campus Placements
          </h2>
          <p className="text-xs text-muted mb-6">
            Common questions where candidates frequently disqualify themselves and how to answer them strategically.
          </p>

          <div className="space-y-4">
            {[
              {
                q: "What is your biggest weakness or failure?",
                trap: "Claiming a disguised perfectionist strength ('I work too hard') or revealing an irrecoverable character flaw.",
                rec: "Highlight a real operational blind spot from a past college project, and immediately demonstrate the exact system or tool you adopted to remediate it.",
              },
              {
                q: "Where do you see yourself in 3 to 5 years?",
                trap: "Giving vague entrepreneurial ambitions that signal you will quit in 6 months, or naming a role without understanding career ladders.",
                rec: "Anchor on domain mastery: 'I aim to transition from analyzing day-to-day accounts into owning client relationship portfolios and mentoring junior analyst cohorts.'",
              },
              {
                q: "Why should we hire you over other qualified MBA peers?",
                trap: "Comparing negatively against batchmates or repeating standard CGPA metrics.",
                rec: "Combine domain knowledge with work ethic: 'Beyond my finance coursework, I have completed two real-time projects modeling actual Hyderabad retail data and hold practical Alteryx certification.'",
              },
              {
                q: "What are your salary expectations?",
                trap: "Giving a rigid number too early or underselling yourself below the college cohort standard.",
                rec: "Reaffirm company standards: 'I am focused on finding the right role match and trust that the company provides a competitive compensation aligned with the Hyderabad campus placement band.'",
              },
            ].map((faq, idx) => (
              <div key={idx} className="p-4 rounded-md bg-slate-50 border border-hairline">
                <p className="text-sm font-bold text-ink flex items-center gap-2">
                  <span className="text-primary font-mono">Q{idx + 1}.</span> {faq.q}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-xs">
                  <div className="p-2.5 rounded bg-red-50/70 border border-red-200 text-red-900">
                    <p className="font-bold text-[10px] uppercase">The Trap:</p>
                    <p className="mt-0.5">{faq.trap}</p>
                  </div>
                  <div className="p-2.5 rounded bg-blue-50/70 border border-blue-200 text-slate-900">
                    <p className="font-bold text-[10px] uppercase text-primary">Recommended Strategy:</p>
                    <p className="mt-0.5">{faq.rec}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
