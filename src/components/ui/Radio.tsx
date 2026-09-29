import React from "react";
import { cn } from "@/lib/utils";

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, checked, disabled, id, onChange, ...props }, ref) => {
    const inputId = id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "inline-flex items-center min-h-[40px] cursor-pointer group select-none gap-3",
          disabled && "cursor-not-allowed opacity-60",
          className
        )}
      >
        <div className="relative flex items-center justify-center p-[11px]">
          <input
            id={inputId}
            type="radio"
            ref={ref}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="sr-only"
            {...props}
          />
          <div
            className={cn(
              "h-[18px] w-[18px] rounded-full border-2 transition-all flex items-center justify-center bg-white",
              checked
                ? "border-primary"
                : "border-hairline group-hover:border-border-strong group-hover:shadow-rest",
              disabled && "bg-surface-soft border-hairline"
            )}
          >
            {checked && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
          </div>
        </div>
        {label && <span className="text-[15px] text-ink font-normal">{label}</span>}
      </label>
    );
  }
);

Radio.displayName = "Radio";
