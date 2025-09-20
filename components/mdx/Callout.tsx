import { cn } from "@/lib/utils";

interface CalloutProps {
  type: "info" | "warning" | "error" | "success";
  children: React.ReactNode;
}

export function Callout({ type, children }: CalloutProps) {
  return (
    <div
      className={cn("border-l-4 p-4 my-4 rounded-r-md", {
        "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950/30 dark:text-blue-200 dark:border-blue-400":
          type === "info",
        "border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-950/30 dark:text-yellow-200 dark:border-yellow-400":
          type === "warning",
        "border-red-500 bg-red-50 text-red-900 dark:bg-red-950/30 dark:text-red-200 dark:border-red-400":
          type === "error",
        "border-green-500 bg-green-50 text-green-900 dark:bg-green-950/30 dark:text-green-200 dark:border-green-400":
          type === "success",
      })}
    >
      {children}
    </div>
  );
}
