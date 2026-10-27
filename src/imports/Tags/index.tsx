function Frame() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-w-px relative text-[#363636] text-[12px] whitespace-nowrap">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.37] relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>{`Sending Facility `}</p>
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.14] relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Ondo State Facility
      </p>
    </div>
  );
}

export default function Tags() {
  return (
    <div className="bg-[#deefff] content-stretch flex items-center justify-center px-[12px] py-[4px] relative rounded-[6px] size-full" data-name="Tags">
      <Frame />
    </div>
  );
}