"use client";

import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-charcoal-700 mb-2"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <textarea
          id={inputId}
          className={cn(
            "w-full px-4 py-3 rounded-xl border transition-all duration-200 bg-white",
            "focus:outline-none focus:ring-2 focus:ring-sage-400/20",
            "placeholder:text-charcoal-600/60 resize-vertical min-h-[100px]",
            error
              ? "border-red-300 focus:border-red-400 focus:ring-red-400/20"
              : "border-sage-400/20 focus:border-sage-400",
            props.disabled && "bg-cream-100 cursor-not-allowed",
            className
          )}
          ref={ref}
          {...props}
        />

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        {helperText && !error && (
          <p className="mt-2 text-sm text-charcoal-600">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
