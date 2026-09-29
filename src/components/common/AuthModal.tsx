"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  User,
  Building2,
  GraduationCap,
  School,
  Eye,
  EyeOff,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useApp, PersonaType } from "@/context/AppContext";
import { cn } from "@/lib/utils";

type Role = "student" | "recruiter" | "educator";
type Errors = Partial<Record<"name" | "email" | "password" | "terms", string>>;

const ROLES: { id: Role; label: string; hint: string; icon: React.ElementType }[] = [
  { id: "student", label: "Student", hint: "or job seeker", icon: GraduationCap },
  { id: "recruiter", label: "Employer", hint: "hire talent", icon: Building2 },
  { id: "educator", label: "College", hint: "placements", icon: School },
];

const personaToRole = (p: PersonaType): Role =>
  p === "employer" || p === "entrepreneur" ? "recruiter" : p === "educator" ? "educator" : "student";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// 0–4: length, mixed case, digit, symbol
const passwordScore = (pw: string) =>
  pw.length === 0
    ? 0
    : [pw.length >= 8, /[a-z]/.test(pw) && /[A-Z]/.test(pw), /\d/.test(pw), /[^A-Za-z0-9]/.test(pw)].filter(Boolean).length;

const STRENGTH = ["Too short", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLOR = ["bg-hairline", "bg-rose-400", "bg-amber-400", "bg-sky-500", "bg-emerald-500"];

const FieldError: React.FC<{ id: string; msg?: string }> = ({ id, msg }) =>
  msg ? (
    <p id={id} className="mt-1.5 text-[12.5px] font-medium text-rose-600">
      {msg}
    </p>
  ) : null;

// Photo, headline and proof point shown beside the form for each role
const ROLE_PANEL: Record<Role, { image: string; title: string; accent: string; stat: string; statLabel: string }> = {
  student: {
    image: "/images/auth/student-2.webp",
    title: "Your first job starts",
    accent: "right here.",
    stat: "1,586 new jobs today",
    statLabel: "Verified roles and paid projects, 100% free",
  },
  recruiter: {
    image: "/images/auth/employer.webp",
    title: "Hire verified talent,",
    accent: "in days not weeks.",
    stat: "25,000+ candidates",
    statLabel: "Pre-assessed and ready to interview",
  },
  educator: {
    image: "/images/auth/college.webp",
    title: "Placements for your campus,",
    accent: "made simple.",
    stat: "128+ hiring partners",
    statLabel: "Bring verified employers to your students",
  },
};

// Mounted only while open, so every open starts clean with the role of the "Login as …" entry that opened it
export const AuthModal: React.FC = () => {
  const { isAuthModalOpen } = useApp();
  return isAuthModalOpen ? <AuthDialog /> : null;
};

const AuthDialog: React.FC = () => {
  const { setIsAuthModalOpen, authTab, setAuthTab, updateUser, showToast, persona, setPersona } = useApp();
  const router = useRouter();
  const isSignup = authTab === "signup";

  const [role, setRole] = useState<Role>(() => personaToRole(persona));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  const close = () => setIsAuthModalOpen(false);
  // Latest close handler for the window key listener, without re-subscribing on every render
  const closeRef = useRef(close);
  useEffect(() => {
    closeRef.current = close;
  });

  const switchTab = (tab: "signin" | "signup") => {
    setErrors({});
    setAuthTab(tab);
  };

  // Scroll lock, Escape to close, focus the first field, keep Tab inside the dialog, restore focus on close
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeRef.current();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, []);

  const fillDemo = (type: "student" | "recruiter") => {
    setErrors({});
    if (type === "student") {
      setRole("student");
      setName("Rohit Vangapalli");
      setEmail("rohit.v@osmania.edu");
      setOrganization("Osmania University MBA Placement Cohort");
    } else {
      setRole("recruiter");
      setName("Priya Sharma");
      setEmail("priya.s@darwinbox.in");
      setOrganization("Darwinbox HR Team");
    }
    setPassword("Demo@12345");
    setAgreed(true);
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (isSignup && name.trim().length < 2) next.name = "Enter your full name.";
    if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address, like you@college.edu.";
    if (!password) next.password = "Enter your password.";
    else if (isSignup && password.length < 8) next.password = "Use at least 8 characters.";
    if (isSignup && !agreed) next.terms = "Please accept the terms to create your account.";
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    const displayName = name.trim() || email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1);
    updateUser({
      name: displayName,
      email: email.trim(),
      collegeOrCompany: organization || (role === "student" ? "Osmania University" : role === "educator" ? "Your college" : "Your company"),
    });
    setIsAuthModalOpen(false);
    // Students and employers land on their dashboards; setPersona's own toast is replaced by the welcome toast below.
    if (role === "student") {
      setPersona("student");
      router.push("/dashboard");
    } else if (role === "recruiter") {
      setPersona("employer");
      router.push("/employer");
    }
    showToast(isSignup ? `Welcome to Jobsinfo.world, ${displayName}. Your account is ready.` : `Signed in as ${displayName}.`);
  };

  const score = passwordScore(password);
  const orgLabel = role === "student" ? "College / University" : role === "educator" ? "Institution name" : "Company name";
  const orgPlaceholder = role === "student" ? "Your college" : role === "educator" ? "Your institution" : "Your company";

  const inputClass = (invalid?: boolean) =>
    cn(
      "h-12 w-full rounded-xl border bg-surface-soft/70 pl-11 pr-4 text-[14.5px] text-ink placeholder:text-muted transition-all",
      "focus:bg-white focus:outline-none! focus:ring-4",
      invalid ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : "border-hairline hover:border-primary/30 focus:border-primary focus:ring-primary/10"
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 sm:p-6">
      <div className="fixed inset-0 bg-[#0b1f4d]/35 backdrop-blur-sm animate-[panel-in_0.2s_ease-out]" onClick={close} aria-hidden />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative z-10 my-auto w-full rounded-[30px] border border-white/80 bg-white/60 p-2 shadow-[0_40px_100px_-30px_rgba(11,31,77,0.55)] backdrop-blur-xl transition-[max-width] duration-300 ease-out animate-[panel-in_0.3s_cubic-bezier(0.2,0.7,0.2,1)]",
          // Register has more fields, so it gets a wider dialog with more room for the form
          isSignup ? "max-w-[1120px]" : "max-w-[980px]"
        )}
      >
        <div
          className={cn(
            "grid overflow-hidden rounded-[24px] bg-white",
            isSignup ? "md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]" : "md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
          )}
        >
          {/* Role photo panel: crossfades to match the selected role */}
          <aside className="relative m-3 mr-0 hidden min-h-[640px] overflow-hidden rounded-[20px] bg-[#dbeafe] md:block" aria-hidden>
            {ROLES.map((r) => (
              <Image
                key={r.id}
                src={ROLE_PANEL[r.id].image}
                alt=""
                fill
                sizes="440px"
                className={cn(
                  "object-cover object-bottom transition-all duration-700 ease-out",
                  role === r.id ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
                )}
              />
            ))}
            {/* Soft wash keeps the headline readable over the sky-blue backdrop */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/70 via-white/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b1f4d]/45 to-transparent" />

            <div className="relative p-8">
              <p className="text-[16px] font-bold tracking-tight text-ink">
                Jobsinfo<span className="text-primary">.world</span>
              </p>
              <h2 key={role} className="mt-6 max-w-[15ch] text-[34px] font-bold leading-[1.08] tracking-[-0.03em] text-ink animate-[panel-in_0.4s_cubic-bezier(0.2,0.7,0.2,1)]">
                {ROLE_PANEL[role].title} <span className="text-primary">{ROLE_PANEL[role].accent}</span>
              </h2>
            </div>

            <div className="absolute inset-x-6 bottom-6 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/80 p-3.5 shadow-[0_20px_40px_-20px_rgba(11,31,77,0.6)] backdrop-blur-md">
              <span className="btn-gradient grid h-10 w-10 shrink-0 place-items-center rounded-xl">
                <Sparkles className="h-[18px] w-[18px]" />
              </span>
              <div key={role} className="min-w-0 animate-[panel-in_0.4s_cubic-bezier(0.2,0.7,0.2,1)]">
                <p className="text-[18px] font-bold leading-tight tabular-nums text-ink">{ROLE_PANEL[role].stat}</p>
                <p className="truncate text-[12.5px] text-body">{ROLE_PANEL[role].statLabel}</p>
              </div>
            </div>
          </aside>

          {/* Form panel */}
          <div className="relative p-5 sm:p-8 md:p-10">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface-strong hover:text-ink cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="text-[16px] font-bold tracking-tight text-ink md:hidden">
              Jobsinfo<span className="text-primary">.world</span>
            </p>
            <h3 id={titleId} className="mt-4 md:mt-0 text-[24px] sm:text-[28px] font-bold tracking-[-0.02em] text-ink">
              {isSignup ? "Create your free account" : "Sign in to your account"}
            </h3>
            <p className="mt-1 text-[14px] text-body">
              {isSignup ? "Takes under a minute. No fees for students and job seekers." : "Good to see you again."}
            </p>

            {/* Sign in / Register toggle */}
            <div className="mt-6 grid grid-cols-2 rounded-full bg-surface-strong p-1" role="tablist" aria-label="Account">
              {(["signin", "signup"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={authTab === tab}
                  onClick={() => switchTab(tab)}
                  className={cn(
                    "h-10 rounded-full text-[14px] font-semibold transition-all cursor-pointer",
                    authTab === tab ? "bg-white text-primary shadow-[0_6px_16px_-10px_rgba(30,64,175,0.6)]" : "text-body hover:text-ink"
                  )}
                >
                  {tab === "signin" ? "Sign in" : "Register"}
                </button>
              ))}
            </div>

            {/* Highlighted: MBA / BBA students have their own portal */}
            <Link
              href={isSignup ? "/mba-bba/register" : "/mba-bba/login"}
              onClick={close}
              className="group relative mt-5 flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#0b1f4d] via-[#1d4ed8] to-[#2563eb] px-4 py-3.5 text-left text-white shadow-[0_16px_32px_-16px_rgba(37,99,235,0.9)] ring-1 ring-white/10 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 animate-soft-pulse"
            >
              <span className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-sky-400/30 blur-2xl" aria-hidden />
              <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15 ring-1 ring-white/25">
                <GraduationCap className="h-5 w-5" aria-hidden />
              </span>
              <span className="relative min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="text-[14.5px] font-bold">MBA / BBA {isSignup ? "Registration" : "Login"}</span>
                  <span className="rounded-full bg-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#0b1f4d]">New</span>
                </span>
                <span className="mt-0.5 block text-[12px] text-white/80">Dedicated portal for campus internships &amp; placements</span>
              </span>
              <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-primary transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>

            <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
              <fieldset>
                <legend className="mb-2 text-[13px] font-medium text-ink-light">{isSignup ? "I'm joining as" : "Signing in as"}</legend>
                <div className="grid grid-cols-3 gap-2">
                  {ROLES.map((r) => {
                    const selected = role === r.id;
                    return (
                      <label
                        key={r.id}
                        className={cn(
                          "card-glow flex cursor-pointer flex-col items-center gap-1 rounded-2xl border px-2 py-3 text-center transition-all",
                          "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-primary/15",
                          selected ? "is-featured border-transparent bg-primary-light/40" : "border-hairline bg-white hover:border-primary/30"
                        )}
                      >
                        <input type="radio" name="role" value={r.id} checked={selected} onChange={() => setRole(r.id)} className="sr-only" />
                        <span className={cn("grid h-9 w-9 place-items-center rounded-xl transition-colors", selected ? "btn-gradient" : "bg-surface-strong text-body")}>
                          <r.icon className="h-[18px] w-[18px]" aria-hidden />
                        </span>
                        <span className={cn("text-[13px] font-semibold", selected ? "text-primary" : "text-ink")}>{r.label}</span>
                        <span className="hidden text-[11px] text-muted sm:block">{r.hint}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {isSignup && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="auth-name" className="mb-1.5 block text-[13px] font-medium text-ink-light">
                      Full name
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
                      <input
                        ref={firstFieldRef}
                        id="auth-name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "auth-name-err" : undefined}
                        className={inputClass(!!errors.name)}
                      />
                    </div>
                    <FieldError id="auth-name-err" msg={errors.name} />
                  </div>
                  <div>
                    <label htmlFor="auth-org" className="mb-1.5 block text-[13px] font-medium text-ink-light">
                      {orgLabel} <span className="font-normal text-muted">(optional)</span>
                    </label>
                    <div className="relative">
                      <Building2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
                      <input
                        id="auth-org"
                        type="text"
                        autoComplete="organization"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder={orgPlaceholder}
                        className={inputClass()}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="auth-email" className="mb-1.5 block text-[13px] font-medium text-ink-light">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
                  <input
                    ref={isSignup ? undefined : firstFieldRef}
                    id="auth-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@college.edu"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "auth-email-err" : undefined}
                    className={inputClass(!!errors.email)}
                  />
                </div>
                <FieldError id="auth-email-err" msg={errors.email} />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="auth-password" className="text-[13px] font-medium text-ink-light">
                    Password
                  </label>
                  {!isSignup && (
                    <button
                      type="button"
                      onClick={() =>
                        EMAIL_RE.test(email.trim())
                          ? showToast(`Password reset link sent to ${email.trim()}.`)
                          : setErrors((e) => ({ ...e, email: "Enter your email first so we can send a reset link." }))
                      }
                      className="text-[12.5px] font-semibold text-primary hover:text-primary-hover cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
                  <input
                    id="auth-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={isSignup ? "new-password" : "current-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isSignup ? "At least 8 characters" : "Your password"}
                    aria-invalid={!!errors.password}
                    aria-describedby={[errors.password && "auth-password-err", isSignup && "auth-password-strength"].filter(Boolean).join(" ") || undefined}
                    className={cn(inputClass(!!errors.password), "pr-12")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-muted transition-colors hover:text-ink cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <FieldError id="auth-password-err" msg={errors.password} />
                {isSignup && password && (
                  <div id="auth-password-strength" className="mt-2 flex items-center gap-3" aria-live="polite">
                    <div className="grid flex-1 grid-cols-4 gap-1">
                      {[1, 2, 3, 4].map((k) => (
                        <span key={k} className={cn("h-1.5 rounded-full transition-colors", k <= score ? STRENGTH_COLOR[score] : "bg-hairline")} />
                      ))}
                    </div>
                    <span className="w-16 text-right text-[12px] font-medium text-body">{STRENGTH[score]}</span>
                  </div>
                )}
              </div>

              {isSignup ? (
                <div>
                  <label className="flex cursor-pointer items-start gap-2.5 text-[13px] leading-snug text-body">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      aria-invalid={!!errors.terms}
                      aria-describedby={errors.terms ? "auth-terms-err" : undefined}
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded accent-[#2563eb]"
                    />
                    <span>
                      I agree to the <span className="font-semibold text-ink">Terms of Service</span> and{" "}
                      <span className="font-semibold text-ink">Privacy Policy</span>.
                    </span>
                  </label>
                  <FieldError id="auth-terms-err" msg={errors.terms} />
                </div>
              ) : (
                <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-body">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 cursor-pointer rounded accent-[#2563eb]"
                  />
                  Keep me signed in on this device
                </label>
              )}

              <button
                type="submit"
                className="btn-gradient group mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-[15px] font-semibold active:scale-[0.99] cursor-pointer"
              >
                {isSignup ? "Create account" : "Sign in"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </button>
            </form>

            {/* Demo accounts */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 border-t border-dashed border-hairline pt-5 text-[12.5px] text-body">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
              Try a demo:
              <button
                type="button"
                onClick={() => fillDemo("student")}
                className="rounded-full border border-hairline bg-white px-3 py-1 font-medium text-ink transition-colors hover:border-primary/40 hover:text-primary cursor-pointer"
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => fillDemo("recruiter")}
                className="rounded-full border border-hairline bg-white px-3 py-1 font-medium text-ink transition-colors hover:border-primary/40 hover:text-primary cursor-pointer"
              >
                Employer
              </button>
            </div>

            <p className="mt-5 text-center text-[13.5px] text-body">
              {isSignup ? "Already have an account? " : "New to Jobsinfo.world? "}
              <button
                type="button"
                onClick={() => switchTab(isSignup ? "signin" : "signup")}
                className="font-semibold text-primary hover:text-primary-hover cursor-pointer"
              >
                {isSignup ? "Sign in" : "Create a free account"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
