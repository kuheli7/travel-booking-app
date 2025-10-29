import clsx from "clsx";
import type { Slot } from "../types";

/**
 * Props:
 * - slots: Slot[]
 * - selectedSlotId
 * - onSelect(id)
 *
 * Shows small pill buttons with capacity tags (like "4 left" in orange)
 */

export default function SlotSelector({ slots, selectedSlotId, onSelect }: {
  slots: Slot[];
  selectedSlotId?: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {slots.map(s => {
        const soldOut = s.capacity <= 0;
        const isSelected = s.id === selectedSlotId && !soldOut;
        return (
          <div key={s.id} className="flex items-center gap-2">
            <button
              onClick={() => !soldOut && onSelect(s.id)}
              className={clsx(
                "px-3 py-2 rounded-md text-sm border",
                soldOut ? "bg-gray-200 text-gray-500 cursor-not-allowed" : isSelected ? "bg-brandYellow text-black border-brandYellow" : "bg-white text-gray-700 border-gray-200"
              )}
              aria-disabled={soldOut}
            >
              {s.time}
            </button>

            {!soldOut && (
              <span className="text-xs text-orange-600"> {s.capacity} left</span>
            )}

            {soldOut && (
              <span className="text-xs text-gray-500">Sold out</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
