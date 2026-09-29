"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, X, LogIn, GraduationCap, Building2, School } from "lucide-react";
import { useApp, PersonaType } from "@/context/AppContext";
import { NAV_ITEMS } from "@/data/homeContent";
import { AnnouncementBar } from "@/components/common/AnnouncementBar";
import { cn } from "@/lib/utils";

const LOGIN_ROLES: { label: string; persona: PersonaType; icon: React.ElementType }[] = [
  { label: "Login as Student", persona: "student", icon: GraduationCap },
  { label: "Login as Employer", persona: "employer", icon: Building2 },
  { label: "Login as College", persona: "educator", icon: School },
];

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <Link href="/" className={cn("flex items-center shrink-0", className)} aria-label="Jobsinfo.world home">
    <span className="text-[18px] font-bold tracking-tight text-ink">
      Jobsinfo<span className="text-primary">.world</span>
    </span>
  </Link>
);

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { setIsSearchOpen, setIsAuthModalOpen, setAuthTab, setPersona } = useApp();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const openAuth = (tab: "signin" | "signup", persona?: PersonaType) => {
    if (persona) setPersona(persona);
    setAuthTab(tab);
    setIsAuthModalOpen(true);
    setIsMobileOpen(false);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.startsWith("/#") && pathname.startsWith(href);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-primary focus:shadow-hover"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <header className={cn("sticky top-0 z-40 w-full px-3 sm:px-5 py-2", pathname === "/" && "-mb-[72px]")}>
        <div
          className={cn(
            "max-w-[1320px] mx-auto h-14 pl-5 pr-2 sm:pl-6 flex items-center justify-between gap-3 rounded-full border transition-all duration-300",
            scrolled
              ? "border-white/80 bg-white/80 backdrop-blur-xl shadow-[0_12px_32px_-16px_rgba(30,64,175,0.35)]"
              : "border-primary/10 bg-white/70 backdrop-blur-md shadow-[0_8px_24px_-18px_rgba(30,64,175,0.35)]"
          )}
        >
          <Logo />

          <nav aria-label="Primary" className="hidden xl:block min-w-0">
            <ul className="flex items-center">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center gap-0.5 rounded-full px-2 2xl:px-2.5 py-1.5 text-[13px] 2xl:text-[13.5px] whitespace-nowrap transition-colors",
                      isActive(item.href) ? "font-semibold text-primary" : "font-medium text-body hover:text-primary"
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden />
                    )}
                  </Link>
                  {item.children && (
                    <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-full pt-3">
                      <ul className="min-w-[210px] rounded-2xl border border-hairline bg-white p-2 shadow-elevated">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className="block rounded-xl px-3 py-2 text-[13.5px] text-ink-light hover:bg-primary-light/60 hover:text-primary transition-colors"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="hidden sm:inline-flex xl:hidden 2xl:inline-flex h-10 w-10 items-center justify-center rounded-full text-body hover:bg-surface-strong hover:text-primary transition-colors cursor-pointer"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            {/* Role (student / employer / college) is chosen inside the sign-in modal.
                Mobile: filled pill (Register lives in the menu). sm+: outlined pill beside the filled Register. */}
            <button
              type="button"
              onClick={() => openAuth("signin")}
              className="btn-gradient inline-flex sm:hidden h-10 shrink-0 items-center whitespace-nowrap rounded-full px-5 text-[14px] font-semibold cursor-pointer"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => openAuth("signin")}
              className="hidden sm:inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-full border-[1.5px] border-primary bg-white px-5 text-[14px] font-semibold text-primary shadow-[0_8px_20px_-12px_rgba(37,99,235,0.6)] transition-colors hover:bg-primary-light cursor-pointer"
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => openAuth("signup")}
              className="btn-gradient hidden sm:inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-full px-5 text-[14px] font-semibold cursor-pointer"
            >
              Register
            </button>

            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMobileOpen}
              className="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-white text-ink hover:text-primary cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet drawer */}
      <div className={cn("fixed inset-0 z-50 xl:hidden", isMobileOpen ? "visible" : "invisible")} aria-hidden={!isMobileOpen}>
        <div
          className={cn("absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity", isMobileOpen ? "opacity-100" : "opacity-0")}
          onClick={() => setIsMobileOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={cn(
            "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-modal transition-transform duration-300",
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex h-[68px] items-center justify-between border-b border-hairline px-4">
            <Logo />
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface-strong cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-3">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setMobileExpanded((cur) => (cur === item.label ? null : item.label))}
                        aria-expanded={mobileExpanded === item.label}
                        className="flex w-full min-h-[48px] items-center justify-between rounded-xl px-3 text-[15px] font-medium text-ink hover:bg-surface-soft cursor-pointer"
                      >
                        {item.label}
                        <ChevronDown className={cn("h-4 w-4 transition-transform", mobileExpanded === item.label && "rotate-180")} />
                      </button>
                      {mobileExpanded === item.label && (
                        <ul className="mb-2 ml-3 border-l border-hairline pl-3">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                onClick={() => setIsMobileOpen(false)}
                                className="flex min-h-[44px] items-center rounded-lg px-3 text-[14px] text-body hover:text-primary"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="flex min-h-[48px] items-center rounded-xl px-3 text-[15px] font-medium text-ink hover:bg-surface-soft"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-hairline p-4 space-y-2">
            <p className="px-1 text-[12px] font-semibold uppercase tracking-wider text-muted">Login</p>
            <div className="grid grid-cols-3 gap-2">
              {LOGIN_ROLES.map(({ label, persona, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => openAuth("signin", persona)}
                  className="flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-xl border border-hairline text-[12px] font-medium text-ink-light hover:border-primary hover:text-primary cursor-pointer"
                >
                  <Icon className="h-4 w-4 text-primary" aria-hidden />
                  {label.replace("Login as ", "")}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => openAuth("signup")}
              className="btn-gradient flex w-full min-h-[48px] items-center justify-center gap-2 rounded-full text-[15px] font-semibold cursor-pointer"
            >
              <LogIn className="h-4 w-4" aria-hidden /> Register — it&apos;s free
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
