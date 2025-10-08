"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

const Card = ({ className, ...props }: CardProps) => (
  <div
    className={cn(
      "bg-white rounded-2xl shadow-soft border border-sage-400/10 overflow-hidden",
      className
    )}
    {...props}
  />
);

const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div
    className={cn("px-6 py-5 border-b border-sage-400/10", className)}
    {...props}
  />
);

const CardContent = ({ className, ...props }: CardContentProps) => (
  <div className={cn("px-6 py-5", className)} {...props} />
);

const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div
    className={cn(
      "px-6 py-4 border-t border-sage-400/10 bg-cream-50",
      className
    )}
    {...props}
  />
);

export { Card, CardContent, CardFooter, CardHeader };
