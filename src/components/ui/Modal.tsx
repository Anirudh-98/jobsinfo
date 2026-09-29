"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "xl",
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Quietly Scrim Overlay (40% black) */}
      <div
        className="fixed inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Quietly Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-10 w-full bg-canvas rounded-sm border border-hairline shadow-modal overflow-hidden animate-in fade-in zoom-in-95 duration-200",
          maxWidthStyles[maxWidth],
          className
        )}
      >
        {(title || description) && (
          <div className="flex items-start justify-between p-6 border-b border-hairline bg-surface-soft">
            <div>
              {title && (
                <h3 className="text-xl font-semibold text-ink leading-tight">{title}</h3>
              )}
              {description && (
                <p className="mt-1 text-sm text-body-secondary">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="h-10 w-10 min-h-[40px] min-w-[40px] rounded-sm flex items-center justify-center text-muted hover:text-ink hover:bg-surface-strong transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
