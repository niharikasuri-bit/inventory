import { useState } from "react";
import { X } from "lucide-react";
import { AppHeader } from "./AppHeader";
import { ResourceMultiSelect } from "./ResourceMultiSelect";

type StockIssueScreenProps = {
  onBack: () => void;
  onSubmit: () => void;
};

// Recipients the stock can be issued to.
const RECIPIENTS = [
  "Ondo State Facility",
  "Lagos Central Warehouse",
  "Kano Distribution Center",
  "Abuja Regional Store",
];

// The user's current location — stock is always issued from here (read-only).
const CURRENT_LOCATION = "Ondo State Facility";

// Available stock per resource (base units).
const RESOURCES: { name: string; available: number }[] = [
  { name: "Bednets", available: 5000 },
  { name: "Mosquito Nets", available: 1200 },
  { name: "Insecticide Bottles", available: 340 },
  { name: "Test Kits", available: 800 },
  { name: "AEFI Forms", available: 100 },
  { name: "AEFI Kits (adrenaline)", available: 10 },
];

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

// Radio option row.
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

function PrimaryButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
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

export function StockIssueScreen({ onBack, onSubmit }: StockIssueScreenProps) {
  const [step, setStep] = useState<"details" | "shipment">("details");

  // Issued From is auto-filled and read-only.
  const issuedFrom = CURRENT_LOCATION;
  const [issuedTo, setIssuedTo] = useState("");
  // Multi-select resources and their per-resource quantities.
  const [selected, setSelected] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [vehicle, setVehicle] = useState<"yes" | "no" | "">("");

  // Comments are shared so they survive Yes/No switches.
  const [comments, setComments] = useState("");

  // Shipment details — preserved even when the user goes back.
  const [waybill, setWaybill] = useState("");
  const [waybillCount, setWaybillCount] = useState("");
  const [transportType, setTransportType] = useState("");
  const [transportId, setTransportId] = useState("");

  const availableFor = (name: string) => RESOURCES.find((r) => r.name === name)?.available ?? null;

  // Whether a resource's entered quantity is a valid, in-stock positive number.
  const qtyValid = (name: string) => {
    const raw = quantities[name];
    const n = raw == null || raw.trim() === "" ? null : Number(raw);
    const avail = availableFor(name);
    return n != null && Number.isFinite(n) && n > 0 && (avail == null || n <= avail);
  };
  const exceedsStock = (name: string) => {
    const raw = quantities[name];
    const n = raw == null || raw.trim() === "" ? null : Number(raw);
    const avail = availableFor(name);
    return n != null && Number.isFinite(n) && avail != null && n > avail;
  };

  // Progressive disclosure: each field unlocks the next, and changing a field
  // resets every dependent field below it.
  const toggleResource = (name: string) => {
    setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
    setQuantities((q) => {
      const next = { ...q };
      delete next[name];
      return next;
    });
    setIssuedTo("");
    setVehicle("");
  };

  const changeQuantity = (name: string, v: string) => {
    setQuantities((q) => ({ ...q, [name]: v }));
    // Any change to quantities invalidates downstream selections.
    setIssuedTo("");
    setVehicle("");
  };

  const changeIssuedTo = (v: string) => {
    setIssuedTo(v);
    setVehicle("");
  };

  // Field-level enablement (top-to-bottom progressive disclosure).
  const resourceEnabled = issuedFrom !== "";
  const allQtyFilled = selected.length > 0 && selected.every(qtyValid);
  const issuedToEnabled = resourceEnabled && allQtyFilled;
  const vehicleEnabled = issuedToEnabled && issuedTo !== "";

  const detailsValid =
    issuedFrom !== "" &&
    issuedTo !== "" &&
    selected.length > 0 &&
    selected.every(qtyValid) &&
    vehicle !== "";

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

  // ---- Stock Issue Details (single form) ----
  return (
    <div className="flex flex-col h-full bg-[#eee]">
      <AppHeader title="Record Stock Issue" onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[24px]">
        <div className="bg-white rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)] p-[16px] flex flex-col gap-[16px]">
          <SectionHeading>Stock Issue Details</SectionHeading>

          {/* Issued From — auto-filled from the current location, read-only */}
          <label className="flex flex-col gap-[4px]">
            <span style={labelStyle}>Issued From</span>
            <input
              type="text"
              value={issuedFrom}
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
            <ResourceMultiSelect
              options={RESOURCES.map((r) => r.name)}
              selected={selected}
              onToggle={toggleResource}
            />
          </div>

          {/* Per-resource quantity cards */}
          {selected.map((name) => {
            const avail = availableFor(name);
            const over = exceedsStock(name);
            return (
              <div
                key={name}
                className="bg-white border border-[#d6d5d4] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)] p-[16px] flex flex-col gap-[10px]"
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

                <label className="flex flex-col gap-[4px]">
                  <span style={labelStyle}>
                    Quantity to Issue<Required />
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    value={quantities[name] ?? ""}
                    onChange={(e) => changeQuantity(name, e.target.value)}
                    placeholder="0"
                    className={`${inputClass} ${over ? "!border-[#b91900]" : ""}`}
                    style={inputStyle}
                    aria-invalid={over}
                  />
                  {avail != null && !over && (
                    <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "12px", color: "#505a5f" }}>
                      Available stock: {avail.toLocaleString()} units
                    </span>
                  )}
                  {over && avail != null && (
                    <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "12px", color: "#b91900" }}>
                      You can issue a maximum of {avail.toLocaleString()} units.
                    </span>
                  )}
                </label>
              </div>
            );
          })}

          {/* Issued To */}
          <label className="flex flex-col gap-[4px]">
            <span style={{ ...labelStyle, color: issuedToEnabled ? "#0b0c0c" : "#787878" }}>
              Issued To<Required />
            </span>
            <select
              value={issuedTo}
              onChange={(e) => changeIssuedTo(e.target.value)}
              disabled={!issuedToEnabled}
              className={fieldClass(issuedToEnabled)}
              style={inputStyle}
            >
              <option value="">Select recipient</option>
              {RECIPIENTS.map((r) => (
                <option key={r} value={r}>
                  {r}
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
