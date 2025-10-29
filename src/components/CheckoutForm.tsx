// src/components/CheckoutForm.tsx
import { useState } from "react";
import { validatePromo, type PromoResult } from "../api/promo";

type Props = {
  initialName?: string;
  initialEmail?: string;
  onApplyPromo?: (promo: PromoResult | null) => void;
  onUserChange?: (user: { name: string; email: string }) => void;
};

export default function CheckoutForm({ initialName = "", initialEmail = "", onApplyPromo, onUserChange }: Props) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [promo, setPromo] = useState("");
  const [promoResult, setPromoResult] = useState<PromoResult | null>(null);
  const [terms, setTerms] = useState(false);
  const [loadingPromo, setLoadingPromo] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  // Notify parent when user data changes
  function updateUserData() {
    if (name.trim() && /^\S+@\S+\.\S+$/.test(email)) {
      if (onUserChange) {
        onUserChange({ name: name.trim(), email: email.trim() });
      }
    }
  }

  function validateForm() {
    const e: { name?: string; email?: string } = {};
    if (!name.trim()) e.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleApplyPromo() {
    setLoadingPromo(true);
    setPromoResult(null);
    try {
      const res = await validatePromo(promo);
      setPromoResult(res.valid ? res : res);
      if (onApplyPromo) onApplyPromo(res.valid ? res : null);
    } catch (err) {
      setPromoResult({ code: promo, type: "flat", amount: 0, valid: false, message: "Failed to validate" });
      if (onApplyPromo) onApplyPromo(null);
    } finally {
      setLoadingPromo(false);
    }
  }

  return (
    <div className="bg-[#f1f1f1] p-6 rounded-xl-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={updateUserData}
            className="w-full rounded-md bg-white px-4 py-3"
            placeholder="John Doe"
            aria-label="Full name"
          />
          {errors.name && <div className="text-xs text-red-600 mt-1">{errors.name}</div>}
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={updateUserData}
            className="w-full rounded-md bg-white px-4 py-3"
            placeholder="test@test.com"
            aria-label="Email"
          />
          {errors.email && <div className="text-xs text-red-600 mt-1">{errors.email}</div>}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <input
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          placeholder="Promo code"
          className="flex-1 rounded-md bg-white px-4 py-3"
          aria-label="Promo code"
        />
        <button
          onClick={handleApplyPromo}
          disabled={!promo.trim() || loadingPromo}
          className="bg-black text-white px-4 py-2 rounded-md text-sm"
        >
          {loadingPromo ? "Applying..." : "Apply"}
        </button>
      </div>

      {promoResult && (
        <div className={`p-3 rounded ${promoResult.valid ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"} mb-3`}>
          {promoResult.valid ? `${promoResult.code} applied` : promoResult.message}
        </div>
      )}

      <div className="flex items-center gap-2 text-sm">
        <input id="terms" type="checkbox" checked={terms} onChange={() => setTerms(!terms)} />
        <label htmlFor="terms" className="text-sm text-gray-700">I agree to the terms and safety policy</label>
      </div>

      {/* Make it possible for parent to query validity - expose validateForm via ref or callback.
          For simplicity, parent will call validateForm via DOM: we'll export a method via window (quick hack)
      */}
      <button
        onClick={() => {
          const ok = validateForm();
          // This component doesn't navigate — parent should ask for validity.
          // For demonstration, show a small msg.
          if (!ok) return;
          alert("Form valid. Press Pay to proceed");
        }}
        className="mt-4 bg-transparent text-sm text-gray-600 px-2 py-1"
      >
        Validate form (demo)
      </button>
    </div>
  );
}
