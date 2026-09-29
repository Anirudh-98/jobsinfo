"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { PageHeaderBand } from "@/components/common/PageHeaderBand";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useApp } from "@/context/AppContext";

export default function ContactPage() {
  const { showToast } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast("Thank you! Your message has been routed to our team.");
      setName("");
      setEmail("");
      setMessage("");
    }, 600);
  };

  const contactDetails = [
    { icon: MapPin, label: "Office", value: "Hitec City, Madhapur, Hyderabad, Telangana 500081" },
    { icon: Mail, label: "Email", value: "support@quietly.careers" },
    { icon: Phone, label: "Phone", value: "+91 40 4859 2100" },
  ];

  return (
    <div className="w-full min-h-screen bg-canvas pb-20 text-ink">
      <PageHeaderBand
        kicker="Contact Us"
        title="We'd love to hear from you"
        subtitle="Questions about a verified listing, institutional partnership, or escrow payments — reach out and our team will respond within 24 hours."
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 rounded-sm bg-canvas border border-hairline shadow-rest p-6 sm:p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
              />
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-muted mb-1.5">Message</label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Tell us what you need help with..."
                className="w-full px-4 py-3 text-[15px] rounded-sm bg-canvas border border-hairline text-ink placeholder:text-muted focus:border-2 focus:border-border-strong focus:outline-none"
              />
            </div>

            {isSubmitted && (
              <p className="text-xs text-success flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-4 w-4" /> Message sent successfully!
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              className="w-full sm:w-auto"
            >
              <span>Send Message</span>
              <Send className="h-4 w-4 ml-1" />
            </Button>
          </form>

          {/* Info card */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-sm bg-[#111827] text-white p-6 space-y-5 shadow-rest">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;
                return (
                  <div key={detail.label} className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-sm bg-white/10 flex items-center justify-center shrink-0 text-primary-light">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-white/50">{detail.label}</p>
                      <p className="text-[14px] text-white/90 mt-0.5">{detail.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="relative rounded-sm overflow-hidden min-h-[200px] border border-hairline shadow-rest">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
                alt="Quietly corporate office"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
