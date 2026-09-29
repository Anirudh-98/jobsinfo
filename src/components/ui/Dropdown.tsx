"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropdownProps {
  label: string;
  /** Text for the empty ("all") option, shown when nothing is selected. */
  placeholder: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  icon?: React.ElementType;
  className?: string;
}

// Styled replacement for <select>: a button + listbox with full keyboard support.
export const Dropdown: React.FC<DropdownProps> = ({ label, placeholder, value, options, onChange, icon: Icon, className }) => {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  // Index 0 is the placeholder ("all") option.
  const items = ["", ...options];
  const selectedIndex = Math.max(0, items.indexOf(value));

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.focus();
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const openList = () => {
    setActive(selectedIndex);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  const choose = (index: number) => {
    onChange(items[index]);
    close();
  };

  const onButtonKey = (e: React.KeyboardEvent) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      openList();
    }
  };

  const onListKey = (e: React.KeyboardEvent) => {
    const last = items.length - 1;
    const moves: Record<string, number> = {
      ArrowDown: Math.min(active + 1, last),
      ArrowUp: Math.max(active - 1, 0),
      Home: 0,
      End: last,
    };
    if (e.key in moves) {
      e.preventDefault();
      setActive(moves[e.key]);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(active);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={cn("relative min-w-0", className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-label={`${label}: ${value || placeholder}`}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onButtonKey}
        className={cn(
          "flex h-11 w-full cursor-pointer items-center gap-2 rounded-xl border bg-white pl-3.5 pr-3 text-left text-[13px] outline-none transition-colors",
          open ? "border-primary ring-2 ring-primary/15" : "border-hairline hover:border-primary/40 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15",
          value ? "font-medium text-ink" : "text-body"
        )}
      >
        {Icon && <Icon className={cn("h-4 w-4 shrink-0", value ? "text-primary" : "text-muted")} aria-hidden />}
        <span className="min-w-0 flex-1 truncate">{value || placeholder}</span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted transition-transform duration-200", open && "rotate-180 text-primary")} aria-hidden />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          aria-activedescendant={`${id}-opt-${active}`}
          onKeyDown={onListKey}
          className="absolute left-0 top-[calc(100%+6px)] z-30 max-h-72 w-full min-w-[220px] overflow-y-auto overscroll-contain rounded-2xl border border-hairline bg-white p-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-20px_rgba(30,64,175,0.4)] outline-none animate-[dropdown-in_160ms_ease-out]"
        >
          {items.map((item, i) => {
            const selected = i === selectedIndex;
            return (
              <li
                key={item || "__all"}
                id={`${id}-opt-${i}`}
                data-index={i}
                role="option"
                aria-selected={selected}
                onPointerMove={() => setActive(i)}
                onClick={() => choose(i)}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] transition-colors",
                  i === active ? "bg-primary-light text-primary" : "text-ink-light",
                  selected && "font-semibold text-primary",
                  i === 0 && "text-body"
                )}
              >
                <span className="min-w-0 flex-1">{item || placeholder}</span>
                {selected && <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
