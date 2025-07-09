// DeletedStatus.jsx
import React from "react";
import DeleteIcon from "../../assets/icons/DeletedIcon.svg";

export const DeletedStatus = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-12 w-72 max-w-sm sm:max-w-xs relative shadow-lg">
       
    
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img src={DeleteIcon} alt="Deleted Icon" className="w-44 h-44 text-red-600" />
          </div>
          <p className="text-gray-800 dark:text-gray-100 font-medium mb-4">
                {message}
             <span className="font-bold text-red-800">
              Deleted!
  </span>
          </p>
        </div>
      </div>
    </div>
  );
};