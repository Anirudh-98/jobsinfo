import React from "react";

export interface PageHeaderBandProps {
  kicker: string;
  title: string;
  subtitle?: string;
  stat?: { value: string; label: string };
}

export const PageHeaderBand: React.FC<PageHeaderBandProps> = ({ kicker, title, subtitle, stat }) => {
  return (
    <div className="w-full bg-canvas border-b border-hairline">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full mb-3">
            {kicker}
          </span>
          <h1 className="text-display-md sm:text-display-lg font-bold tracking-tight text-ink leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-body-md sm:text-body-lg text-body max-w-2xl leading-relaxed">{subtitle}</p>
          )}
        </div>

        {stat && (
          <div className="shrink-0 p-4 rounded-sm bg-surface-soft border border-hairline shadow-xs">
            <p className="text-3xl sm:text-4xl font-bold tabular-nums text-ink">
              {stat.value}
            </p>
            <p className="text-xs text-muted mt-1">{stat.label}</p>
          </div>
        )}
      </div>
    </div>
  );
};
