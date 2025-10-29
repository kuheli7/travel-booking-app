import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Experience, DateSlots, Slot } from "../types";
import DatePickerInline from "../components/DatePickerInline";
import SlotSelector from "../components/SlotSelector";
import BookingSummary from "../components/BookingSummary";
import { getNextNDates } from "../utils/dateUtils";

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // selected controls
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
        const res = await fetch(`${API_URL}/api/experiences/${id}`);
        if (!res.ok) throw new Error("Failed to load");
        const data: any = await res.json();
        
        // Transform MongoDB _id to id for frontend compatibility
        const found: Experience = {
          ...data,
          id: data._id || data.id
        };
        
        // Generate 5 consecutive dates dynamically
        if (found && found.slotTimes) {
          const dynamicDates = getNextNDates(5);
          const dynamicSlots: DateSlots[] = dynamicDates.map((date) => ({
            date,
            slots: found.slotTimes!.map((slotTemplate) => ({
              ...slotTemplate,
              id: `${slotTemplate.id}-${date}`, // unique ID per date
              soldOut: slotTemplate.capacity === 0,
            })),
          }));
          
          // Enrich experience with generated slots
          const enrichedExperience = { ...found, slots: dynamicSlots };
          if (mounted) setExperience(enrichedExperience);

          // preselect first date and first available slot
          if (mounted && dynamicSlots.length > 0) {
            setSelectedDate(dynamicSlots[0].date);
            const firstSlot = dynamicSlots[0].slots.find(s => s.capacity > 0) ?? dynamicSlots[0].slots[0];
            if (firstSlot) setSelectedSlotId(firstSlot.id);
          }
        } else {
          if (mounted) setExperience(found || null);
        }
      } catch (e) {
        setError("Unable to load experience");
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [id]);

  // get available slots for selected date
  const dateSlots: DateSlots | null = useMemo(() => {
    if (!experience || !selectedDate || !experience.slots) return null;
    return experience.slots.find((d) => d.date === selectedDate) || null;
  }, [experience, selectedDate]);

  // find selected slot object
  const selectedSlot: Slot | null = useMemo(() => {
    if (!dateSlots || !selectedSlotId) return null;
    return dateSlots.slots.find(s => s.id === selectedSlotId) || null;
  }, [dateSlots, selectedSlotId]);

  const handleConfirm = () => {
    if (!experience || !selectedDate || !selectedSlot) return;
    // navigate to checkout and pass booking state
    navigate("/checkout", {
      state: {
        experienceId: experience.id,
        title: experience.title,
        date: selectedDate,
        slotId: selectedSlot.id,
        slotTime: selectedSlot.time,
        qty: quantity,
        price: experience.price
      }
    });
  };

  if (loading) return <div className="animate-pulse h-96 bg-white rounded-xl-2" />;

  if (error || !experience) return <div className="text-red-600">{error ?? "Experience not found"}</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left: image, title, description, date/time selectors */}
      <section className="lg:col-span-8">
        <button className="flex items-center gap-2 text-sm text-gray-700 mb-4" onClick={() => window.history.back()}>
          <span className="text-2xl leading-none">←</span> Details
        </button>

        <div className="rounded-xl-2 overflow-hidden mb-6">
          <img src={experience.imageUrl} alt={experience.title} className="w-full h-[420px] object-cover rounded-xl-2" />
        </div>

        <h2 className="text-2xl font-semibold mb-3">{experience.title}</h2>
        <p className="text-sm text-mutedText mb-8">{experience.description}</p>

        <div className="mb-6">
          <h3 className="font-medium mb-3">Choose date</h3>
          <DatePickerInline
            dates={(experience.slots ?? []).map(s => s.date)}
            selected={selectedDate}
            onSelect={(d) => {
              setSelectedDate(d);
              // reset selected slot to first available for new date
              const ds = experience.slots?.find(x => x.date === d);
              const firstAvailable = ds?.slots.find(s => s.capacity > 0);
              setSelectedSlotId(firstAvailable?.id ?? (ds?.slots[0]?.id ?? null));
            }}
          />
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-3">Choose time</h3>
          <SlotSelector slots={dateSlots?.slots ?? []} selectedSlotId={selectedSlotId} onSelect={(id) => setSelectedSlotId(id)} />
          <div className="text-xs text-gray-400 mt-2">All times are in IST (GMT +5:30)</div>
        </div>

        <div className="mb-8">
          <h3 className="font-medium mb-2">About</h3>
          <div className="bg-[#f1f1f1] p-3 rounded">Scenic routes, trained guides, and safety briefing. Minimum age 10.</div>
        </div>
      </section>

      {/* Right: Booking summary */}
      <aside className="lg:col-span-4">
        <div className="bg-[#f6f6f6] p-6 rounded-xl-2">
          <BookingSummary
            price={experience.price}
            selectedSlot={selectedSlot}
            quantity={quantity}
            onChangeQty={(q) => setQuantity(q)}
            onConfirm={handleConfirm}
          />
        </div>
      </aside>
    </div>
  );
}
