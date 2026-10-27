import svgPaths from "./svg-59r1w2mny7";
import imgDigit from "./992187f5e5046d927ba7e65e116ee763cbbcd3c5.png";

function Frame() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-w-px relative">
      <div className="absolute h-[18.788px] left-[2px] top-[3px] w-[80px]" data-name="DIGIT">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDigit} />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[19px]">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icons / arrow_left">
        <div className="absolute inset-[29.17%_41.67%_29.17%_37.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="10" preserveAspectRatio="none" viewBox="0 0 5 10" width="5">
            <path d="M5 0L0 5L5 10V0Z" fill="var(--fill-0, #0B4B66)" id="Vector" />
          </svg>
        </div>
        <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
          <g id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-start p-[2px] relative shrink-0">
      <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0b4b66] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Back
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
      <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#c84c0e] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Help
      </p>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icons / help_outline">
        <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
            <path d={svgPaths.p3bfea80} fill="var(--fill-0, #C84C0E)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[8px] top-[68px] w-[344px]">
      <div className="content-stretch flex items-start relative shrink-0" data-name="Back">
        <Frame2 />
        <Frame1 />
      </div>
      <Frame5 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-[#fafafa] border border-[#787878] border-solid h-[32px] left-0 rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.15)] top-0 w-[328px]" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-center left-[190px] top-[8px] w-[118px]">
      <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[1.14] relative shrink-0 text-[#787878] text-[16px] text-center w-[118px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Recieved
      </p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-0 top-0">
      <Group />
      <Frame3 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-[#c84c0e] h-[32px] left-0 rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.15)] top-0 w-[175px]" />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-0 top-0">
      <Group1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-center justify-center left-[4px] top-[8px] w-[166px]">
      <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[1.14] relative shrink-0 text-[16px] text-center text-white w-[172px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Pending
      </p>
    </div>
  );
}

function Tabs() {
  return (
    <div className="absolute h-[32px] left-[16px] top-[16px] w-[328px]" data-name="Tabs">
      <Group2 />
      <Group3 />
      <Frame4 />
    </div>
  );
}

function DateSelector() {
  return (
    <div className="bg-white h-[64px] relative rounded-[4px] shrink-0 w-full" data-name="Date Selector">
      <Tabs />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center left-[12px] top-[8px]">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icons / search">
        <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[12.5%_14.63%_14.63%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="17.49" preserveAspectRatio="none" viewBox="0 0 17.49 17.49" width="17.49">
            <path d={svgPaths.p39f0ac00} fill="var(--fill-0, #D6D5D4)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[1.37] relative shrink-0 text-[#b1b4b6] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>{`Search `}</p>
    </div>
  );
}

function Input() {
  return (
    <div className="drop-shadow-[0px_2px_2px_rgba(0,0,0,0.15)] h-[40px] relative rounded-[12px] shrink-0 w-[326px]" data-name="Input">
      <div className="absolute bg-white inset-0 rounded-[8px]" />
      <Frame6 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-center left-[-1px] top-[166px] w-[361px]">
      <DateSelector />
      <Input />
    </div>
  );
}

export default function Android() {
  return (
    <div className="bg-[#eee] overflow-clip relative rounded-[12px] size-full" data-name="Android - 995">
      <div className="absolute bg-[#0b4b66] content-stretch flex gap-[16px] items-center left-0 p-[16px] top-0 w-[360px]" data-name="Header / Citizen / Mobile">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icons / menu">
          <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
            <g id="Vector" />
          </svg>
          <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 18 12" width="18">
              <path d={svgPaths.p6b54880} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
        <Frame />
      </div>
      <p className="[word-break:break-word] absolute font-['Roboto_Condensed:Bold',sans-serif] font-bold leading-[normal] left-[16px] text-[#0b4b66] text-[32px] top-[112px] whitespace-nowrap">Stock Receipt</p>
      <Frame8 />
      <Frame7 />
    </div>
  );
}