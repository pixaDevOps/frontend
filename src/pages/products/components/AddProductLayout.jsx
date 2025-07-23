// AddProductLayout.jsx
import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";

const AddProductLayout = ({
  isOpen,
  onClose,
  title,
  imageSrc,
  onImageChange,
  imageWidth = "md:w-2/5",
  children,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-4">
      <div
        ref={modalRef}
        className="bg-background dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-5xl border border-bordergray dark:border-gray-700 p-4 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-primary dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-red-500 hover:text-red-600 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col md:flex-row gap-4 max-h-[80vh] overflow-y-auto scrollbar-thin">
          {/* Image Upload */}
          <div className={`w-full ${imageWidth} flex-shrink-0`}>
            <div className="relative w-full h-[450px] rounded-xl overflow-hidden border border-bordergray bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800 dark:to-purple-900">
              <label className="w-full h-full block cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onImageChange}
                />
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt="Product Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-sm text-black dark:text-white opacity-70">
                    <p>Click to upload image</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductLayout;
