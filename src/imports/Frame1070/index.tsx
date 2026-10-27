import svgPaths from "./svg-vzujc3spif";

export default function Frame() {
  return (
    <div className="bg-[#fbeee8] content-stretch flex gap-[10px] items-center justify-center p-[8px] relative rounded-[4px] size-full">
      <div aria-hidden className="absolute border border-[#c84c0e] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icons / check_circle">
        <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="13.3333" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333" width="13.3333">
            <path d={svgPaths.p20eb1200} fill="var(--fill-0, #C84C0E)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[1.5] relative shrink-0 text-[#c84c0e] text-[16px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Delivered
      </p>
    </div>
  );
}