import { useState } from "react";
import { Check, Clock } from "lucide-react";
import IconsInfo from "../../../imports/IconsInfo";
import { AppHeader } from "./AppHeader";
import { BednetUnitSelector, type BednetUnit, isBednetsResource, convertBednetValue, BEDNETS_PER_BALE } from "./BednetUnitSelector";

type StockDamagedScreenProps = {
  onBack: () => void;
  onSubmit: () => void;
};

type DamageTransaction = {
  id: string;
  receivedFrom: string;
  receivedOn: string;
  receivedTime: string;
  adminUnit: string;
  teamCode: string;
  resources: string[];
};

// Transactions available to report damage against.
const TRANSACTIONS: DamageTransaction[] = [
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

const DAMAGE_STAGES = ["Transit", "Storage"] as const;
type DamageStage = (typeof DAMAGE_STAGES)[number];

// Available quantity per resource (base unit: Bednets for Bednets resource).
const AVAILABLE_QUANTITIES: Record<string, number> = {
  Bednets: 5000,
  "Mosquito Nets": 1200,
  "Insecticide Bottles": 340,
  "Test Kits": 800,
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

export function StockDamagedScreen({ onBack, onSubmit }: StockDamagedScreenProps) {
  const [step, setStep] = useState<Step>("transaction");
  const [txnId, setTxnId] = useState<string | null>(null);
  const [selectedResources, setSelectedResources] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [stages, setStages] = useState<Record<string, DamageStage | "">>({});
  // Per-resource Bednets unit (Bednets resources only).
  const [units, setUnits] = useState<Record<string, BednetUnit>>({});

  const unitFor = (name: string): BednetUnit => units[name] ?? "Bednets";
  const changeUnit = (name: string, next: BednetUnit) => {
    const prev = unitFor(name);
    setQuantities((q) => ({ ...q, [name]: convertBednetValue(q[name] ?? "", prev, next) }));
    setUnits((u) => ({ ...u, [name]: next }));
  };

  const transaction = TRANSACTIONS.find((t) => t.id === txnId) ?? null;

  // Select a transaction and advance in one action (per-card "Select" CTA).
  const selectAndContinue = (t: DamageTransaction) => {
    setTxnId(t.id);
    setQuantities({});
    setStages({});
    // Single-resource transactions skip the resource-selection step.
    if (t.resources.length === 1) {
      setSelectedResources({ [t.resources[0]]: true });
      setStep("details");
    } else {
      setSelectedResources({});
      setStep("resource");
    }
  };

  const toggleResource = (name: string) =>
    setSelectedResources((p) => ({ ...p, [name]: !p[name] }));

  const chosenResources = transaction?.resources.filter((r) => selectedResources[r]) ?? [];

  // Available quantity for a resource, expressed in the currently selected unit.
  const availableFor = (name: string): number => {
    const base = AVAILABLE_QUANTITIES[name] ?? 0;
    return isBednetsResource(name) && unitFor(name) === "Bales" ? base / BEDNETS_PER_BALE : base;
  };

  // True when the entered damaged quantity exceeds what is available.
  const exceedsAvailable = (name: string): boolean => {
    const q = quantities[name];
    if (q == null || q.trim() === "") return false;
    const n = Number(q);
    return Number.isFinite(n) && n > availableFor(name);
  };

  const detailsValid =
    chosenResources.length > 0 &&
    chosenResources.every((r) => {
      const q = quantities[r];
      return q != null && q.trim() !== "" && Number(q) > 0 && !exceedsAvailable(r) && stages[r];
    });

  // ---- Step 1: Select Transaction ----
  if (step === "transaction") {
    return (
      <div className="flex flex-col h-full bg-[#eee]">
        <AppHeader title="Select Transaction" onBack={onBack} />
        <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[24px] flex flex-col gap-[12px]">
          <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "14px", color: "#505a5f" }}>
            Select the transaction for which damage is being reported.
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
                          {(AVAILABLE_QUANTITIES[name] ?? 0).toLocaleString()}
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
                  Report Damage
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // ---- Step 2: Select Resource(s) with Damage (multiple resources only) ----
  if (step === "resource" && transaction) {
    const hasSelection = chosenResources.length > 0;
    return (
      <div className="flex flex-col h-full bg-[#eee]">
        <AppHeader title="Report Stock Damage" onBack={() => setStep("transaction")} />
        <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[24px]">
          <div className="bg-white rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)] p-[16px] flex flex-col gap-[8px]">
            <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "18px", color: "#0b0c0c" }}>
              Select the resource(s) with damage
            </span>
            <div className="flex flex-col">
              {transaction.resources.map((r) => {
                const checked = !!selectedResources[r];
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => toggleResource(r)}
                    className="flex items-center gap-[12px] py-[12px] border-b border-[#eeeeee] text-left"
                  >
                    <span
                      className="size-[22px] shrink-0 rounded-[4px] border flex items-center justify-center"
                      style={{
                        borderColor: checked ? "#c84c0e" : "#787878",
                        background: checked ? "#c84c0e" : "transparent",
                      }}
                    >
                      {checked && <Check className="size-[16px] text-white" strokeWidth={3} />}
                    </span>
                    <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", color: "#0b0c0c" }}>{r}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <PrimaryButton label="Continue" disabled={!hasSelection} onClick={() => setStep("details")} />
      </div>
    );
  }

  // ---- Step 3: Damaged Stock Details ----
  return (
    <div className="flex flex-col h-full bg-[#eee]">
      <AppHeader
        title="Report Stock Damage"
        onBack={() => setStep(transaction && transaction.resources.length > 1 ? "resource" : "transaction")}
      />
      <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[24px] flex flex-col gap-[16px]">
        {chosenResources.map((r) => (
          <div
            key={r}
            className="bg-white rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)] p-[16px] flex flex-col gap-[16px]"
          >
            <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "18px", color: "#0b4b66" }}>
              {r}
            </span>

            {/* Quantity Damaged */}
            <label className="flex flex-col gap-[4px]">
              <span style={labelStyle}>
                Quantity Damaged{isBednetsResource(r) ? ` (${unitFor(r)})` : ""}
                <Required />
              </span>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                value={quantities[r] ?? ""}
                onChange={(e) => setQuantities((p) => ({ ...p, [r]: e.target.value }))}
                placeholder="0"
                className={`${inputClass} ${exceedsAvailable(r) ? "!border-[#b91900]" : ""}`}
                style={inputStyle}
                aria-invalid={exceedsAvailable(r)}
              />
              {exceedsAvailable(r) ? (
                <span className="flex items-start gap-[4px]" style={{ fontFamily: "Roboto, sans-serif", fontSize: "12px", color: "#b91900" }}>
                  <div className="size-[13px] shrink-0 mt-[1px]"><IconsInfo /></div>
                  Damaged quantity cannot exceed the received quantity ({availableFor(r).toLocaleString()}
                  {isBednetsResource(r) ? ` ${unitFor(r)}` : ""}).
                </span>
              ) : (
                <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "12px", color: "#505a5f" }}>
                  Received: {availableFor(r).toLocaleString()}
                  {isBednetsResource(r) ? ` ${unitFor(r)}` : ""}
                </span>
              )}
            </label>

            {/* Damaged During */}
            <label className="flex flex-col gap-[4px]">
              <span style={labelStyle}>
                Damaged During<Required />
              </span>
              <select
                value={stages[r] ?? ""}
                onChange={(e) => setStages((p) => ({ ...p, [r]: e.target.value as DamageStage }))}
                className={inputClass}
                style={inputStyle}
              >
                <option value="">Select stage</option>
                {DAMAGE_STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))}
      </div>

      <PrimaryButton label="Submit" disabled={!detailsValid} onClick={onSubmit} />
    </div>
  );
}
