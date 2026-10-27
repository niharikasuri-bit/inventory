import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

/** How the transaction list is ordered. */
export type SortKey = "newest" | "oldest" | "facility";

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "newest", label: "Date — Newest First" },
  { key: "oldest", label: "Date — Oldest First" },
  { key: "facility", label: "Facility Name (A–Z)" },
];

const DEFAULT_SORT: SortKey = "newest";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  sort: SortKey;
  onSortChange: (sort: SortKey) => void;
};

export function SearchBar({ value, onChange, sort, onSortChange }: SearchBarProps) {
  const [open, setOpen] = useState(false);
  // Held locally so the sheet only applies on "Apply Filter".
  const [draftSort, setDraftSort] = useState<SortKey>(sort);

  const openSheet = () => {
    setDraftSort(sort);
    setOpen(true);
  };

  const apply = () => {
    onSortChange(draftSort);
    setOpen(false);
  };

  return (
    <div className="px-[16px] pt-[16px] relative">
      <div className="flex items-center gap-[10px]">
        <div className="flex-1 min-w-px flex items-center gap-[6px] h-[40px] px-[12px] bg-white rounded-[8px] shadow-[0px_2px_2px_rgba(0,0,0,0.15)]">
          <Search className="size-[20px] text-[#d6d5d4] shrink-0" strokeWidth={2} />
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search resource or transaction ID"
            className="flex-1 min-w-px bg-transparent outline-none text-[#0b0c0c] placeholder:text-[#b1b4b6]"
            style={{ fontFamily: "Roboto, sans-serif", fontSize: "14px" }}
          />
          {value ? (
            <button type="button" onClick={() => onChange("")} aria-label="Clear search" className="shrink-0">
              <X className="size-[16px] text-[#787878]" strokeWidth={2} />
            </button>
          ) : null}
        </div>

        <button
          type="button"
          onClick={openSheet}
          className="shrink-0 flex items-center justify-center gap-[4px] h-[40px] px-[14px] bg-white border border-[#c84c0e] rounded-[8px] shadow-[0px_2px_4px_rgba(0,0,0,0.15)]"
          style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "14px", color: "#c84c0e" }}
        >
          <SlidersHorizontal className="size-[16px]" strokeWidth={2.5} />
          Sort
        </button>
      </div>

      {/* Sort sheet */}
      {open && (
        <>
          <button
            type="button"
            aria-label="Close sort options"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-20 bg-black/25"
          />
          <div className="absolute left-[16px] right-[16px] top-[64px] z-30 bg-white rounded-[12px] shadow-[0px_4px_12px_rgba(0,0,0,0.2)] flex flex-col gap-[16px] p-[16px]">
            <div className="flex items-center gap-[8px]">
              <SlidersHorizontal className="size-[22px] text-[#c84c0e]" strokeWidth={2.5} />
              <span
                style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "22px", color: "#0b4b66" }}
              >
                Sort
              </span>
            </div>

            <div className="bg-[#fafafa] border border-[#d6d5d4] rounded-[12px] flex flex-col gap-[16px] p-[16px]">
              <span style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "16px", color: "#0b4b66" }}>
                Sort by
              </span>
              {SORT_OPTIONS.map((o) => {
                const checked = draftSort === o.key;
                return (
                  <button
                    key={o.key}
                    type="button"
                    onClick={() => setDraftSort(o.key)}
                    className="flex items-center gap-[8px] text-left"
                    aria-pressed={checked}
                  >
                    <span
                      className="shrink-0 flex items-center justify-center size-[22px] rounded-full border"
                      style={{ borderColor: checked ? "#c84c0e" : "#505a5f" }}
                    >
                      {checked && <span className="size-[12px] rounded-full bg-[#c84c0e]" />}
                    </span>
                    <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "14px", color: "#363636" }}>
                      {o.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-[16px]">
              <button
                type="button"
                onClick={() => setDraftSort(DEFAULT_SORT)}
                className="flex-1 flex items-center justify-center h-[36px] rounded-[6px] bg-white border border-[#c84c0e]"
                style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "16px", color: "#c84c0e" }}
              >
                Clear
              </button>
              <button
                type="button"
                onClick={apply}
                className="flex-1 flex items-center justify-center h-[36px] rounded-[6px] bg-[#c84c0e]"
                style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "16px", color: "#ffffff" }}
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
