export default function Frame() {
  return (
    <div className="bg-[#ffe3e3] content-stretch flex flex-col items-center justify-center relative rounded-[8px] size-full">
      <div aria-hidden className="absolute border border-[#b91900] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[1.14] relative shrink-0 text-[#363636] text-[24px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        -150 Bednets
      </p>
    </div>
  );
}