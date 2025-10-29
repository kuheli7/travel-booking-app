import { useMemo } from "react";
import { formatINR } from "../utils/currency";
import type { Slot } from "../types";

export default function BookingSummary({ price, selectedSlot, quantity, onChangeQty, onConfirm }:{
  price: number;
  selectedSlot: Slot | null;
  quantity: number;
  onChangeQty: (q: number) => void;
  onConfirm: () => void;
}) {
  const subtotal = useMemo(() => price * quantity, [price, quantity]);
  const taxes = useMemo(() => Math.round(subtotal * 0.06), [subtotal]); // 6% example
  const total = subtotal + taxes;

  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="text-sm text-gray-600">Starts at</div>
        <div className="text-sm font-medium">{formatINR(price)}</div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-600">Quantity</div>
        <div className="flex items-center gap-2">
          <button onClick={() => onChangeQty(Math.max(1, quantity - 1))} className="px-2 py-1 border rounded text-sm">−</button>
          <div className="px-3">{quantity}</div>
          <button onClick={() => onChangeQty(quantity + 1)} className="px-2 py-1 border rounded text-sm">+</button>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <div>Subtotal</div>
        <div>{formatINR(subtotal)}</div>
      </div>

      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <div>Taxes</div>
        <div>{formatINR(taxes)}</div>
      </div>

      <hr className="my-3" />

      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">Total</div>
        <div className="text-xl font-bold">{formatINR(total)}</div>
      </div>

      <button
        disabled={!selectedSlot}
        onClick={onConfirm}
        className={`w-full py-3 rounded-md font-medium transition-colors ${
          selectedSlot 
            ? 'bg-gray-300 hover:bg-brandYellow' 
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        {selectedSlot ? "Confirm" : "Select slot"}
      </button>
    </div>
  );
}
