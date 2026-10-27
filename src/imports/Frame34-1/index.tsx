import svgPaths from "./svg-v5d8fopum2";

function Frame1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-w-px relative text-[#363636] whitespace-nowrap">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.37] relative shrink-0 text-[12px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Number of resources scanned
      </p>
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.14] relative shrink-0 text-[16px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        12
      </p>
    </div>
  );
}

function Tags() {
  return (
    <div className="bg-[#deefff] h-[54px] relative rounded-[6px] shrink-0 w-full" data-name="Tags">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[12px] py-[4px] relative size-full">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#fafafa] relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden className="absolute border border-[#d6d5d4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[1.14] relative shrink-0 text-[#0b4b66] text-[20px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Resource 1
        </p>
        <Tags />
        <div className="bg-white h-[32px] relative shrink-0 w-full" data-name="Buttons">
          <div aria-hidden className="absolute border border-[#c84c0e] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex gap-[4px] items-center justify-center px-[20px] py-[8px] relative size-full">
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icons / qr_code_scanner">
                <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
                  <g id="Vector" />
                </svg>
                <div className="absolute inset-[8.33%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                    <path d={svgPaths.p17654080} fill="var(--fill-0, #C84C0E)" id="Vector" />
                  </svg>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[1.14] relative shrink-0 text-[#c84c0e] text-[16px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                Continue Scanning
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#fafafa] relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden className="absolute border border-[#d6d5d4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[1.14] relative shrink-0 text-[#0b4b66] text-[20px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Resource 2
        </p>
        <div className="bg-white h-[32px] relative shrink-0 w-full" data-name="Buttons">
          <div aria-hidden className="absolute border border-[#c84c0e] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex gap-[4px] items-center justify-center px-[20px] py-[8px] relative size-full">
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icons / qr_code_scanner">
                <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
                  <g id="Vector" />
                </svg>
                <div className="absolute inset-[8.33%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                    <path d={svgPaths.p17654080} fill="var(--fill-0, #C84C0E)" id="Vector" />
                  </svg>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[1.14] relative shrink-0 text-[#c84c0e] text-[16px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                Scan Resources
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative size-full">
      <Frame2 />
      <Frame3 />
    </div>
  );
}