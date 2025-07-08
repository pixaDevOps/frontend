"use client";

import React, { useState } from "react";
import ImageIcon from "../../assets/icons/AddIamge.svg";

const AddCategoryModal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName || !categoryType || !imageFile) {
      alert("Please fill in all fields");
      return;
    }

    const newCategory = {
      name: categoryName,
      type: categoryType,
      imageFile: imageFile, // used locally with URL.createObjectURL
    };

    onSave(newCategory);

    // Reset form
    setCategoryName("");
    setCategoryType("");
    setImageFile(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-500 dark:text-gray-300 hover:text-red-500 transition"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-5">
          Add New Category
        </h2>

        <form onSubmit={handleSubmit} className="flex gap-4">
          {/* Upload Box */}
          <label className="w-48 aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 flex flex-col items-center justify-center text-blue-600 dark:text-blue-400 cursor-pointer hover:border-blue-400 transition">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {imageFile ? (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <>
                <img src={ImageIcon} alt="Add" className="w-12 h-12 mb-2" />
                <p className="text-sm font-medium">Add Image</p>
              </>
            )}
          </label>

          {/* Fields */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category Name
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter the category name"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category Type
              </label>
              <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="virtual"
                    checked={categoryType === "virtual"}
                    onChange={(e) => setCategoryType(e.target.value)}
                    className="mr-2"
                  />
                  Virtual
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="physical"
                    checked={categoryType === "physical"}
                    onChange={(e) => setCategoryType(e.target.value)}
                    className="mr-2"
                  />
                  Physical
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
