"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

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

        <input
          type={type}
          id={inputId}
          className={cn(
            "w-full px-4 py-3 rounded-xl border transition-all duration-200 bg-white",
            "focus:outline-none focus:ring-2 focus:ring-sage-400/20",
            "placeholder:text-charcoal-600/60",
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

Input.displayName = "Input";

export { Input };
