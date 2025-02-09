import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Pencil,
  Trash2,
  Plus,
  Calendar,
  Users,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  attendees: string[];
}

const ManageEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:8085/api/events/created",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEvents(response.data);
    } catch (error) {
      toast.error("Failed to fetch events");
      console.error("Error fetching created events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (event: Event) => {
    navigate("/dashboard/create-event", { state: event });
  };

  const handleDelete = async () => {
    if (!selectedEventId) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://localhost:8085/api/events/${selectedEventId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEvents(events.filter((event) => event._id !== selectedEventId));
      toast.success("Event deleted successfully");
      setShowDeleteModal(false);
    } catch (error) {
      toast.error("Failed to delete event");
      console.error("Error deleting event:", error);
    }
  };

  const Modal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-lg shadow-xl p-6 w-96 transform transition-all">
          {children}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-xl text-gray-600">
          Loading your events...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Manage Events
            </h1>
            <p className="text-gray-600">
              Create and manage your upcoming events
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/create-event")}
            className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Event
          </button>
        </div>

        {events.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No events created yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start by creating your first event
            </p>
            <button
              onClick={() => navigate("/dashboard/create-event")}
              className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white  shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                    {event.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="flex items-center text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-500 mb-6">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {event.attendees.length} attendees
                    </span>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => handleEdit(event)}
                      className="inline-flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedEventId(event._id);
                        setShowDeleteModal(true);
                      }}
                      className="inline-flex items-center px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedEventId(null);
          }}
        >
          <div className="flex flex-col items-center">
            <div className="bg-red-100 p-3 rounded-full mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Event
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete this event? This action cannot be
              undone.
            </p>
            <div className="flex space-x-4 w-full">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedEventId(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ManageEvents;
