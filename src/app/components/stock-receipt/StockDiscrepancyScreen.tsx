import { useState } from "react";
import { Check, Clock } from "lucide-react";
import IconsInfo from "../../../imports/IconsInfo";
import { AppHeader } from "./AppHeader";
import { type BednetUnit, convertBednetValue, BEDNETS_PER_BALE } from "./BednetUnitSelector";
import { DiscrepancyTag } from "./DiscrepancyTag";

type StockDiscrepancyScreenProps = {
  onBack: () => void;
  onSubmit: () => void;
};

type DiscrepancyTransaction = {
  id: string;
  receivedFrom: string;
  receivedOn: string;
  receivedTime: string;
  adminUnit: string;
  teamCode: string;
  resources: string[];
};

const TRANSACTIONS: DiscrepancyTransaction[] = [
  {
    id: "TXN-6486482",
    receivedFrom: "Ondo State Facility",
    receivedOn: "25 Jul 2022",
    receivedTime: "10:45",
    adminUnit: "Akure North",
    teamCode: "TM-014",
    resources: ["Bednets", "Mosquito Nets", "Insecticide Bottles"],
  },
  {
    id: "TXN-6486510",
    receivedFrom: "Lagos Central Warehouse",
    receivedOn: "24 Jul 2022",
    receivedTime: "16:20",
    adminUnit: "Ikeja",
    teamCode: "TM-021",
    resources: ["Bednets", "Test Kits"],
  },
  {
    id: "TXN-6486233",
    receivedFrom: "Kano Distribution Center",
    receivedOn: "20 Jul 2022",
    receivedTime: "08:05",
    adminUnit: "Nassarawa",
    teamCode: "TM-008",
    resources: ["Insecticide Bottles"],
  },
];

// Predefined unit per resource; Bednets is user-selectable.
const RESOURCE_UNITS: Record<string, string> = {
  "Mosquito Nets": "Nets",
  "Insecticide Bottles": "Bottles",
  "Test Kits": "Kits",
};

// System-recorded expected quantity per resource (base units). Auto-filled and
// read-only on the discrepancy form.
const EXPECTED_QUANTITIES: Record<string, number> = {
  Bednets: 500,
  "Mosquito Nets": 300,
  "Insecticide Bottles": 150,
  "Test Kits": 200,
};

const labelStyle = { fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "14px", color: "#0b0c0c" };
const inputClass =
  "bg-white border border-[#505a5f] rounded-[2px] px-[10px] py-[8px] outline-none focus:border-[#0b4b66]";
const inputStyle = { fontFamily: "Roboto, sans-serif", fontSize: "16px", color: "#0b0c0c" };

function Required() {
  return <span style={{ color: "#b91900" }}> *</span>;
}

function SectionHeading({ children }: { children: string }) {
  return (
    <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "18px", color: "#0b4b66" }}>
      {children}
    </span>
  );
}

function PrimaryButton({ label, disabled, onClick }: { label: string; disabled?: boolean; onClick: () => void }) {
  return (
    <div className="shrink-0 bg-white p-[16px]">
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className="w-full flex items-center justify-center px-[24px] py-[8px] capitalize rounded-[4px]"
        style={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 500,
          fontSize: "19px",
          lineHeight: "24px",
          color: "#ffffff",
          background: disabled ? "#d6a48c" : "#c84c0e",
        }}
      >
        {label}
      </button>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-[8px]">
      <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px", color: "#787878" }}>{label}</span>
      <span
        className="text-right"
        style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "13px", color: "#0b0c0c" }}
      >
        {value}
      </span>
    </div>
  );
}

type Step = "transaction" | "resource" | "details";

