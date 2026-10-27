function Frame() {
  return (
    <div className="bg-white content-stretch flex h-[16px] items-center justify-center p-[2px] relative rounded-[8px] shrink-0 w-[22px]">
      <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[1.37] relative shrink-0 text-[#0b4b66] text-[10px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        12
      </p>
    </div>
  );
}

export default function Tags() {
  return (
    <div className="bg-[rgba(0,87,189,0.05)] content-stretch flex gap-[4px] items-center justify-center px-[12px] py-[4px] relative rounded-[8px] size-full" data-name="Tags">
      <Frame />
      <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[1.37] relative shrink-0 text-[#0b4b66] text-[10px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Bednet
      </p>
    </div>
  );
}