function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[1.14] relative shrink-0 text-[#00703c] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        24 Resources Scanned
      </p>
    </div>
  );
}

function Alert() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="bg-[#f1fff8] flex-[1_0_0] h-full min-w-px relative" data-name="Alert">
        <div aria-hidden className="absolute border border-[#00703c] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative size-full">
          <Frame />
          <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[1.37] min-w-full relative shrink-0 text-[#505a5f] text-[14px] w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
            The scanned resource is ready to be recorded as received.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AlertCard() {
  return (
    <div className="relative size-full" data-name="Alert Card">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center relative size-full">
          <div className="flex flex-row items-center self-stretch">
            <div className="bg-[#00703c] h-full relative shrink-0 w-[4px]">
              <div aria-hidden className="absolute border border-[#00703c] border-solid inset-0 pointer-events-none" />
            </div>
          </div>
          <Alert />
        </div>
      </div>
    </div>
  );
}