export function StockDiscrepancyScreen({ onBack, onSubmit }: StockDiscrepancyScreenProps) {
  const [step, setStep] = useState<Step>("transaction");
  const [txnId, setTxnId] = useState<string | null>(null);
  // Multi-select: one or more resources can have a discrepancy.
  const [selected, setSelected] = useState<string[]>([]);
  // Per-resource details.
  const [units, setUnits] = useState<Record<string, BednetUnit>>({});
  const [actualMap, setActualMap] = useState<Record<string, string>>({});

  const transaction = TRANSACTIONS.find((t) => t.id === txnId) ?? null;

  const isBednetsResource = (r: string) => r.toLowerCase() === "bednets";
  const unitFor = (r: string): BednetUnit => units[r] ?? "Bednets";
  const unitLabelFor = (r: string) =>
    isBednetsResource(r) ? unitFor(r) : RESOURCE_UNITS[r] ?? "units";

  // Expected quantity auto-filled from the system record, shown in the resource's
  // currently selected unit.
  const expectedFor = (r: string): number => {
    const base = EXPECTED_QUANTITIES[r] ?? 0;
    return isBednetsResource(r) && unitFor(r) === "Bales" ? base / BEDNETS_PER_BALE : base;
  };

  // Select a transaction and advance in one action (per-card "Select" CTA).
  const selectAndContinue = (t: DiscrepancyTransaction) => {
    setTxnId(t.id);
    setUnits({});
    setActualMap({});
    if (t.resources.length === 1) {
      setSelected([t.resources[0]]);
      setStep("details");
    } else {
      setSelected([]);
      setStep("resource");
    }
  };

  const toggleResource = (r: string) => {
    setSelected((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]));
  };

  // Switch unit for a resource, converting the actual quantity so the comparison stays valid.
  const changeUnit = (r: string, next: BednetUnit) => {
    const prev = unitFor(r);
    setActualMap((m) => ({ ...m, [r]: convertBednetValue(m[r] ?? "", prev, next) }));
    setUnits((u) => ({ ...u, [r]: next }));
  };

  const diffFor = (r: string): number | null => {
    const act = actualMap[r]?.trim() === "" || actualMap[r] == null ? null : Number(actualMap[r]);
    if (act == null || !Number.isFinite(act)) return null;
    return act - expectedFor(r);
  };

  // True when a value is entered that exactly matches the expected quantity —
  // there is no discrepancy to report in that case.
  const equalsExpected = (r: string) => {
    const diff = diffFor(r);
    return diff != null && diff === 0;
  };

  const resourceValid = (r: string) => {
    const act = actualMap[r]?.trim() === "" || actualMap[r] == null ? null : Number(actualMap[r]);
    return act != null && Number.isFinite(act) && act >= 0 && !equalsExpected(r);
  };

  const detailsValid = selected.length > 0 && selected.every(resourceValid);

  // ---- Step 1: Select Transaction ----
  if (step === "transaction") {
    return (
      <div className="flex flex-col h-full bg-[#eee]">
        <AppHeader title="Select Transaction" onBack={onBack} />
        <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[24px] flex flex-col gap-[12px]">
          <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "14px", color: "#505a5f" }}>
            Select the transaction for which the discrepancy is being reported.
          </span>

          {/* Semantic list so the transactions are announced as a group. */}
          <ul className="list-none m-0 p-0 flex flex-col gap-[12px]">
            {TRANSACTIONS.map((t) => (
              <li
                key={t.id}
                className="relative overflow-hidden bg-white rounded-[12px] border border-[#e5e5e5] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.10)] flex flex-col gap-[14px] p-[16px]"
              >
                {/* Timestamp strip */}
                <div className="-mx-[16px] -mt-[16px]">
                  <div className="w-full flex items-center gap-[6px] px-[16px] py-[6px] bg-[#fafafa]">
                    <Clock className="size-[15px] text-[#787878] shrink-0" strokeWidth={2} />
                    <span className="whitespace-nowrap" style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px", color: "#787878" }}>
                      Received on {t.receivedOn} | {t.receivedTime}
                    </span>
                  </div>
                  <div className="border-b border-[#e5e5e5]" />
                </div>

                {/* Transaction ID */}
                <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "17px", lineHeight: 1.2, color: "#0b4b66" }}>
                  {t.id}
                </span>

                {/* Facility */}
                <div className="bg-[#edf6ff] border border-[#d3e6f8] rounded-[8px] px-[12px] py-[10px]">
                  <div className="flex flex-col gap-[3px]">
                    <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#505a5f" }}>
                      Issued from
                    </span>
                    <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "14px", color: "#0b4b66" }}>
                      {t.receivedFrom}
                    </span>
                  </div>
                </div>

                {/* Resource manifest */}
                <div className="bg-[#fafafa] border border-[#e5e5e5] rounded-[8px] w-full overflow-hidden">
                  <div className="flex items-center justify-between gap-[8px] px-[14px] py-[8px] bg-[#f2f2f2] border-b border-[#e5e5e5]">
                    <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#505a5f" }}>Resources Received</span>
                    <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#505a5f" }}>Qty</span>
                  </div>
                  <div className="flex flex-col px-[14px]">
                    {t.resources.map((name, i) => (
                      <div key={name} className={`py-[10px] flex items-baseline justify-between gap-[16px] w-full ${i > 0 ? "border-t border-[#e5e5e5]" : ""}`}>
                        <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "14px", lineHeight: 1.4, color: "#505a5f" }}>{name}</span>
                        <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "14px", lineHeight: 1.4, color: "#0b0c0c", fontVariantNumeric: "tabular-nums" }}>
                          {(EXPECTED_QUANTITIES[name] ?? 0).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => selectAndContinue(t)}
                  className="w-full flex items-center justify-center px-[24px] py-[5px] rounded-[4px] bg-[#c84c0e] active:opacity-90"
                  style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "16px", lineHeight: "24px", color: "#ffffff" }}
                >
                  Report Discrepancy
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // ---- Step 2: Select Resource(s) — multi-select ----
  if (step === "resource" && transaction) {
    return (
      <div className="flex flex-col h-full bg-[#eee]">
        <AppHeader title="Select Resource" onBack={() => setStep("transaction")} />
        <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[24px]">
          <div className="bg-white rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)] p-[16px] flex flex-col gap-[8px]">
            <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "18px", color: "#0b0c0c" }}>
              Select the resource(s) with discrepancy
            </span>
            <div className="flex flex-col">
              {transaction.resources.map((r) => {
                const checked = selected.includes(r);
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => toggleResource(r)}
                    aria-pressed={checked}
                    className="flex items-center gap-[12px] py-[12px] border-b border-[#eeeeee] text-left"
                  >
                    <span
                      className="size-[20px] shrink-0 rounded-[4px] border flex items-center justify-center"
                      style={{
                        borderColor: checked ? "#c84c0e" : "#787878",
                        borderWidth: checked ? 2 : 1,
                        background: checked ? "#c84c0e" : "#ffffff",
                      }}
                    >
                      {checked && <Check className="size-[14px] text-white" strokeWidth={3} />}
                    </span>
                    <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", color: "#0b0c0c" }}>{r}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <PrimaryButton label="Continue" disabled={selected.length === 0} onClick={() => setStep("details")} />
      </div>
    );
  }

  // ---- Step 3: Report Stock Discrepancy — one card per selected resource ----
  return (
    <div className="flex flex-col h-full bg-[#eee]">
      <AppHeader
        title="Report Stock Discrepancy"
        onBack={() => setStep(transaction && transaction.resources.length > 1 ? "resource" : "transaction")}
      />
      <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[24px] flex flex-col gap-[16px]">
        {selected.map((r) => {
          const unitLabel = unitLabelFor(r);
          const diff = diffFor(r);
          return (
            <div
              key={r}
              className="bg-white rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)] p-[16px] flex flex-col gap-[16px]"
            >
              <SectionHeading>{r}</SectionHeading>

              {/* Expected Quantity — auto-filled from the system record, read-only */}
              <label className="flex flex-col gap-[4px]">
                <span style={labelStyle}>
                  Expected Quantity ({unitLabel})
                </span>
                <input
                  type="number"
                  value={expectedFor(r)}
                  readOnly
                  aria-readonly="true"
                  tabIndex={-1}
                  className="border border-[#d6d5d4] bg-[#f2f2f2] rounded-[2px] px-[10px] py-[8px] outline-none cursor-not-allowed"
                  style={inputStyle}
                />
                <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "12px", color: "#505a5f" }}>
                  Received: {expectedFor(r).toLocaleString()} {unitLabel}
                </span>
              </label>

              {/* Actual Quantity Received */}
              <label className="flex flex-col gap-[4px]">
                <span style={labelStyle}>
                  Actual Quantity Received ({unitLabel})<Required />
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={actualMap[r] ?? ""}
                  onChange={(e) => setActualMap((m) => ({ ...m, [r]: e.target.value }))}
                  placeholder="0"
                  className={`${inputClass} ${equalsExpected(r) ? "!border-[#b91900]" : ""}`}
                  style={inputStyle}
                  aria-invalid={equalsExpected(r)}
                />
                {equalsExpected(r) ? (
                  <span className="flex items-start gap-[4px]" style={{ fontFamily: "Roboto, sans-serif", fontSize: "12px", color: "#b91900" }}>
                    <div className="size-[13px] shrink-0 mt-[1px]"><IconsInfo /></div>
                    Received quantity must be greater or less than the expected quantity to report a discrepancy.
                  </span>
                ) : (
                  <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "12px", color: "#505a5f" }}>
                    Enter the quantity that was actually received.
                  </span>
                )}
              </label>

              {/* Discrepancy — auto-calculated, shown with the shared tag */}
              {diff != null && diff !== 0 && <DiscrepancyTag diff={diff} unit={unitLabel} />}
            </div>
          );
        })}
      </div>

      <PrimaryButton label="Submit" disabled={!detailsValid} onClick={onSubmit} />
    </div>
  );
}
