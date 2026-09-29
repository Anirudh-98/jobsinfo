"use client";

import React, { useState } from "react";
import {
  Compass,
  FileText,
  ShieldCheck,
  TrendingUp,
  Download,
  ExternalLink,
  CheckCircle2,
  Building,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";
import { PageHeaderBand } from "@/components/common/PageHeaderBand";

export default function BusinessNavigatorPage() {
  const { showToast } = useApp();
  const [activePillar, setActivePillar] = useState<"planning" | "legal" | "funding">("planning");

  const handleDownload = (name: string) => {
    showToast(`Downloading template: ${name}`);
  };

  return (
    <div className="w-full min-h-screen bg-canvas pb-20">
      <PageHeaderBand
        kicker="Entrepreneurship & MSME Acceleration"
        title="Business Navigator — Telangana Hub"
        subtitle="Step-by-step navigational blueprint for young entrepreneurs, MSME founders, and student startups in Hyderabad. Access verified templates, regulatory compliance roadmaps, and state grant linkages."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 3 Pillar Tabs */}
        <div className="flex border-b border-hairline mb-8 overflow-x-auto">
          {[
            { id: "planning", label: "1. Business Planning & Templates", icon: FileText },
            { id: "legal", label: "2. Legal & Telangana Compliance", icon: ShieldCheck },
            { id: "funding", label: "3. Funding, Grants & T-Hub Links", icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activePillar === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActivePillar(tab.id as "planning" | "legal" | "funding")}
                className={`flex items-center gap-2 pb-4 px-5 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Business Planning */}
        {activePillar === "planning" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Pre-Seed Pitch Deck Blueprint",
                  format: "PPTX / PDF • 14 Slides",
                  desc: "Standardized deck format accepted by T-Hub, Hyderabad Angels, and Telangana Seed Network.",
                  tags: ["Problem Statement", "Unit Economics", "Traction"],
                },
                {
                  title: "3-Year Dynamic Financial Projections Model",
                  format: "XLSX • Excel Formulas",
                  desc: "Pre-built three-statement financial model with editable revenue drivers, hiring plans, and burn calculations.",
                  tags: ["P&L Forecast", "Cash Flow Runways", "Cap Table"],
                },
                {
                  title: "Business Model Canvas for Indian MSMEs",
                  format: "PDF Worksheet",
                  desc: "Structured 9-box framework mapping customer segments, value propositions, channels, and cost structures.",
                  tags: ["Customer Discovery", "Distribution", "Revenue Models"],
                },
              ].map((res, i) => (
                <Card key={i} className="p-6 bg-white flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">
                      {res.format}
                    </span>
                    <h3 className="text-base font-bold text-ink">{res.title}</h3>
                    <p className="text-xs text-muted mt-2 leading-relaxed">{res.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {res.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-50 border border-hairline text-[10px] text-ink-secondary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-hairline">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleDownload(res.title)}
                      className="w-full text-xs font-semibold gap-1.5"
                    >
                      <Download className="h-3.5 w-3.5" /> Download Template
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Legal & Compliance */}
        {activePillar === "legal" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Telangana MSME Udyam Registration Guide",
                  authority: "Ministry of MSME & Govt of Telangana",
                  desc: "Step-by-step checklist to acquire Udyam Registration within 24 hours. Unlocks priority sector bank lending and electricity subsidies.",
                  steps: ["Aadhaar & PAN Verification", "NIC Code Selection", "Zero Government Fee"],
                },
                {
                  title: "GST Registration & Telangana State Filings",
                  authority: "Telangana Commercial Taxes Dept",
                  desc: "Requirements for turnover above ₹20L/₹40L, state jurisdiction identification, and monthly GSTR-1/3B filing schedules.",
                  steps: ["Bank Account Proof", "Principal Place of Business NOC", "Digital Signature"],
                },
                {
                  title: "Private Limited Incorporation Checklist (SPICe+)",
                  authority: "Ministry of Corporate Affairs (MCA)",
                  desc: "Name reservation, Articles of Association (AoA), DIN allotment, and PAN/TAN bundle through single-window clearance.",
                  steps: ["Name Approval (RUN)", "Digital Signature Token", "Bank Account Integration"],
                },
                {
                  title: "Trademark & Intellectual Property Filing",
                  authority: "Controller General of Patents (CGPDTM)",
                  desc: "Protecting brand names and logo marks across India. How startups can claim 80% rebate on official government filing fees.",
                  steps: ["Trademark Search (Class 9, 35, 42)", "Form TM-A Submission", "Startup India Rebate"],
                },
              ].map((item, i) => (
                <Card key={i} className="p-6 bg-white flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">
                      {item.authority}
                    </span>
                    <h3 className="text-base font-bold text-ink">{item.title}</h3>
                    <p className="text-xs text-muted mt-2 leading-relaxed">{item.desc}</p>
                    <ul className="mt-4 space-y-1.5 text-xs text-ink-secondary">
                      {item.steps.map((st, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-hairline">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => showToast(`Opened compliance checklist: ${item.title}`)}
                      className="w-full text-xs font-semibold"
                    >
                      View Step-by-Step Checklist
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Funding & Grants */}
        {activePillar === "funding" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "T-PRIDE & T-IDEA Schemes",
                  focus: "Govt of Telangana Industrial Subsidies",
                  desc: "Capital investment subsidies (up to 35%), stamp duty reimbursement, and power tariff discounts for eligible Telangana manufacturing & tech units.",
                  status: "Active State Budget",
                },
                {
                  title: "T-Hub Incubation & Acceleration",
                  focus: "World's Largest Innovation Campus",
                  desc: "Access to pilot programs, corporate sandbox testing, investor demo days, and cloud credits worth over $100,000.",
                  status: "Applications Rolling",
                },
                {
                  title: "CGTMSE Collateral-Free Loans",
                  focus: "Credit Guarantee Trust for Micro & Small Enterprises",
                  desc: "Bank loans up to ₹2 Crore without third-party guarantee or mortgage requirement, backed by central government cover.",
                  status: "All Partner Banks",
                },
              ].map((grant, i) => (
                <Card key={i} className="p-6 bg-white flex flex-col justify-between">
                  <div>
                    <Badge variant="default" className="mb-2">{grant.status}</Badge>
                    <h3 className="text-base font-bold text-ink">{grant.title}</h3>
                    <p className="text-xs text-primary font-medium mt-0.5">{grant.focus}</p>
                    <p className="text-xs text-muted mt-2 leading-relaxed">{grant.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-hairline">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => showToast(`Application guide for ${grant.title} sent to your email.`)}
                      className="w-full text-xs font-semibold gap-1.5"
                    >
                      <span>Check Eligibility & Apply</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
