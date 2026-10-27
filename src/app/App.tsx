import { useState } from "react";
import {
  initialTransactions,
  deriveTransactionStatus,
  type Transaction,
} from "./components/stock-receipt/data";
import { HomeScreen } from "./components/stock-receipt/HomeScreen";
import { ManageStockScreen } from "./components/stock-receipt/ManageStockScreen";
import { StockIssueScreen } from "./components/stock-receipt/StockIssueScreen";
import { StockReturnScreen } from "./components/stock-receipt/StockReturnScreen";
import { StockDamagedScreen } from "./components/stock-receipt/StockDamagedScreen";
import { StockDiscrepancyScreen } from "./components/stock-receipt/StockDiscrepancyScreen";
import { StockReconciliationScreen } from "./components/stock-receipt/StockReconciliationScreen";
import { ReceiptsScreen } from "./components/stock-receipt/ReceiptsScreen";
import { DetailsScreen } from "./components/stock-receipt/DetailsScreen";
import { ScanResourcesScreen } from "./components/stock-receipt/ScanResourcesScreen";
import { ReportDiscrepancyScreen, type ResourceUpdate } from "./components/stock-receipt/ReportDiscrepancyScreen";
import { SuccessScreen } from "./components/stock-receipt/SuccessScreen";
import type { TabKey } from "./components/stock-receipt/Tabs";

type View =
  | "home"
  | "manage"
  | "issue"
  | "return"
  | "damaged"
  | "discrepancy"
  | "reconcile"
  | "list"
  | "details"
  | "scan"
  | "report"
  | "success";

type SuccessConfig = {
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
};

const SUCCESS_CONFIGS: Record<string, Omit<SuccessConfig, "onPrimary">> = {
  receipt: {
    title: "Stock Received Successfully",
    description: "The stock receipt has been recorded successfully. The received resources are now added to the warehouse stock.",
    primaryLabel: "Record Another Receipt",
    secondaryLabel: "Go to Home",
  },
  issue: {
    title: "Stock Issued Successfully",
    description: "The stock issue has been recorded successfully. The issued resources have been deducted from the warehouse stock.",
    primaryLabel: "Issue More Stock",
    secondaryLabel: "Go to Home",
  },
  return: {
    title: "Return Recorded Successfully",
    description: "The stock return has been recorded successfully. The returned resources have been added to the warehouse stock.",
    primaryLabel: "Record Another Return",
    secondaryLabel: "Go to Home",
  },
  damaged: {
    title: "Damaged Stock Reported",
    description: "The damaged stock has been recorded successfully. The affected resources have been updated in the warehouse stock.",
    primaryLabel: "Report Another Damage",
    secondaryLabel: "Go to Home",
  },
  discrepancy: {
    title: "Stock Discrepancy Reported",
    description: "The stock discrepancy has been recorded successfully for review.",
    primaryLabel: "Report Another Discrepancy",
    secondaryLabel: "Go to Home",
  },
  reconcile: {
    title: "Stock Reconciled Successfully",
    description: "The stock reconciliation has been completed successfully. The warehouse stock has been updated with the reconciled quantities.",
    primaryLabel: "Reconcile More Stock",
    secondaryLabel: "Go to Home",
  },
};

