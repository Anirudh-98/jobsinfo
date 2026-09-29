"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  BriefcaseBusiness,
  Camera,
  Check,
  ChevronLeft,
  Clock,
  GraduationCap,
  Globe,
  MapPin,
  Send,
  Star,
  Timer,
} from "lucide-react";
import { Candidate, EDUCATION_GROUPS, educationGroup } from "@/data/employerData";
import {
  COMPETENCIES,
  CollectedDetails,
  CompetencyId,
  HR_QUESTIONS,
  QuestionId,
  RATING_LABELS,
  RECOMMENDATIONS,
  RecommendationId,
  overallScore,
} from "@/data/screeningData";
import { useApp } from "@/context/AppContext";
import { useScreening } from "@/components/screening/ScreeningStore";
import { Dialog, Field, Pill, btnPrimary, btnSecondary, initials, inputClass } from "@/components/employer/ui";
import { cn } from "@/lib/utils";

const textareaClass =
  "w-full rounded-xl border border-hairline bg-white px-3.5 py-2.5 text-[13.5px] leading-relaxed text-ink outline-none transition-colors placeholder:text-muted hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/15";

const REC_TONE = {
  green: "border-emerald-300 bg-emerald-50 text-emerald-700",
  blue: "border-primary/40 bg-primary-light text-primary",
  amber: "border-amber-300 bg-amber-50 text-amber-700",
  rose: "border-rose-300 bg-rose-50 text-rose-700",
} as const;

const experienceLabel = (y: number) => (y === 0 ? "Fresher" : `${y} yr${y > 1 ? "s" : ""}`);

const Section: React.FC<{ id: string; n: number; title: string; sub: string; done: boolean; children: React.ReactNode }> = ({ id, n, title, sub, done, children }) => (
  <section id={id} className="card-soft scroll-mt-4 p-4 sm:p-6" aria-labelledby={`${id}-title`}>
    <div className="flex items-start gap-3">
      <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-bold", done ? "bg-emerald-500 text-white" : "bg-primary-light text-primary")}>
        {done ? <Check className="h-4 w-4" strokeWidth={3} aria-hidden /> : n}
      </span>
      <div>
        <h2 id={`${id}-title`} className="text-[16px] font-semibold text-ink">
          {title}
        </h2>
        <p className="text-[12.5px] text-body">{sub}</p>
      </div>
    </div>
    <div className="mt-5">{children}</div>
  </section>
);

// 1–5 star rating as a radio group (arrow keys work natively between radios).
const StarRating: React.FC<{ label: string; value: number; onChange: (v: number) => void; name: string }> = ({ label, value, onChange, name }) => (
  <div role="radiogroup" aria-label={label} className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((v) => (
      <label key={v} className="cursor-pointer rounded-md p-0.5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/40">
        <input type="radio" name={name} value={v} checked={value === v} onChange={() => onChange(v)} className="sr-only" aria-label={`${v} — ${RATING_LABELS[v]}`} />
        <Star className={cn("h-6 w-6 transition-colors", v <= value ? "fill-amber-400 text-amber-400" : "text-surface-strong hover:text-amber-300")} aria-hidden />
      </label>
    ))}
    <span className="ml-2 w-24 text-[12.5px] font-medium text-body">{value ? RATING_LABELS[value] : "Not rated"}</span>
  </div>
);

