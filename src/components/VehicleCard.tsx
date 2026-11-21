import { useId } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, type Vehicle } from "@/lib/vehicles";
import { VehicleImage } from "@/components/VehicleImage";

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}

export function VehicleCard({ vehicle, index, expanded, onToggle }: VehicleCardProps) {
  const panelId = useId();
  const plateNo = String(index + 1).padStart(2, "0");

  return (
    <article className="spec-plate overflow-hidden" data-expanded={expanded}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={panelId}
        className="group block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
      >
        <div className="relative">
          <VehicleImage
            src={vehicle.image}
            alt={`${vehicle.make} ${vehicle.model}${vehicle.generation ? ` (${vehicle.generation})` : ""}`}
            className="aspect-[16/10]"
            loading={index < 3 ? "eager" : "lazy"}
          />
          <div className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-image-shade)]" />
          <span className="label-caps absolute top-3 left-3 rounded-sm border border-titanium-light/40 bg-asphalt/70 px-2 py-1 text-silver backdrop-blur-sm">
            {vehicle.category}
          </span>
          <span className="absolute top-3 right-3 font-mono text-[0.6875rem] text-slate tabular-nums">
            No. {plateNo}
          </span>
        </div>

        <div className="flex items-end justify-between gap-4 px-5 pt-4 pb-5">
          <div className="min-w-0">
            <p className="label-caps text-slate">{vehicle.make}</p>
            <h3 className="font-display mt-1.5 truncate text-2xl text-ink">
              {vehicle.model}
              {vehicle.generation && (
                <span className="ml-2 align-middle font-mono text-xs font-normal tracking-normal text-titanium-light">
                  {vehicle.generation}
                </span>
              )}
            </h3>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="label-caps text-titanium-light">Est. avg.</span>
              <span className="text-lg font-bold tabular-nums tracking-tight text-silver-bright">
                ~{formatPrice(vehicle.priceEur)}
              </span>
            </p>
          </div>
          <span
            aria-hidden
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full border border-titanium text-silver transition-[transform,background-color,color,border-color] duration-500 ease-[var(--ease-out-expo)] group-hover:border-titanium-light",
              expanded && "rotate-45 border-silver bg-silver-bright text-asphalt",
            )}
          >
            <Plus className="size-4" strokeWidth={2.25} />
          </span>
        </div>
        <span className="sr-only">{expanded ? "Hide details" : "Show details"}</span>
      </button>

      <div id={panelId} className="collapse-grid" data-open={expanded} aria-hidden={!expanded}>
        <div>
          <div className="collapse-content px-5 pb-6">
            <div className="hairline mb-5" />
            <p className="text-sm leading-relaxed text-slate">{vehicle.description}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="label-caps text-titanium-light">Key specs</span>
              <span className="font-mono text-[0.6875rem] text-titanium-light">
                Ref. {vehicle.variant}
              </span>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-titanium bg-titanium">
              {vehicle.specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={cn(
                    "bg-asphalt-raised px-3 py-2.5",
                    i === vehicle.specs.length - 1 && vehicle.specs.length % 2 === 1 && "col-span-2",
                  )}
                >
                  <dt className="label-caps text-[0.625rem] text-titanium-light">{spec.label}</dt>
                  <dd className="mt-1 text-sm font-semibold tabular-nums text-silver-bright">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </article>
  );
}
