// src/api/promo.ts
// Promo code validation API
export type PromoResult = {
  code: string;
  type: 'percentage' | 'flat';
  amount: number; // if percentage: 10 means 10% ; if flat: 100 means ₹100
  valid: boolean;
  message?: string;
};

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function validatePromo(code: string): Promise<PromoResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/promo/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    
    if (data.valid && data.promo) {
      return {
        code: data.promo.code,
        type: data.promo.type,
        amount: data.promo.amount,
        valid: true,
        message: 'Promo applied successfully!'
      };
    } else {
      return {
        code: code.toUpperCase(),
        type: 'flat',
        amount: 0,
        valid: false,
        message: data.message || 'Invalid promo code'
      };
    }
  } catch (error) {
    console.error('Promo validation error:', error);
    return {
      code: code.toUpperCase(),
      type: 'flat',
      amount: 0,
      valid: false,
      message: 'Failed to validate promo code'
    };
  }
}
