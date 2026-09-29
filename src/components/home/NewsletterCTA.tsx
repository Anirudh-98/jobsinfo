"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, Bell } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";

export const NewsletterCTA: React.FC = () => {
  const { showToast } = useApp();
  const [email, setEmail] = useState("");
  const [preference, setPreference] = useState("all");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    showToast("Subscribed! You will receive daily verified job circulars from Quietly.");
    setEmail("");
  };

  return (
    <section className="w-full py-16 bg-surface-soft border-t border-hairline">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-sm bg-canvas border border-hairline shadow-rest text-center">
          <div className="inline-flex h-12 w-12 rounded-sm bg-primary-light text-primary items-center justify-center mb-4">
            <Bell className="h-6 w-6" />
          </div>

          <h2 className="text-display-sm sm:text-display-md font-bold text-ink leading-tight">
            Stay Ahead with Daily Verified Job Circulars
          </h2>
          <p className="mt-2 text-body-md text-body-secondary max-w-xl mx-auto">
            Get personalized job alerts, verified corporate drives, and career advice delivered directly to your inbox every morning. Zero spam.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative w-full">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full h-12 pl-10 pr-4 text-[15px] rounded-sm bg-canvas border border-hairline text-ink placeholder:text-muted focus:border-2 focus:border-border-strong focus:outline-none"
                />
              </div>

              <select
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
                className="w-full sm:w-44 h-12 px-3 text-[14px] font-medium rounded-sm bg-canvas border border-hairline text-ink focus:border-2 focus:border-border-strong focus:outline-none"
              >
                <option value="all">All Vacancies</option>
                <option value="tech">Tech &amp; Engineering</option>
                <option value="mba">MBA Placements</option>
                <option value="finance">Finance &amp; Banking</option>
              </select>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full sm:w-auto min-h-[48px] px-6 text-[15px] font-semibold shrink-0"
              >
                Subscribe
              </Button>
            </div>

            {isSubmitted && (
              <p className="text-xs text-success flex items-center justify-center gap-1 font-medium pt-2">
                <CheckCircle2 className="h-4 w-4" /> You are subscribed to Quietly daily job circulars.
              </p>
            )}

            <p className="text-[12px] text-muted">
              Privacy-first. Unsubscribe with one click at any time.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
