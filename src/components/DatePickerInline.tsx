import clsx from "clsx";

/**
 * Props:
 * - dates: array of date strings (YYYY-MM-DD)
 * - selected: selected date
 * - onSelect: (d:string) => void
 *
 * Display pills like "Oct 22" matching Figma look.
 */

function formatShortDate(iso: string) {
  try {
    const d = new Date(iso);
    const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return d.toLocaleDateString('en-US', opts);
  } catch {
    return iso;
  }
}

export default function DatePickerInline({ dates, selected, onSelect }: {
  dates: string[];
  selected?: string | null;
  onSelect: (d: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {dates.map((d) => {
        const isSelected = selected === d;
        return (
          <button
            key={d}
            onClick={() => onSelect(d)}
            className={clsx(
              "px-3 py-2 rounded-md border text-sm",
              isSelected ? "bg-brandYellow text-black border-brandYellow" : "bg-white border-gray-200 text-gray-700"
            )}
            aria-pressed={isSelected}
          >
            {formatShortDate(d)}
          </button>
        );
      })}
    </div>
  );
}
