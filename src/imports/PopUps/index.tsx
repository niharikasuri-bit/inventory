import svgPaths from "./svg-xur5gyju8k";

function Frame2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-center justify-center leading-[1.14] relative shrink-0 text-center w-full">
      <p className="font-['Roboto:Bold',sans-serif] font-bold relative shrink-0 text-[#0b4b66] text-[24px] w-full" style={{ fontVariationSettings: '"wdth" 100' }}>
        Stock Quantity Mismatch
      </p>
      <p className="font-['Roboto:Medium',sans-serif] font-medium relative shrink-0 text-[#363636] text-[16px] w-full" style={{ fontVariationSettings: '"wdth" 100' }}>
        The quantity scanned does not match the expected quantity. Please review the quantities before confirming receipt.
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center relative shrink-0 w-full">
      <div className="overflow-clip relative shrink-0 size-[48px]" data-name="Icons / warning">
        <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[8.33%_4.17%_12.5%_4.17%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="38" preserveAspectRatio="none" viewBox="0 0 44 38" width="44">
            <path d={svgPaths.pb11c000} fill="#B91900" id="Vector" />
          </svg>
        </div>
      </div>
      <Frame2 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame />
    </div>
  );
}

export default function PopUps() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.16)] flex flex-col gap-[16px] items-start p-[16px] relative rounded-[12px] size-full" data-name="PopUps">
      <Frame1 />
      <div className="bg-[#c84c0e] h-[40px] relative rounded-[6px] shrink-0 w-full" data-name="Buttons">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[8px] relative size-full">
            <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[1.14] relative shrink-0 text-[20px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Confirm Receipt
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white h-[40px] relative rounded-[6px] shrink-0 w-full" data-name="Buttons">
        <div aria-hidden className="absolute border border-[#c84c0e] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[8px] relative size-full">
            <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[1.14] relative shrink-0 text-[#c84c0e] text-[20px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Go Back
            </p>
          </div>
        </div>
      </div>
      <div className="absolute overflow-clip right-[11px] size-[24px] top-[14.5px]" data-name="Icons / close">
        <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[20.83%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
            <path d={svgPaths.p2404b080} fill="#363636" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}