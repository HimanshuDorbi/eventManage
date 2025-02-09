import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserIdFromToken } from "../utils/getUserFromToken";
import {
  Calendar,
  MapPin,
  Users,
  Tag,
  ChevronLeft,
  Instagram,
  Linkedin,
  MessageCircle,
  Check,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { Event } from "../types/Event";

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUnregisterModal, setShowUnregisterModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const navigate = useNavigate();
  const MAX_CAPACITY = 50; // Maximum event capacity

  // Calculate time remaining
  useEffect(() => {
    if (!event) return;

    const calculateTimeLeft = () => {
      const eventDate = new Date(event.date).getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [event]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken();

    axios
      .get(`http://localhost:8085/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEvent(response.data);
        setIsRegistered(response.data.attendees.includes(userId));
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
        if (error.response?.status === 401) {
          toast.error("Unauthorized. Please log in again.");
        }
      });
  }, [id]);

  const handleRegister = async () => {
    const userId = getUserIdFromToken();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:8085/api/events/${id}/register`,
        { userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Registered successfully");
      setEvent((prevEvent) =>
        prevEvent
          ? ({
              ...prevEvent,
              attendees: [...prevEvent.attendees, userId],
            } as Event)
          : null
      );
      setIsRegistered(true);
      setShowSuccessModal(true);
    } catch (error) {
      toast.error("Registration failed");
      console.error("Error during registration:", error);
    }
  };

  const handleUnregisterConfirm = async () => {
    const userId = getUserIdFromToken();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:8085/api/events/${id}/unregister`,
        { userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Unregistered successfully");
      setEvent((prevEvent) =>
        prevEvent
          ? ({
              ...prevEvent,
              attendees: prevEvent.attendees.filter(
                (attendee) => attendee !== userId
              ),
            } as Event)
          : null
      );
      setIsRegistered(false);
      setShowUnregisterModal(false);
    } catch (error) {
      toast.error("Unregistration failed");
      console.error("Error during unregistration:", error);
    }
  };

  const Modal: React.FC<{
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
  }> = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
        <div className="relative bg-white w-96 rounded-lg shadow-xl transform transition-all duration-300 scale-100">
          <div className="h-96 flex flex-col justify-between p-8">
            {children}
          </div>
        </div>
      </div>
    );
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const categories = event.category
    .split(",")
    .map((category) => category.trim());
  const seatsLeft = MAX_CAPACITY - event.attendees.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/")}
          className="group mb-8 inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
        >
          <ChevronLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Back to Events</span>
        </button>

        {/* Countdown Banner */}
        <div className="bg-indigo-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-indigo-500 mr-2" />
              <span className="font-medium text-indigo-800">
                Event starts in:
              </span>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <span className="block text-2xl font-bold text-indigo-800">
                  {timeLeft.days}
                </span>
                <span className="text-sm text-indigo-600">days</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-indigo-800">
                  {timeLeft.hours}
                </span>
                <span className="text-sm text-indigo-600">hours</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-indigo-800">
                  {timeLeft.minutes}
                </span>
                <span className="text-sm text-indigo-600">minutes</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-indigo-800">
                  {timeLeft.seconds}
                </span>
                <span className="text-sm text-indigo-600">seconds</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Header Section */}
            <div className="border-b border-gray-200 pb-8 mb-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl font-bold text-gray-900">
                  {event.title}
                </h1>
                {seatsLeft <= 10 && (
                  <div className="bg-red-50 px-4 py-2 rounded-full">
                    <p className="text-red-600 font-semibold animate-pulse">
                      Only {seatsLeft} seats left!
                    </p>
                  </div>
                )}
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-3 text-indigo-500" />
                  <span>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-3 text-indigo-500" />
                  <span>{event.location}</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <Users className="w-5 h-5 mr-3 text-indigo-500" />
                  <span>{event.attendees.length} Attendees</span>
                </div>

                <div className="flex items-start">
                  <Tag className="w-5 h-5 mr-3 text-indigo-500 mt-1" />
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category, index) => (
                      <span
                        key={index}
                        className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Section */}
              <div className="lg:border-l lg:pl-8 lg:border-gray-200">
                <div className="space-y-6">
                  <div className="flex justify-center">
                    {isRegistered ? (
                      <button
                        onClick={() => setShowUnregisterModal(true)}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                      >
                        Unregister
                      </button>
                    ) : (
                      <button
                        onClick={handleRegister}
                        disabled={seatsLeft === 0}
                        className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors duration-200 ${
                          seatsLeft === 0
                            ? "bg-gray-300 cursor-not-allowed text-gray-500"
                            : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                      >
                        {seatsLeft === 0 ? "Event Full" : "Register Now"}
                      </button>
                    )}
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Share Event
                    </h3>
                    <div className="flex space-x-4">
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                      >
                        <Instagram className="w-5 h-5 text-pink-500" />
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                      >
                        <Linkedin className="w-5 h-5 text-indigo-500" />
                      </a>
                      <a
                        href="https://discord.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                      >
                        <MessageCircle className="w-5 h-5 text-purple-500" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="bg-green-100 p-3 rounded-full mb-6">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Registration Successful!
          </h2>
          <p className="text-gray-600 text-center mb-8">
            You're all set! We've saved your spot for the event.
          </p>
          <button
            onClick={() => setShowSuccessModal(false)}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Got it, thanks!
          </button>
        </div>
      </Modal>

      {/* Unregister Modal */}
      <Modal
        isOpen={showUnregisterModal}
        onClose={() => setShowUnregisterModal(false)}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="bg-red-100 p-3 rounded-full mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Confirm Unregistration
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Are you sure you want to unregister from this event?
          </p>
          <div className="flex gap-4 w-full">
            <button
              onClick={handleUnregisterConfirm}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Yes, Unregister
            </button>
            <button
              onClick={() => setShowUnregisterModal(false)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EventDetails;
