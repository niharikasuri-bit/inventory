import svgPaths from "./svg-2acm6yqjnj";

function Frame() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center left-[12px] top-[8px]">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icons / search">
        <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[12.5%_14.63%_14.63%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="17.49" preserveAspectRatio="none" viewBox="0 0 17.49 17.49" width="17.49">
            <path d={svgPaths.p39f0ac00} fill="#D6D5D4" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[1.37] relative shrink-0 text-[#b1b4b6] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>{`Search `}</p>
    </div>
  );
}

function Input() {
  return (
    <div className="drop-shadow-[0px_2px_2px_rgba(0,0,0,0.15)] h-[40px] relative rounded-[12px] shrink-0 w-[247px]" data-name="Input">
      <div className="absolute bg-white inset-0 rounded-[8px]" />
      <Frame />
    </div>
  );
}

function FilterAlt() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="filter_alt">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="filter_alt">
          <mask height="16" id="mask0_0_11" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="16" x="0" y="0">
            <rect fill="#D9D9D9" height="16" id="Bounding box" width="16" />
          </mask>
          <g mask="url(#mask0_0_11)">
            <path d={svgPaths.p24687900} fill="#C84C0E" id="filter_alt_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Buttons() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_2px_4px_rgba(0,0,0,0.15)] flex gap-[4px] h-[40px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-[65px]" data-name="Buttons">
      <div aria-hidden className="absolute border border-[#c84c0e] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <FilterAlt />
      <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[1.14] relative shrink-0 text-[#c84c0e] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Filter
      </p>
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-between relative size-full">
      <Input />
      <Buttons />
    </div>
  );
}