export const InterviewForm: React.FC<{ candidate: Candidate; jobTitle?: string; onExit: () => void }> = ({ candidate: c, jobTitle, onExit }) => {
  const { user, showToast } = useApp();
  const { submitEvaluation, evaluationFor } = useScreening();
  const previous = evaluationFor(c.id);

  const [details, setDetails] = useState<CollectedDetails>(
    previous?.details ?? {
      currentLocation: c.location,
      expectedCtc: c.expectedCtc,
      noticePeriod: c.noticePeriod,
      relocate: "Yes",
      languages: "English",
      preferredRole: jobTitle ?? c.headline.split("·")[0].trim(),
    }
  );
  const [notes, setNotes] = useState<Partial<Record<QuestionId, string>>>(previous?.notes ?? {});
  const [asked, setAsked] = useState<QuestionId[]>(previous?.asked ?? []);
  const [ratings, setRatings] = useState<Partial<Record<CompetencyId, number>>>(previous?.ratings ?? {});
  const [strengths, setStrengths] = useState(previous?.strengths ?? "");
  const [concerns, setConcerns] = useState(previous?.concerns ?? "");
  const [recommendation, setRecommendation] = useState<RecommendationId | "">(previous?.recommendation ?? "");
  const [photo, setPhoto] = useState<string | undefined>(c.photo ?? previous?.photo);
  const [error, setError] = useState("");
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(t);
  }, []);

  const rated = COMPETENCIES.filter((k) => ratings[k.id]).length;
  const allRated = rated === COMPETENCIES.length;
  const score = allRated ? overallScore(ratings as Record<CompetencyId, number>) : 0;
  const dirty = asked.length > 0 || rated > 0 || Boolean(strengths || concerns || recommendation || Object.values(notes).some(Boolean));
  const group = EDUCATION_GROUPS.find((g) => g.id === educationGroup(c))!;
  const clock = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  const setNote = (id: QuestionId, text: string) => {
    setNotes((n) => ({ ...n, [id]: text }));
    // Writing a note means the question was asked.
    if (text.trim() && !asked.includes(id)) setAsked((a) => [...a, id]);
  };

  const toggleAsked = (id: QuestionId) => setAsked((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  const addPhoto = (file?: File) => {
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
    showToast("Photo added to this interview.");
  };

  const submit = () => {
    if (!allRated) {
      setError(`Rate all ${COMPETENCIES.length} competencies before submitting (${rated} of ${COMPETENCIES.length} done).`);
      document.getElementById("hr-ratings")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (!recommendation) {
      setError("Choose a recommendation before submitting.");
      document.getElementById("hr-summary")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    submitEvaluation({
      candidateId: c.id,
      interviewer: user.name,
      durationMin: Math.max(1, Math.round(seconds / 60)),
      details,
      notes,
      asked,
      ratings: ratings as Record<CompetencyId, number>,
      strengths: strengths.trim(),
      concerns: concerns.trim(),
      recommendation,
      photo: c.photo ? undefined : photo,
    });
    showToast(`Evaluation for ${c.name} submitted — overall ${score}/5.`);
    onExit();
  };

  const checklist = [
    { label: "Details verified", done: Boolean(details.currentLocation && details.expectedCtc && details.noticePeriod) },
    { label: `Questions asked (${asked.length}/${HR_QUESTIONS.length})`, done: asked.length >= 4 },
    { label: `Competencies rated (${rated}/${COMPETENCIES.length})`, done: allRated },
    { label: "Recommendation chosen", done: Boolean(recommendation) },
  ];

  return (
    <div className="space-y-4">
      {/* Session bar */}
      <div className="card-soft flex flex-wrap items-center gap-3 p-3 sm:px-5">
        <button type="button" onClick={() => (dirty ? setConfirmLeave(true) : onExit())} className={btnSecondary}>
          <ChevronLeft className="h-4 w-4" aria-hidden /> Back to profiles
        </button>
        <p className="text-[13px] text-body">
          HR prescreen · <b className="font-semibold text-ink">{c.name}</b>
          {previous && <span className="text-muted"> · re-interview (previous score {overallScore(previous.ratings)}/5)</span>}
        </p>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-[12.5px] font-semibold tabular-nums text-rose-600" aria-live="off">
          <span className="h-2 w-2 rounded-full bg-rose-500 animate-live-pulse" aria-hidden />
          <Timer className="h-3.5 w-3.5" aria-hidden /> {clock}
          <span className="sr-only">interview time</span>
        </span>
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-[340px_minmax(0,1fr)]">
        {/* Candidate panel */}
        <aside className="card-soft overflow-hidden xl:sticky xl:top-3" aria-label="Candidate">
          <div className="relative aspect-[4/5] max-h-[420px] w-full bg-gradient-to-br from-[#dbeafe] to-[#eff6ff] xl:max-h-none">
            {photo ? (
              // Captured photos are blob URLs, which next/image can't optimise.
              photo.startsWith("blob:") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt={`Photo of ${c.name}`} className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <Image src={photo} alt={`Photo of ${c.name}`} fill sizes="340px" className="object-cover" priority />
              )
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <span className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-primary to-sky-400 text-[36px] font-bold text-white shadow-lg">
                    {initials(c.name)}
                  </span>
                  <p className="mt-3 text-[12.5px] text-body">No photo on file</p>
                </div>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" capture="user" className="sr-only" onChange={(e) => addPhoto(e.target.files?.[0])} aria-label="Add candidate photo" tabIndex={-1} />
            {!c.photo && (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-[12.5px] font-semibold text-ink shadow-lg backdrop-blur transition-colors hover:text-primary cursor-pointer"
              >
                <Camera className="h-4 w-4" aria-hidden /> {photo ? "Retake photo" : "Add photo"}
              </button>
            )}
            <span className="absolute left-3 top-3 rounded-full bg-emerald-500 px-2.5 py-1 text-[11.5px] font-bold text-white shadow">{c.match}% match</span>
          </div>

          <div className="p-5">
            <h2 className="text-[20px] font-bold tracking-tight text-ink">{c.name}</h2>
            <p className="mt-0.5 text-[13px] text-body">{c.headline}</p>
            <dl className="mt-4 space-y-2 text-[12.5px]">
              {[
                [GraduationCap, c.education],
                [BriefcaseBusiness, `${experienceLabel(c.experienceYears)} · ${jobTitle ? `applied for ${jobTitle}` : "from the CV repository"}`],
                [MapPin, c.location],
                [Globe, `Source: ${c.source}`],
              ].map(([Icon, text]) => {
                const I = Icon as React.ElementType;
                return (
                  <div key={text as string} className="flex items-start gap-2 text-ink-light">
                    <I className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                    <dd>{text as string}</dd>
                  </div>
                );
              })}
            </dl>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <Pill tone="blue">{group.title}</Pill>
              {c.skills.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>

            <div className="mt-5 border-t border-hairline pt-4">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-muted">Interview checklist</p>
              <ul className="mt-2 space-y-1.5">
                {checklist.map((i) => (
                  <li key={i.label} className="flex items-center gap-2 text-[13px]">
                    <span className={cn("grid h-[18px] w-[18px] place-items-center rounded-full", i.done ? "bg-emerald-500 text-white" : "border border-hairline")}>
                      {i.done && <Check className="h-3 w-3" strokeWidth={3} aria-hidden />}
                    </span>
                    <span className={i.done ? "text-ink" : "text-body"}>{i.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="min-w-0 space-y-4"
          noValidate
        >
          <Section id="hr-details" n={1} title="Verify candidate details" sub="Confirm or correct what's on the profile." done={checklist[0].done}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Current location">
                <input value={details.currentLocation} onChange={(e) => setDetails({ ...details, currentLocation: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Preferred role">
                <input value={details.preferredRole} onChange={(e) => setDetails({ ...details, preferredRole: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Expected CTC">
                <input value={details.expectedCtc} onChange={(e) => setDetails({ ...details, expectedCtc: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Notice period">
                <input value={details.noticePeriod} onChange={(e) => setDetails({ ...details, noticePeriod: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Languages spoken">
                <input value={details.languages} onChange={(e) => setDetails({ ...details, languages: e.target.value })} className={inputClass} />
              </Field>
              <fieldset>
                <legend className="text-[12.5px] font-medium text-ink-light">Willing to relocate?</legend>
                <div className="mt-1.5 flex h-11 rounded-xl border border-hairline bg-surface-soft/60 p-1">
                  {(["Yes", "Maybe", "No"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      aria-pressed={details.relocate === r}
                      onClick={() => setDetails({ ...details, relocate: r })}
                      className={cn(
                        "flex-1 rounded-lg text-[13px] font-medium transition-colors cursor-pointer",
                        details.relocate === r ? "bg-white text-primary shadow-[0_4px_12px_-6px_rgba(30,64,175,0.5)]" : "text-body hover:text-ink"
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          </Section>

          <Section id="hr-questions" n={2} title="Interview questions" sub="Ask at least four. Notes are saved with the evaluation." done={checklist[1].done}>
            <ol className="space-y-3">
              {HR_QUESTIONS.map((q, i) => {
                const isAsked = asked.includes(q.id);
                return (
                  <li key={q.id} className={cn("rounded-2xl border p-3.5 transition-colors sm:p-4", isAsked ? "border-primary/25 bg-primary-light/25" : "border-hairline")}>
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-[12px] font-bold tabular-nums text-muted">Q{i + 1}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-semibold text-ink">{q.q}</p>
                        <p className="mt-0.5 text-[12px] text-muted">{q.hint}</p>
                      </div>
                      <label className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-[12.5px] font-medium text-body">
                        <input type="checkbox" checked={isAsked} onChange={() => toggleAsked(q.id)} className="h-4 w-4 cursor-pointer rounded accent-[#2563eb]" />
                        Asked
                      </label>
                    </div>
                    <textarea
                      rows={2}
                      value={notes[q.id] ?? ""}
                      onChange={(e) => setNote(q.id, e.target.value)}
                      placeholder="Key points from the answer…"
                      aria-label={`Notes for: ${q.q}`}
                      className={cn(textareaClass, "mt-3")}
                    />
                  </li>
                );
              })}
            </ol>
          </Section>

          <Section id="hr-ratings" n={3} title="Rate the candidate" sub="1 = poor, 5 = excellent." done={allRated}>
            <ul className="divide-y divide-hairline">
              {COMPETENCIES.map((k) => (
                <li key={k.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-[14px] font-semibold text-ink">{k.label}</p>
                    <p className="text-[12px] text-muted">{k.hint}</p>
                  </div>
                  <StarRating
                    name={`rate-${k.id}`}
                    label={k.label}
                    value={ratings[k.id] ?? 0}
                    onChange={(v) => {
                      setRatings((r) => ({ ...r, [k.id]: v }));
                      setError("");
                    }}
                  />
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between rounded-2xl bg-gradient-to-br from-[#e8f0ff] to-[#f5f9ff] p-4">
              <p className="text-[13px] font-medium text-ink-light">Overall score</p>
              <p className="text-[26px] font-bold tabular-nums text-ink" aria-live="polite">
                {allRated ? score : "—"}
                <span className="text-[14px] font-medium text-muted"> / 5</span>
              </p>
            </div>
          </Section>

          <Section id="hr-summary" n={4} title="Summary & recommendation" sub="What should the recruiter know?" done={Boolean(recommendation)}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Strengths">
                <textarea rows={3} value={strengths} onChange={(e) => setStrengths(e.target.value)} placeholder="What stood out positively" className={textareaClass} />
              </Field>
              <Field label="Concerns">
                <textarea rows={3} value={concerns} onChange={(e) => setConcerns(e.target.value)} placeholder="Gaps or risks to follow up on" className={textareaClass} />
              </Field>
            </div>
            <fieldset className="mt-5">
              <legend className="text-[12.5px] font-medium text-ink-light">Recommendation</legend>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {RECOMMENDATIONS.map((r) => {
                  const on = recommendation === r.id;
                  return (
                    <label
                      key={r.id}
                      className={cn(
                        "flex cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-[13.5px] font-semibold transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-primary/15",
                        on ? REC_TONE[r.tone] : "border-hairline bg-white text-body hover:border-primary/30"
                      )}
                    >
                      <input
                        type="radio"
                        name="recommendation"
                        value={r.id}
                        checked={on}
                        onChange={() => {
                          setRecommendation(r.id);
                          setError("");
                        }}
                        className="sr-only"
                      />
                      {r.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </Section>

          {/* Submit bar */}
          <div className="card-soft sticky bottom-3 z-10 flex flex-wrap items-center justify-between gap-3 p-3 sm:px-5">
            <p className={cn("text-[12.5px]", error ? "font-medium text-rose-600" : "text-body")} role={error ? "alert" : undefined}>
              {error || (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden /> Interviewed by {user.name} · {clock}
                </span>
              )}
            </p>
            <div className="flex gap-2">
              <button type="button" className={btnSecondary} onClick={() => (dirty ? setConfirmLeave(true) : onExit())}>
                Cancel
              </button>
              <button type="submit" className={btnPrimary}>
                <Send className="h-3.5 w-3.5" aria-hidden /> Submit evaluation
              </button>
            </div>
          </div>
        </form>
      </div>

      {confirmLeave && (
        <Dialog
          title="Discard this interview?"
          onClose={() => setConfirmLeave(false)}
          footer={
            <>
              <button type="button" className={btnSecondary} onClick={() => setConfirmLeave(false)}>
                Keep interviewing
              </button>
              <button type="button" className="inline-flex min-h-[36px] items-center rounded-full bg-rose-600 px-4 text-[12.5px] font-semibold text-white hover:bg-rose-700 cursor-pointer" onClick={onExit}>
                Discard
              </button>
            </>
          }
        >
          <p className="text-[13.5px] text-body">Your notes and ratings for {c.name} haven&apos;t been submitted and will be lost.</p>
        </Dialog>
      )}
    </div>
  );
};
