import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
// import Sidebar from '../components/Sidebar1';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import EventSearch from "../components/EventSearch";

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8085/api/events/public/all")
      .then((response) => {
        setEvents(response.data);
        setFilteredEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching all events:", error);
        setLoading(false);
      });
  }, []);

  const handleExplore = (eventId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized. Please SignIn to explore the event.");
    } else {
      navigate(`/event/${eventId}`);
    }
  };

  const handleFilter = (filters: {
    location: string;
    month: string;
    tags: string[];
  }) => {
    let filtered = events;
    if (filters.location) {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.month) {
      const selectedMonth = new Date(filters.month).getMonth();
      filtered = filtered.filter(
        (event) => new Date(event.date).getMonth() === selectedMonth
      );
    }
    if (filters.tags.length) {
      filtered = filtered.filter((event) =>
        filters.tags.every((tag) =>
          event.category.toLowerCase().includes(tag.toLowerCase())
        )
      );
    }
    setFilteredEvents(filtered);
  };

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
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* <Sidebar onFilter={handleFilter} /> */}
        <div className="flex-1">
          <header className="bg-indigo-500 text-white py-20 px-6">
            <div className="max-w-6xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                Welcome to EventManage.
              </h1>
              <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
                Discover and join amazing events happening near you
              </p>
              <div className="mt-8">
                <button className="bg-white text-indigo-500 font-bold py-3 px-8 rounded-none ">
                  Get Started
                </button>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <section className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">
                  Upcoming Events
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Find events that suit your interests and join the community
                </p>
              </div>
              <EventSearch onSearch={handleSearch} />

              {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map((event) => (
                    <div
                      key={event._id}
                      className="transform transition-all duration-300 hover:-translate-y-2"
                    >
                      <EventCard event={event} onExplore={handleExplore} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white shadow-sm">
                  <p className="text-xl text-gray-600">
                    No events match your filters
                  </p>
                  {/* <p className="text-gray-500 mt-2">
                    Try adjusting your search criteria
                  </p> */}
                </div>
              )}
            </section>
          </main>

          <div className="bg-indigo-500 text-white py-16 px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold">
                Ready to Create Your Own Event?
              </h2>
              <p className="text-xl text-indigo-100">
                Share your passion with the community and organize unforgettable
                experiences
              </p>
              <button
                onClick={() => navigate("/dashboard/create-event")}
                className="bg-white text-indigo-500 font-bold py-3 px-8 rounded-none hover:bg-indigo-50 transition-all duration-300"
              >
                Create Event
              </button>
            </div>
          </div>

          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
