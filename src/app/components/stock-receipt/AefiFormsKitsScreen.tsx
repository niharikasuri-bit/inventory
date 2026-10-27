import { useState } from "react";
import { Calendar } from "lucide-react";
import { AppHeader } from "./AppHeader";

type AefiFormsKitsScreenProps = {
  onBack: () => void;
  onSubmit: () => void;
};

// The user's current location — AEFI forms and kits are recorded against it (read-only).
const CURRENT_LOCATION = "Ondo State Facility";

type YesNo = "yes" | "no" | "";

// The four AEFI indicators, worded as in the requirement. A Yes opens a quantity field.
const QUESTIONS = [
  { key: "formAvailable", label: "Is an AEFI form available?", qtyLabel: "Quantity available" },
  { key: "formUsed", label: "Has an AEFI form been used?", qtyLabel: "Quantity used" },
  { key: "kitAvailable", label: "Is an AEFI kit (adrenaline) available?", qtyLabel: "Quantity available" },
  { key: "kitUsed", label: "Has an AEFI kit (adrenaline) been used?", qtyLabel: "Quantity used" },
] as const;

type QuestionKey = (typeof QUESTIONS)[number]["key"];

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

// Radio option row.
function Radio({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button type="button" onClick={onChange} className="flex items-center gap-[10px] py-[4px]">
      <span
        className="size-[20px] shrink-0 rounded-full border flex items-center justify-center"
        style={{ borderColor: checked ? "#c84c0e" : "#787878", borderWidth: checked ? 2 : 1 }}
      >
        {checked && <span className="size-[10px] rounded-full bg-[#c84c0e]" />}
      </span>
      <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", color: "#0b0c0c" }}>{label}</span>
    </button>
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

const isPositiveWhole = (v: string) => /^\d+$/.test(v.trim()) && Number(v) > 0;

export function AefiFormsKitsScreen({ onBack, onSubmit }: AefiFormsKitsScreenProps) {
  const [answers, setAnswers] = useState<Record<QuestionKey, YesNo>>({
    formAvailable: "",
    formUsed: "",
    kitAvailable: "",
    kitUsed: "",
  });
  const [quantities, setQuantities] = useState<Record<QuestionKey, string>>({
    formAvailable: "",
    formUsed: "",
    kitAvailable: "",
    kitUsed: "",
  });

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Choosing No closes the quantity field and clears it, so a No never carries a quantity.
  const answer = (key: QuestionKey, value: YesNo) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (value === "no") setQuantities((prev) => ({ ...prev, [key]: "" }));
  };

  // Every question answered; every Yes has a whole-number quantity of 1 or more.
  const valid = QUESTIONS.every(
    (q) => answers[q.key] === "no" || (answers[q.key] === "yes" && isPositiveWhole(quantities[q.key])),
  );

  return (
    <div className="flex flex-col h-full bg-[#eee]">
      <AppHeader title="Record AEFI Forms and Kits" onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[24px] flex flex-col gap-[16px]">
        <div className="bg-white rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)] p-[16px] flex flex-col gap-[16px]">
          <SectionHeading>AEFI Forms and Kits Details</SectionHeading>

          {/* Date (read-only) */}
          <label className="flex flex-col gap-[4px]">
            <span style={labelStyle}>Date</span>
            <div className="flex items-center gap-[8px] bg-[#fafafa] border border-[#d6d5d4] rounded-[2px] px-[10px] py-[8px]">
              <Calendar className="size-[16px] text-[#505a5f] shrink-0" strokeWidth={2} />
              <span style={inputStyle}>{today}</span>
            </div>
          </label>

          {/* Location — auto-filled from the current location, read-only */}
          <label className="flex flex-col gap-[4px]">
            <span style={labelStyle}>Location</span>
            <input
              type="text"
              value={CURRENT_LOCATION}
              readOnly
              aria-readonly="true"
              tabIndex={-1}
              className="border border-[#d6d5d4] bg-[#f2f2f2] rounded-[2px] px-[10px] py-[8px] outline-none cursor-not-allowed"
              style={inputStyle}
            />
          </label>
        </div>

        {/* The four AEFI questions; a divider separates the form pair from the kit pair */}
        <div className="bg-white rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)] p-[16px] flex flex-col gap-[16px]">
          {QUESTIONS.map((q, i) => (
            <div key={q.key} className="flex flex-col gap-[16px]">
              {i === 2 && <div className="h-px bg-[#d6d5d4]" />}
              <div className="flex flex-col gap-[4px]" role="radiogroup" aria-label={q.label}>
                <span style={labelStyle}>
                  {q.label}
                  <Required />
                </span>
                <div className="flex flex-col">
                  <Radio label="Yes" checked={answers[q.key] === "yes"} onChange={() => answer(q.key, "yes")} />
                  <Radio label="No" checked={answers[q.key] === "no"} onChange={() => answer(q.key, "no")} />
                </div>
              </div>

              {answers[q.key] === "yes" && (
                <label className="flex flex-col gap-[4px] bg-[#eee] rounded-[4px] p-[12px]">
                  <span style={labelStyle}>
                    {q.qtyLabel}
                    <Required />
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    step={1}
                    value={quantities[q.key]}
                    onChange={(e) => setQuantities((prev) => ({ ...prev, [q.key]: e.target.value }))}
                    placeholder="0"
                    className={inputClass}
                    style={inputStyle}
                  />
                </label>
              )}
            </div>
          ))}
        </div>
      </div>

      <PrimaryButton label="Submit" disabled={!valid} onClick={onSubmit} />
    </div>
  );
}
