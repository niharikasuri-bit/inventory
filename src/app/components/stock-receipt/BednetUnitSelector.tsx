import { CheckCircle2 } from "lucide-react";

// Bednets can be counted individually or in bales.
export const BEDNETS_PER_BALE = 50;
export type BednetUnit = "Bednets" | "Bales";

// True when a resource supports the Bednets/Bales unit choice.
export function isBednetsResource(name: string): boolean {
  return name.trim().toLowerCase() === "bednets";
}

// Convert a value between Bednets and Bales, keeping it equivalent.
export function convertBednetValue(value: string, from: BednetUnit, to: BednetUnit): string {
  if (from === to || value.trim() === "") return value;
  const num = Number(value);
  if (!Number.isFinite(num)) return value;
  const inBednets = from === "Bales" ? num * BEDNETS_PER_BALE : num;
  const converted = to === "Bales" ? inBednets / BEDNETS_PER_BALE : inBednets;
  return Number.isInteger(converted) ? String(converted) : converted.toFixed(2);
}

// Convert a value in the selected unit to base Bednets units.
export function toBednetsBase(value: number, unit: BednetUnit): number {
  return unit === "Bales" ? value * BEDNETS_PER_BALE : value;
}

// Singular noun for a unit — used for the selector options ("Bednet", "Bale").
const SINGULAR: Record<BednetUnit, string> = { Bednets: "Bednet", Bales: "Bale" };

// Format a quantity with the correct singular/plural unit noun,
// e.g. formatBednetQty(1, "Bales") -> "1 Bale", formatBednetQty(5, "Bales") -> "5 Bales".
export function formatBednetQty(count: number, unit: BednetUnit): string {
  const noun = Math.abs(count) === 1 ? SINGULAR[unit] : unit;
  return `${count.toLocaleString()} ${noun}`;
}

type BednetUnitSelectorProps = {
  value: BednetUnit;
  onChange: (unit: BednetUnit) => void;
};

// Shared unit-of-measurement picker used across every Bednets quantity flow.
export function BednetUnitSelector({ value, onChange }: BednetUnitSelectorProps) {
  return (
    <div className="bg-[#fafafa] border border-[#d6d5d4] rounded-[4px] p-[16px] flex flex-col gap-[10px]">
      <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "16px", color: "#0b4b66" }}>
        Unit of measurement
      </span>
      <div className="flex gap-[12px]">
        {(["Bednets", "Bales"] as BednetUnit[]).map((u) => {
          const active = value === u;
          return (
            <button
              key={u}
              type="button"
              onClick={() => onChange(u)}
              className="flex-1 flex items-center justify-center gap-[8px] h-[40px] rounded-[4px]"
              style={{
                background: active ? "#fbeee8" : "#ffffff",
                border: `1px solid ${active ? "#c84c0e" : "#d6d5d4"}`,
              }}
            >
              {active && <CheckCircle2 className="size-[16px] text-[#c84c0e]" strokeWidth={2.5} />}
              <span
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: active ? 700 : 400,
                  fontSize: active ? "16px" : "14px",
                  color: active ? "#c84c0e" : "#505a5f",
                }}
              >
                {SINGULAR[u]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
