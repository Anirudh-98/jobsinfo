"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  Phone,
  Sparkles,
  User,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Dropdown } from "@/components/ui/Dropdown";
import { cn } from "@/lib/utils";

type Program = "MBA" | "BBA";
type Mode = "login" | "register";
// Field order on screen; the first field with an error gets focus.
const FIELD_ORDER = ["name", "phone", "email", "specialization", "year", "college", "password", "terms"] as const;
type Errors = Partial<Record<(typeof FIELD_ORDER)[number], string>>;

const SPECIALIZATIONS: Record<Program, string[]> = {
  MBA: ["Finance", "Marketing", "Human Resources", "Operations & Supply Chain", "Business Analytics", "Systems / IT", "International Business"],
  BBA: ["Finance", "Marketing", "Human Resources", "Business Analytics", "Entrepreneurship", "General Management"],
};
const YEARS = ["2025", "2026", "2027", "2028", "2029"];
const GOALS = ["Summer internship", "Final placement", "Live projects", "Mentorship"];

const DEMOS: Record<Program, { name: string; email: string; phone: string; college: string; specialization: string; year: string }> = {
  MBA: { name: "Rohit Vangapalli", email: "rohit.v@osmania.edu", phone: "9849012345", college: "Osmania University", specialization: "Finance", year: "2026" },
  BBA: { name: "Sneha Reddy", email: "sneha.r@stmarys.edu", phone: "9000012345", college: "St. Mary's College", specialization: "Marketing", year: "2027" },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[6-9]\d{9}$/;

const PERKS = [
  "Summer internships & final placements from 128+ recruiters",
  "Case-study rounds, GD practice and mock HR interviews",
  "Live projects with industry mentors, certified",
];

const FieldError: React.FC<{ id: string; msg?: string }> = ({ id, msg }) =>
  msg ? (
    <p id={id} className="mt-1.5 text-[12.5px] font-medium text-rose-600">
      {msg}
    </p>
  ) : null;

const inputClass = (invalid?: boolean) =>
  cn(
    "h-12 w-full rounded-xl border bg-surface-soft/70 pl-11 pr-4 text-[14.5px] text-ink placeholder:text-muted transition-all",
    "focus:bg-white focus:outline-none! focus:ring-4",
    invalid ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : "border-hairline hover:border-primary/30 focus:border-primary focus:ring-primary/10"
  );

const IconInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ElementType; label: string; error?: string; hint?: string; trailing?: React.ReactNode }
> = ({ icon: Icon, label, error, hint, trailing, id, className, ...props }) => (
  <div className={className}>
    <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-ink-light">
      {label} {hint && <span className="font-normal text-muted">{hint}</span>}
    </label>
    <div className="relative">
      <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
      <input id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={cn(inputClass(!!error), trailing && "pr-12")} {...props} />
      {trailing}
    </div>
    <FieldError id={`${id}-err`} msg={error} />
  </div>
);

