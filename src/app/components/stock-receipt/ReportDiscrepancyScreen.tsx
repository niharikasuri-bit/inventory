import { useState } from "react";
import { QrCode, AlertTriangle } from "lucide-react";
import IconsInfo from "../../../imports/IconsInfo";
import type { Transaction, Resource } from "./data";
import { AppHeader } from "./AppHeader";
import { DiscrepancyTag } from "./DiscrepancyTag";
import { type BednetUnit, isBednetsResource, toBednetsBase } from "./BednetUnitSelector";

export type ResourceUpdate = { expected: number; received: number };

type ReportDiscrepancyScreenProps = {
  transaction: Transaction;
  resource: Resource;
  onBack: () => void;
  onSubmit: (resourceId: string, update: ResourceUpdate) => void;
};

export function ReportDiscrepancyScreen({
  transaction,
  resource,
  onBack,
  onSubmit,
}: ReportDiscrepancyScreenProps) {
  const isBednets = isBednetsResource(resource.name);
  // Unit is fixed to the resource's base unit; the picker lives in the Return flow only.
  const unit: BednetUnit = "Bednets";

  // Expected is auto-filled from the selected resource and read-only.
  const expected = String(resource.quantity);
  const [received, setReceived] = useState("");
  const [comment, setComment] = useState("");
  const [scanned, setScanned] = useState(false);

  const diff =
    expected.trim() !== "" && received.trim() !== "" && Number.isFinite(Number(received) - Number(expected))
      ? Number(received) - Number(expected)
      : null;

  const handleSubmit = () => {
    // Values are stored in bednets (base unit) regardless of the selected unit.
    const exp = expected.trim() !== "" ? toBednetsBase(Number(expected), unit) : resource.quantity;
    const rec = received.trim() !== "" ? toBednetsBase(Number(received), unit) : exp;
    onSubmit(resource.id, {
      expected: Number.isFinite(exp) ? exp : resource.quantity,
      received: Number.isFinite(rec) ? rec : exp,
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#eee]">
      <AppHeader onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[24px]">
        <div className="bg-white rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)] p-[16px] flex flex-col gap-[16px]">
          {/* Title */}
          <div className="flex items-center gap-[8px]">
            <AlertTriangle className="size-[32px] text-[#b91900]" strokeWidth={2} />
            <span
              style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "28px",
                color: "#0b4b66",
              }}
            >
              Report Discrepancy
            </span>
          </div>

          {/* Resource tag — makes it clear which resource this is about */}
          <div className="bg-[#ffe3e3] rounded-[6px] px-[12px] py-[8px] flex flex-col gap-[2px]">
            <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "12px", color: "#363636" }}>
              {transaction.id} · Reporting an issue with
            </span>
            <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "18px", color: "#b91900" }}>
              {resource.name}
            </span>
          </div>

          {/* Quantity Expected — auto-filled from the selected resource, read-only */}
          <label className="flex flex-col gap-[4px]">
            <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", color: "#0b0c0c" }}>
              Quantity Expected{isBednets ? ` (${unit})` : ""}
            </span>
            <input
              type="number"
              value={expected}
              readOnly
              aria-readonly="true"
              tabIndex={-1}
              className="border border-[#d6d5d4] bg-[#f2f2f2] rounded-[2px] px-[8px] py-[6px] outline-none cursor-not-allowed"
              style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", color: "#0b0c0c" }}
            />
          </label>

          {/* Quantity Received */}
          <label className="flex flex-col gap-[4px]">
            <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", color: "#0b0c0c" }}>
              Quantity Received{isBednets ? ` (${unit})` : ""}
            </span>
            <input
              type="number"
              inputMode="numeric"
              value={received}
              onChange={(e) => setReceived(e.target.value)}
              placeholder="0"
              className={`bg-transparent border rounded-[2px] px-[8px] py-[6px] outline-none focus:border-[#0b4b66] ${diff === 0 ? "border-[#b91900]" : "border-[#505a5f]"}`}
              style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", color: "#0b0c0c" }}
            />
            {diff === 0 && (
              <span className="flex items-start gap-[4px]" style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px", color: "#b91900" }}>
                <div className="size-[13px] shrink-0 mt-[1px]"><IconsInfo /></div>
                Received quantity must be greater or less than the expected quantity to report a discrepancy.
              </span>
            )}
          </label>

          {/* Difference tag */}
          {diff != null && diff !== 0 && <DiscrepancyTag diff={diff} unit={resource.name} />}

          {/* Comment (optional) */}
          <label className="flex flex-col gap-[4px]">
            <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", color: "#0b0c0c" }}>
              Comment <span style={{ color: "#505a5f" }}>(optional)</span>
            </span>
            <textarea
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-transparent border border-[#505a5f] rounded-[2px] px-[8px] py-[6px] outline-none resize-none focus:border-[#0b4b66]"
              style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", color: "#0b0c0c" }}
            />
          </label>

          {/* Scan QR code */}
          <button
            type="button"
            onClick={() => setScanned(true)}
            className="self-start flex items-center justify-center gap-[6px] h-[36px] px-[20px] bg-white border border-[#c84c0e] rounded-[6px]"
            style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "16px", color: "#c84c0e" }}
          >
            <QrCode className="size-[20px]" strokeWidth={2} />
            {scanned ? "QR Scanned ✓" : "Scan QR Code"}
          </button>
        </div>
      </div>

      {/* Submit */}
      <div className="shrink-0 bg-white p-[16px]">
        <button
          type="button"
          disabled={diff === 0}
          onClick={handleSubmit}
          className="w-full flex items-center justify-center px-[24px] py-[8px] capitalize rounded-[4px]"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 500,
            fontSize: "19px",
            lineHeight: "24px",
            color: "#ffffff",
            background: diff === 0 ? "#d6a48c" : "#c84c0e",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
