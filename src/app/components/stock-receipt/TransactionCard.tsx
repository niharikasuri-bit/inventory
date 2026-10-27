import type { CSSProperties } from "react";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";
import type { Transaction, Resource } from "./data";

type TransactionCardProps = {
  transaction: Transaction;
  onOpen: (id: string) => void;
};

// Left accent strip colour, signalling the outcome at a glance.
const accentColor: Record<Transaction["status"], string | null> = {
  pending: null,
  confirmed: "#00703c",
  discrepancy: "#b91900",
};

function OutcomeTag({ status }: { status: Transaction["status"] }) {
  const config =
    status === "confirmed"
      ? { bg: "#f1fff8", fg: "#00703c", Icon: CheckCircle2, label: "Confirmed" }
      : status === "discrepancy"
        ? { bg: "#fff5f4", fg: "#b91900", Icon: AlertCircle, label: "Discrepancy" }
        : null;
  if (!config) return null;

  const { bg, fg, Icon, label } = config;
  return (
    <div
      className="inline-flex items-center gap-[5px] px-[8px] py-[3px] rounded-[999px] shrink-0"
      style={{ background: bg, border: `1px solid ${fg}` }}
    >
      <Icon className="size-[13px] shrink-0" strokeWidth={2.5} style={{ color: fg }} />
      <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "12px", color: fg }}>{label}</span>
    </div>
  );
}

// Shared style for the manifest column headers.
const headerCellStyle: CSSProperties = {
  fontFamily: "Roboto, sans-serif",
  fontWeight: 700,
  fontSize: "11px",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "#505a5f",
};

// One row of the resource manifest: name on the left, quantity on the right.
// Resources with a reported discrepancy are called out in red.
function ResourceRow({ resource }: { resource: Resource }) {
  const hasDiscrepancy = resource.status === "discrepancy";
  // Show what was actually received once the resource has been processed.
  const qty = resource.received ?? resource.quantity;

  return (
    <div className="flex items-baseline justify-between gap-[16px] w-full">
      <span
        className="[word-break:break-word]"
        style={{
          fontFamily: "Roboto, sans-serif",
          fontSize: "14px",
          lineHeight: 1.4,
          color: hasDiscrepancy ? "#b91900" : "#505a5f",
        }}
      >
        {resource.name}
      </span>
      <span
        className="shrink-0 text-right whitespace-nowrap"
        style={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 700,
          fontSize: "14px",
          lineHeight: 1.4,
          color: hasDiscrepancy ? "#b91900" : "#0b0c0c",
        }}
      >
        <span style={{ fontVariantNumeric: "tabular-nums" }}>{qty.toLocaleString()}</span>
      </span>
    </div>
  );
}

export function TransactionCard({ transaction, onOpen }: TransactionCardProps) {
  const isPending = transaction.status === "pending";
  const accent = accentColor[transaction.status];
  // Keep the card compact — the full manifest lives on the details screen.
  const visibleResources = transaction.resources.slice(0, 3);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(transaction.id)}
      onKeyDown={(e) => e.key === "Enter" && onOpen(transaction.id)}
      className="relative overflow-hidden bg-white rounded-[12px] border border-[#e5e5e5] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.10)] flex flex-col gap-[14px] p-[16px] text-left active:bg-[#fbfbfb] cursor-pointer"
      style={accent ? { paddingLeft: "22px" } : undefined}
    >
      {accent && <span className="absolute left-0 top-0 bottom-0 w-[6px]" style={{ background: accent }} />}

      {/* Timestamp — top of card, full-bleed */}
      <div className="-mx-[16px] -mt-[16px]" style={accent ? { marginLeft: "-22px" } : undefined}>
        <div
          className="w-full flex items-center gap-[6px] px-[16px] py-[6px] bg-[#fafafa]"
          style={accent ? { paddingLeft: "22px" } : undefined}
        >
          <Clock className="size-[15px] text-[#787878] shrink-0" strokeWidth={2} />
          <span
            className="whitespace-nowrap"
            style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px", color: "#787878" }}
          >
            {isPending ? "Issued on" : "Received on"} {transaction.received}
            {transaction.receivedTime ? ` | ${transaction.receivedTime}` : ""}
          </span>
        </div>
        <div className="border-b border-[#e5e5e5]" />
      </div>

      {/* Reference + status */}
      <div className="flex items-center justify-between gap-[10px] w-full">
        <span
          className="[word-break:break-word] min-w-px"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "17px", lineHeight: 1.2, color: "#0b4b66" }}
        >
          {transaction.id}
        </span>
        {!isPending && <OutcomeTag status={transaction.status} />}
      </div>

      {/* Sending facility */}
      <div className="bg-[#edf6ff] border border-[#d3e6f8] rounded-[8px] px-[12px] py-[10px] flex items-start w-full">
        <div className="flex flex-col gap-[3px] min-w-px">
          <span
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 700,
              fontSize: "10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              lineHeight: 1.3,
              color: "#505a5f",
            }}
          >
            Issued from
          </span>
          <span
            className="[word-break:break-word]"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "14px", lineHeight: 1.3, color: "#0b4b66" }}
          >
            {transaction.from}
          </span>
        </div>
      </div>

      {/* Resource manifest */}
      <div className="bg-[#fafafa] border border-[#e5e5e5] rounded-[8px] w-full overflow-hidden">
        <div className="flex items-center justify-between gap-[8px] px-[14px] py-[8px] bg-[#f2f2f2] border-b border-[#e5e5e5]">
          <span style={headerCellStyle}>{isPending ? "Resources Issued" : "Resources Received"}</span>
          <span style={headerCellStyle}>Qty</span>
        </div>
        <div className="flex flex-col px-[14px]">
          {visibleResources.map((r, i) => (
            <div
              key={r.id}
              className={`py-[10px] ${i > 0 ? "border-t border-[#e5e5e5]" : ""}`}
            >
              <ResourceRow resource={r} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      {isPending ? (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onOpen(transaction.id); }}
          className="w-full flex items-center justify-center px-[24px] py-[5px] rounded-[4px] bg-[#c84c0e] active:opacity-90"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "16px", lineHeight: "24px", color: "#ffffff" }}
        >
          Receive Stock
        </button>
      ) : (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onOpen(transaction.id); }}
          className="w-full flex items-center justify-center px-[24px] py-[5px] rounded-[4px] bg-[#c84c0e] active:opacity-90"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "16px", lineHeight: "24px", color: "#ffffff" }}
        >
          View Receipt
        </button>
      )}

    </div>
  );
}
