import { useState } from "react";
import { X } from "lucide-react";
import { AppHeader } from "./AppHeader";
import { ResourceMultiSelect } from "./ResourceMultiSelect";
import {
  BednetUnitSelector,
  type BednetUnit,
  isBednetsResource,
  convertBednetValue,
} from "./BednetUnitSelector";

type StockReturnScreenProps = {
  onBack: () => void;
  onSubmit: () => void;
};

// Sources the stock can be returned from.
const SOURCES = [
  "Ondo State Facility",
  "Lagos Central Warehouse",
  "Kano Distribution Center",
  "Abuja Regional Store",
];

const RESOURCES = ["Bednets", "Mosquito Nets", "Insecticide Bottles", "Test Kits"];

// The user's current location — stock is always returned from here (read-only).
const CURRENT_LOCATION = "Ondo State Facility";

const TRANSPORT_TYPES = ["Truck", "Van", "Motorcycle", "Cycle", "Boat", "Other"];

const labelStyle = { fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "14px", color: "#0b0c0c" };
const inputClass =
  "bg-white border border-[#505a5f] rounded-[2px] px-[10px] py-[8px] outline-none focus:border-[#0b4b66]";
const inputStyle = { fontFamily: "Roboto, sans-serif", fontSize: "16px", color: "#0b0c0c" };

// Enabled vs. disabled field styling for the progressive-disclosure form.
function fieldClass(enabled: boolean) {
  return `border rounded-[2px] px-[10px] py-[8px] outline-none ${
    enabled
      ? "bg-white border-[#505a5f] focus:border-[#0b4b66]"
      : "bg-[#f2f2f2] border-[#d6d5d4] text-[#787878] cursor-not-allowed"
  }`;
}

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

