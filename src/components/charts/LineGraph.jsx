import React from "react";

export const LineGraph = ({ data, title }) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1; // prevent divide-by-zero

  const points = data
    .map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((item.value - minValue) / range) * 80;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="relative h-64">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="currentColor"
              strokeWidth="0.1"
              className="text-gray-200 dark:text-gray-600"
            />
          ))}

          {/* Line path */}
          <polyline
            points={points}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="0.5"
            className="drop-shadow-sm"
          />

          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((item.value - minValue) / range) * 80;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="0.8"
                fill="#3B82F6"
                className="hover:r-1.2 transition-all cursor-pointer"
              />
            );
          })}
        </svg>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
          {data.map((item, index) => (
            <span key={index} className="transform -rotate-45 origin-top-left">
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