// Root of the Manage Stock prototype. Screen routing is driven by the `view` state.
export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [activeTab, setActiveTab] = useState<TabKey>("pending");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);
  const [selectedWasPending, setSelectedWasPending] = useState(false);
  const [view, setView] = useState<View>("home");
  const [successKey, setSuccessKey] = useState<keyof typeof SUCCESS_CONFIGS>("receipt");

  const showSuccess = (key: keyof typeof SUCCESS_CONFIGS) => {
    setSuccessKey(key);
    setView("success");
  };

  const selected = transactions.find((t) => t.id === selectedId) ?? null;
  const selectedResource = selected?.resources.find((r) => r.id === selectedResourceId) ?? null;

  // Apply a per-resource outcome without touching sibling resources, then
  // recompute the transaction's overall status from its resources.
  const applyResource = (
    transactionId: string,
    resourceId: string,
    status: "confirmed" | "discrepancy",
    update?: ResourceUpdate,
    receivedBase?: number,
  ) => {
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id !== transactionId) return t;
        const resources = t.resources.map((r) => {
          if (r.id !== resourceId) return r;
          if (status === "confirmed") {
            return { ...r, status, received: receivedBase ?? r.quantity };
          }
          return {
            ...r,
            status,
            quantity: update?.expected ?? r.quantity,
            received: update?.received ?? r.received,
          };
        });
        return { ...t, resources, status: deriveTransactionStatus(resources) };
      }),
    );
    setSelectedResourceId(null);
    setView("details");
  };

  const openTransaction = (id: string) => {
    setSelectedId(id);
    const txn = transactions.find((t) => t.id === id);
    setSelectedWasPending(txn?.resources.some((r) => r.status === "pending") ?? false);
    setView("details");
  };

  return (
    <div className="size-full flex items-center justify-center bg-[#c9ccd1]">
      {/* Mobile viewport */}
      <div className="relative w-full max-w-[360px] h-full max-h-[844px] bg-[#eee] overflow-hidden shadow-xl">
        {view === "home" ? (
          <HomeScreen onManageStock={() => setView("manage")} onReconcile={() => setView("reconcile")} />
        ) : view === "manage" ? (
          <ManageStockScreen
            onBack={() => setView("home")}
            onRecordReceipt={() => {
              setActiveTab("pending");
              setView("list");
            }}
            onRecordIssue={() => setView("issue")}
            onRecordReturn={() => setView("return")}
            onRecordDamaged={() => setView("damaged")}
            onReportDiscrepancy={() => setView("discrepancy")}
          />
        ) : view === "issue" ? (
          <StockIssueScreen onBack={() => setView("manage")} onSubmit={() => showSuccess("issue")} />
        ) : view === "return" ? (
          <StockReturnScreen onBack={() => setView("manage")} onSubmit={() => showSuccess("return")} />
        ) : view === "damaged" ? (
          <StockDamagedScreen onBack={() => setView("manage")} onSubmit={() => showSuccess("damaged")} />
        ) : view === "discrepancy" ? (
          <StockDiscrepancyScreen onBack={() => setView("manage")} onSubmit={() => showSuccess("discrepancy")} />
        ) : view === "reconcile" ? (
          <StockReconciliationScreen onBack={() => setView("manage")} onSubmit={() => showSuccess("reconcile")} />
        ) : view === "scan" && selected && selectedResource ? (
          <ScanResourcesScreen
            transaction={selected}
            resource={selectedResource}
            onBack={() => {
              setSelectedResourceId(null);
              setView("details");
            }}
            onSubmit={(resourceId, receivedBase) =>
              applyResource(selected.id, resourceId, "confirmed", undefined, receivedBase)
            }
          />
        ) : view === "report" && selected && selectedResource ? (
          <ReportDiscrepancyScreen
            transaction={selected}
            resource={selectedResource}
            onBack={() => {
              setSelectedResourceId(null);
              setView("details");
            }}
            onSubmit={(resourceId, update) => applyResource(selected.id, resourceId, "discrepancy", update)}
          />
        ) : view === "details" && selected ? (
          <DetailsScreen
            transaction={selected}
            wasPending={selectedWasPending}
            onBack={() => {
              setSelectedId(null);
              setView("list");
            }}
            onConfirm={(resourceId) => {
              setSelectedResourceId(resourceId);
              setView("scan");
            }}
            onReportDiscrepancy={(resourceId) => {
              setSelectedResourceId(resourceId);
              setView("report");
            }}
            onSubmit={() => {
              setSelectedId(null);
              setActiveTab("received");
              showSuccess("receipt");
            }}
          />
        ) : view === "success" ? (
          <SuccessScreen
            title={SUCCESS_CONFIGS[successKey].title}
            description={SUCCESS_CONFIGS[successKey].description}
            primaryLabel={SUCCESS_CONFIGS[successKey].primaryLabel}
            secondaryLabel="Go to Home"
            onPrimary={() => {
              if (successKey === "receipt") { setActiveTab("pending"); setView("list"); }
              else if (successKey === "issue") setView("issue");
              else if (successKey === "return") setView("return");
              else if (successKey === "damaged") setView("damaged");
              else if (successKey === "discrepancy") setView("discrepancy");
              else if (successKey === "reconcile") setView("reconcile");
            }}
            onSecondary={() => setView("home")}
          />
        ) : (
          <ReceiptsScreen
            transactions={transactions}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onOpenTransaction={openTransaction}
            onBack={() => setView("manage")}
          />
        )}
      </div>
    </div>
  );
}
