import porsche911 from "@/assets/porsche-911.jpg";
import mercedesSClass from "@/assets/mercedes-s-class.jpg";
import rangeRoverSport from "@/assets/range-rover-sport.jpg";
import bmwM5 from "@/assets/bmw-m5.jpg";
import rollsRoyceCullinan from "@/assets/rolls-royce-cullinan.jpg";
import bentleyContinentalGt from "@/assets/bentley-continental-gt.jpg";

export const CATEGORIES = ["Coupe & GT", "Executive Sedan", "Luxury SUV", "Performance"] as const;
export type Category = (typeof CATEGORIES)[number];
export type CategoryFilter = Category | "All";

export interface VehicleSpec {
  label: string;
  value: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  generation?: string;
  category: Category;
  /** Estimated average market price in EUR. */
  priceEur: number;
  description: string;
  /** Reference variant the specs below describe. */
  variant: string;
  specs: VehicleSpec[];
  image: string;
}

export const VEHICLES: Vehicle[] = [
  {
    id: "porsche-911",
    make: "Porsche",
    model: "911",
    generation: "992",
    category: "Coupe & GT",
    priceEur: 155_000,
    description:
      "Iconic rear-engine sports coupe balancing daily usability with sharp track-ready precision, crisp steering feel, and timeless silhouette.",
    variant: "Carrera",
    specs: [
      { label: "Engine", value: "3.0 L twin-turbo flat-six" },
      { label: "Power", value: "394 PS" },
      { label: "0–100 km/h", value: "4.1 s" },
      { label: "Top speed", value: "294 km/h" },
      { label: "Drive", value: "Rear-wheel" },
    ],
    image: porsche911,
  },
  {
    id: "mercedes-s-class",
    make: "Mercedes-Benz",
    model: "S-Class",
    generation: "W223",
    category: "Executive Sedan",
    priceEur: 135_000,
    description:
      "Flagship full-size sedan centered on rear-seat comfort, acoustic calm, refined materials, and effortless long-haul composure.",
    variant: "S 500 4MATIC",
    specs: [
      { label: "Engine", value: "3.0 L I6 mild hybrid" },
      { label: "Power", value: "435 PS" },
      { label: "0–100 km/h", value: "4.9 s" },
      { label: "Top speed", value: "250 km/h" },
      { label: "Drive", value: "All-wheel" },
    ],
    image: mercedesSClass,
  },
  {
    id: "range-rover-sport",
    make: "Range Rover",
    model: "Sport",
    category: "Luxury SUV",
    priceEur: 115_000,
    description:
      "Athletic luxury SUV combining upscale lounge comfort, confident road manners, and capable all-terrain poise.",
    variant: "P400",
    specs: [
      { label: "Engine", value: "3.0 L I6 mild hybrid" },
      { label: "Power", value: "400 PS" },
      { label: "0–100 km/h", value: "5.9 s" },
      { label: "Top speed", value: "242 km/h" },
      { label: "Drive", value: "All-wheel" },
    ],
    image: rangeRoverSport,
  },
  {
    id: "bmw-m5",
    make: "BMW",
    model: "M5",
    generation: "G90",
    category: "Performance",
    priceEur: 145_000,
    description:
      "High-output performance super sedan blending everyday practicality with aggressive M dynamics and strong acceleration.",
    variant: "M5 Sedan",
    specs: [
      { label: "Engine", value: "4.4 L V8 plug-in hybrid" },
      { label: "Power", value: "727 PS" },
      { label: "0–100 km/h", value: "3.5 s" },
      { label: "Top speed", value: "250 km/h" },
      { label: "Drive", value: "M xDrive" },
    ],
    image: bmwM5,
  },
  {
    id: "rolls-royce-cullinan",
    make: "Rolls-Royce",
    model: "Cullinan",
    category: "Luxury SUV",
    priceEur: 380_000,
    description:
      "Ultra-luxury high-bodied SUV defined by commanding presence, bespoke craftsmanship, and effortless ride comfort.",
    variant: "Cullinan",
    specs: [
      { label: "Engine", value: "6.75 L twin-turbo V12" },
      { label: "Power", value: "571 PS" },
      { label: "0–100 km/h", value: "5.2 s" },
      { label: "Top speed", value: "250 km/h" },
      { label: "Drive", value: "All-wheel" },
    ],
    image: rollsRoyceCullinan,
  },
  {
    id: "bentley-continental-gt",
    make: "Bentley",
    model: "Continental GT",
    category: "Coupe & GT",
    priceEur: 240_000,
    description:
      "Grand tourer pairing handcrafted cabin luxury and strong power for smooth, confident long-distance travel.",
    variant: "V8",
    specs: [
      { label: "Engine", value: "4.0 L twin-turbo V8" },
      { label: "Power", value: "550 PS" },
      { label: "0–100 km/h", value: "4.0 s" },
      { label: "Top speed", value: "318 km/h" },
      { label: "Drive", value: "All-wheel" },
    ],
    image: bentleyContinentalGt,
  },
];

const priceFormatter = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

/** Formats an estimated price as e.g. "€155,000". */
export function formatPrice(eur: number): string {
  return priceFormatter.format(eur);
}

export function filterVehicles(vehicles: Vehicle[], filter: CategoryFilter): Vehicle[] {
  return filter === "All" ? vehicles : vehicles.filter((v) => v.category === filter);
}
