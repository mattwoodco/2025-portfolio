import { Badge } from "@/components/ui/badge";
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
  const fields = [
    { label: "Client", value: client },
    { label: "Key Metric", value: metric },
    { label: "Category", value: category },
    { label: "Date", value: date },
  ].filter((f) => Boolean(f.value));

  const hasMetadata = fields.length > 0 || (tags && tags.length > 0);

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
        <div className="space-y-4">
          {fields.slice(0, 2).map(({ label, value }) => (
            <dl key={label}>
              <dt className="text-sm font-medium text-muted-foreground mb-1">
                {label}
              </dt>
              <dd className="text-sm text-foreground">{value}</dd>
            </dl>
          ))}
        </div>
        <div className="space-y-4">
          {fields.slice(2, 4).map(({ label, value }) => (
            <dl key={label}>
              <dt className="text-sm font-medium text-muted-foreground mb-1">
                {label}
              </dt>
              <dd className="text-sm text-foreground">{value}</dd>
            </dl>
          ))}
        </div>
      </div>

      {tags && tags.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border/50">
          <dl>
            <dt className="text-sm font-medium text-muted-foreground mb-2">
              Tags
            </dt>
            <dd className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag.toLowerCase()} variant="secondary" size="sm">
                  {tag}
                </Badge>
              ))}
            </dd>
          </dl>
        </div>
      )}
    </div>
  );
}
