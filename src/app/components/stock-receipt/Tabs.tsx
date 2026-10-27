export type TabKey = "pending" | "received";

const TAB_LABELS: Record<TabKey, string> = {
  pending: "Yet to Receive",
  received: "Received",
};

type TabsProps = {
  active: TabKey;
  onChange: (tab: TabKey) => void;
};

export function Tabs({ active, onChange }: TabsProps) {
  return (
    <div className="px-[16px]">
      <div className="bg-white rounded-[4px] p-[16px]">
        <div className="relative flex h-[32px] rounded-[12px] border border-[#787878] bg-[#fafafa] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.15)] overflow-hidden">
          {/* Sliding highlight */}
          <div
            className="absolute top-0 bottom-0 w-1/2 bg-[#c84c0e] rounded-[12px] transition-transform duration-200 ease-out"
            style={{
              transform: active === "pending" ? "translateX(0%)" : "translateX(100%)",
            }}
          />
          {(["pending", "received"] as TabKey[]).map((key) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                onClick={() => onChange(key)}
                className="relative z-10 flex-1 flex items-center justify-center"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: isActive ? "#ffffff" : "#787878",
                }}
              >
                {TAB_LABELS[key]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
