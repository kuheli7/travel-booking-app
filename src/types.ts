export interface Slot {
  id: string;
  time: string;
  capacity: number;
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
  imageUrl: string;
  slotTimes?: Slot[]; // Template slots without dates
  slots?: DateSlots[]; // Generated slots with dates (runtime only)
}
