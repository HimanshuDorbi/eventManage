import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import CreateEvent from "./CreateEvent";
import EventSearch from "../components/EventSearch";
import ManageEvents from "./ManageEvents";
import RegisteredEvents from "./RegisteredEvents";
import Profile from "./Profile";
import EventCard from "../components/EventCard";
import { Calendar } from "lucide-react";

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  attendees: string[];
}

const DashboardHome: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8085/api/events/public/all"
        );
        // Sort events by date and take only upcoming events
        const sortedEvents = response.data
          .filter((event: Event) => new Date(event.date) >= new Date())
          .sort(
            (a: Event, b: Event) =>
              new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .slice(0, 6);
        setEvents(sortedEvents);
        setFilteredEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("Failed to fetch events");
      } finally {
        // setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSearch = (searchParams: {
    location: string;
    tags: string;
    month: string;
  }) => {
    let filtered = [...events];

    if (searchParams.location) {
      filtered = filtered.filter((event) =>
        event.location
          .toLowerCase()
          .includes(searchParams.location.toLowerCase())
      );
    }

    if (searchParams.tags) {
      const searchTags = searchParams.tags
        .toLowerCase()
        .split(",")
        .map((tag) => tag.trim());
      filtered = filtered.filter(
        (event) =>
          event.category &&
          searchTags.some((tag) => event.category.toLowerCase().includes(tag))
      );
    }

    if (searchParams.month) {
      filtered = filtered.filter((event) => {
        const eventMonth = new Date(event.date)
          .toLocaleString("default", { month: "long" })
          .toLowerCase();
        return eventMonth === searchParams.month.toLowerCase();
      });
    }

    setFilteredEvents(filtered);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening in your community
        </p>
      </div>
      <EventSearch onSearch={handleSearch} />
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6 mt-3">
          <h2 className="text-xl font-semibold text-gray-900">
            Upcoming Events
          </h2>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onExplore={(eventId) => {
                  const token = localStorage.getItem("token");
                  if (!token) {
                    toast.error("Please log in to view event details");
                  } else {
                    window.location.href = `/event/${eventId}`;
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            {/* <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" /> */}
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Events Found
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};
// Main Dashboard component
const Dashboard: React.FC = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Dashboard");

  useEffect(() => {
    // Update page title based on current route
    const path = location.pathname.split("/").pop() || "";
    const formatTitle = (str: string) => {
      if (str === "") return "Dashboard";
      return str
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };
    setPageTitle(formatTitle(path));
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-900">{pageTitle}</h1>
          </div>
        </header>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/manage-events" element={<ManageEvents />} />
            <Route path="/registered-events" element={<RegisteredEvents />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
