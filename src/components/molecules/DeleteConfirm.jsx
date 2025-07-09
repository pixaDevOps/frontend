import React from "react";
import DeleteIcon from "../../assets/icons/TrashIcon.svg";

export const DeleteConfirm = ({ isOpen, onClose, onDelete, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-72 max-w-sm sm:max-w-xs relative shadow-lg">
        {/* Close button
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-500 dark:text-gray-400"
        >
          &times;
        </button> */}

        {/* Content */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img
              src={DeleteIcon}
              alt="Delete Icon"
              className="w-40 h-40 text-red-600"
            />
          </div>

          <p className="text-gray-800 dark:text-gray-100 font-medium mb-4">
           Are you sure You want to delete this 
             <span className="font-bold">
    {message}
  </span>
          </p>
<div className="flex flex-col items-center">


          <button
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded mb-2 w-2/3 text-sm font-semibold"
          >
            Delete
          </button>

          <button
            onClick={onClose}
            className="text-red-600 dark:text-red-400 text-sm  underline"
          >
            Keep Sub Category
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};
