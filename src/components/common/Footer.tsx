"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Download, Phone, Mail, Clock, MessageCircle, MapPin } from "lucide-react";
import { FOOTER_COLUMNS, LEGAL_LINKS } from "@/data/homeContent";
import { Logo } from "@/components/common/Navbar";
import { cn } from "@/lib/utils";

// lucide-react v1 dropped brand marks, so the social icons are inline SVG paths.
const SOCIALS: { label: string; path: string }[] = [
  { label: "Facebook", path: "M14 8h3V4h-3c-2.8 0-4 1.7-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6Z" },
  { label: "LinkedIn", path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.2c0-1.2 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4V9.5Z" },
  { label: "Instagram", path: "M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.9-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 3c-2.4 0-2.7 0-3.7.1-3.4.2-5 1.8-5.2 5.2C3 9.3 3 9.6 3 12s0 2.7.1 3.7c.2 3.4 1.8 5 5.2 5.2 1 .1 1.3.1 3.7.1s2.7 0 3.7-.1c3.4-.2 5-1.8 5.2-5.2.1-1 .1-1.3.1-3.7s0-2.7-.1-3.7c-.2-3.4-1.8-5-5.2-5.2C14.7 3 14.4 3 12 3Z" },
  { label: "X (Twitter)", path: "M17.8 3H21l-7 8 8.2 10h-6.4l-5-6.2L5 21H1.8l7.5-8.6L1.5 3H8l4.5 5.7L17.8 3Zm-1.1 16.2h1.8L7.4 4.7H5.5l11.2 14.5Z" },
  { label: "YouTube", path: "M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12c0 1.3.1 2.6.4 3.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8ZM10 15V9l5.2 3L10 15Z" },
];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const Footer: React.FC = () => {
  const [openCol, setOpenCol] = useState<string | null>(null);

  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-gradient-to-b from-white to-[#f4f8ff] pb-24 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* About */}
          <div>
            <Logo />
            <dl className="mt-6 space-y-4 text-[14px]">
              <div>
                <dt className="font-semibold text-ink">Our Mission</dt>
                <dd className="mt-0.5 text-body">Bridge the gap between education and employment.</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Our Vision</dt>
                <dd className="mt-0.5 text-body">Every student experiences the real world.</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Core Values</dt>
                <dd className="mt-1.5 flex flex-wrap gap-1.5">
                  {["Collaboration", "Transparency", "Quality", "Impact", "Sustainability"].map((v) => (
                    <span key={v} className="rounded-full border border-hairline bg-white px-2.5 py-0.5 text-[12px] text-body">
                      {v}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            <Link
              href="/about"
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-primary/20 bg-white px-4 text-[13.5px] font-semibold text-primary hover:bg-primary-light/60 transition-colors"
            >
              <Download className="h-4 w-4" aria-hidden /> 2024 Impact Report (PDF)
            </Link>
          </div>

          {FOOTER_COLUMNS.map((col) => {
            const isOpen = openCol === col.heading;
            const listId = `footer-${slug(col.heading)}`;
            return (
              <nav key={col.heading} aria-label={col.heading} className="border-b border-hairline pb-4 md:border-0 md:pb-0">
                <h2 className="text-[14px] font-semibold text-ink">
                  <button
                    type="button"
                    onClick={() => setOpenCol(isOpen ? null : col.heading)}
                    aria-expanded={isOpen}
                    aria-controls={listId}
                    className="flex w-full min-h-[44px] items-center justify-between md:pointer-events-none md:min-h-0 cursor-pointer"
                  >
                    {col.heading}
                    <ChevronDown className={cn("h-4 w-4 md:hidden transition-transform", isOpen && "rotate-180")} aria-hidden />
                  </button>
                </h2>
                <ul id={listId} className={cn("mt-2 space-y-2.5 md:mt-4 md:block", isOpen ? "block" : "hidden")}>
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="text-[14px] text-body hover:text-primary transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </div>

        {/* Contact & legal */}
        <div className="mt-14 grid gap-6 rounded-3xl border border-hairline bg-white p-6 shadow-rest md:grid-cols-[1fr_auto] md:items-center">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[14px] text-ink-light">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" aria-hidden />
              <a href="tel:+914012345678" className="hover:text-primary">+91-40-12345678</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" aria-hidden />
              <a href="mailto:support@jobsinfo.world" className="hover:text-primary">support@jobsinfo.world</a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" aria-hidden /> 9:00 AM – 7:00 PM (Mon–Sat)
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" aria-hidden /> Hyderabad, Telangana, India
            </li>
          </ul>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/support"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-5 text-[14px] font-semibold text-white hover:bg-primary-hover transition-colors"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> Live Chat Support
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center rounded-full border border-hairline px-5 text-[14px] font-semibold text-ink hover:border-primary hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Oversized faded wordmark, echoing the reference layout */}
      <p
        className="pointer-events-none select-none text-center font-bold leading-[0.8] tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100/40 text-[min(12.5vw,200px)] whitespace-nowrap mt-10"
        aria-hidden
      >
        Jobsinfo.world
      </p>

      <div className="relative border-t border-hairline bg-white/70 backdrop-blur">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 px-4 sm:px-6 lg:px-8 py-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[13px] text-body">© 2024 Jobsinfo.world. All Rights Reserved.</p>
          <ul className="flex gap-2" aria-label="Follow us">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href="#"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-white text-body hover:border-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-body">
            {LEGAL_LINKS.map((l) => (
              <li key={l}>
                <Link href="/support" className="hover:text-primary">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
