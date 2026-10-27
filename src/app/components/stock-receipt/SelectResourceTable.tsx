type SelectResourceTableProps = {
  resources: string[];
  /** Quantity received for a resource name. */
  quantityFor: (resource: string) => number;
};

/** Resources shown as compact chips: quantity first, then the resource name. */
export function SelectResourceTable({ resources, quantityFor }: SelectResourceTableProps) {
  return (
    <ul className="flex flex-wrap gap-[8px] list-none m-0 p-0 leading-none">
      {resources.map((name) => {
        const qty = quantityFor(name);
        return (
          <li
            key={name}
            // Read as one phrase by screen readers rather than two loose numbers.
            aria-label={`${name}: ${qty.toLocaleString()}`}
            // Each chip stays on a single line; the row wraps between chips instead,
            // so two short chips sit side by side and longer ones move to a new line.
            className="inline-flex shrink-0 items-center justify-start gap-[8px] bg-white border border-[#dfe3e6] rounded-[8px] px-[8px] py-[6px]"
          >
            <span
              aria-hidden
              className="flex items-center justify-center min-w-[26px] h-[20px] px-[6px] bg-[#f2f4f5] border border-[#dfe3e6] rounded-[6px]"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 600,
                fontSize: "12px",
                lineHeight: 1.3,
                color: "#363636",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {qty.toLocaleString()}
            </span>
            <span
              aria-hidden
              className="whitespace-nowrap"
              style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: "13px", lineHeight: 1.3, color: "#363636" }}
            >
              {name}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
