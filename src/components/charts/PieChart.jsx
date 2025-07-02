import React from "react";

export const PieChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  const createPath = (percentage, cumulative) => {
    const startAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;
    const endAngle = ((cumulative + percentage) / 100) * 2 * Math.PI - Math.PI / 2;

    const x1 = 50 + 40 * Math.cos(startAngle);
    const y1 = 50 + 40 * Math.sin(startAngle);
    const x2 = 50 + 40 * Math.cos(endAngle);
    const y2 = 50 + 40 * Math.sin(endAngle);

    const largeArc = percentage > 50 ? 1 : 0;

    return `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="flex items-start p-6 px-2 justify-between w-full"> {/* Changed from items-center to items-start */}
      {/* Chart */}
      <div className="relative -mt-2"> {/* Added wrapper div with negative margin-top */}
        <svg
          width="160"
          height="160"
          viewBox="0 0 100 100"
          className="transform -rotate-90"
        >
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const path = createPath(percentage, cumulativePercentage);
            cumulativePercentage += percentage;

            return (
              <path
                key={index}
                d={path}
                fill={item.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            );
          })}
          <circle cx="50" cy="50" r="25" fill="white" className="dark:fill-gray-800" />
        </svg>
      </div>

      {/* Legend */}
      <ul className="ml-8 space-y-2 mt-2"> {/* Added mt-2 to legend */}
        {data.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between text-sm text-gray-900 dark:text-white font-medium w-[140px]"
          >
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span>{item.label}</span>
            </div>
            <span className="font-bold text-lg">
              {String(Math.round((item.value / total) * 100)).padStart(2, "0")}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};