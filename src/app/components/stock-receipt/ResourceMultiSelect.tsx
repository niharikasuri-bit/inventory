import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type ResourceMultiSelectProps = {
  options: string[];
  selected: string[];
  onToggle: (name: string) => void;
  onClearAll?: () => void;
  placeholder?: string;
  disabled?: boolean;
};

export function ResourceMultiSelect({
  options,
  selected,
  onToggle,
  onClearAll,
  placeholder = "Select resource(s)",
  disabled,
}: ResourceMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const triggerLabel =
    selected.length === 0
      ? placeholder
      : `${selected.length} Selected`;

  const handleClearAll = () => {
    selected.forEach((name) => onToggle(name));
    onClearAll?.();
  };

  return (
    <div ref={rootRef} className="flex flex-col gap-[8px]">
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-[8px] border rounded-[2px] px-[10px] py-[8px] outline-none text-left ${
          disabled
            ? "bg-[#f2f2f2] border-[#d6d5d4] cursor-not-allowed"
            : "bg-white border-[#505a5f] focus:border-[#0b4b66]"
        }`}
      >
        <span
          className="truncate"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "16px",
            color: selected.length === 0 ? "#787878" : "#0b0c0c",
          }}
        >
          {triggerLabel}
        </span>
        <ChevronDown
          className={`size-[20px] shrink-0 text-[#505a5f] transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>

      {/* Dropdown panel */}
      {open && !disabled && (
        <div className="relative z-10 bg-white border border-[#d6d5d4] rounded-[4px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.16)] overflow-hidden">
          {options.map((name) => {
            const checked = selected.includes(name);
            return (
              <button
                key={name}
                type="button"
                onClick={() => onToggle(name)}
                className="w-full flex items-center gap-[12px] px-[10px] py-[10px] border-b border-[#eeeeee] last:border-b-0 text-left hover:bg-[#fafafa]"
              >
                <span
                  className="size-[22px] shrink-0 rounded-[4px] border flex items-center justify-center"
                  style={{
                    borderColor: checked ? "#c84c0e" : "#787878",
                    background: checked ? "#c84c0e" : "transparent",
                  }}
                >
                  {checked && <Check className="size-[16px] text-white" strokeWidth={3} />}
                </span>
                <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", color: "#0b0c0c" }}>{name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Selected chips + Clear All */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-[8px]">
          {selected.map((name) => (
            <span
              key={name}
              className="inline-flex items-center rounded-[4px] px-[10px] py-[4px] border border-[#d6d5d4] bg-[#f2f2f2]"
              style={{ fontFamily: "Roboto, sans-serif", fontSize: "14px", color: "#0b0c0c" }}
            >
              {name}
            </span>
          ))}
          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex items-center rounded-[4px] px-[10px] py-[4px] border border-[#c84c0e] bg-white"
            style={{ fontFamily: "Roboto, sans-serif", fontSize: "14px", color: "#c84c0e" }}
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
