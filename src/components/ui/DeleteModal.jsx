// File: DeleteConfirmationModal.jsx

import React from "react";
import { X } from "lucide-react";
import TrashIcon from "../../assets/icons/trashIcon.svg"; // ✅ replace with your icon
import DeletedBin from "../../assets/icons/deletedBin.svg"; // ✅ replace with your deleted bin icon

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onDelete,
  type = "Category", // or "Sub Category"
  deleted = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-sm p-6 relative text-center border dark:border-gray-700">
        {/* Close Button */}
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-red-500"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {deleted ? (
          <>
            <img
              src={DeletedBin}
              alt="Deleted"
              className="w-24 h-24 mx-auto mb-4"
            />
            <p className="text-lg font-semibold text-red-600">
              {type} <span className="font-bold">Deleted!</span>
            </p>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 rounded-full w-24 h-24 flex items-center justify-center">
                <img src={TrashIcon} alt="Trash" className="w-12 h-12" />
              </div>
            </div>

            <p className="text-sm text-gray-800 dark:text-white mb-4">
              Are you sure you want to delete this
              <span className="font-bold"> {type}</span>?
            </p>

            <button
              onClick={onDelete}
              className="w-full bg-red-600 text-white py-2 rounded font-semibold mb-2 hover:bg-red-700"
            >
              Delete
            </button>

            <button
              onClick={onClose}
              className="text-sm text-red-500 underline hover:text-red-600"
            >
              Keep {type}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