// Dedicated sign-in / registration for MBA & BBA students (/mba-bba/login, /mba-bba/register).
export const MbaBbaAuth: React.FC<{ mode: Mode }> = ({ mode }) => {
  const isRegister = mode === "register";
  const router = useRouter();
  const { updateUser, setPersona, showToast, setAuthTab, setIsAuthModalOpen } = useApp();

  const [program, setProgram] = useState<Program>("MBA");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [specialization, setSpecialization] = useState("");
  const [college, setCollege] = useState("");
  const [year, setYear] = useState("");
  const [goals, setGoals] = useState<string[]>(["Final placement"]);
  const [agreed, setAgreed] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Errors>({});

  const switchProgram = (p: Program) => {
    setProgram(p);
    // Specialisations differ between MBA and BBA.
    if (!SPECIALIZATIONS[p].includes(specialization)) setSpecialization("");
  };

  const fillDemo = (p: Program) => {
    const d = DEMOS[p];
    setErrors({});
    setProgram(p);
    setName(d.name);
    setEmail(d.email);
    setPhone(d.phone);
    setCollege(d.college);
    setSpecialization(d.specialization);
    setYear(d.year);
    setPassword("Demo@12345");
    setAgreed(true);
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!EMAIL_RE.test(email.trim())) e.email = "Enter a valid email address, like you@college.edu.";
    if (!password) e.password = "Enter your password.";
    if (isRegister) {
      if (name.trim().length < 2) e.name = "Enter your full name.";
      if (!PHONE_RE.test(phone.replace(/\D/g, "").slice(-10))) e.phone = "Enter a 10-digit Indian mobile number.";
      if (password && password.length < 8) e.password = "Use at least 8 characters.";
      if (!specialization) e.specialization = `Choose your ${program} specialisation.`;
      if (college.trim().length < 2) e.college = "Enter your college or university.";
      if (!year) e.year = "Choose your year of passing.";
      if (!agreed) e.terms = "Please accept the terms to create your account.";
    }
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      const first = FIELD_ORDER.find((f) => found[f]);
      document.getElementById(`mb-${first}`)?.focus();
      return;
    }

    const demo = Object.values(DEMOS).find((d) => d.email === email.trim().toLowerCase());
    const displayName = name.trim() || demo?.name || email.split("@")[0].replace(/^./, (c) => c.toUpperCase());
    const spec = specialization || demo?.specialization;
    const passing = year || demo?.year;

    updateUser({
      name: displayName,
      email: email.trim(),
      ...(isRegister && { phone: `+91 ${phone.replace(/\D/g, "").slice(-10)}` }),
      ...((college || demo?.college) && { collegeOrCompany: college || demo!.college }),
      ...(spec && passing && { qualification: `${program} ${spec} (${passing})` }),
      program,
    });
    setPersona("mba-placement");
    router.push("/mbadashboard");
    showToast(isRegister ? `Welcome, ${displayName}! Your ${program} profile is ready.` : `Signed in as ${displayName} (${program}).`);
  };

  const openGeneralSignIn = () => {
    setAuthTab(isRegister ? "signup" : "signin");
    setIsAuthModalOpen(true);
  };

  return (
    <div className="hero-bg relative min-h-screen px-3 py-4 sm:px-6 sm:py-8">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto flex max-w-[1120px] items-center justify-between gap-3 px-1 pb-4">
        <Link href="/" className="text-[18px] font-bold tracking-tight text-ink" aria-label="Jobsinfo.world home">
          Jobsinfo<span className="text-primary">.world</span>
        </Link>
        <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-body hover:text-primary">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to site
        </Link>
      </div>

      <main className="relative mx-auto w-full max-w-[1120px] rounded-[30px] border border-white/80 bg-white/60 p-2 shadow-[0_40px_100px_-30px_rgba(11,31,77,0.45)] backdrop-blur-xl">
        <div className={cn("grid overflow-hidden rounded-[24px] bg-white", isRegister ? "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]" : "lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]")}>
          {/* Photo panel */}
          <aside className="relative m-3 mr-0 hidden min-h-[680px] overflow-hidden rounded-[20px] bg-[#dbeafe] lg:block" aria-hidden>
            <Image src="/images/auth/student.webp" alt="" fill priority sizes="460px" className="object-cover object-bottom" />
            <div className="absolute inset-x-0 top-0 h-3/5 bg-gradient-to-b from-white/80 via-white/40 to-transparent" />
            <div className="relative p-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-[12px] font-semibold text-primary shadow-sm">
                <GraduationCap className="h-3.5 w-3.5" /> MBA &amp; BBA portal
              </span>
              <h2 className="mt-5 max-w-[16ch] text-[32px] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
                Your business career, <span className="text-primary">placed.</span>
              </h2>
              <ul className="mt-5 space-y-2">
                {PERKS.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[13px] font-medium text-ink-light">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute inset-x-6 bottom-6 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/85 p-3.5 shadow-[0_20px_40px_-20px_rgba(11,31,77,0.6)] backdrop-blur-md">
              <span className="btn-gradient grid h-10 w-10 shrink-0 place-items-center rounded-xl">
                <Briefcase className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0">
                <p className="text-[18px] font-bold leading-tight tabular-nums text-ink">₹9.2 LPA avg. package</p>
                <p className="truncate text-[12.5px] text-body">2026 MBA placements across partner campuses</p>
              </div>
            </div>
          </aside>

          {/* Form panel */}
          <div className="p-5 sm:p-8 lg:p-10">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-[12px] font-semibold text-primary lg:hidden">
              <GraduationCap className="h-3.5 w-3.5" aria-hidden /> MBA &amp; BBA portal
            </p>
            <h1 className="mt-3 text-[26px] font-bold tracking-[-0.02em] text-ink sm:text-[30px] lg:mt-0">
              {isRegister ? "Create your MBA / BBA account" : "MBA / BBA sign in"}
            </h1>
            <p className="mt-1 text-[14px] text-body">
              {isRegister ? "Free for students. Get matched to internships and placements for your specialisation." : "Welcome back — pick up your placement prep where you left off."}
            </p>

            {/* Login / Register switch (separate pages) */}
            <nav className="mt-6 grid grid-cols-2 rounded-full bg-surface-strong p-1" aria-label="Account">
              {(
                [
                  ["login", "Sign in", "/mba-bba/login"],
                  ["register", "Register", "/mba-bba/register"],
                ] as const
              ).map(([m, label, href]) => (
                <Link
                  key={m}
                  href={href}
                  aria-current={mode === m ? "page" : undefined}
                  className={cn(
                    "grid h-10 place-items-center rounded-full text-[14px] font-semibold transition-all",
                    mode === m ? "bg-white text-primary shadow-[0_6px_16px_-10px_rgba(30,64,175,0.6)]" : "text-body hover:text-ink"
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <form onSubmit={submit} noValidate className="mt-6 space-y-4">
              <fieldset>
                <legend className="mb-2 text-[13px] font-medium text-ink-light">I&apos;m studying</legend>
                <div className="grid grid-cols-2 gap-2">
                  {(["MBA", "BBA"] as const).map((p) => {
                    const selected = program === p;
                    return (
                      <label
                        key={p}
                        className={cn(
                          "card-glow flex cursor-pointer items-center gap-3 rounded-2xl border px-3.5 py-3 transition-all has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-primary/15",
                          selected ? "is-featured border-transparent bg-primary-light/40" : "border-hairline bg-white hover:border-primary/30"
                        )}
                      >
                        <input type="radio" name="program" value={p} checked={selected} onChange={() => switchProgram(p)} className="sr-only" />
                        <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", selected ? "btn-gradient" : "bg-surface-strong text-body")}>
                          {p === "MBA" ? <Briefcase className="h-[18px] w-[18px]" aria-hidden /> : <BookOpenCheck className="h-[18px] w-[18px]" aria-hidden />}
                        </span>
                        <span className="leading-tight">
                          <span className={cn("block text-[14px] font-semibold", selected ? "text-primary" : "text-ink")}>{p}</span>
                          <span className="block text-[11.5px] text-muted">{p === "MBA" ? "Post-graduate" : "Under-graduate"}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {isRegister && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <IconInput id="mb-name" icon={User} label="Full name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" error={errors.name} />
                  <IconInput
                    id="mb-phone"
                    icon={Phone}
                    label="Mobile number"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile"
                    error={errors.phone}
                  />
                </div>
              )}

              <IconInput
                id="mb-email"
                icon={Mail}
                label={isRegister ? "College or personal email" : "Email address"}
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@college.edu"
                error={errors.email}
              />

              {isRegister && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <span className="mb-1.5 block text-[13px] font-medium text-ink-light">{program} specialisation</span>
                      <div id="mb-specialization" tabIndex={-1} className="outline-none">
                        <Dropdown
                          label={`${program} specialisation`}
                          placeholder="Choose specialisation"
                          icon={GraduationCap}
                          value={specialization}
                          options={SPECIALIZATIONS[program]}
                          onChange={setSpecialization}
                        />
                      </div>
                      <FieldError id="mb-specialization-err" msg={errors.specialization} />
                    </div>
                    <div>
                      <span className="mb-1.5 block text-[13px] font-medium text-ink-light">Year of passing</span>
                      <div id="mb-year" tabIndex={-1} className="outline-none">
                        <Dropdown label="Year of passing" placeholder="Choose year" icon={CalendarDays} value={year} options={YEARS} onChange={setYear} />
                      </div>
                      <FieldError id="mb-year-err" msg={errors.year} />
                    </div>
                  </div>
                  <IconInput
                    id="mb-college"
                    icon={Building2}
                    label="College / University"
                    autoComplete="organization"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. Osmania University"
                    error={errors.college}
                  />
                  <fieldset>
                    <legend className="mb-2 text-[13px] font-medium text-ink-light">
                      I&apos;m looking for <span className="font-normal text-muted">(choose any)</span>
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {GOALS.map((g) => {
                        const on = goals.includes(g);
                        return (
                          <button
                            key={g}
                            type="button"
                            role="checkbox"
                            aria-checked={on}
                            onClick={() => setGoals((all) => (on ? all.filter((x) => x !== g) : [...all, g]))}
                            className={cn(
                              "rounded-full px-3.5 py-2 text-[12.5px] font-medium transition-colors cursor-pointer",
                              on ? "bg-primary text-white" : "border border-hairline bg-white text-body hover:border-primary/40 hover:text-primary"
                            )}
                          >
                            {g}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                </>
              )}

              <div>
                <IconInput
                  id="mb-password"
                  icon={Lock}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isRegister ? "new-password" : "current-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isRegister ? "At least 8 characters" : "Your password"}
                  error={errors.password}
                  trailing={
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-muted transition-colors hover:text-ink cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                />
                {!isRegister && (
                  <button
                    type="button"
                    onClick={() =>
                      EMAIL_RE.test(email.trim())
                        ? showToast(`Password reset link sent to ${email.trim()}.`)
                        : setErrors((e) => ({ ...e, email: "Enter your email first so we can send a reset link." }))
                    }
                    className="mt-2 text-[12.5px] font-semibold text-primary hover:text-primary-hover cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>

              {isRegister ? (
                <div>
                  <label className="flex cursor-pointer items-start gap-2.5 text-[13px] leading-snug text-body">
                    <input
                      id="mb-terms"
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      aria-invalid={!!errors.terms}
                      aria-describedby={errors.terms ? "mb-terms-err" : undefined}
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded accent-[#2563eb]"
                    />
                    <span>
                      I agree to the <span className="font-semibold text-ink">Terms of Service</span> and <span className="font-semibold text-ink">Privacy Policy</span>, and to
                      share my profile with verified campus recruiters.
                    </span>
                  </label>
                  <FieldError id="mb-terms-err" msg={errors.terms} />
                </div>
              ) : (
                <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-body">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 cursor-pointer rounded accent-[#2563eb]" />
                  Keep me signed in on this device
                </label>
              )}

              <button
                type="submit"
                className="btn-gradient group mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-[15px] font-semibold active:scale-[0.99] cursor-pointer"
              >
                {isRegister ? `Create ${program} account` : "Sign in"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 border-t border-dashed border-hairline pt-5 text-[12.5px] text-body">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
              Try a demo:
              {(["MBA", "BBA"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => fillDemo(p)}
                  className="rounded-full border border-hairline bg-white px-3 py-1 font-medium text-ink transition-colors hover:border-primary/40 hover:text-primary cursor-pointer"
                >
                  {p} student
                </button>
              ))}
            </div>

            <p className="mt-5 text-center text-[13.5px] text-body">
              {isRegister ? "Already registered? " : "New here? "}
              <Link href={isRegister ? "/mba-bba/login" : "/mba-bba/register"} className="font-semibold text-primary hover:text-primary-hover">
                {isRegister ? "Sign in" : "Create an MBA / BBA account"}
              </Link>
            </p>
            <p className="mt-2 text-center text-[12.5px] text-muted">
              Not an MBA or BBA student?{" "}
              <button type="button" onClick={openGeneralSignIn} className="font-semibold text-body underline-offset-2 hover:text-primary hover:underline cursor-pointer">
                Use the regular {isRegister ? "registration" : "sign in"}
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
