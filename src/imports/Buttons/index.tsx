import svgPaths from "./svg-e10ltihwu0";

export default function Buttons() {
  return (
    <div className="bg-[#00703c] content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[8px] relative rounded-[4px] size-full" data-name="Buttons">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icons / check_circle">
        <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
            <path d={svgPaths.p1a707180} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[1.14] relative shrink-0 text-[20px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Confirm Transaction
      </p>
    </div>
  );
}