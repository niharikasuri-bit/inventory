export type ReceiptStatus = "pending" | "confirmed" | "discrepancy";

export type Resource = {
  id: string;
  name: string;
  /** Expected quantity for this resource in the transaction. */
  quantity: number;
  /** Actual quantity received. Populated once the resource is processed. */
  received?: number;
  /** Per-resource processing status. Defaults to "pending" until acted on. */
  status: ReceiptStatus;
};

export type Transaction = {
  id: string;
  from: string;
  received: string;
  /** Time of day the transaction was actioned, shown on completed receipts. */
  receivedTime?: string;
  resources: Resource[];
  status: ReceiptStatus;
};

export const initialTransactions: Transaction[] = [
  {
    id: "TXN-6486482",
    from: "Ondo State Facility",
    received: "25 Jul 2022",
    receivedTime: "10:45",
    status: "pending",
    resources: [
      { id: "r1", name: "Bednets", quantity: 150, status: "pending" },
      { id: "r2", name: "Mosquito Nets", quantity: 50, status: "pending" },
      { id: "r3", name: "Insecticide Bottles", quantity: 20, status: "pending" },
    ],
  },
  {
    id: "TXN-6486510",
    from: "Lagos Central Warehouse",
    received: "24 Jul 2022",
    receivedTime: "16:20",
    status: "pending",
    resources: [
      { id: "r1", name: "Bednets", quantity: 200, status: "pending" },
      { id: "r2", name: "Test Kits", quantity: 75, status: "pending" },
    ],
  },
  {
    id: "TXN-6486233",
    from: "Kano Distribution Center",
    received: "20 Jul 2022",
    receivedTime: "08:05",
    status: "pending",
    resources: [
      { id: "r1", name: "Insecticide Bottles", quantity: 40, status: "pending" },
      { id: "r2", name: "Bednets", quantity: 120, status: "pending" },
      { id: "r3", name: "Mosquito Nets", quantity: 60, status: "pending" },
      { id: "r4", name: "Gloves (boxes)", quantity: 15, status: "pending" },
    ],
  },
  {
    id: "TXN-6485901",
    from: "Abuja Regional Store",
    received: "18 Jul 2022",
    receivedTime: "14:32",
    status: "confirmed",
    resources: [
      { id: "r1", name: "Bednets", quantity: 300, received: 300, status: "confirmed" },
      { id: "r2", name: "Mosquito Nets", quantity: 90, received: 90, status: "confirmed" },
    ],
  },
  {
    id: "TXN-6485770",
    from: "Ibadan Zonal Facility",
    received: "15 Jul 2022",
    receivedTime: "09:15",
    status: "discrepancy",
    resources: [
      { id: "r1", name: "Bednets", quantity: 150, received: 145, status: "discrepancy" },
      { id: "r2", name: "Mosquito Nets", quantity: 50, received: 50, status: "confirmed" },
      { id: "r3", name: "Insecticide Bottles", quantity: 20, received: 20, status: "confirmed" },
    ],
  },
];

/**
 * Derives the overall transaction status from its resources:
 * - "pending" while any resource is still unprocessed,
 * - "discrepancy" if any processed resource has a discrepancy,
 * - "confirmed" once every resource is confirmed.
 */
export function deriveTransactionStatus(resources: Resource[]): ReceiptStatus {
  if (resources.some((r) => r.status === "pending")) return "pending";
  if (resources.some((r) => r.status === "discrepancy")) return "discrepancy";
  return "confirmed";
}

/** Human-readable difference between expected and received quantities. */
export function differenceLabel(resource: Resource): { text: string; hasDiff: boolean } {
  if (resource.received == null || resource.received === resource.quantity) {
    return { text: "—", hasDiff: false };
  }
  const diff = resource.received - resource.quantity;
  if (diff < 0) return { text: `Less by ${Math.abs(diff)}`, hasDiff: true };
  return { text: `More by ${diff}`, hasDiff: true };
}
