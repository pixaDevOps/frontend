"use client";

import React, { useState } from "react";
import ImageIcon from "../../assets/icons/AddImage.svg";
import Button from "../../components/buttons/Buttons";

const AddCategory = ({ isOpen, onClose, onSave }) => {
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
      imageUrl: URL.createObjectURL(imageFile),
      imageFile,
    };

    onSave(newCategory);
    setCategoryName("");
    setCategoryType("");
    setImageFile(null);
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-background dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-5 relative border border-bordergray dark:border-gray-700">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500 transition"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-primary dark:text-white mb-5">
          Add New Category
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex gap-4">
          {/* Image Upload */}
          <label className="w-44 aspect-square border-2 border-dashed border-bordergray dark:border-gray-600 bg-blue-50 dark:bg-blue-900/10 rounded-xl flex flex-col items-center justify-center text-blue-600 dark:text-blue-400 cursor-pointer hover:border-blue-400 transition overflow-hidden">
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
                <img src={ImageIcon} alt="Upload" className="w-10 h-10 mb-1" />
                <p className="text-xs font-medium">Add Image</p>
              </>
            )}
          </label>

          {/* Input Fields */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Category Name */}
              <div className="mb-4">
                <label
                  htmlFor="categoryName"
                  className="block text-sm font-medium text-primary dark:text-white mb-1"
                >
                  Category Name
                </label>
                <input
                  id="categoryName"
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full px-3 py-2 text-sm border border-bordergray dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-primary dark:text-white placeholder:text-placeholdergray dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-primary dark:text-white mb-1">
                  Category Type
                </label>
                <div className="flex gap-4 text-sm text-primary dark:text-gray-300">
                  {["virtual", "physical"].map((type) => (
                    <label key={type} className="inline-flex items-center gap-1">
                      <input
                        type="radio"
                        name="categoryType"
                        value={type}
                        checked={categoryType === type}
                        onChange={(e) => setCategoryType(e.target.value)}
                      />
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2">
              <Button type="submit" size="fixed" color="primary" full>
                Add Category
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
