"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items, className }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={cn("w-full max-w-[780px] mx-auto divide-y divide-hairline border-y border-hairline", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="transition-colors">
            <button
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="w-full min-h-[52px] py-4 px-4 flex items-center justify-between gap-4 text-left font-semibold text-[16px] text-ink hover:text-primary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-muted shrink-0 transition-transform duration-200",
                  isOpen && "transform rotate-180 text-primary"
                )}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-1 animate-in fade-in duration-150">
                <p className="text-[15px] font-normal text-body-secondary leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
