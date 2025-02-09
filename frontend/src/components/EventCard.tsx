import React from "react";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    date: string;
    location: string;
    category: string;
  };
  onExplore?: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onExplore }) => {
  const categories = event.category
    .split(",")
    .map((category: string) => category.trim());

  return (
    <div className="w-full max-w-sm bg-white shadow-md overflow-hidden">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
            {event.title}
          </h3>
        </div>

        {/* Event Details */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-gray-600">
            <CalendarDays className="h-5 w-5" />
            <span className="text-sm">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="h-5 w-5" />
            <span className="text-sm">{event.location}</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Action Button */}
        {onExplore && (
          <button
            onClick={() => onExplore(event._id)}
            className="w-full inline-flex items-center justify-center bg-indigo-400 hover:bg-indigo-500 text-white font-medium py-2.5 px-4 rounded-lg   group"
          >
            Explore Event
            <ArrowRight className="ml-2 h-4 w-4 group-hover:" />
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
