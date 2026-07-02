import { cn } from "@/lib/utils";

// Reference card surface — slightly-rounded corners, soft elevation.
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md border border-[var(--border)] bg-[var(--background)] p-6",
        "shadow-[var(--shadow)] transition-shadow hover:shadow-lg",
        className,
      )}
      {...props}
    />
  );
}
