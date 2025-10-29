// src/components/CheckoutSummary.tsx
import { useMemo, useState } from "react";
import { formatINR } from "../utils/currency";
import type { PromoResult } from "../api/promo";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../api/bookings";

type Props = {
  experienceId: string;
  title: string;
  date: string;
  slotId: string;
  time: string;
  qty: number;
  price: number;
  user: { name: string; email: string } | null;
  promo?: PromoResult | null;
  onSuccess?: (ref: string) => void;
};

export default function CheckoutSummary({ experienceId, title, date, slotId, time, qty, price, user, promo, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const subtotal = useMemo(() => price * qty, [price, qty]);
  const promoDiscount = useMemo(() => {
    if (!promo || !promo.valid) return 0;
    if (promo.type === "percentage") return Math.round(subtotal * (promo.amount / 100));
    return promo.amount;
  }, [promo, subtotal]);

  const taxes = useMemo(() => Math.round((subtotal - promoDiscount) * 0.06), [subtotal, promoDiscount]); // 6%
  const total = useMemo(() => subtotal - promoDiscount + taxes, [subtotal, promoDiscount, taxes]);

  async function handlePay() {
    if (!user) {
      alert("Please fill in your details in the form.");
      return;
    }
    setLoading(true);
    
    try {
      const payload = {
        experienceId,
        date,
        slotId,
        qty,
        price: total,
        user,
        promo: promo?.valid ? { code: promo.code, discountAmount: promoDiscount } : undefined,
      };
      
      console.log('Sending booking payload:', payload);
      
      const result = await createBooking(payload);
      
      console.log('Booking result:', result);
      
      setLoading(false);
      
      if (result.success && result.ref) {
        // Navigate to result page
        if (onSuccess) onSuccess(result.ref);
        else navigate(`/result/${result.ref}`);
      } else {
        alert(result.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred while processing your booking. Please try again.");
      console.error("Booking error:", error);
    }
  }

  return (
    <div className="bg-[#f6f6f6] p-6 rounded-xl-2">
      <div className="text-sm text-gray-600 mb-3 flex justify-between">
        <div>Experience</div>
        <div className="font-medium">{title}</div>
      </div>

      <div className="text-sm text-gray-600 mb-3 flex justify-between">
        <div>Date</div>
        <div>{date}</div>
      </div>

      <div className="text-sm text-gray-600 mb-3 flex justify-between">
        <div>Time</div>
        <div>{time}</div>
      </div>

      <div className="text-sm text-gray-600 mb-3 flex justify-between">
        <div>Qty</div>
        <div>{qty}</div>
      </div>

      <div className="text-sm text-gray-600 mb-2 flex justify-between">
        <div>Subtotal</div>
        <div>{formatINR(subtotal)}</div>
      </div>

      {promo && promo.valid && (
        <div className="text-sm text-gray-600 mb-2 flex justify-between">
          <div>Promo ({promo.code})</div>
          <div>-{formatINR(promoDiscount)}</div>
        </div>
      )}

      <div className="text-sm text-gray-600 mb-4 flex justify-between">
        <div>Taxes</div>
        <div>{formatINR(taxes)}</div>
      </div>

      <hr className="my-3" />

      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">Total</div>
        <div className="text-xl font-bold">{formatINR(total)}</div>
      </div>

      <button
        className={`w-full py-3 rounded-md font-medium ${loading ? "bg-gray-300" : "bg-brandYellow"}`}
        onClick={handlePay}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay and Confirm"}
      </button>
    </div>
  );
}
