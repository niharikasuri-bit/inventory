import { useState } from "react";
import { QrCode, Check, CheckCircle2, RefreshCw } from "lucide-react";
import type { Transaction, Resource } from "./data";
import { AppHeader } from "./AppHeader";
import svgPaths from "../../../imports/PopUps/svg-xur5gyju8k";

type ScanResourcesScreenProps = {
  transaction: Transaction;
  resource: Resource;
  onBack: () => void;
  onSubmit: (resourceId: string, receivedBase?: number) => void;
};

export function ScanResourcesScreen({ transaction, resource, onBack, onSubmit }: ScanResourcesScreenProps) {
  const [showScanner, setShowScanner] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [scannedCount, setScannedCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const hasScanned = scannedCount > 0;

  const openScanner = () => {
    setScanned(false);
    setShowScanner(true);
  };

  // Capture the current scan and return to the Confirm Receipt screen.
  const captureScan = () => {
    setScannedCount((c) => c + 1);
    setShowScanner(false);
    setScanned(false);
  };

  // Confirm receipt after scanning — record the expected quantity as received.
  const handleConfirm = () => {
    if (!hasScanned) return;
    onSubmit(resource.id, resource.quantity);
  };

  // Confirm without scanning — record the expected quantity as received.
  const handleSkipAndConfirm = () => {
    onSubmit(resource.id, resource.quantity);
  };

  // ---- QR scanner overlay ----
  if (showScanner) {
    return (
      <div className="flex flex-col h-full bg-[#eee]">
        <AppHeader onBack={() => setShowScanner(false)} />
        <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[24px]">
          <div className="bg-white rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)] p-[16px] flex flex-col gap-[16px]">
            <div className="flex items-center gap-[8px]">
              <QrCode className="size-[32px] text-[#00703c]" strokeWidth={2} />
              <span
                style={{
                  fontFamily: "'Roboto Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "28px",
                  color: "#0b4b66",
                }}
              >
                Scan QR Code
              </span>
            </div>

            <div className="bg-[#deefff] rounded-[6px] px-[12px] py-[8px] flex flex-col gap-[2px]">
              <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "12px", color: "#363636" }}>
                {transaction.id}
              </span>
              <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "18px", color: "#0b4b66" }}>
                {resource.name}
              </span>
            </div>

            <p style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px", color: "#505a5f", textAlign: "center" }}>
              {scanned ? "QR code scanned successfully." : `Point the camera at the resource QR code.`}
            </p>

            {/* Scanner viewport */}
            <div className="relative mx-auto w-[240px] h-[240px] rounded-[12px] bg-[#0b0c0c] overflow-hidden">
              <span className="absolute top-[16px] left-[16px] w-[40px] h-[40px] border-t-[3px] border-l-[3px] border-white rounded-tl-[8px]" />
              <span className="absolute top-[16px] right-[16px] w-[40px] h-[40px] border-t-[3px] border-r-[3px] border-white rounded-tr-[8px]" />
              <span className="absolute bottom-[16px] left-[16px] w-[40px] h-[40px] border-b-[3px] border-l-[3px] border-white rounded-bl-[8px]" />
              <span className="absolute bottom-[16px] right-[16px] w-[40px] h-[40px] border-b-[3px] border-r-[3px] border-white rounded-br-[8px]" />

              {scanned ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex items-center justify-center size-[72px] rounded-full bg-[#00703c]">
                    <Check className="size-[40px] text-white" strokeWidth={3} />
                  </span>
                </div>
              ) : (
                <>
                  <QrCode className="absolute inset-0 m-auto size-[100px] text-white/25" strokeWidth={1} />
                  <span
                    className="absolute left-[16px] right-[16px] h-[2px] bg-[#00703c] shadow-[0px_0px_8px_2px_rgba(0,112,60,0.7)]"
                    style={{ animation: "scan 2s ease-in-out infinite" }}
                  />
                </>
              )}
            </div>

            {!scanned ? (
              <button
                type="button"
                onClick={() => setScanned(true)}
                className="mx-auto flex items-center justify-center gap-[6px] h-[40px] px-[24px] bg-white border border-[#c84c0e] rounded-[6px]"
                style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "16px", color: "#c84c0e" }}
              >
                <QrCode className="size-[20px]" strokeWidth={2} />
                Scan QR Code
              </button>
            ) : (
              <div className="flex items-center justify-center gap-[10px]">
                <button
                  type="button"
                  onClick={() => setScanned(false)}
                  className="flex items-center justify-center gap-[6px] h-[40px] px-[20px] bg-white border border-[#c84c0e] rounded-[6px]"
                  style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "16px", color: "#c84c0e" }}
                >
                  <RefreshCw className="size-[18px]" strokeWidth={2} />
                  Rescan
                </button>
                <button
                  type="button"
                  onClick={captureScan}
                  className="flex items-center justify-center gap-[6px] h-[40px] px-[24px] bg-[#00703c] rounded-[6px]"
                  style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "16px", color: "#ffffff" }}
                >
                  <Check className="size-[18px]" strokeWidth={2.5} />
                  Add Scan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---- Confirm Receipt form ----
  return (
    <div className="relative flex flex-col h-full bg-[#eee]">
      <AppHeader onBack={onBack} />

      <div className="flex-1 overflow-y-auto px-[16px] pt-[8px] pb-[24px]">
        <div className="bg-white rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)] p-[16px] flex flex-col gap-[16px]">
          {/* Title */}
          <div className="flex items-center gap-[8px]">
            <CheckCircle2 className="size-[32px] text-[#00703c]" strokeWidth={2} />
            <span
              style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "28px",
                color: "#0b4b66",
              }}
            >
              Confirm Receipt
            </span>
          </div>

          {/* Resource tag */}
          <div className="bg-[#deefff] rounded-[6px] px-[12px] py-[8px] flex flex-col gap-[2px]">
            <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "12px", color: "#363636" }}>
              {transaction.id}
            </span>
            <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "18px", color: "#0b4b66" }}>
              {resource.name}
            </span>
          </div>

          {/* Quantity Expected — frozen/read-only */}
          <label className="flex flex-col gap-[4px]">
            <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", color: "#0b0c0c" }}>
              Quantity Expected
            </span>
            <input
              type="number"
              value={resource.quantity}
              readOnly
              aria-readonly="true"
              tabIndex={-1}
              className="border border-[#d6d5d4] bg-[#f2f2f2] rounded-[2px] px-[8px] py-[6px] outline-none cursor-not-allowed"
              style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", color: "#0b0c0c" }}
            />
          </label>

          {/* Scan CTA / scan summary */}
          {scannedCount === 0 ? (
            <button
              type="button"
              onClick={openScanner}
              className="self-start flex items-center justify-center gap-[6px] h-[38px] px-[18px] bg-white border border-[#c84c0e] rounded-[6px]"
              style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "15px", color: "#c84c0e" }}
            >
              <QrCode className="size-[18px]" strokeWidth={2} />
              Scan Resources
            </button>
          ) : (
            <>
              {/* Scan summary */}
              <div className="flex items-stretch rounded-[8px] overflow-hidden border border-[#00703c]">
                <div className="w-[4px] shrink-0 bg-[#00703c]" />
                <div className="flex-1 min-w-px bg-[#f1fff8] flex flex-col gap-[8px] p-[16px]">
                  <p
                    className="[word-break:break-word]"
                    style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "16px", lineHeight: 1.14, color: "#00703c" }}
                  >
                    {scannedCount} Resource{scannedCount === 1 ? "" : "s"} Scanned
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={openScanner}
                className="self-start flex items-center justify-center gap-[6px] h-[38px] px-[18px] bg-white border border-[#c84c0e] rounded-[6px]"
                style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "15px", color: "#c84c0e" }}
              >
                <QrCode className="size-[18px]" strokeWidth={2} />
                Continue Scanning
              </button>
            </>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="shrink-0 bg-white p-[16px]">
        <button
          type="button"
          onClick={() => hasScanned ? setShowPopup(true) : handleSkipAndConfirm()}
          className="w-full flex items-center justify-center px-[24px] py-[8px] capitalize rounded-[4px]"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 500,
            fontSize: "19px",
            lineHeight: "24px",
            color: "#ffffff",
            background: "#c84c0e",
          }}
        >
          Confirm Receipt
        </button>
      </div>

      {/* Stock Quantity Mismatch popup */}
      {showPopup && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 px-[24px]">
          <div className="relative w-full bg-white rounded-[12px] shadow-[0px_1px_1px_rgba(0,0,0,0.16)] flex flex-col gap-[16px] p-[16px]">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="absolute top-[14px] right-[11px] size-[24px] flex items-center justify-center"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d={svgPaths.p2404b080} fill="#363636" />
              </svg>
            </button>

            {/* Icon + text */}
            <div className="flex flex-col gap-[16px] items-center text-center w-full">
              {/* Warning triangle */}
              <div className="size-[48px] relative shrink-0">
                <svg width="44" height="38" viewBox="0 0 44 38" fill="none" className="absolute inset-0 w-full h-full">
                  <path d={svgPaths.pb11c000} fill="#B91900" />
                </svg>
              </div>
              <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "24px", color: "#0b4b66", lineHeight: 1.14 }}>
                Stock Quantity Mismatch
              </p>
              <p style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "16px", color: "#363636", lineHeight: 1.4 }}>
                The quantity scanned does not match the expected quantity. Please review the quantities before confirming receipt.
              </p>
            </div>

            {/* Actions */}
            <button
              type="button"
              onClick={() => { setShowPopup(false); handleSkipAndConfirm(); }}
              className="w-full h-[40px] flex items-center justify-center rounded-[6px] bg-[#c84c0e]"
              style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "20px", color: "#ffffff", lineHeight: 1.14 }}
            >
              Confirm Receipt
            </button>
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="w-full h-[40px] flex items-center justify-center rounded-[6px] bg-white border border-[#c84c0e]"
              style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "20px", color: "#c84c0e", lineHeight: 1.14 }}
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
