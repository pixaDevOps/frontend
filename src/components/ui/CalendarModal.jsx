"use client";

import { useState } from "react";
import { format, subDays, subMonths } from "date-fns";
import { X, Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CalendarModal = ({ onClose }) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [activeTab, setActiveTab] = useState("Today");

  const handlePresetClick = (preset) => {
    let startDate, endDate;
    const today = new Date();
    switch (preset) {
      case "Today":
        startDate = endDate = today;
        break;
      case "Last 7days":
        startDate = subDays(today, 6);
        endDate = today;
        break;
      case "Last 15days":
        startDate = subDays(today, 14);
        endDate = today;
        break;
      case "Last 1 Month":
        startDate = subMonths(today, 1);
        endDate = today;
        break;
      case "Custom":
        return setActiveTab("Custom");
      default:
        return;
    }
    setActiveTab(preset);
    setRange([{ startDate, endDate, key: "selection" }]);
  };

  const startDate = range[0].startDate;
  const endDate = range[0].endDate;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4 w-[360px] max-w-full border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-gray-700 dark:text-white" />
            <h2 className="text-base font-bold text-gray-800 dark:text-white">Calendar</h2>
          </div>
          <button onClick={onClose}>
            <X className="text-gray-600 dark:text-white w-5 h-5" />
          </button>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-2 flex-wrap mb-3">
          {["Today", "Last 7days", "Last 15days", "Last 1 Month", "Custom"].map((label) => (
            <button
              key={label}
              onClick={() => handlePresetClick(label)}
              className={`px-2.5 py-1 text-xs rounded-full transition ${
                activeTab === label
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Calendar only if Custom */}
        {activeTab === "Custom" && (
          <>
            <DateRange
              ranges={range}
              onChange={(item) => setRange([item.selection])}
              moveRangeOnFirstSelection={false}
              months={1}
              direction="horizontal"
              className="mb-3"
            />
          </>
        )}

        {/* Footer */}
        <p className="text-xs text-gray-500 dark:text-gray-300 mb-3">
          From: {format(startDate, "dd MMM yyyy")} <br />
          To: {format(endDate, "dd MMM yyyy")}
        </p>
        <button className="w-full bg-blue-600 text-white py-1.5 rounded text-sm hover:bg-blue-700 transition">
          Apply
        </button>
      </div>
    </div>
  );
};

export default CalendarModal;
