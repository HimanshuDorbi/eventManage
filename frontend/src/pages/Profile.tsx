import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "lucide-react";

interface ProfileData {
  name: string;
  email: string;
  username: string;
  createdAt: string;
  role: string;
  location: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch profile
    axios
      .get(`http://localhost:8085/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProfile({
          ...response.data,
          role: "User",
          location: "India",
        });
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-xl text-gray-600">
          Loading your profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Your account information</p>
        </div>

        <div className="bg-white shadow-sm overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full">
                <User className="w-12 h-12 text-indigo-500" />
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-semibold">{profile.name}</h2>
                <p className="opacity-90">{profile.role}</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <p className="mt-1 text-gray-900">{profile.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="mt-1 text-gray-900">{profile.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <p className="mt-1 text-gray-900">@{profile.username}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <p className="mt-1 text-gray-900">{profile.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
