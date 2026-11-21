import { createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-asphalt.jpg";
import { VehicleCard } from "@/components/VehicleCard";
import { VehicleImage } from "@/components/VehicleImage";
import {
  CATEGORIES,
  VEHICLES,
  filterVehicles,
  formatPrice,
  type CategoryFilter,
} from "@/lib/vehicles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Asphalt Collection — Luxury Automotive Catalog" },
      {
        name: "description",
        content:
          "A dark, editorial catalog of six luxury automobiles — from the Porsche 911 to the Rolls-Royce Cullinan — with estimated market prices and key specs.",
      },
      { property: "og:title", content: "Asphalt Collection — Luxury Automotive Catalog" },
      {
        property: "og:description",
        content:
          "Six luxury automobiles, estimated market prices and key specs in a motorsport-inspired editorial catalog.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;
const FILTERS: CategoryFilter[] = ["All", ...CATEGORIES];

function Index() {
  const [filter, setFilter] = useState<CategoryFilter>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const vehicles = filterVehicles(VEHICLES, filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header
        className="animate-fade fixed inset-x-0 top-0 z-30 border-b border-titanium/60 bg-asphalt/75 backdrop-blur-md"
        style={delay(0)}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="block h-4 w-1 rounded-full bg-[image:var(--gradient-brushed)]" />
            <span className="font-display text-sm tracking-[0.02em] text-ink">ASPHALT</span>
            <span className="label-caps hidden text-slate sm:inline">Collection</span>
          </a>
          <nav className="flex items-center gap-6">
            <a
              href="#catalog"
              className="label-caps text-slate transition-colors hover:text-silver-bright"
            >
              Catalog
            </a>
            <span className="font-mono text-[0.6875rem] text-titanium-light tabular-nums">
              06 / Models
            </span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <VehicleImage
            src={heroImage}
            alt="Silver sports coupe in profile on wet asphalt at night"
            loading="eager"
            className="animate-hero h-full w-full [&>img]:object-[70%_center]"
          />
          <div className="absolute inset-0 bg-[image:var(--gradient-hero-fade)]" />
          <div className="absolute inset-0 bg-[image:var(--gradient-hero-floor)]" />
        </div>

        <div className="mx-auto flex min-h-[min(88svh,760px)] max-w-7xl flex-col justify-end px-5 pt-28 pb-14 sm:px-8 sm:pb-20 lg:min-h-[min(92svh,820px)]">
          <p className="label-caps animate-rise text-slate" style={delay(150)}>
            <span className="font-mono tracking-normal text-titanium-light">Vol. 01 —</span>{" "}
            Editorial Catalog
          </p>
          <h1
            className="font-display animate-rise mt-5 max-w-3xl text-[clamp(2.75rem,10vw,6.5rem)] text-ink"
            style={delay(250)}
          >
            Precision,
            <br />
            <span className="text-brushed animate-sheen" style={delay(700)}>
              after dark.
            </span>
          </h1>
          <p
            className="animate-rise mt-6 max-w-md text-base leading-relaxed text-slate sm:text-lg"
            style={delay(400)}
          >
            Six benchmark automobiles — coupes, saloons and SUVs — presented as spec plates with
            estimated average market prices.
          </p>
          <div className="animate-rise mt-9 flex flex-wrap items-center gap-5" style={delay(550)}>
            <a
              href="#catalog"
              className="group inline-flex h-12 items-center gap-3 rounded-md bg-primary px-6 text-sm font-bold tracking-wide text-primary-foreground transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-plate-hover)]"
            >
              Explore the catalog
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <span className="label-caps text-titanium-light">From ~{formatPrice(Math.min(...VEHICLES.map((v) => v.priceEur)))}</span>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <main id="catalog" className="mx-auto max-w-7xl scroll-mt-14 px-5 pt-12 pb-20 sm:px-8 sm:pt-16">
        <div
          className="animate-rise flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          style={delay(650)}
        >
          <div>
            <p className="label-caps text-titanium-light">The line-up</p>
            <h2 className="font-display mt-2 text-4xl text-ink sm:text-5xl">Catalog</h2>
          </div>
          <div
            role="group"
            aria-label="Filter by category"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                data-active={filter === f}
                aria-pressed={filter === f}
                onClick={() => {
                  setFilter(f);
                  setExpandedId(null);
                }}
                className="filter-pill label-caps shrink-0 cursor-pointer rounded-full px-4 py-2.5"
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="hairline mt-8 mb-8" />

        <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {vehicles.map((v, i) => (
            <div key={v.id} className="reveal-on-scroll">
              <div className="animate-rise" style={delay(750 + i * 90)}>
                <VehicleCard
                  vehicle={v}
                  index={VEHICLES.indexOf(v)}
                  expanded={expandedId === v.id}
                  onToggle={() => setExpandedId((cur) => (cur === v.id ? null : v.id))}
                />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-titanium/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="font-display text-xs tracking-[0.02em] text-slate">ASPHALT COLLECTION</span>
          <p className="max-w-xl text-xs leading-relaxed text-titanium-light">
            A frontend portfolio project. Prices are approximate average market values and vary
            with year, mileage, condition and spec.
          </p>
        </div>
      </footer>
    </div>
  );
}
