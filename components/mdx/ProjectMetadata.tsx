import { cn } from "@/lib/utils";

interface ProjectMetadataProps {
  client?: string;
  metric?: string;
  category?: string;
  date?: string;
  tags?: string[];
  className?: string;
}

export function ProjectMetadata({
  client,
  metric,
  category,
  date,
  tags,
  className,
}: ProjectMetadataProps) {
  const hasMetadata =
    client || metric || category || date || (tags && tags.length > 0);

  if (!hasMetadata) {
    return null;
  }

  return (
    <div
      className={cn(
        "bg-muted/40 border border-border rounded-lg p-6 mb-8 not-prose",
        className,
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First column */}
        <div className="space-y-4">
          {client && (
            <dl>
              <dt className="text-sm font-medium text-muted-foreground mb-1">
                Client
              </dt>
              <dd className="text-sm text-foreground">{client}</dd>
            </dl>
          )}

          {metric && (
            <dl>
              <dt className="text-sm font-medium text-muted-foreground mb-1">
                Key Metric
              </dt>
              <dd className="text-sm text-foreground">{metric}</dd>
            </dl>
          )}
        </div>

        {/* Second column */}
        <div className="space-y-4">
          {category && (
            <dl>
              <dt className="text-sm font-medium text-muted-foreground mb-1">
                Category
              </dt>
              <dd className="text-sm text-foreground">{category}</dd>
            </dl>
          )}

          {date && (
            <dl>
              <dt className="text-sm font-medium text-muted-foreground mb-1">
                Date
              </dt>
              <dd className="text-sm text-foreground">{date}</dd>
            </dl>
          )}
        </div>
      </div>

      {/* Tags section - spans full width */}
      {tags && tags.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border/50">
          <dl>
            <dt className="text-sm font-medium text-muted-foreground mb-2">
              Tags
            </dt>
            <dd className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.toLowerCase()}
                  className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </dd>
          </dl>
        </div>
      )}
    </div>
  );
}