function Radio({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      className={`flex items-center gap-[10px] py-[4px] ${disabled ? "cursor-not-allowed" : ""}`}
    >
      <span
        className="size-[20px] shrink-0 rounded-full border flex items-center justify-center"
        style={{
          borderColor: disabled ? "#d6d5d4" : checked ? "#c84c0e" : "#787878",
          borderWidth: checked ? 2 : 1,
        }}
      >
        {checked && <span className="size-[10px] rounded-full bg-[#c84c0e]" />}
      </span>
      <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", color: disabled ? "#787878" : "#0b0c0c" }}>
        {label}
      </span>
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

export function StockReturnScreen({ onBack, onSubmit }: StockReturnScreenProps) {
  const [step, setStep] = useState<"details" | "shipment">("details");

  // Returned From is auto-filled and read-only.
  const returnedFrom = CURRENT_LOCATION;
  const [returnedTo, setReturnedTo] = useState("");
  // Multi-select resources with per-resource unit and quantity.
  const [selected, setSelected] = useState<string[]>([]);
  const [units, setUnits] = useState<Record<string, BednetUnit>>({});
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [vehicle, setVehicle] = useState<"yes" | "no" | "">("");

  // Comments are shared so they survive Yes/No switches.
  const [comments, setComments] = useState("");

  // Shipment details — preserved even when the user goes back.
  const [waybill, setWaybill] = useState("");
  const [waybillCount, setWaybillCount] = useState("");
  const [transportType, setTransportType] = useState("");
  const [transportId, setTransportId] = useState("");

  const unitFor = (name: string): BednetUnit => units[name] ?? "Bednets";

  const qtyValid = (name: string) => {
    const raw = quantities[name];
    const n = raw == null || raw.trim() === "" ? null : Number(raw);
    return n != null && Number.isFinite(n) && n > 0;
  };

  // Progressive disclosure: each field unlocks the next, and changing a field
  // resets every dependent field below it.
  const toggleResource = (name: string) => {
    setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
    setUnits((u) => {
      const next = { ...u };
      delete next[name];
      return next;
    });
    setQuantities((q) => {
      const next = { ...q };
      delete next[name];
      return next;
    });
    setReturnedTo("");
    setVehicle("");
  };

  // Switch unit and convert the entered quantity so it stays equivalent.
  const changeUnit = (name: string, next: BednetUnit) => {
    const prev = unitFor(name);
    setQuantities((q) => ({ ...q, [name]: convertBednetValue(q[name] ?? "", prev, next) }));
    setUnits((u) => ({ ...u, [name]: next }));
  };

  const changeQuantity = (name: string, v: string) => {
    setQuantities((q) => ({ ...q, [name]: v }));
    setReturnedTo("");
    setVehicle("");
  };

  const changeReturnedTo = (v: string) => {
    setReturnedTo(v);
    setVehicle("");
  };

  // Field-level enablement (top-to-bottom progressive disclosure).
  const resourceEnabled = returnedFrom !== "";
  const allQtyFilled = selected.length > 0 && selected.every(qtyValid);
  const returnedToEnabled = resourceEnabled && allQtyFilled;
  const vehicleEnabled = returnedToEnabled && returnedTo !== "";

  const detailsValid =
    returnedFrom !== "" && selected.length > 0 && selected.every(qtyValid) && returnedTo !== "" && vehicle !== "";

  const shipmentValid = waybill.trim() !== "" && transportType !== "";

  // ---- Shipment / Transport Details (separate screen, only when vehicle = Yes) ----
  if (step === "shipment") {
    return (
      <div className="flex flex-col h-full bg-[#eee]">
        <AppHeader title="Shipment Details" onBack={() => setStep("details")} />

        <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[24px]">
          <div className="bg-white rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)] p-[16px] flex flex-col gap-[16px]">
            <SectionHeading>Shipment / Transport Details</SectionHeading>

            <label className="flex flex-col gap-[4px]">
              <span style={labelStyle}>
                Waybill Number<Required />
              </span>
              <input
                type="text"
                value={waybill}
                onChange={(e) => setWaybill(e.target.value)}
                placeholder="e.g. WB-102938"
                className={inputClass}
                style={inputStyle}
              />
            </label>

            <label className="flex flex-col gap-[4px]">
              <span style={labelStyle}>
                Resources Indicated on Waybill
                <Optional />
              </span>
              <input
                type="number"
                inputMode="numeric"
                value={waybillCount}
                onChange={(e) => setWaybillCount(e.target.value)}
                placeholder="0"
                className={inputClass}
                style={inputStyle}
              />
            </label>

            <label className="flex flex-col gap-[4px]">
              <span style={labelStyle}>
                Type of Transport<Required />
              </span>
              <select
                value={transportType}
                onChange={(e) => setTransportType(e.target.value)}
                className={inputClass}
                style={inputStyle}
              >
                <option value="">Select transport type</option>
                {TRANSPORT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-[4px]">
              <span style={labelStyle}>
                Transport Number / ID
                <Optional />
              </span>
              <input
                type="text"
                value={transportId}
                onChange={(e) => setTransportId(e.target.value)}
                placeholder="e.g. Plate no. or vehicle ID"
                className={inputClass}
                style={inputStyle}
              />
            </label>

            <label className="flex flex-col gap-[4px]">
              <span style={labelStyle}>
                Comments
                <Optional />
              </span>
              <textarea
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Add any additional context"
                className={`${inputClass} resize-none`}
                style={inputStyle}
              />
            </label>
          </div>
        </div>

        <PrimaryButton label="Submit" disabled={!shipmentValid} onClick={onSubmit} />
      </div>
    );
  }

  // ---- Stock Return Details (single form) ----
  return (
    <div className="flex flex-col h-full bg-[#eee]">
      <AppHeader title="Record Stock Return" onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[24px]">
        <div className="bg-white rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)] p-[16px] flex flex-col gap-[16px]">
          <SectionHeading>Stock Return Details</SectionHeading>

          {/* Returned From — auto-filled from the current location, read-only */}
          <label className="flex flex-col gap-[4px]">
            <span style={labelStyle}>Returned From</span>
            <input
              type="text"
              value={returnedFrom}
              readOnly
              aria-readonly="true"
              tabIndex={-1}
              className="border border-[#d6d5d4] bg-[#f2f2f2] rounded-[2px] px-[10px] py-[8px] outline-none cursor-not-allowed"
              style={inputStyle}
            />
          </label>

          {/* Resource — multi-select dropdown */}
          <div className="flex flex-col gap-[4px]">
            <span style={labelStyle}>
              Resource(s)<Required />
            </span>
            <ResourceMultiSelect options={RESOURCES} selected={selected} onToggle={toggleResource} />
          </div>

          {/* Per-resource cards */}
          {selected.map((name) => {
            const isBednets = isBednetsResource(name);
            const unit = unitFor(name);
            return (
              <div
                key={name}
                className="bg-white border border-[#d6d5d4] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)] p-[16px] flex flex-col gap-[12px]"
              >
                <div className="flex items-center justify-between gap-[8px]">
                  <span
                    style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "16px", color: "#0b4b66" }}
                  >
                    {name}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleResource(name)}
                    aria-label={`Remove ${name}`}
                    className="flex items-center justify-center size-[24px] rounded-full hover:bg-[#e5e5e5]"
                  >
                    <X className="size-[18px] text-[#505a5f]" strokeWidth={2} />
                  </button>
                </div>

                {/* Unit of Measurement — Bednets only */}
                {isBednets && <BednetUnitSelector value={unit} onChange={(next) => changeUnit(name, next)} />}

                {/* Quantity to Return */}
                <label className="flex flex-col gap-[4px]">
                  <span style={labelStyle}>
                    Quantity to Return{isBednets ? ` (${unit})` : ""}
                    <Required />
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    value={quantities[name] ?? ""}
                    onChange={(e) => changeQuantity(name, e.target.value)}
                    placeholder="0"
                    className={inputClass}
                    style={inputStyle}
                  />
                </label>
              </div>
            );
          })}

          {/* Returned To */}
          <label className="flex flex-col gap-[4px]">
            <span style={{ ...labelStyle, color: returnedToEnabled ? "#0b0c0c" : "#787878" }}>
              Returned To<Required />
            </span>
            <select
              value={returnedTo}
              onChange={(e) => changeReturnedTo(e.target.value)}
              disabled={!returnedToEnabled}
              className={fieldClass(returnedToEnabled)}
              style={inputStyle}
            >
              <option value="">Select destination</option>
              {SOURCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          {/* Was a vehicle involved? — radio buttons */}
          <div className="flex flex-col gap-[4px]">
            <span style={{ ...labelStyle, color: vehicleEnabled ? "#0b0c0c" : "#787878" }}>
              Was a vehicle involved during the transaction?<Required />
            </span>
            <div className="flex flex-col">
              <Radio
                label="Yes"
                checked={vehicle === "yes"}
                onChange={() => setVehicle("yes")}
                disabled={!vehicleEnabled}
              />
              <Radio
                label="No"
                checked={vehicle === "no"}
                onChange={() => setVehicle("no")}
                disabled={!vehicleEnabled}
              />
            </div>
          </div>

          {/* When no vehicle involved, capture how the stock was transferred */}
          {vehicle === "no" && (
            <label className="flex flex-col gap-[4px]">
              <span style={labelStyle}>
                How was the stock transferred?
                <Optional />
              </span>
              <textarea
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Describe how the stock was transferred"
                className={`${inputClass} resize-none`}
                style={inputStyle}
              />
            </label>
          )}
        </div>
      </div>

      {/* Yes → Continue to shipment screen; No → submit directly */}
      <PrimaryButton
        label={vehicle === "yes" ? "Continue" : "Submit"}
        disabled={!detailsValid}
        onClick={() => (vehicle === "yes" ? setStep("shipment") : onSubmit())}
      />
    </div>
  );
}
