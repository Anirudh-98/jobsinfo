import React from "react";
import { CircleCheck } from "lucide-react";
import { ACTIVITY } from "@/data/homeContent";

export const ActivityTicker: React.FC = () => (
  <section className="border-y border-hairline bg-surface-soft py-6" aria-labelledby="activity-title">
    <div className="max-w-7xl mx-auto flex items-center gap-2 px-4 sm:px-6 lg:px-8">
      <span className="relative flex h-2.5 w-2.5" aria-hidden>
        <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
      </span>
      <h2 id="activity-title" className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ink">
        Platform activity — in real time
      </h2>
      <span className="ml-auto hidden sm:block text-[12px] text-muted">Hover to pause</span>
    </div>

    <div className="marquee-pause relative mt-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      {/* Content is duplicated for a seamless loop; the copy is hidden from assistive tech. */}
      <div className="animate-marquee flex w-max gap-3">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex gap-3" aria-hidden={copy === 1 || undefined}>
            {ACTIVITY.map((a) => (
              <li
                key={a.text}
                className="flex shrink-0 items-center gap-2.5 rounded-full border border-hairline bg-white py-2 pl-2 pr-4 text-[13.5px] shadow-rest"
              >
                <CircleCheck className="h-5 w-5 text-primary" aria-hidden />
                <span className="text-ink-light">{a.text}</span>
                <span className="whitespace-nowrap text-[12px] font-medium text-primary">· {a.time}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  </section>
);
