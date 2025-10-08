import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  description,
  align = "center",
  className,
}: SectionTitleProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={cn("space-y-4", alignClasses[align], className)}>
      {subtitle && (
        <p className="text-sage-400 font-medium text-sm uppercase tracking-wide">
          {subtitle}
        </p>
      )}

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-charcoal-800">
        {title}
      </h2>

      {description && (
        <p className="text-lg text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
