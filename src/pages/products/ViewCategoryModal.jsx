import React, { useEffect, useRef, useState } from "react";
import ImageIcon from "../../assets/icons/AddIamge.svg";
import DeleteIcon from "../../assets/icons/Delete.svg";
import { X } from "lucide-react";

const ViewCategoryModal = ({ isOpen, onClose, category, onUpdate, onDelete }) => {
  if (!isOpen || !category) return null;

  const [catName] = useState(category.name || "");
  const [catImage] = useState(category.imageUrl || "");
  const [subcategories, setSubcategories] = useState(category.subcategories || []);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const modalRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const deleteSubCat = (index) => {
    setSubcategories((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDelete = () => {
    setIsDeleting(true);
    onDelete(category);
  };

  const handleUpdate = () => {
    setIsEditing(true);
    onUpdate(category);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-3xl border border-gray-300 dark:border-gray-700 p-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-bold text-black dark:text-white">Category</h2>
          <button onClick={onClose} aria-label="Close Modal" className="text-red-500">
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-300 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800 dark:to-purple-900 flex items-center justify-center">
              <label className="w-full h-full flex items-center justify-center cursor-default">
                {catImage ? (
                  <img src={catImage} alt="Category" className="w-full h-full object-cover " />
                ) : (
                  <img src={ImageIcon} alt="Add" className="w-12 h-12 opacity-60" />
                )}
              </label>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1.5 rounded-full text-base font-semibold text-black shadow min-w-[260px] text-center">
                {catName}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <h3 className="text-base font-bold text-black dark:text-white mb-3">Sub Category</h3>

            <div className="overflow-y-auto max-h-[280px] pr-1 pb-2 scrollbar-hide">
              {subcategories.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {subcategories.map((sub, idx) => (
                    <div key={`${sub}-${idx}`} className="flex items-center border border-gray-300 rounded px-2 py-1 bg-white">
                      <input
                        type="text"
                        value={sub}
                        readOnly
                        className="w-full bg-transparent text-sm text-black outline-none"
                      />
                      <button
                        aria-label={`Delete subcategory ${sub}`}
                        onClick={() => deleteSubCat(idx)}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        <img src={DeleteIcon} alt="Delete" className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 font-medium text-center py-10">
                  No subcategories found. Please add some to proceed.
                </div>
              )}
            </div>

            {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-4 ">
  <button
    onClick={handleUpdate}
    disabled={isEditing}
    className={`w-32 bg-white border border-gray-300 py-1 rounded text-sm font-bold ${
      isEditing ? "opacity-50 cursor-not-allowed" : "text-black"
    }`}
  >
    {isEditing ? "Updating..." : "Edit"}
  </button>
  <button
    onClick={handleDelete}
    disabled={isDeleting}
    className={`w-32 bg-red-700 text-white py-1 rounded text-sm font-bold ${
      isDeleting ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {isDeleting ? "Deleting..." : "Delete"}
  </button>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCategoryModal;
