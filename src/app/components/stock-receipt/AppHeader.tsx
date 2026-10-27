import { Menu, ChevronLeft, HelpCircle } from "lucide-react";

type AppHeaderProps = {
  title?: string;
  onBack: () => void;
};

export function AppHeader({ title, onBack }: AppHeaderProps) {
  return (
    <div className="shrink-0">
      {/* Top navy bar */}
      <div className="bg-[#0b4b66] flex items-center gap-[16px] px-[16px] py-[16px]">
        <Menu className="size-[24px] text-white" strokeWidth={2} />
        <span
          className="text-white tracking-[0.18em]"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "18px" }}
        >
          DIGIT
        </span>
      </div>

      {/* Back / Help row */}
      <div className="flex items-center justify-between px-[8px] pt-[16px]">
        <button
          onClick={onBack}
          className="flex items-center gap-[2px] text-[#0b4b66]"
          style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px" }}
        >
          <ChevronLeft className="size-[20px]" strokeWidth={2.5} />
          Back
        </button>
        <button
          className="flex items-center gap-[5px] text-[#c84c0e] pr-[8px]"
          style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px" }}
        >
          Help
          <HelpCircle className="size-[22px]" strokeWidth={2} />
        </button>
      </div>

      {/* Title */}
      {title && (
        <h1
          className="text-[#0b4b66] px-[16px] pt-[12px] pb-[8px]"
          style={{
            fontFamily: "'Roboto Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "32px",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
      )}
    </div>
  );
}
