import React from "react";
import { X } from "lucide-react";

const OrderProductLayout = ({
  isOpen,
  onClose,
  title,
  children,
  widthClass = "max-w-xl",
  showFooter = false,
  footerContent = null,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full ${widthClass} h-[90vh] flex flex-col overflow-hidden`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4  border-gray-300 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide">
          {children}
        </div>

        {/* Footer */}
        {showFooter && (
          <div className="px-6 py-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex justify-end gap-4">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderProductLayout;
