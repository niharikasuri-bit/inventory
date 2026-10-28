import { useState } from "react";
import { Calendar, Warehouse, Package } from "lucide-react";
import { AppHeader } from "./AppHeader";
import { DiscrepancyTag } from "./DiscrepancyTag";
import {
  type BednetUnit,
  isBednetsResource,
  toBednetsBase,
  BEDNETS_PER_BALE,
} from "./BednetUnitSelector";

type StockReconciliationScreenProps = {
  onBack: () => void;
  onSubmit: () => void;
};

const WAREHOUSES = [
  "Ondo State Facility",
  "Lagos Central Warehouse",
  "Kano Distribution Center",
  "Abuja Regional Store",
];

// System-recorded movement per product (base units). Stock on hand is derived.
type ProductLedger = {
  name: string;
  received: number;
  issued: number;
  returned: number;
  lost: number;
  damaged: number;
};

const PRODUCTS: ProductLedger[] = [
  { name: "Bednets", received: 540, issued: 296, returned: 30, lost: 5, damaged: 3 },
  { name: "Mosquito Nets", received: 320, issued: 180, returned: 12, lost: 2, damaged: 4 },
  { name: "Insecticide Bottles", received: 210, issued: 90, returned: 8, lost: 1, damaged: 2 },
  { name: "Test Kits", received: 400, issued: 260, returned: 20, lost: 0, damaged: 6 },
];

const stockOnHand = (p: ProductLedger) => p.received - p.issued + p.returned - p.lost - p.damaged;

const labelStyle = { fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "14px", color: "#0b0c0c" };
const inputClass =
  "bg-white border border-[#505a5f] rounded-[2px] px-[10px] py-[8px] outline-none focus:border-[#0b4b66]";
const inputStyle = { fontFamily: "Roboto, sans-serif", fontSize: "16px", color: "#0b0c0c" };

function Required() {
  return <span style={{ color: "#b91900" }}> *</span>;
}
function Optional() {
  return <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "12px", color: "#505a5f" }}> (optional)</span>;
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

// Reuse the product's light-blue info tag styling from the receipt cards.
function InfoTag({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="bg-[#deefff] inline-flex items-center gap-[6px] px-[10px] py-[4px] rounded-[6px]">
      {icon}
      <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "12px", color: "#0b4b66" }}>
        {value}
      </span>
    </div>
  );
}

function LedgerRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div
      className="flex items-center justify-between py-[6px]"
      style={last ? undefined : { borderBottom: "1px solid rgba(214,213,212,0.6)" }}
    >
      <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "14px", color: "#505a5f" }}>{label}</span>
      <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "14px", color: "#0b0c0c" }}>
        {value}
      </span>
    </div>
  );
}

type Step = "select" | "reconcile";

