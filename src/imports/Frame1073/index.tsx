export default function Frame() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-[8px] relative rounded-[4px] size-full">
      <div aria-hidden className="absolute border border-[#d6d5d4] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[1.37] relative shrink-0 text-[#505a5f] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Not Delivered
      </p>
    </div>
  );
}