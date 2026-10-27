import svgPaths from "./svg-xq1y82io0b";

function Component() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] h-[35px] items-center justify-center p-[8px] relative rounded-[6px] shrink-0 w-[126px]" data-name="Component 1">
      <div aria-hidden className="absolute border border-[#b91900] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icons / report_problem">
        <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[8.33%_4.17%_12.5%_4.17%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="19" preserveAspectRatio="none" viewBox="0 0 22 19" width="22">
            <path d={svgPaths.p21dabb00} fill="var(--fill-0, #B91900)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[1.14] relative shrink-0 text-[#b91900] text-[12px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Report
      </p>
    </div>
  );
}

function Component1() {
  return (
    <div className="bg-[#00703c] content-stretch flex gap-[8px] h-[35px] items-center justify-center p-[8px] relative rounded-[6px] shrink-0 w-[126px]" data-name="Component 1">
      <div aria-hidden className="absolute border border-[#00703c] border-solid inset-0 pointer-events-none rounded-[6px]" />
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
      <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[1.14] relative shrink-0 text-[12px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Confirm...
      </p>
    </div>
  );
}

function SelectionTags() {
  return (
    <div className="content-stretch flex gap-[16px] h-[35px] items-center relative shrink-0" data-name="Selection Tags">
      <Component />
      <Component1 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-[#fafafa] content-stretch flex flex-col gap-[16px] items-start p-[16px] relative rounded-[12px] size-full">
      <div aria-hidden className="absolute border border-[#d6d5d4] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[1.14] relative shrink-0 text-[#0b4b66] text-[20px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Resource 1
      </p>
      <SelectionTags />
    </div>
  );
}