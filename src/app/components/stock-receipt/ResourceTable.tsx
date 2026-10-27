import type { Resource } from "./data";
import { differenceLabel } from "./data";

type ResourceTableProps = {
  resources: Resource[];
  /**
   * "simple"   -> Resource / Quantity (used in the Pending tab & pending details)
   * "received" -> Resource / Expected / Received (used across the Received tab),
   *               highlighting rows where the received quantity differs.
   */
  variant?: "simple" | "received";
};

export function ResourceTable({ resources, variant = "simple" }: ResourceTableProps) {
  if (variant === "received") {
    return (
      <div className="rounded-[4px] border border-[#d6d5d4] overflow-hidden">
        <div
          className="flex bg-[#fafafa] px-[12px] py-[8px]"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "12px", color: "#0b0c0c" }}
        >
          <span className="flex-1 min-w-0">Resource</span>
          <span className="w-[72px] text-right">Expected</span>
          <span className="w-[72px] text-right">Received</span>
        </div>
        {resources.map((r, i) => {
          const hasDiff = differenceLabel(r).hasDiff;
          return (
            <div
              key={r.id}
              className="flex px-[12px] py-[8px] items-center"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "12px",
                color: "#0b0c0c",
                background: hasDiff ? "#fff5f4" : i % 2 === 0 ? "#ffffff" : "#eeeeee",
              }}
            >
              <span
                className="flex-1"
                style={{ fontWeight: hasDiff ? 700 : 400, color: hasDiff ? "#b91900" : "#0b0c0c" }}
              >
                {r.name}
              </span>
              <span className="w-[72px] text-right">{r.quantity}</span>
              <span
                className="w-[72px] text-right"
                style={{ fontWeight: hasDiff ? 700 : 400, color: hasDiff ? "#b91900" : "#0b0c0c" }}
              >
                {r.received ?? r.quantity}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="rounded-[4px] border border-[#d6d5d4] overflow-hidden">
      <div
        className="flex bg-[#fafafa] px-[12px] py-[8px]"
        style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "12px", color: "#0b0c0c" }}
      >
        <span className="flex-1 min-w-0">Resource</span>
        <span className="w-[72px] text-right">Quantity</span>
      </div>
      {resources.map((r, i) => (
        <div
          key={r.id}
          className="flex px-[12px] py-[8px]"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "12px",
            color: "#0b0c0c",
            background: i % 2 === 0 ? "#ffffff" : "#eeeeee",
          }}
        >
          <span className="flex-1">{r.name}</span>
          <span className="w-[72px] text-right">{r.quantity}</span>
        </div>
      ))}
    </div>
  );
}
