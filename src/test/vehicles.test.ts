import { describe, expect, it } from "vitest";
import { VEHICLES, filterVehicles, formatPrice } from "@/lib/vehicles";

const priceOf = (id: string) => VEHICLES.find((v) => v.id === id)?.priceEur;

describe("vehicle catalog", () => {
  it("lists the six vehicles with their estimated average prices", () => {
    expect(VEHICLES).toHaveLength(6);
    expect(priceOf("porsche-911")).toBe(155_000);
    expect(priceOf("mercedes-s-class")).toBe(135_000);
    expect(priceOf("range-rover-sport")).toBe(115_000);
    expect(priceOf("bmw-m5")).toBe(145_000);
    expect(priceOf("rolls-royce-cullinan")).toBe(380_000);
    expect(priceOf("bentley-continental-gt")).toBe(240_000);
  });

  it("formats prices in euros with thousands separators", () => {
    expect(formatPrice(155_000)).toBe("€155,000");
  });

  it("filters by category", () => {
    expect(filterVehicles(VEHICLES, "Luxury SUV").map((v) => v.id)).toEqual([
      "range-rover-sport",
      "rolls-royce-cullinan",
    ]);
    expect(filterVehicles(VEHICLES, "All")).toHaveLength(6);
  });
});
