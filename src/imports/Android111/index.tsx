import svgPaths from "./svg-9zaw1ifxrr";
import imgDigit from "./7d09febc3a379d219278a29f22155b2533821735.png";

function Frame() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative">
      <div className="absolute h-[18.788px] left-[2px] top-[3px] w-[80px]" data-name="DIGIT">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDigit} />
      </div>
    </div>
  );
}

function Panel() {
  return (
    <div className="bg-[#00703c] relative rounded-[8px] shrink-0 w-full" data-name="Panel">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-center justify-center px-[40px] py-[16px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[48px]" data-name="Icons / check_circle">
            <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
              <g id="Vector" />
            </svg>
            <div className="absolute inset-[8.33%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" height="40" preserveAspectRatio="none" viewBox="0 0 40 40" width="40">
                <path d={svgPaths.p3e4c5900} fill="white" id="Vector" />
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[1.14] relative shrink-0 text-[32px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            Title
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex items-start p-[8px] relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[1.37] relative shrink-0 text-[#787878] text-[16px] w-[296px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Description
        </p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#c84c0e] h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative size-full">
          <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[1.14] relative shrink-0 text-[20px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            CTA 1
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-start relative shrink-0 w-full">
      <Button />
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[8px] relative size-full">
          <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[1.14] relative shrink-0 text-[#c84c0e] text-[20px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            CTA 2
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-start relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden className="absolute border border-[#c84c0e] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Button1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.16)] flex flex-col gap-[8px] items-start p-[16px] relative rounded-[12px] shrink-0 w-[332px]">
      <Panel />
      <Frame1 />
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-start left-1/2 p-[16px] top-[56px]">
      <Frame4 />
    </div>
  );
}

export default function Android() {
  return (
    <div className="bg-[#fafafa] overflow-clip relative rounded-[12px] size-full" data-name="Android - 111">
      <div className="absolute bg-[#0b4b66] left-0 top-0 w-[360px]" data-name="Header / Citizen / Mobile">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center p-[16px] relative size-full">
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icons / menu">
              <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
                <g id="Vector" />
              </svg>
              <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 18 12" width="18">
                  <path d={svgPaths.p6b54880} fill="white" id="Vector" />
                </svg>
              </div>
            </div>
            <Frame />
          </div>
        </div>
      </div>
      <Frame5 />
    </div>
  );
}