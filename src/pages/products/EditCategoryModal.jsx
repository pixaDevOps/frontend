import React, { useState, useEffect, useRef } from "react";
import ImageIcon from "../../assets/icons/AddImage.svg";
import { X } from "lucide-react";
import Button from "../../components/buttons/Buttons";

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
          <h2 className="text-base font-bold text-black dark:text-white">Add Sub Category</h2>
          <button onClick={onClose} className="text-red-500">
            <X size={22} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* Left: Image + Name */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-300 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800 dark:to-purple-900">
              <label className="w-full h-full block cursor-pointer relative">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {catImage && (
                  <img
                    src={catImage}
                    alt="Category"
                    className="w-full h-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-white bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <img
                      src={ImageIcon}
                      alt="Upload"
                      className="w-12 h-12 opacity-100 mb-2 filter brightness-0"
                    />
                    <span className="text-black text-sm">Change Image</span>
                  </div>
                </div>
              </label>

              {/* Category name input */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white  px-2 py-2 rounded-md text-base font-semibold text-black shadow min-w-[260px] text-center flex items-center justify-center gap-2">
                <input
                  value={catName}
                  onChange={handleCatNameChange}
                  className="bg-transparent w-[180px] outline-none text-center text-base font-semibold"
                />
                {showCatSave && (
                  <Button
                    size="small"
                    color="primary"
                    onClick={saveCatName}
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Subcategories */}
          <div className="w-full md:w-1/2 flex flex-col justify-between h-[360px]">
            <h3 className="text-base font-bold text-black dark:text-white mb-3">Sub Category</h3>

<div className="overflow-y-auto flex-1 pr-1 pb-2 scrollbar-thin  dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {subcategories.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {subcategories.map((sub, idx) => (
                    <div
                      key={idx}
                      className="flex items-center border border-gray-300 rounded px-2 py-1 bg-white dark:bg-gray-800"
                    >
                      <input
                        type="text"
                        value={editingIndex === idx ? editedSubCat : sub}
                        onChange={(e) => setEditedSubCat(e.target.value)}
                        onFocus={() => handleEditSubCat(idx)}
                        readOnly={editingIndex !== idx}
                        className="w-full bg-transparent text-sm text-black dark:text-white outline-none"
                      />
                      {editingIndex === idx && (
                        <Button
                          size="small"
                          color="primary"
                          onClick={saveEditedSubCat}
                          className="ml-2"
                        >
                          Save
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 font-medium text-center py-10">
                  No subcategories found.
                </div>
              )}
            </div>

            <div className="mt-4">
              <label className="font-semibold text-black dark:text-white">
                Sub Category Name
              </label>
              <div className="flex gap-2 mt-1 mb-2">
                <input
                  type="text"
                  placeholder="Enter new sub category"
                  value={newSubCat}
                  onChange={(e) => setNewSubCat(e.target.value)}
                  className="flex-1 px-3 py-1.5 border text-sm rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <Button
                  size="medium"
                  color="primary"
                  onClick={addSubCategory}
                >
                  Add
                </Button>
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-2">
              <Button
                size="large"
                color="primary"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
