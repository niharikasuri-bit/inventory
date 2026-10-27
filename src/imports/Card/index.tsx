import svgPaths from "./svg-2b4l0axy78";

function CardTitle() {
  return (
    <div className="content-stretch flex flex-col h-[28px] items-start relative shrink-0 w-[398.667px]" data-name="CardTitle">
      <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#363636] text-[20px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Stock Reconciliation
      </p>
    </div>
  );
}

function CardTitleMargin() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-start shrink-0" data-name="CardTitle:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[4px] relative size-full">
        <CardTitle />
      </div>
    </div>
  );
}

function SelectScreen() {
  return (
    <div className="col-1 h-[20px] justify-self-stretch relative row-2 self-start shrink-0" data-name="SelectScreen">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#787878] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Choose the warehouse and product you want to count.
        </p>
      </div>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="relative shrink-0 w-full" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[6px] gap-y-[6px] grid grid-cols-[_398.67px] grid-rows-[__32px_20px] pt-[24px] px-[24px] relative size-full">
        <CardTitleMargin />
        <SelectScreen />
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="relative shrink-0 w-full" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[14px] relative shrink-0 text-[#363636] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Date
        </p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #787878)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #787878)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #787878)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #787878)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 9.33333H5.34" id="Vector_5" stroke="var(--stroke-0, #787878)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 9.33333H8.00667" id="Vector_6" stroke="var(--stroke-0, #787878)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 9.33333H10.6733" id="Vector_7" stroke="var(--stroke-0, #787878)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 12H5.34" id="Vector_8" stroke="var(--stroke-0, #787878)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 12H8.00667" id="Vector_9" stroke="var(--stroke-0, #787878)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 12H10.6733" id="Vector_10" stroke="var(--stroke-0, #787878)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#363636] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Monday, July 27, 2026
        </p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g id="Icon">
          <path d={svgPaths.p1aca3780} id="Vector" stroke="var(--stroke-0, #787878)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p2b92b800} id="Vector_2" stroke="var(--stroke-0, #787878)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function IconAlign() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Icon:align">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-end relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[rgba(242,244,245,0.5)] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12.667px] py-[8.667px] relative size-full">
          <Icon />
          <Text />
          <IconAlign />
        </div>
      </div>
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[8px] relative size-full">
        <Container />
      </div>
    </div>
  );
}

function SelectScreen1() {
  return (
    <div className="relative shrink-0 w-full" data-name="SelectScreen">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Label />
        <ContainerMargin />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[14px] relative shrink-0 text-[#b91900] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          *
        </p>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[14px] relative shrink-0 text-[#363636] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Select Warehouse
        </p>
        <Text1 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[130.49px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#787878] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Choose a warehouse
        </p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #787878)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#fafafa] content-stretch flex h-[36px] items-center justify-between px-[12.667px] py-[8.667px] relative rounded-[8px] shrink-0 w-[398.667px]" data-name="Button">
      <div aria-hidden className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Text2 />
      <Icon2 />
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative size-full">
        <Button />
      </div>
    </div>
  );
}

function SelectScreen2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="SelectScreen">
      <Label1 />
      <ButtonMargin />
    </div>
  );
}

function SelectScreenMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="SelectScreen:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[20px] relative size-full">
        <SelectScreen2 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[14px] relative shrink-0 text-[#b91900] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          *
        </p>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[14px] relative shrink-0 text-[#363636] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Select Product
        </p>
        <Text3 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[110.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#787878] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Choose a product
        </p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #787878)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#fafafa] content-stretch flex h-[36px] items-center justify-between px-[12.667px] py-[8.667px] relative rounded-[8px] shrink-0 w-[398.667px]" data-name="Button">
      <div aria-hidden className="absolute border-[0.667px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Text4 />
      <Icon3 />
    </div>
  );
}

function ButtonMargin1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative size-full">
        <Button1 />
      </div>
    </div>
  );
}

function SelectScreen3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="SelectScreen">
      <Label2 />
      <ButtonMargin1 />
    </div>
  );
}

function SelectScreenMargin1() {
  return (
    <div className="relative shrink-0 w-full" data-name="SelectScreen:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start py-[20px] relative size-full">
        <SelectScreen3 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#c84c0e] h-[36px] opacity-50 relative rounded-[8px] shrink-0 w-[398.667px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Continue
        </p>
        <Icon4 />
      </div>
    </div>
  );
}

function CardContent() {
  return (
    <div className="relative shrink-0 w-full" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] px-[24px] relative size-full">
        <SelectScreen1 />
        <SelectScreenMargin />
        <SelectScreenMargin1 />
        <Button2 />
      </div>
    </div>
  );
}

export default function Card() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] flex flex-col gap-[24px] items-start p-[0.667px] relative rounded-[14px] size-full" data-name="Card">
      <div aria-hidden className="absolute border-[#d6d5d4] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardHeader />
      <CardContent />
    </div>
  );
}