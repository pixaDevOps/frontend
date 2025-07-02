"use client";

import { useState } from "react";
import { subDays, subMonths } from "date-fns";
import { X } from "lucide-react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import CalendarIcon from '../../assets/icons/Calendar.svg';

const PRESETS = ["Today", "Last 7days", "Last 15days", "Last 1 Month", "Custom"];

const getDateRangeForPreset = (preset) => {
  const today = new Date();
  switch (preset) {
    case "Today":
      return [today, today];
    case "Last 7days":
      return [subDays(today, 6), today];
    case "Last 15days":
      return [subDays(today, 14), today];
    case "Last 1 Month":
      return [subMonths(today, 1), today];
    default:
      return [today, today];
  }
};

const CalendarModal = ({ onClose, onApply }) => {
  const [range, setRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [activeTab, setActiveTab] = useState("Today");

  const handlePresetClick = (preset) => {
    if (preset === "Custom") {
      setActiveTab("Custom");
      return;
    }
    const [startDate, endDate] = getDateRangeForPreset(preset);
    setActiveTab(preset);
    setRange([{ startDate, endDate, key: "selection" }]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
<div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 w-[420px] max-w-full border border-gray-200 dark:border-gray-700">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-bold text-gray-800 dark:text-white">Calendar</h2>
          <button onClick={onClose}>
            <X className="text-gray-600 dark:text-white w-5 h-5" />
          </button>
        </div>

        {/* Preset Buttons */}
        <div className="flex justify-center flex-wrap gap-2 mb-4">
          {PRESETS.map((label) => (
            <button
              key={label}
              onClick={() => handlePresetClick(label)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition ${
                activeTab === label
                  ? "bg-secondary text-white"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Illustration or Custom Calendar */}
        {activeTab !== "Custom" ? (
          <div className="flex flex-col items-center my-4">
            <img
              src={CalendarIcon}
              alt="Calendar Illustration"
              className="w-28 h-28 object-contain"
            />
            <p className="mt-2 text-sm font-medium text-black dark:text-white">
              Today’s Data
            </p>
          </div>
        ) : (
          <DateRange
            ranges={range}
            onChange={(item) => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            months={1}
            direction="horizontal"
            className="mb-3"
          />
        )}

        {/* Apply Button */}
        <div className="flex justify-center">
          <button
            onClick={() => onApply && onApply()}
            className="w-1/2 bg-secondary hover:bg-secondary/90 text-white py-1.5 rounded text-sm transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
