import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
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
            type="checkbox"
            ref={ref}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="sr-only"
            {...props}
          />
          <div
            className={cn(
              "h-[18px] w-[18px] rounded-sm border-2 transition-all flex items-center justify-center",
              checked
                ? "bg-primary border-primary text-white"
                : "bg-white border-hairline group-hover:border-border-strong group-hover:shadow-rest",
              disabled && "bg-surface-soft border-hairline"
            )}
          >
            {checked && <Check className="h-3 w-3 stroke-[3]" />}
          </div>
        </div>
        {label && <span className="text-[15px] text-ink font-normal">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
