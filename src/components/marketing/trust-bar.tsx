import { Award, CalendarClock, MapPin, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/site-config";

const ITEMS = [
  { icon: CalendarClock, label: `Building since ${SITE.since}` },
  { icon: ShieldCheck, label: SITE.license },
  { icon: Award, label: SITE.certification },
  { icon: MapPin, label: `Serving the ${SITE.region}` },
];

export function TrustBar() {
  return (
    <section className="border-b border-border bg-secondary/30">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 text-sm font-medium text-secondary-foreground sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center justify-center gap-2 text-center sm:justify-start sm:text-left">
            <Icon className="size-4 shrink-0 text-primary" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
