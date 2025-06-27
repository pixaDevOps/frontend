"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/sidebar/Sidebar";
import StatsCard from "../../components/cards/StatCard";
import { PieChart } from "../../components/charts/PieChart";
import { LineGraph } from "../../components/charts/LineGraph";
import { TopSellingProducts } from "./TopSellingProducts";
import { RecentOrders } from "../../components/orders/RecentOrders";
import { useSidebar } from "../../hooks/useSidebar";
import TotalUserIcon from "../../assets/icons/User.svg";
import TotalOrderIcon from "../../assets/icons/Order.svg";
import TotalSalesIcon from "../../assets/icons/Sales.svg";
import TotalTaxIcon from "../../assets/icons/Tax.svg";
import CalendarModal from "../../components/ui/CalendarModal";
import CalendarAssetIcon from "../../assets/icons/calendarIcon.svg";
import DashboardHeader from "./DashboardHeader";

const Dashboard = () => {
  const { isDarkMode, toggleDarkMode } = useSidebar();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const statsData = [
    {
      title: "Total Users",
      value: "40,689",
      change: 8.5,
      changeType: "up",
      customIcon: TotalUserIcon,
      borderColor: "border-blue-600",
    },
    {
      title: "Total Orders",
      value: "10,293",
      change: 1.3,
      changeType: "up",
      customIcon: TotalOrderIcon,
      borderColor: "border-yellow-500",
    },
    {
      title: "Total Sales",
      value: "₹ *****",
      change: -4.3,
      changeType: "down",
      customIcon: TotalSalesIcon,
      borderColor: "border-green-500",
    },
    {
      title: "Total Tax",
      value: "₹2,040",
      change: 1.8,
      changeType: "up",
      customIcon: TotalTaxIcon,
      borderColor: "border-red-500",
    },
  ];

  const pieChartData = [
    { label: "Crystals", value: 25, color: "#3B82F6" },
    { label: "Personal Care", value: 15, color: "#F59E0B" },
    { label: "Food Products", value: 8, color: "#EF4444" },
    { label: "Books", value: 52, color: "#10B981" },
  ];

  const lineGraphData = [
    { label: "11", value: 20 },
    { label: "12", value: 35 },
    { label: "13", value: 25 },
    { label: "14", value: 45 },
    { label: "15", value: 40 },
    { label: "16", value: 55 },
    { label: "17", value: 50 },
    { label: "18", value: 65 },
    { label: "2pm", value: 45 },
    { label: "4pm", value: 70 },
    { label: "6pm", value: 60 },
    { label: "8pm", value: 75 },
  ];

  const topProducts = [
    { id: "1", name: "Product Full Name", price: 555000, sales: 40, status: "In Stock", rank: 1 },
    { id: "2", name: "Product Full Name", price: 555000, sales: 40, status: "In Stock", rank: 1 },
  ];

  const recentOrders = [
    { id: "000001", customerName: "Customer Full Name", price: 3000, totalProducts: 5, date: "Jun 12" },
    { id: "000002", customerName: "Customer Full Name", price: 5000, totalProducts: 8, date: "Jun 13" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeItem={activeMenuItem}
        onItemClick={setActiveMenuItem}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          title="Dashboard"
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onLogout={() => console.log("Logging out...")}
        />

        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"> {/* Reduced mb-8 to mb-6 */}
            {statsData.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Pie Chart + Line Graph */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6 h-[220px]"> {/* Reduced height and margin-bottom */}
            {/* Pie Chart */}
            <div className="col-span-12 lg:col-span-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 flex flex-col border border-gray-200 dark:border-gray-700"> {/* Reduced padding */}
              <div className="flex items-center justify-between mb-6"> {/* Reduced margin-bottom */}
                <h2 className="text-sm font-semibold text-gray-800 dark:text-white">Product Sold</h2> {/* Smaller text */}
                <span className="text-xs text-gray-500 dark:text-gray-400">This Week</span> {/* Smaller text */}
              </div>
              <div className="flex-1 flex items-start justify-center -mt-1"> {/* Adjusted alignment and negative margin */}
                <PieChart data={pieChartData} compact /> {/* Added compact prop */}
              </div>
            </div>

            {/* Line Graph */}
            <div className="col-span-12 lg:col-span-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 flex flex-col border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-md font-semibold text-gray-800 dark:text-white">Sales Performance</h2>
                <button
                  onClick={() => setShowCalendar(true)}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Open Calendar"
                >
                  <img src={CalendarAssetIcon} alt="Calendar" className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <LineGraph data={lineGraphData} />
              </div>
            </div>
          </div>

          {/* Top Products + Recent Orders */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <TopSellingProducts products={topProducts} />
            <RecentOrders orders={recentOrders} />
          </div>
        </main>

        {showCalendar && <CalendarModal onClose={() => setShowCalendar(false)} />}
      </div>
    </div>
  );
};

export default Dashboard;