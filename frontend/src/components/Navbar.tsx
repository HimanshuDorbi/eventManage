import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Bell } from "lucide-react";

interface NavbarProps {
  isRegistered: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isRegistered, onLogout }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  // Dummy notifications - in real app, these would come from props or API
  const notifications = [
    {
      id: 1,
      text: "New event 'Summer Festival' has been added",
      time: "2 hours ago",
    },
    {
      id: 2,
      text: "Your ticket for 'Tech Conference' is confirmed",
      time: "1 day ago",
    },
    { id: 3, text: "Reminder: 'Workshop' starts tomorrow", time: "2 days ago" },
  ];

  const handleLogout = () => {
    onLogout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-800 p-4 relative">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-white hover:text-indigo-100 transition-colors">
          <Link to="/">EventManage.</Link>
        </div>

        <div className="flex items-center space-x-4">
          {isRegistered && (
            <>
              <Link
                to="/"
                className="px-3 py-2 text-white rounded hover:bg-indigo-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="px-3 py-2 text-white rounded hover:bg-indigo-600 transition-colors"
              >
                Dashboard
              </Link>
            </>
          )}

          {/* Notification Icon */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-white rounded-full hover:bg-indigo-600 transition-colors relative"
            >
              <Bell size={24} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                <h3 className="px-4 py-2 text-lg font-semibold text-gray-700 border-b">
                  Notifications
                </h3>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer"
                    >
                      <p className="text-sm text-gray-700">{notif.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 text-center border-t">
                  <button className="text-sm text-indigo-500 hover:text-indigo-600">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {isRegistered ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-indigo-500 rounded hover:bg-indigo-50 transition-colors"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-white rounded hover:bg-indigo-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-white text-indigo-500 rounded hover:bg-indigo-50 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
