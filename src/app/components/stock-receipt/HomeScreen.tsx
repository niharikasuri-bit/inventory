import Android1106 from "../../../imports/Android1106-1";

type HomeScreenProps = {
  onManageStock: () => void;
  onReconcile: () => void;
};

// Renders the imported mGramSeva home dashboard and overlays clickable
// hotspots on the "Manage Stock" and "Stock Reconciliation" tiles.
export function HomeScreen({ onManageStock, onReconcile }: HomeScreenProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#eee]">
      <Android1106 />
      <button
        type="button"
        onClick={onManageStock}
        aria-label="Manage Stock"
        className="absolute left-[244px] top-[198px] w-[104px] h-[128px]"
      />
      <button
        type="button"
        onClick={onReconcile}
        aria-label="Stock Reconciliation"
        className="absolute left-[128px] top-[342px] w-[104px] h-[128px]"
      />
    </div>
  );
}
