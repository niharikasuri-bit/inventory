import { useState } from "react";
import { Inbox } from "lucide-react";
import type { Transaction } from "./data";
import { AppHeader } from "./AppHeader";
import { Tabs, type TabKey } from "./Tabs";
import { SearchBar, type SortKey } from "./SearchBar";
import { TransactionCard } from "./TransactionCard";

type ReceiptsScreenProps = {
  transactions: Transaction[];
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  onOpenTransaction: (id: string) => void;
  onBack: () => void;
};

export function ReceiptsScreen({
  transactions,
  activeTab,
  onTabChange,
  onOpenTransaction,
  onBack,
}: ReceiptsScreenProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered = transactions
    .filter((t) => (activeTab === "pending" ? t.status === "pending" : t.status !== "pending"))
    .filter((t) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      // Match on transaction ID, sending facility, or any resource name.
      return (
        t.id.toLowerCase().includes(q) ||
        t.from.toLowerCase().includes(q) ||
        t.resources.some((r) => r.name.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sort === "facility") return a.from.localeCompare(b.from);
      const da = Date.parse(a.received);
      const db = Date.parse(b.received);
      return sort === "oldest" ? da - db : db - da;
    });

  return (
    <div className="flex flex-col h-full bg-[#eee]">
      <AppHeader title="Stock Receipt" onBack={onBack} />
      <Tabs active={activeTab} onChange={onTabChange} />
      <SearchBar value={query} onChange={setQuery} sort={sort} onSortChange={setSort} />

      <div className="flex-1 overflow-y-auto px-[16px] pt-[16px] pb-[24px]">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-[8px] pt-[64px] text-[#b1b4b6]">
            <Inbox className="size-[40px]" strokeWidth={1.5} />
            <p style={{ fontFamily: "Roboto, sans-serif", fontSize: "14px" }}>
              {activeTab === "pending"
                ? "No stock receipts to receive"
                : "No completed stock receipts"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-[16px]">
            {filtered.map((t) => (
              <TransactionCard key={t.id} transaction={t} onOpen={onOpenTransaction} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
