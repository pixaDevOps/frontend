"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/sidebar/Sidebar";
import StatsCard from "../../components/cards/StatCard";
import { PieChart } from "../../components/charts/PieChart";
import { LineGraph } from "../../components/charts/LineGraph";
import { TopSellingProducts } from "./TopSellingProducts";
import { RecentOrders } from "../orders/RecentOrders";
import TotalUserIcon from "../../assets/icons/User.svg";
import TotalOrderIcon from "../../assets/icons/Order.svg";
import TotalSalesIcon from "../../assets/icons/Sales.svg";
import TotalTaxIcon from "../../assets/icons/Tax.svg";
import SecretKeyIcon from "../../assets/icons/secretKey.svg";
import CalendarAssetIcon from "../../assets/icons/calendarIcon.svg";
import DashboardHeader from "./DashboardHeader";
import { useTheme } from "../../components/ui/ThemeContext";
import CalendarModal from "../../components/ui/CalendarModal";
import PasskeyModal from "../../components/ui/PasskeyModal";

const Dashboard = () => {
  const { isDark: isDarkMode, toggleTheme: toggleDarkMode } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  const [showPasskeyModal, setShowPasskeyModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSalesChart, setShowSalesChart] = useState(false);
  const [passkey, setPasskey] = useState(["", "", "", "", ""]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleApplyCalendar = () => {
    setShowCalendar(false);
    setTimeout(() => setShowSalesChart(true), 300);
  };

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
      extraIcon: SecretKeyIcon,
      onExtraIconClick: () => setShowPasskeyModal(true),
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
    { label: "Crystals", value: 23980, color: "#3B82F6" },
    { label: "Personal Care", value: 23980, color: "#F59E0B" },
    { label: "Food Products", value: 23980, color: "#EF4444" },
    { label: "Books", value: 23980, color: "#10B981" },
  ];

  const lineGraphData = [];

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
        <DashboardHeader title="Dashboard" onLogout={() => console.log("Logging out...")} />

        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {statsData.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            <div className="col-span-12 lg:col-span-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex flex-col border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-800 dark:text-white">Product Sold</h2>
                <span className="text-xs text-gray-500 dark:text-gray-400">This Week</span>
              </div>
              <div className="flex-1 flex items-start justify-center -mt-1">
                <PieChart data={pieChartData} compact />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 flex flex-col border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-md font-semibold text-gray-800 dark:text-white">Sales Performance</h2>
                <button onClick={() => setShowCalendar(true)} aria-label="Open Calendar">
                  <img src={CalendarAssetIcon} alt="Calendar" className="w-4 h-4" />
                </button>
              </div>
              {/* <LineGraph data={lineGraphData} /> */}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopSellingProducts products={topProducts} />
            <RecentOrders orders={recentOrders} />
          </div>
        </main>

        {/* Passkey Modal */}
        {showPasskeyModal && (
          <PasskeyModal
            passkey={passkey}
            setPasskey={setPasskey}
            onClose={() => setShowPasskeyModal(false)}
            onSubmit={() => {
              if (passkey.join("") === "1234") {
                setShowPasskeyModal(false);
                setShowCalendar(true);
              }
            }}
          />
        )}

        {/* Calendar Modal */}
        {showCalendar && (
          <CalendarModal
            onClose={() => setShowCalendar(false)}
            onApply={handleApplyCalendar}
          />
        )}

        {/* Final Sales Chart Modal */}
{showSalesChart && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-[28%] max-w-xl p-6 relative border border-gray-200 dark:border-gray-700">
      
      {/* Modal Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Amount</h2>
        <button onClick={() => setShowSalesChart(false)} className="text-gray-400 hover:text-red-500 text-xl font-bold">×</button>
      </div>

      {/* Total Sales Card */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 mb-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-sm text-gray-400 font-medium">Total Sales</p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">₹ 23,98,980.87</h3>
          </div>
          <img src={TotalSalesIcon} alt="icon" className="w-10 h-10" />
        </div>
        <div className="flex items-center mt-2 gap-1 text-sm text-red-500 font-medium">
          <span>↓</span> 4.3% Down from yesterday
        </div>
      </div>

      {/* Product Sold */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 h-[300px]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Product Sold</h3>
          <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="font-bold text-blue-500">Today</span>
            <span>·</span>
            <span>Week</span>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Responsive Pie Chart */}
          <div className="flex-shrink-0 w-[50%]">
            <div className="w-full aspect-square">
              <PieChart data={pieChartData} />
            </div>
          </div>

          {/* Legends */}
          {/* <div className="flex flex-col justify-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
            {pieChartData.map((item, index) => (
              <div key={index} className="flex justify-between gap-4 items-center">
                <span className="flex items-center gap-2 min-w-[120px]">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.label}
                </span>
                <span className="font-bold">{Math.round((item.value / 95920) * 100)}%</span>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  </div>
)}


      </div>
    </div>
  );
};

export default Dashboard;
