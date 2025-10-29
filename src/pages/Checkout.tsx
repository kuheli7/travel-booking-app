// src/pages/Checkout.tsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutSummary from "../components/CheckoutSummary";
import type { PromoResult } from "../api/promo";

/**
 * This page expects navigation state from Details:
 * location.state = {
 *   experienceId, title, date, slotId, slotTime, qty, price
 * }
 *
 * If state is missing (user opened checkout directly), we show a friendly message.
 */

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = (location.state ?? {}) as any;

  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [promo, setPromo] = useState<PromoResult | null>(null);

  // If user opens page without booking data, show fallback
  if (!booking || !booking.experienceId) {
    return (
      <div>
        <button onClick={() => navigate(-1)} className="mb-4 text-sm">← Back</button>
        <div className="p-8 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">No booking found</h2>
          <p className="text-sm text-gray-600">Start by selecting an experience from the home page.</p>
        </div>
      </div>
    );
  }

  const handleApplyPromo = (p: PromoResult | null) => {
    setPromo(p);
  };

  const handleUserChange = (userData: { name: string; email: string }) => {
    setUser(userData);
  };

  const handleSuccess = (ref: string) => {
    navigate(`/result/${ref}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <section className="lg:col-span-8">
        <button className="flex items-center gap-2 text-sm text-gray-700 mb-4" onClick={() => navigate(-1)}>
          <span className="text-2xl leading-none">←</span> Checkout
        </button>

        <div className="bg-[#f1f1f1] p-6 rounded-xl-2">
          <CheckoutForm
            initialName={booking.user?.name ?? ""}
            initialEmail={booking.user?.email ?? ""}
            onApplyPromo={handleApplyPromo}
            onUserChange={handleUserChange}
          />
        </div>
      </section>

      <aside className="lg:col-span-4">
        <CheckoutSummary
          experienceId={booking.experienceId}
          title={booking.title}
          date={booking.date}
          slotId={booking.slotId}
          time={booking.slotTime ?? booking.time ?? '—'}
          qty={booking.qty ?? 1}
          price={booking.price ?? 0}
          user={user}
          promo={promo}
          onSuccess={handleSuccess}
        />
      </aside>
    </div>
  );
}
