import React from "react";
import DeleteIcon from "../../assets/icons/TrashIcon.svg";
import Button from "../buttons/Buttons";
export const DeleteConfirm = ({ isOpen, onClose, onDelete, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-72 max-w-sm sm:max-w-xs relative shadow-lg">

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
            Are you sure you want to delete this{" "}
            <span className="font-bold">{message}</span>?
          </p>

          <div className="flex flex-col items-center">
            <Button
              onClick={onDelete}
              size="fixed"
              color="danger"
              className="mb-2"
            >
              Delete
            </Button>

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
