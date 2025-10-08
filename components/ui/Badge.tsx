"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  const baseClasses = "inline-flex items-center font-medium rounded-full";

  const variants = {
    default: "bg-sage-400/10 text-sage-600 border border-sage-400/20",
    success: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-100 text-amber-700 border border-amber-200",
    error: "bg-red-100 text-red-700 border border-red-200",
    info: "bg-blue-100 text-blue-700 border border-blue-200",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={cn(baseClasses, variants[variant], sizes[size], className)}
    >
      {children}
    </span>
  );
}

// Badge spécifique pour les allergènes
interface AllergeneBadgeProps {
  allergene: string;
  className?: string;
}

export function AllergeneBadge({ allergene, className }: AllergeneBadgeProps) {
  const allergeneLabels: Record<string, string> = {
    gluten: "Gluten",
    crustaces: "Crustacés",
    oeufs: "Œufs",
    poissons: "Poissons",
    arachides: "Arachides",
    soja: "Soja",
    lait: "Lait",
    fruits_a_coque: "Fruits à coque",
    celeri: "Céleri",
    moutarde: "Moutarde",
    sesame: "Sésame",
    anhydride_sulfureux: "Sulfites",
    lupin: "Lupin",
    mollusques: "Mollusques",
  };

  return (
    <Badge variant="warning" size="sm" className={cn("font-medium", className)}>
      {allergeneLabels[allergene] || allergene}
    </Badge>
  );
}

// Badge pour les tags de plats
interface TagBadgeProps {
  tag: string;
  className?: string;
}

export function TagBadge({ tag, className }: TagBadgeProps) {
  const tagLabels: Record<string, string> = {
    vegetarien: "🌱 Végétarien",
    vegan: "🌿 Vegan",
    sans_gluten: "🌾 Sans gluten",
    sans_lactose: "🥛 Sans lactose",
    bio: "🌿 Bio",
    local: "📍 Local",
    fait_maison: "👨‍🍳 Fait maison",
    specialite: "⭐ Spécialité",
  };

  const tagColors: Record<string, "success" | "info" | "default"> = {
    vegetarien: "success",
    vegan: "success",
    sans_gluten: "info",
    sans_lactose: "info",
    bio: "success",
    local: "default",
    fait_maison: "default",
    specialite: "default",
  };

  return (
    <Badge
      variant={tagColors[tag] || "default"}
      size="sm"
      className={className}
    >
      {tagLabels[tag] || tag}
    </Badge>
  );
}
