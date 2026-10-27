import type { ReactNode } from "react";

type BlueInfoBlockProps = {
  label: string;
  /** Plain text value, or custom content such as resource chips. */
  value?: string;
  children?: ReactNode;
};

/** Pale blue detail block, matching the Stock Receipt transaction card. */
export function BlueInfoBlock({ label, value, children }: BlueInfoBlockProps) {
  return (
    <div className="bg-[#edf6ff] border border-[#d3e6f8] rounded-[8px] px-[12px] py-[10px] flex flex-col gap-[6px] w-full">
      <span
        style={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 700,
          fontSize: "13px",
          lineHeight: 1.3,
          color: "#505a5f",
        }}
      >
        {label}
      </span>
      {value != null ? (
        <span
          className="[word-break:break-word]"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "14px", lineHeight: 1.3, color: "#0b4b66" }}
        >
          {value}
        </span>
      ) : (
        children
      )}
    </div>
  );
}