export function StockReconciliationScreen({ onBack, onSubmit }: StockReconciliationScreenProps) {
  const [step, setStep] = useState<Step>("select");
  const [warehouse, setWarehouse] = useState("");
  const [productName, setProductName] = useState("");
  const [bednetUnit, setBednetUnit] = useState<BednetUnit>("Bednets");
  const [count, setCount] = useState("");
  const [comment, setComment] = useState("");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const product = PRODUCTS.find((p) => p.name === productName) ?? null;
  const isBednets = isBednetsResource(productName);
  const onHand = product ? stockOnHand(product) : 0; // base units

  const changeProduct = (name: string) => {
    setProductName(name);
    setBednetUnit("Bednets");
    setCount("");
  };

  const selectValid = warehouse !== "" && productName !== "";

  const countNum = count.trim() === "" ? null : Number(count);
  const countValid = countNum != null && Number.isFinite(countNum) && countNum >= 0;
  const countInBase = countValid && isBednets ? toBednetsBase(countNum!, bednetUnit) : countNum;

  // Difference between physical count and system-recorded stock on hand (base units).
  const diff = countInBase != null ? countInBase - onHand : null;
  const hasDiscrepancy = diff != null && diff !== 0;
  // Signed difference in the selected unit, e.g. "-148 Bednets" / "+3 Bales".
  const diffInUnit = diff != null && isBednets && bednetUnit === "Bales" ? diff / BEDNETS_PER_BALE : diff;
  const singularNoun = bednetUnit === "Bales" ? "Bale" : "Bednet";
  const discrepancyNoun = isBednets
    ? Math.abs(diffInUnit ?? 0) === 1
      ? singularNoun
      : bednetUnit
    : productName;

  // ---- Step 1: Select warehouse & product ----
  if (step === "select") {
    return (
      <div className="flex flex-col h-full bg-[#eee]">
        <AppHeader title="Stock Reconciliation" onBack={onBack} />

        <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[24px]">
          <div className="bg-white rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)] p-[16px] flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[4px]">
              <SectionHeading>Stock Reconciliation</SectionHeading>
              <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px", color: "#505a5f" }}>
                Choose the warehouse and product you want to count.
              </span>
            </div>

            {/* Date (read-only) */}
            <label className="flex flex-col gap-[4px]">
              <span style={labelStyle}>Date</span>
              <div className="flex items-center gap-[8px] bg-[#fafafa] border border-[#d6d5d4] rounded-[2px] px-[10px] py-[8px]">
                <Calendar className="size-[16px] text-[#505a5f] shrink-0" strokeWidth={2} />
                <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", color: "#0b0c0c" }}>{today}</span>
              </div>
            </label>

            {/* Warehouse */}
            <label className="flex flex-col gap-[4px]">
              <span style={labelStyle}>
                Select Warehouse<Required />
              </span>
              <select
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
                className={inputClass}
                style={inputStyle}
              >
                <option value="">Choose a warehouse</option>
                {WAREHOUSES.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </label>

            {/* Product */}
            <label className="flex flex-col gap-[4px]">
              <span style={labelStyle}>
                Select Product<Required />
              </span>
              <select
                value={productName}
                onChange={(e) => changeProduct(e.target.value)}
                className={inputClass}
                style={inputStyle}
              >
                <option value="">Choose a product</option>
                {PRODUCTS.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <PrimaryButton label="Continue" disabled={!selectValid} onClick={() => setStep("reconcile")} />
      </div>
    );
  }

  // ---- Step 2: Reconcile stock ----
  return (
    <div className="flex flex-col h-full bg-[#eee]">
      <AppHeader title="Reconcile Stock" onBack={() => setStep("select")} />

      <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[24px] flex flex-col gap-[16px]">
        <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "14px", color: "#505a5f" }}>
          Compare the recorded stock with the physical stock count and report any difference.
        </span>

        {/* Selection tags */}
        <div className="flex flex-wrap gap-[8px]">
          <InfoTag icon={<Warehouse className="size-[13px] text-[#0b4b66]" strokeWidth={2} />} value={warehouse} />
          <InfoTag icon={<Package className="size-[13px] text-[#0b4b66]" strokeWidth={2} />} value={productName} />
        </div>

        {/* System-recorded ledger */}
        {product && (
          <div className="bg-[#fafafa] border border-[#d6d5d4] rounded-[8px] p-[16px] flex flex-col">
            <LedgerRow label="Stock Received" value={product.received.toLocaleString()} />
            <LedgerRow label="Stock Issued" value={product.issued.toLocaleString()} />
            <LedgerRow label="Returned Stock" value={product.returned.toLocaleString()} />
            <LedgerRow label="Stock Lost" value={product.lost.toLocaleString()} />
            <LedgerRow label="Stock Damaged" value={product.damaged.toLocaleString()} last />

            <div className="h-px bg-[#d6d5d4] my-[12px]" />

            <div className="bg-[rgba(11,75,102,0.05)] rounded-[8px] p-[12px] flex flex-col gap-[8px]">
              <div className="flex items-center justify-between gap-[8px]">
                <div className="flex flex-col">
                  <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "14px", color: "#0b0c0c" }}>
                    Stock on Hand
                  </span>
                  <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "12px", color: "#787878" }}>
                    Current system-recorded balance
                  </span>
                </div>
                <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "28px", color: "#0b4b66" }}>
                  {onHand.toLocaleString()}
                </span>
              </div>

              {/* Transparency: how the balance is calculated, using the exact
                  values shown in the ledger above. Read-only supporting text. */}
              <span
                className="[word-break:break-word]"
                style={{ fontFamily: "Roboto, sans-serif", fontSize: "12px", lineHeight: "1.5", color: "#505a5f" }}
              >
                ({product.received.toLocaleString()} Received + {product.returned.toLocaleString()} Returned) − (
                {product.issued.toLocaleString()} Issued + {product.lost.toLocaleString()} Lost +{" "}
                {product.damaged.toLocaleString()} Damaged) = {onHand.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Manual count */}
        <div className="bg-white rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)] p-[16px] flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[4px]">
            <span style={labelStyle}>
              Manual Stock Count{isBednets ? ` (${bednetUnit})` : ""}
              <Required />
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="Enter quantity"
              className={inputClass}
              style={inputStyle}
            />
          </div>

          {/* Discrepancy tag — shown only when the physical count differs from
              the system stock. Uses the shared DiscrepancyTag component. */}
          {hasDiscrepancy && <DiscrepancyTag diff={diffInUnit!} unit={discrepancyNoun} />}

          {/* Comments — only relevant when there is a discrepancy to explain */}
          {hasDiscrepancy && (
            <label className="flex flex-col gap-[4px]">
              <span style={labelStyle}>
                Comments
                <Optional />
              </span>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment about the discrepancy"
                className={`${inputClass} resize-none`}
                style={inputStyle}
              />
            </label>
          )}
        </div>
      </div>

      <PrimaryButton label="Submit Reconciliation" disabled={!countValid} onClick={onSubmit} />
    </div>
  );
}
