// Shared discrepancy tag — the single source of truth for how a stock
// discrepancy is shown across every Manage Stock flow. Matches the difference
// tag used on the Report Stock Discrepancy screen in the Stock Receipt flow:
// a signed pill, red for a shortfall and green for an overage.
type DiscrepancyTagProps = {
  /** Signed difference (actual − expected). Positive = overage, negative = shortfall. */
  diff: number;
  /** Unit / resource noun shown after the value, e.g. "Bednets". */
  unit: string;
};

export function DiscrepancyTag({ diff, unit }: DiscrepancyTagProps) {
  const negative = diff < 0;
  return (
    <div
      className="self-start inline-flex items-center rounded-[6px] px-[10px] py-[4px]"
      style={{
        background: negative ? "#ffe3e3" : "#ebffe4",
        border: `1px solid ${negative ? "#b91900" : "#00703c"}`,
      }}
    >
      <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "14px", color: "#363636" }}>
        {diff > 0 ? "+" : "-"}
        {Math.abs(diff).toLocaleString()} {unit}
      </span>
    </div>
  );
}
