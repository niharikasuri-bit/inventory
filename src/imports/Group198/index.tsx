import svgPaths from "./svg-6rvjbca231";

function Frame1() {
  return (
    <div className="content-stretch flex gap-[4px] items-start py-[2px] relative rounded-[21px] shrink-0">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icons / check_circle">
        <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="13.3333" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333" width="13.3333">
            <path d={svgPaths.p20eb1200} fill="var(--fill-0, #00703C)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#00703c] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Visited
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[192px]">
      <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#0b0c0c] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Maria Antonio
      </p>
      <Frame1 />
      <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#505a5f] text-[0px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <span className="leading-[normal] text-[#0b0c0c] text-[14px]">Jose Antonio</span>
        <span className="leading-[normal] text-[14px]">{` `}</span>
        <span className="leading-[normal] text-[12px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          (Household head)
        </span>
      </p>
      <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0b0c0c] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        4 Members
      </p>
      <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#505a5f] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        219 / Pemba (200mts)
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex h-[117px] items-start left-0 top-0 w-[305px]">
      <Frame />
    </div>
  );
}

export default function Group() {
  return (
    <div className="contents relative size-full">
      <div className="absolute h-[167px] left-0 top-0 w-[328px]" data-name="Cards / Base Card">
        <div className="absolute bg-white inset-0 rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.16)]" data-name="Card / Primary" />
      </div>
      <Frame2 />
      <div className="absolute flex items-center justify-center left-0 size-[16px] top-0">
        <div className="flex-none rotate-90">
          <div className="overflow-clip relative size-[16px]" data-name="Icons / arrow_forward_ios">
            <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
              <g id="Vector" />
            </svg>
            <div className="absolute bottom-[8.33%] left-[24.5%] right-1/4 top-[8.33%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" height="13.3333" preserveAspectRatio="none" viewBox="0 0 8.08 13.3333" width="8.08">
                <path d={svgPaths.p6416d00} fill="var(--fill-0, #D6D5D4)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}