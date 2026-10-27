function Frame2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[1.14] relative shrink-0 text-[#0b4b66] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        MRN -08976548329
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#fdefd8] content-stretch flex h-[25px] items-center justify-center relative rounded-[6px] shrink-0 w-[160px]">
      <div aria-hidden className="absolute border border-[#d6d5d4] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Frame2 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame4 />
      <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[1.37] relative shrink-0 text-[#787878] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        13 Feb 2025
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-[269px] whitespace-nowrap">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.37] relative shrink-0 text-[#505a5f] text-[12px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Received from
      </p>
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.14] relative shrink-0 text-[#363636] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Supplier
      </p>
    </div>
  );
}

function Tags() {
  return (
    <div className="bg-[#edf6ff] content-stretch flex h-[60px] items-center px-[12px] py-[4px] relative rounded-[6px] shrink-0" data-name="Tags">
      <Frame />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <Tags />
    </div>
  );
}

function Frame1() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[24px] items-center relative shrink-0 text-[#363636] text-[14px] w-full whitespace-nowrap">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.37] relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        SPAQ 1
      </p>
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.14] relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        50 Blisters
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[24px] items-center relative shrink-0 text-[#363636] text-[14px] w-full whitespace-nowrap">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.37] relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        SPAQ 2
      </p>
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.14] relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        50 Blisters
      </p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[24px] items-center relative shrink-0 text-[#363636] text-[14px] w-full">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.37] relative shrink-0 w-[49px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Bednet
      </p>
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.14] relative shrink-0 whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        50 Blisters
      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#fafafa] relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden className="absolute border border-[#d6d5d4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative size-full">
        <Frame1 />
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 264 1" width="264">
              <line id="Line 347" stroke="#D6D5D4" x2="264" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <Frame5 />
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 264 1" width="264">
              <line id="Line 347" stroke="#D6D5D4" x2="264" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <Frame6 />
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="bg-[#c84c0e] h-[32px] relative rounded-[6px] shrink-0 w-full" data-name="Buttons">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[20px] py-[8px] relative size-full">
          <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[1.14] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            Select Transaction
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Frame3() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_2px_5px_rgba(0,0,0,0.15)] flex flex-col gap-[16px] items-start p-[16px] relative rounded-[12px] size-full">
      <Frame7 />
      <Frame9 />
      <Frame8 />
      <Buttons />
    </div>
  );
}