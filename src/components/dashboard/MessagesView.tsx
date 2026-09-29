"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, MessageSquare, Search, SendHorizontal } from "lucide-react";
import { useStudent } from "@/components/dashboard/StudentStore";
import { Avatar, Empty } from "@/components/employer/ui";
import { cn } from "@/lib/utils";

// Recruiter communication: conversation list + chat. On phones one pane shows at a time.
export const MessagesView: React.FC = () => {
  const { threads, openThread, sendMessage } = useStudent();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();
  const list = threads.filter((t) => !q || [t.recruiter, t.company, t.role].some((v) => v.toLowerCase().includes(q)));
  const active = threads.find((t) => t.id === activeId) ?? null;
  // Desktop always shows a conversation; default to the first.
  const shown = active ?? threads[0] ?? null;

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [shown?.id, shown?.messages.length]);

  // On desktop the default conversation is on screen, so it counts as read.
  const shownId = shown?.id;
  const shownUnread = shown?.unread ?? 0;
  useEffect(() => {
    if (shownId && shownUnread > 0 && window.matchMedia("(min-width: 768px)").matches) openThread(shownId);
  }, [shownId, shownUnread, openThread]);

  const select = (id: string) => {
    setActiveId(id);
    openThread(id);
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !shown) return;
    sendMessage(shown.id, text);
    setDraft("");
  };

  if (threads.length === 0) {
    return <Empty icon={MessageSquare} title="No messages yet" text="Recruiters can message you once you apply to their jobs." />;
  }

  return (
    <div className="card-soft grid h-[min(680px,calc(100dvh-13rem))] min-h-[460px] overflow-hidden md:grid-cols-[300px_minmax(0,1fr)]">
      {/* Conversation list */}
      <aside className={cn("flex min-h-0 flex-col border-hairline md:border-r", active ? "hidden md:flex" : "flex")} aria-label="Conversations">
        <div className="border-b border-hairline p-3">
          <label className="relative block">
            <span className="sr-only">Search conversations</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recruiters or companies"
              className="h-10 w-full rounded-xl border border-hairline bg-surface-soft/60 pl-9 pr-3 text-[13px] text-ink outline-none placeholder:text-muted focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
            />
          </label>
        </div>
        <ul className="min-h-0 flex-1 overflow-y-auto">
          {list.map((t) => {
            const last = t.messages.at(-1);
            const isOpen = shown?.id === t.id;
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => select(t.id)}
                  aria-current={isOpen ? "true" : undefined}
                  className={cn(
                    "flex w-full items-start gap-3 border-l-2 px-3 py-3 text-left transition-colors cursor-pointer",
                    isOpen ? "border-primary bg-primary-light/40" : "border-transparent hover:bg-surface-soft/70"
                  )}
                >
                  <Avatar name={t.recruiter} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className={cn("truncate text-[13.5px]", t.unread ? "font-semibold text-ink" : "font-medium text-ink")}>{t.recruiter}</span>
                      {t.unread > 0 && (
                        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[10.5px] font-semibold text-white">{t.unread}</span>
                      )}
                    </span>
                    <span className="block truncate text-[11.5px] text-muted">{t.company}</span>
                    <span className="mt-0.5 block truncate text-[12px] text-body">
                      {last?.from === "me" && "You: "}
                      {last?.text}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
          {list.length === 0 && <li className="p-6 text-center text-[12.5px] text-body">No conversations match.</li>}
        </ul>
      </aside>

      {/* Chat */}
      {shown && (
        <section className={cn("min-h-0 flex-col", active ? "flex" : "hidden md:flex")} aria-label={`Conversation with ${shown.recruiter}`}>
          <header className="flex items-center gap-3 border-b border-hairline px-4 py-3">
            <button
              type="button"
              onClick={() => setActiveId(null)}
              aria-label="Back to conversations"
              className="grid h-9 w-9 place-items-center rounded-full text-body hover:bg-surface-soft md:hidden cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <Avatar name={shown.recruiter} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold text-ink">
                {shown.recruiter} <span className="font-normal text-muted">· {shown.company}</span>
              </p>
              <p className="truncate text-[12px] text-body">About: {shown.role}</p>
            </div>
          </header>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-surface-soft/40 px-4 py-4" aria-live="polite">
            {shown.messages.map((m, i) => (
              <div key={i} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                    m.from === "me" ? "rounded-br-md bg-primary text-white" : "rounded-bl-md border border-hairline bg-white text-ink"
                  )}
                >
                  <p>{m.text}</p>
                  <p className={cn("mt-1 text-[10.5px]", m.from === "me" ? "text-white/70" : "text-muted")}>{m.time}</p>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <form onSubmit={send} className="flex items-end gap-2 border-t border-hairline p-3">
            <label className="min-w-0 flex-1">
              <span className="sr-only">Write a message</span>
              <textarea
                rows={1}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(e);
                  }
                }}
                placeholder={`Message ${shown.recruiter.split(" ")[0]}…`}
                className="max-h-32 min-h-[44px] w-full resize-none rounded-xl border border-hairline bg-white px-3.5 py-2.5 text-[13.5px] text-ink outline-none placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </label>
            <button
              type="submit"
              disabled={!draft.trim()}
              aria-label="Send message"
              className="btn-gradient grid h-11 w-11 shrink-0 place-items-center rounded-xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              <SendHorizontal className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </section>
      )}
    </div>
  );
};
