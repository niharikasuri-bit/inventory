import { AlertTriangle, Undo2, ShieldAlert, BriefcaseMedical } from "lucide-react";
import Android1575 from "../../../imports/Android1575-1";

type ManageStockScreenProps = {
  onBack: () => void;
  onRecordReceipt: () => void;
  onRecordIssue: () => void;
  onRecordReturn: () => void;
  onRecordDamaged: () => void;
  onReportDiscrepancy: () => void;
  onRecordAefi: () => void;
};

// Renders the imported "Manage Stocks" list and overlays clickable hotspots on
// the Back control and the action cards.
export function ManageStockScreen({
  onBack,
  onRecordReceipt,
  onRecordIssue,
  onRecordReturn,
  onRecordDamaged,
  onReportDiscrepancy,
  onRecordAefi,
}: ManageStockScreenProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#eee]">
      <Android1575 />
      <button
        type="button"
        onClick={onBack}
        aria-label="Back"
        className="absolute left-[8px] top-[68px] w-[90px] h-[28px]"
      />
      <button
        type="button"
        onClick={onRecordReceipt}
        aria-label="Record Stock Receipt"
        className="absolute left-[16px] top-[166px] w-[328px] h-[81px]"
      />
      <button
        type="button"
        onClick={onRecordIssue}
        aria-label="Record Stock Issued"
        className="absolute left-[16px] top-[263px] w-[328px] h-[81px]"
      />
      <button
        type="button"
        onClick={onRecordReturn}
        aria-label="Record Stock Returned"
        className="absolute left-[16px] top-[360px] text-left"
      >
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0 leading-[0]">
          <div className="col-1 h-[81px] ml-0 mt-0 relative row-1 w-[328px]" data-name="Cards / Base Card">
            <div className="absolute bg-white inset-0 rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)]" />
          </div>
          <p
            className="[word-break:break-word] col-1 font-['Roboto:Regular',sans-serif] font-normal leading-[normal] ml-[12px] mt-[41px] relative row-1 text-[#505a5f] text-[12px] w-[300px]"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            Record stock items returned from field teams or distribution points.
          </p>
          <p
            className="[word-break:break-word] col-1 font-['Roboto:Bold',sans-serif] font-bold leading-[normal] ml-[48px] mt-[12px] relative row-1 text-[#0b4b66] text-[18px] whitespace-nowrap"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            Record Stock Returned
          </p>
          <div className="col-1 flex items-center justify-center ml-[12px] mt-[11px] relative row-1 size-[24px]">
            <Undo2 className="size-[24px] text-[#c84c0e]" strokeWidth={2} />
          </div>
        </div>
      </button>

      <button
        type="button"
        onClick={onRecordDamaged}
        aria-label="Record Stock Damaged"
        className="absolute left-[16px] top-[457px] text-left"
      >
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0 leading-[0]">
          <div className="col-1 h-[81px] ml-0 mt-0 relative row-1 w-[328px]" data-name="Cards / Base Card">
            <div className="absolute bg-white inset-0 rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)]" />
          </div>
          <p
            className="[word-break:break-word] col-1 font-['Roboto:Regular',sans-serif] font-normal leading-[normal] ml-[12px] mt-[41px] relative row-1 text-[#505a5f] text-[12px] w-[300px]"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            Record stock items that have been damaged during transit or storage.
          </p>
          <p
            className="[word-break:break-word] col-1 font-['Roboto:Bold',sans-serif] font-bold leading-[normal] ml-[48px] mt-[12px] relative row-1 text-[#0b4b66] text-[18px] whitespace-nowrap"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            Record Stock Damaged
          </p>
          <div className="col-1 flex items-center justify-center ml-[12px] mt-[11px] relative row-1 size-[24px]">
            <ShieldAlert className="size-[24px] text-[#c84c0e]" strokeWidth={2} />
          </div>
        </div>
      </button>

      {/* Replace the 5th card (imported as "Stock Loss") entirely with a
          "Report Stock Discrepancy" card. It reuses the exact "Cards / Base Card"
          markup from the imported frame (Group4–Group8) — same 328×81 base card,
          4px radius, elevation, 24px icon container at 12/11, bold navy title at
          48/12, and muted 12px description at 12/41 — so it is pixel-consistent
          with the other action cards. Covering the full card removes the
          distortion left by the previous partial overlay. */}
      <button
        type="button"
        onClick={onReportDiscrepancy}
        aria-label="Report Stock Discrepancy"
        className="absolute left-[16px] top-[554px] text-left"
      >
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0 leading-[0]">
          <div className="col-1 h-[81px] ml-0 mt-0 relative row-1 w-[328px]" data-name="Cards / Base Card">
            <div
              className="absolute bg-white inset-0 rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)]"
              data-name="Card / Primary"
            />
          </div>
          <p
            className="[word-break:break-word] col-1 font-['Roboto:Regular',sans-serif] font-normal leading-[normal] ml-[12px] mt-[41px] relative row-1 text-[#505a5f] text-[12px] w-[300px]"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            Report a discrepancy between expected and received stock quantities.
          </p>
          <p
            className="[word-break:break-word] col-1 font-['Roboto:Bold',sans-serif] font-bold leading-[normal] ml-[48px] mt-[12px] relative row-1 text-[#0b4b66] text-[18px] whitespace-nowrap"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            Report Stock Discrepancy
          </p>
          <div className="col-1 flex items-center justify-center ml-[12px] mt-[11px] relative row-1 size-[24px]">
            <AlertTriangle className="size-[24px] text-[#c84c0e]" strokeWidth={2} />
          </div>
        </div>
      </button>

      {/* "Record AEFI Forms and Kits" — same base card as the others, one slot below. */}
      <button
        type="button"
        onClick={onRecordAefi}
        aria-label="Record AEFI Forms and Kits"
        className="absolute left-[16px] top-[651px] text-left"
      >
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0 leading-[0]">
          <div className="col-1 h-[81px] ml-0 mt-0 relative row-1 w-[328px]" data-name="Cards / Base Card">
            <div
              className="absolute bg-white inset-0 rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)]"
              data-name="Card / Primary"
            />
          </div>
          <p
            className="[word-break:break-word] col-1 font-['Roboto:Regular',sans-serif] font-normal leading-[normal] ml-[12px] mt-[41px] relative row-1 text-[#505a5f] text-[12px] w-[300px]"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            Record AEFI forms and kits (adrenaline) available and used.
          </p>
          <p
            className="[word-break:break-word] col-1 font-['Roboto:Bold',sans-serif] font-bold leading-[normal] ml-[48px] mt-[12px] relative row-1 text-[#0b4b66] text-[18px] whitespace-nowrap"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            Record AEFI Forms and Kits
          </p>
          <div className="col-1 flex items-center justify-center ml-[12px] mt-[11px] relative row-1 size-[24px]">
            <BriefcaseMedical className="size-[24px] text-[#c84c0e]" strokeWidth={2} />
          </div>
        </div>
      </button>
    </div>
  );
}
