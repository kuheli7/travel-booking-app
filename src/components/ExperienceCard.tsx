import { Link } from "react-router-dom";
import type { Experience } from "../types";

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="bg-white rounded-xl-2 overflow-hidden shadow-subtle transition-transform hover:-translate-y-1">
      <div className="w-full h-44 overflow-hidden">
        <img
          src={experience.imageUrl}
          alt={experience.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4 bg-[#fafafa]">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-brandDark">{experience.title}</h3>
          <span className="ml-2 inline-block bg-gray-100 text-sm text-mutedText rounded px-2 py-1">{experience.location}</span>
        </div>

        <p className="mt-3 text-sm text-mutedText leading-relaxed line-clamp-3">
          {experience.description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-mutedText">
            From <span className="font-bold text-lg">₹{experience.price}</span>
          </div>
          <Link
            to={`/experiences/${experience.id}`}
            className="bg-brandYellow rounded px-3 py-2 text-sm font-medium hover:shadow-md transition-shadow inline-block"
            aria-label={`View details for ${experience.title}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
