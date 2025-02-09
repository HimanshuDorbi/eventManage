import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import './CreateEvent.css';

const CreateEvent: React.FC = () => {
  const location = useLocation();
  const eventData = location.state;
  const [title, setTitle] = useState(eventData?.title || "");
  const [description, setDescription] = useState(eventData?.description || "");
  const [date, setDate] = useState(eventData?.date || "");
  const [locationField, setLocationField] = useState(eventData?.location || "");
  const [category, setCategory] = useState(eventData?.category || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    const eventPayload = {
      title,
      description,
      date,
      location: locationField,
      category,
    };

    try {
      if (eventData?._id) {
        // Update existing event
        await axios.put(
          `http://localhost:8085/api/events/${eventData._id}`,
          eventPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Event updated successfully");
      } else {
        // Create new event
        await axios.post("http://localhost:8085/api/events", eventPayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Event created successfully");
      }
      navigate("/dashboard/manage-events");
    } catch (error) {
      toast.error(
        eventData?._id ? "Event update failed" : "Event creation failed"
      );
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {eventData?._id ? "Update Event" : "Create Event"}
          </h1>
          <p className="text-gray-600">
            {eventData?._id
              ? "Update the event details"
              : "Fill in the details to create a new event"}
          </p>
        </div>

        <div className="bg-white shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter event title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter event description"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 min-h-32 resize-y"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={locationField}
                  onChange={(e) => setLocationField(e.target.value)}
                  placeholder="Enter event location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter event categories (comma-separated)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-700"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Separate multiple categories with commas (e.g., Music, Art,
                  Technology)
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className={`flex-1 ${
                  loading ? "bg-gray-300" : "bg-indigo-500 hover:bg-indigo-600"
                } text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200`}
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : eventData?._id
                  ? "Update Event"
                  : "Create Event"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard/manage-events")}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      {loading && (
        <>
          <div className="overlay"></div>
          <div className="loader"></div>
        </>
      )}
    </div>
  );
};

export default CreateEvent;
