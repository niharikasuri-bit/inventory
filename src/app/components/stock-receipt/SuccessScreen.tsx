import svgPaths from "../../../imports/Android111/svg-9zaw1ifxrr";
import { AppHeader } from "./AppHeader";

type SuccessScreenProps = {
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary: () => void;
  onSecondary: () => void;
};

export function SuccessScreen({
  title,
  description,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
}: SuccessScreenProps) {
  return (
    <div className="flex flex-col h-full bg-[#fafafa]">
      <AppHeader onBack={onSecondary} />

      {/* Card */}
      <div className="flex-1 overflow-y-auto px-[14px] pt-[8px] pb-[24px] flex flex-col">
        <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.16)] flex flex-col gap-[8px] items-start p-[16px] rounded-[12px] w-full">
          {/* Green panel */}
          <div className="bg-[#00703c] relative rounded-[8px] w-full">
            <div className="flex flex-col items-center justify-center gap-[16px] px-[40px] py-[16px]">
              {/* Check circle icon */}
              <div className="overflow-clip relative shrink-0 size-[48px]">
                <div className="absolute inset-[8.33%]">
                  <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 40 40">
                    <path d={svgPaths.p3e4c5900} fill="white" />
                  </svg>
                </div>
              </div>
              <p
                className="[word-break:break-word] leading-[1.14] text-[24px] text-center text-white"
                style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700 }}
              >
                {title}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="w-full px-[8px] py-[8px]">
            <p
              className="[word-break:break-word] leading-[1.37] text-[#787878] text-[14px]"
              style={{ fontFamily: "Roboto, sans-serif", fontWeight: 400 }}
            >
              {description}
            </p>
          </div>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={onPrimary}
            className="bg-[#c84c0e] h-[40px] rounded-[8px] w-full flex items-center justify-center px-[24px]"
          >
            <span
              className="leading-[1.14] text-[18px] text-center text-white whitespace-nowrap"
              style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500 }}
            >
              {primaryLabel}
            </span>
          </button>

          {/* Secondary CTA */}
          <button
            type="button"
            onClick={onSecondary}
            className="h-[40px] rounded-[8px] w-full flex items-center justify-center px-[24px] border border-[#c84c0e]"
          >
            <span
              className="leading-[1.14] text-[#c84c0e] text-[18px] text-center whitespace-nowrap"
              style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500 }}
            >
              {secondaryLabel}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
