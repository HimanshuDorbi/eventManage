import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";

const RegisteredEvents: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8085/api/events/registered", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching registered events:", error);
        setLoading(false);
      });
  }, []);

  const handleEventClick = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-indigo-500 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-none">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Your Registered Events
            </h1>
            <p className="text-gray-600">Events you're participating in</p>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-xl mb-4">
                No registered events found
              </div>
              <p className="text-gray-400">
                You haven't registered for any events yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event._id}
                  onClick={() => handleEventClick(event._id)}
                  className="cursor-pointer transform transition-transform hover:scale-105"
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisteredEvents;
