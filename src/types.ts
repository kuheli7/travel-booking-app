export interface Slot {
  id: string;
  time: string;
  capacity: number;
  // number of spots currently available (may be computed at runtime)
  availableSpots: number;
  // date string when this slot is part of a DateSlots collection
  date: string;
  soldOut?: boolean;
}

export interface DateSlots {
  date: string;
  slots: Slot[];
}

export interface Experience {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  // Frontend components reference `image` — keep both keys to be safe
  imageUrl?: string;
  image?: string;

  // Optional metadata shown on details page
  category?: string;
  rating?: number;
  reviewCount?: number;
  duration?: string;
  tags?: string[];

  slotTimes?: Slot[]; // Template slots without dates
  slots?: DateSlots[]; // Generated slots with dates (runtime only)
}

// Form data sent from the frontend when creating a booking
export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  numberOfPeople: number;
  specialRequests?: string;
}

export interface PromoCode {
  code: string;
  discount: number; // percentage or fixed amount depending on `type`
  type: 'percentage' | 'fixed';
}

export interface Booking {
  id: string;
  experienceId: string;
  slotId: string;
  date: string;
  userDetails: BookingFormData;
  promoCode?: string;
  subtotal: number;
  discount?: number;
  totalPrice: number;
  createdAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  success?: boolean;
  message?: string;
}
