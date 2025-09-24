import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-mono font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-primary/20 bg-primary/10 text-primary hover:bg-primary/15 hover:border-primary/30",
        secondary:
          "border-secondary/20 bg-secondary/10 text-secondary-foreground hover:bg-secondary/15 hover:border-secondary/30",
        destructive:
          "border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/15 hover:border-destructive/30",
        outline:
          "border-border bg-transparent text-foreground hover:bg-accent/5",
        solid: "border-transparent bg-white/20 text-white hover:bg-white/30",
      },
      size: {
        sm: "text-[clamp(0.625rem,calc(0.55rem+0.5vw),0.75rem)] px-2 py-0.5",
        md: "text-[clamp(0.75rem,calc(0.65rem+0.7vw),0.875rem)] px-2.5 py-1",
        lg: "text-[clamp(0.875rem,calc(0.75rem+0.9vw),1rem)] px-3 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export interface BadgeGroupProps {
  tags: string[];
  variant?: BadgeProps["variant"];
  size?: BadgeProps["size"];
  className?: string;
  maxVisible?: number;
}

function BadgeGroup({
  tags,
  variant = "default",
  size = "md",
  className,
  maxVisible,
}: BadgeGroupProps) {
  const displayTags = maxVisible ? tags.slice(0, maxVisible) : tags;
  const remainingCount =
    maxVisible && tags.length > maxVisible ? tags.length - maxVisible : 0;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {displayTags.map((tag) => (
        <Badge key={tag} variant={variant} size={size}>
          {tag}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge variant="outline" size={size}>
          +{remainingCount} more
        </Badge>
      )}
    </div>
  );
}

export { Badge, BadgeGroup, badgeVariants };
