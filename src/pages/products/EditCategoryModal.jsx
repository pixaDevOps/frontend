import React, { useState, useEffect, useRef } from "react";
import ImageIcon from "../../assets/icons/AddIamge.svg";
import { X } from "lucide-react";

const EditCategoryModal = ({ isOpen, onClose, category, onUpdate }) => {
  if (!isOpen || !category) return null;

  const [catName, setCatName] = useState(category.name || "");
  const [catImage, setCatImage] = useState(category.imageUrl || "");
  const [subcategories, setSubcategories] = useState(category.subcategories || []);
  const [newSubCat, setNewSubCat] = useState("");
  const [showCatSave, setShowCatSave] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedSubCat, setEditedSubCat] = useState("");

  const modalRef = useRef(null);

  useEffect(() => {
    setCatName(category.name || "");
    setCatImage(category.imageUrl || "");
    setSubcategories(category.subcategories || []);
  }, [category]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCatImage(imageUrl);
    }
  };

  const handleCatNameChange = (e) => {
    const value = e.target.value;
    setCatName(value);
    setShowCatSave(value.trim() !== category.name);
  };

  const saveCatName = () => {
    setShowCatSave(false);
  };

  const addSubCategory = () => {
    if (newSubCat.trim() === "") return;
    setSubcategories((prev) => [...prev, newSubCat]);
    setNewSubCat("");
  };

  const handleEditSubCat = (index) => {
    setEditingIndex(index);
    setEditedSubCat(subcategories[index]);
  };

  const saveEditedSubCat = () => {
    const updated = [...subcategories];
    updated[editingIndex] = editedSubCat;
    setSubcategories(updated);
    setEditingIndex(null);
    setEditedSubCat("");
  };

  const handleSave = () => {
    const updatedCategory = {
      ...category,
      name: catName,
      imageUrl: catImage,
      subcategories,
    };
    onUpdate(updatedCategory);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-3xl border border-gray-300 dark:border-gray-700 p-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-bold text-black dark:text-white">Edit Category</h2>
          <button onClick={onClose} className="text-red-500">
            <X size={22} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Image + Name */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-300 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800 dark:to-purple-900 flex items-center justify-center">
              <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-black">
                <input type="file" className="hidden" onChange={handleImageChange} />
                <img
                  src={catImage || ImageIcon}
                  alt="Category"
                  className="w-full h-full object-cover "
                />
                {/* <span className="mt-2 font-medium text-sm">Change Image</span> */}
              </label>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1.5 rounded-full text-base font-semibold text-black shadow min-w-[260px] text-center">
                <input
                  value={catName}
                  onChange={handleCatNameChange}
                  className="bg-transparent w-[180px] outline-none text-center text-base font-semibold"
                />
                {showCatSave && (
                  <button
                    onClick={saveCatName}
                    className="ml-2 text-sm font-semibold px-3 py-1 rounded bg-[#4f46e5] text-white"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Subcategories */}
          <div className="w-full md:w-1/2 flex flex-col justify-between pr-2">
            <h3 className="text-base font-bold text-black dark:text-white mb-3">Sub Category</h3>

            <div className="grid grid-cols-2 gap-3 max-h-[250px] overflow-y-auto pr-1 mb-4">
              {subcategories.map((sub, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingIndex === idx ? editedSubCat : sub}
                    onChange={(e) => setEditedSubCat(e.target.value)}
                    onFocus={() => handleEditSubCat(idx)}
                    readOnly={editingIndex !== idx}
                    className="w-full px-2 py-1 border text-sm rounded"
                  />
                  {editingIndex === idx && (
                    <button
                      onClick={saveEditedSubCat}
                      className="bg-[#4f46e5] text-white text-xs font-semibold px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  )}
                </div>
              ))}
            </div>

            <label className="font-semibold text-black dark:text-white mb-1 mt-1">
              Sub Category Name
            </label>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Enter new sub category"
                value={newSubCat}
                onChange={(e) => setNewSubCat(e.target.value)}
                className="flex-1 px-3 py-2 border text-sm rounded"
              />
              <button
                onClick={addSubCategory}
                className="bg-[#4f46e5] font-semibold text-white px-4 rounded"
              >
                Add
              </button>
            </div>

            <div className="flex justify-center mt-1">
              <button
                onClick={handleSave}
                className="w-32 bg-[#4f46e5] text-white font-semibold py-1.5 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
