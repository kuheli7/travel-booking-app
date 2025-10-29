// src/api/bookings.ts
// POST booking to backend API
export type BookingPayload = {
  experienceId: string;
  title?: string;
  date: string;
  slotId: string;
  slotTime?: string;
  qty: number;
  price: number;
  user: { name: string; email: string };
  promo?: { code: string; discountAmount: number };
};

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function createBooking(payload: BookingPayload): Promise<{ success: boolean; ref?: string; message?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, message: error.error || 'Booking failed' };
    }

    const data = await response.json();
    return { success: data.success, ref: data.ref, message: data.message };
  } catch (error) {
    console.error('Booking API error:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
}
