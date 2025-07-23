import NotificationIcon from "../../assets/icons/Notification.svg";
import LogoutIcon from "../../assets/icons/LogoutIcon.svg";
import { ThemeToggle } from "../../components/ui/ThemeToggle";

const DashboardHeader = ({ title, onLogout }) => {
  return (
    <header className="px-6 py-3 border-b border-bordergray bg-basewhite dark:bg-gray-800 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary dark:text-white">{title}</h1>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          <button
            className="relative p-2 text-placeholdergray dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
            aria-label="View notifications"
          >
            <img src={NotificationIcon} alt="Notifications" className="w-5 h-5" />
            <span className="absolute -top-0 bottom-0 -right-0 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center">
              3
            </span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600 transition"
          >
            <img src={LogoutIcon} alt="Logout icon" className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};


export default DashboardHeader;
