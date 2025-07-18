// Updated AddProductLayout.jsx
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
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-5xl border border-gray-300 dark:border-gray-700 p-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-black dark:text-white">{title}</h2>
          <button onClick={onClose} className="text-red-500">
            <X size={22} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-4 max-h-[90vh] overflow-y-auto">
         <div className={`w-full ${imageWidth} flex-shrink-0`}>
  <div className="relative w-full h-[450px] rounded-xl overflow-hidden border border-gray-300 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800 dark:to-purple-900">
    <label className="w-full h-full block cursor-pointer relative">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onImageChange}
      />
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Selected"
          className="w-full h-full object-cover"
        />
      )}
    </label>
  </div>
</div>


          {/* Right Side: Form */}
          <div className="flex-1 min-h-[360px] overflow-y-auto pr-1 scrollbar-hide">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductLayout;