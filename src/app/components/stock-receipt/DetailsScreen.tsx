import { CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react";
import type { Transaction, Resource } from "./data";
import { AppHeader } from "./AppHeader";

type DetailsScreenProps = {
  transaction: Transaction;
  wasPending: boolean;
  onBack: () => void;
  onConfirm: (resourceId: string) => void;
  onReportDiscrepancy: (resourceId: string) => void;
  onSubmit: (id: string) => void;
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-[2px]">
      <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "12px", color: "#505a5f" }}>{label}</span>
      <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "16px", color: "#0b0c0c" }}>
        {value}
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: Resource["status"] }) {
  const config = {
    pending: { label: "Not Received", bg: "#f2f2f2", border: "#d6d5d4", color: "#505a5f", Icon: null },
    confirmed: { label: "Confirmed", bg: "#ebffe4", border: "#00703c", color: "#00703c", Icon: CheckCircle2 },
    discrepancy: { label: "Discrepancy", bg: "#ffe3e3", border: "#b91900", color: "#b91900", Icon: AlertCircle },
  }[status];
  const Icon = config.Icon;
  return (
    <div
      className="shrink-0 inline-flex items-center gap-[4px] rounded-[999px] px-[10px] py-[3px]"
      style={{ background: config.bg, border: `1px solid ${config.border}` }}
    >
      {Icon && <Icon className="size-[13px]" style={{ color: config.color }} strokeWidth={2.5} />}
      <span
        className="whitespace-nowrap"
        style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "12px", color: config.color }}
      >
        {config.label}
      </span>
    </div>
  );
}

export function DetailsScreen({
  transaction,
  wasPending,
  onBack,
  onConfirm,
  onReportDiscrepancy,
  onSubmit,
}: DetailsScreenProps) {
  const allProcessed = transaction.resources.every((r) => r.status !== "pending");

  return (
    <div className="flex flex-col h-full bg-[#eee]">
      <AppHeader title="Stock Receipt" onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[24px]">
        <div className="flex flex-col gap-[16px]">
          {/* Details card */}
          <div className="bg-white rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)] p-[16px] flex flex-col gap-[16px]">
            <Field label="Transaction ID" value={transaction.id} />
            <Field label="Sending Facility" value={transaction.from} />
            <Field label="Date Received" value={transaction.received} />
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-[10px]">
            <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "18px", color: "#0b4b66" }}>
              Resources
            </span>

            {transaction.resources.map((r) => {
              const processed = r.status !== "pending";
              const received = r.received ?? r.quantity;
              const hasDiff = r.status === "discrepancy" && received !== r.quantity;
              const accentColor = r.status === "confirmed" ? "#00703c" : r.status === "discrepancy" ? "#b91900" : null;

              return (
                <div
                  key={r.id}
                  className="relative overflow-hidden bg-white rounded-[12px] border border-[#e4e4e4] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] flex flex-col"
                  style={accentColor ? { paddingLeft: 0 } : undefined}
                >
                  {/* Left accent strip for processed cards */}
                  {accentColor && (
                    <span className="absolute left-0 top-0 bottom-0 w-[4px]" style={{ background: accentColor }} />
                  )}

                  {/* Card body */}
                  <div className="flex flex-col gap-[12px] p-[14px]" style={accentColor ? { paddingLeft: "18px" } : undefined}>

                    {/* Name + badge */}
                    <div className="flex items-center justify-between gap-[10px]">
                      <span
                        className="min-w-0 truncate"
                        style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "16px", color: "#0b0c0c", lineHeight: 1.2 }}
                      >
                        {r.name}
                      </span>
                      <StatusBadge status={r.status} />
                    </div>

                    {/* Quantity row — side-by-side boxes */}
                    <div className="flex gap-[8px]">
                      {/* Expected */}
                      <div className="flex-1 bg-[#f5f5f5] rounded-[8px] px-[10px] py-[10px] flex flex-col gap-[4px]">
                        <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#787878" }}>
                          Expected
                        </span>
                        <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "15px", lineHeight: 1.2, color: "#0b0c0c", fontVariantNumeric: "tabular-nums" }}>
                          {r.quantity.toLocaleString()}
                        </span>
                      </div>

                      {/* Received — only after processing */}
                      {processed && (
                        <div
                          className="flex-1 rounded-[8px] px-[10px] py-[10px] flex flex-col gap-[4px]"
                          style={{ background: hasDiff ? "#fff5f4" : "#f1fff8" }}
                        >
                          <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#787878" }}>
                            Received
                          </span>
                          <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "15px", lineHeight: 1.2, color: hasDiff ? "#b91900" : "#00703c", fontVariantNumeric: "tabular-nums" }}>
                            {received.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Actions — pending only */}
                    {!processed && (
                      <div className="flex gap-[8px]">
                        <button
                          type="button"
                          onClick={() => onReportDiscrepancy(r.id)}
                          className="flex-1 min-w-0 flex items-center justify-center gap-[5px] h-[40px] px-[8px] rounded-[6px] bg-white border border-[#b91900]"
                          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "13px", color: "#b91900" }}
                        >
                          <AlertTriangle className="size-[14px] shrink-0" strokeWidth={2} />
                          <span className="whitespace-nowrap">Report Discrepancy</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onConfirm(r.id)}
                          className="flex-1 min-w-0 flex items-center justify-center gap-[5px] h-[40px] px-[8px] rounded-[6px] bg-[#00703c]"
                          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "13px", color: "#ffffff" }}
                        >
                          <CheckCircle2 className="size-[14px] shrink-0" strokeWidth={2} />
                          <span className="whitespace-nowrap">Confirm Receipt</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Submit — only shown when this screen was opened to process a pending transaction */}
      {wasPending && (
        <div className="shrink-0 bg-white p-[16px]">
          <button
            type="button"
            disabled={!allProcessed}
            onClick={() => onSubmit(transaction.id)}
            className="w-full flex items-center justify-center px-[24px] py-[8px] capitalize rounded-[4px]"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 500,
              fontSize: "19px",
              lineHeight: "24px",
              color: "#ffffff",
              background: allProcessed ? "#c84c0e" : "#d6a48c",
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
