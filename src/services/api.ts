import axios from 'axios';
import type { Experience, Booking, BookingFormData, PromoCode, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const experienceService = {
  // Get all experiences
  getExperiences: async (): Promise<Experience[]> => {
    try {
      const response = await api.get<ApiResponse<Experience[]>>('/experiences');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching experiences:', error);
      // Return mock data for development
      return getMockExperiences();
    }
  },

  // Get single experience by ID
  getExperienceById: async (id: string): Promise<Experience | null> => {
    try {
      const response = await api.get<ApiResponse<Experience>>(`/experiences/${id}`);
      return response.data.data || null;
    } catch (error) {
      console.error('Error fetching experience:', error);
      // Return mock data for development
      const mockData = getMockExperiences();
      return mockData.find(exp => exp.id === id) || null;
    }
  },
};

export const bookingService = {
  // Create a new booking
  createBooking: async (
    experienceId: string,
    date: string,
    slotId: string,
    userDetails: BookingFormData,
    promoCode?: string
  ): Promise<Booking> => {
    try {
      const response = await api.post<ApiResponse<Booking>>('/bookings', {
        experienceId,
        date,
        slotId,
        userDetails,
        promoCode,
      });
      return response.data.data!;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Validate promo code
  validatePromoCode: async (code: string): Promise<PromoCode | null> => {
    try {
      const response = await api.post<ApiResponse<PromoCode>>('/promo/validate', { code });
      return response.data.data || null;
    } catch (error) {
      console.error('Error validating promo code:', error);
      // Return mock promo codes for development
      return getMockPromoCode(code);
    }
  },
};

// Mock data for development (when backend is not available)
function getMockExperiences(): Experience[] {
  return [
    {
      id: 'exp1',
      title: 'Kayaking Adventure',
      location: 'Udupi',
      description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
      price: 999,
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
      tags: ['Water Sports', 'Adventure'],
      slots: [
        {
          date: '2025-10-30',
          slots: [
            { id: 's1', time: '07:00 am', capacity: 4 },
            { id: 's2', time: '09:00 am', capacity: 2 },
            { id: 's3', time: '11:00 am', capacity: 5 },
            { id: 's4', time: '13:00 pm', capacity: 0, soldOut: true },
          ],
        },
        {
          date: '2025-10-31',
          slots: [
            { id: 's5', time: '07:00 am', capacity: 3 },
            { id: 's6', time: '09:00 am', capacity: 4 },
            { id: 's7', time: '11:00 am', capacity: 2 },
            { id: 's8', time: '13:00 pm', capacity: 5 },
          ],
        },
      ],
    },
    {
      id: 'exp2',
      title: 'Mountain Hiking Trek',
      location: 'Himalayas',
      description: 'Experience breathtaking mountain views with expert guides. All equipment provided.',
      price: 1499,
      imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
      tags: ['Adventure', 'Nature'],
      slots: [
        {
          date: '2025-10-30',
          slots: [
            { id: 's9', time: '06:00 am', capacity: 8 },
            { id: 's10', time: '10:00 am', capacity: 6 },
          ],
        },
        {
          date: '2025-10-31',
          slots: [
            { id: 's11', time: '06:00 am', capacity: 5 },
            { id: 's12', time: '10:00 am', capacity: 7 },
          ],
        },
      ],
    },
    {
      id: 'exp3',
      title: 'Wine Tasting Experience',
      location: 'Nashik',
      description: 'Visit premium vineyards and taste exquisite wines with sommelier guidance.',
      price: 1299,
      imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
      tags: ['Food & Wine', 'Luxury'],
      slots: [
        {
          date: '2025-10-30',
          slots: [
            { id: 's13', time: '11:00 am', capacity: 10 },
            { id: 's14', time: '15:00 pm', capacity: 8 },
          ],
        },
      ],
    },
    {
      id: 'exp4',
      title: 'Scuba Diving',
      location: 'Andaman Islands',
      description: 'Explore underwater world with PADI certified instructors. Beginner friendly.',
      price: 2499,
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      tags: ['Water Sports', 'Adventure'],
      slots: [
        {
          date: '2025-10-30',
          slots: [
            { id: 's15', time: '08:00 am', capacity: 4 },
            { id: 's16', time: '12:00 pm', capacity: 3 },
            { id: 's17', time: '14:00 pm', capacity: 0, soldOut: true },
          ],
        },
      ],
    },
    {
      id: 'exp5',
      title: 'Hot Air Balloon Ride',
      location: 'Jaipur',
      description: 'Soar above the Pink City at sunrise. Champagne breakfast included.',
      price: 3999,
      imageUrl: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&q=80',
      tags: ['Adventure', 'Luxury'],
      slots: [
        {
          date: '2025-10-30',
          slots: [
            { id: 's18', time: '05:30 am', capacity: 2 },
            { id: 's19', time: '06:00 am', capacity: 4 },
          ],
        },
      ],
    },
    {
      id: 'exp6',
      title: 'Cooking Class',
      location: 'Mumbai',
      description: 'Learn authentic Indian cuisine from expert chefs. Hands-on experience.',
      price: 899,
      imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
      tags: ['Food & Wine', 'Culture'],
      slots: [
        {
          date: '2025-10-30',
          slots: [
            { id: 's20', time: '10:00 am', capacity: 12 },
            { id: 's21', time: '16:00 pm', capacity: 10 },
          ],
        },
        {
          date: '2025-10-31',
          slots: [
            { id: 's22', time: '10:00 am', capacity: 8 },
            { id: 's23', time: '16:00 pm', capacity: 15 },
          ],
        },
      ],
    },
  ];
}

function getMockPromoCode(code: string): PromoCode | null {
  const promoCodes: Record<string, PromoCode> = {
    SAVE10: { code: 'SAVE10', discount: 10, type: 'percentage' },
    FLAT100: { code: 'FLAT100', discount: 100, type: 'fixed' },
    WELCOME20: { code: 'WELCOME20', discount: 20, type: 'percentage' },
  };

  return promoCodes[code.toUpperCase()] || null;
}
