import React, { useState, ChangeEvent, FormEvent } from "react";
import { Search, Calendar, MapPin, Tag, RefreshCw } from "lucide-react";

interface SearchParams {
  location: string;
  tags: string;
  month: string;
}

interface EventSearchProps {
  onSearch: (params: SearchParams) => void;
}

const initialSearchParams: SearchParams = {
  location: "",
  tags: "",
  month: "",
};

const EventSearch: React.FC<EventSearchProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] =
    useState<SearchParams>(initialSearchParams);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleInputChange = (field: keyof SearchParams, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value.trim(),
    }));
  };

  const handleReset = () => {
    setSearchParams(initialSearchParams);
    onSearch(initialSearchParams);
  };

  // Enhanced input styles for more polish
  const inputClassName =
    "pl-10 h-11 w-full bg-white rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm";
  const iconClassName = "h-5 w-5 text-gray-400";
  const buttonBaseClass =
    "h-11 inline-flex items-center justify-center px-6 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";

  return (
    <form onSubmit={handleSearch} className="w-full p-4">
      <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
        {/* Location Input */}
        <div className="relative flex-1 min-w-[200px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className={iconClassName} />
          </div>
          <input
            type="text"
            placeholder="Search by location..."
            className={inputClassName}
            value={searchParams.location}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("location", e.target.value)
            }
            aria-label="Location search"
          />
        </div>

        {/* Tags Input */}
        <div className="relative flex-1 min-w-[200px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Tag className={iconClassName} />
          </div>
          <input
            type="text"
            placeholder="Search by tags..."
            className={inputClassName}
            value={searchParams.tags}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("tags", e.target.value)
            }
            aria-label="Tags search"
          />
        </div>

        {/* Month Selector */}
        <div className="relative flex-1 min-w-[200px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className={iconClassName} />
          </div>
          <select
            className={`${inputClassName} appearance-none cursor-pointer pr-10`}
            value={searchParams.month}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleInputChange("month", e.target.value)
            }
            aria-label="Month selection"
          >
            <option value="">Select month...</option>
            {months.map((month) => (
              <option key={month} value={month.toLowerCase()}>
                {month}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Buttons */}
        <button
          type="button"
          onClick={handleReset}
          className={`${buttonBaseClass} bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 focus:ring-gray-200 min-w-[130px]`}
          aria-label="Reset filters"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset
        </button>
        <button
          type="submit"
          className={`${buttonBaseClass} bg-indigo-600 text-white border-transparent hover:bg-indigo-700 focus:ring-indigo-200 min-w-[130px]`}
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </button>
      </div>
    </form>
  );
};

export default EventSearch;
