// src/pages/products/AddProductImage.jsx
import React, { useState } from 'react';
import AddProductLayout from './components/AddProductLayout';
import Stepper from '../../components/ui/Stepper';
import Button from '../../components/buttons/Buttons';
import defaultImage from '../../assets/images/AddProduct.png';
import deleteIcon from '../../assets/icons/Delete.svg';
import ImageIcon from '../../assets/icons/AddImage.svg';
import AddProductSuccess from './AddProductSuccess';

const AddProductImage = ({ isOpen, onClose, productId, onPrev }) => {
  const [images, setImages] = useState(Array(5).fill(null));
  const [showSuccess, setShowSuccess] = useState(false);

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updated = [...images];
      updated[index] = URL.createObjectURL(file);
      setImages(updated);
    }
  };

  const removeImage = (index) => {
    const updated = [...images];
    updated[index] = null;
    setImages(updated);
  };

  const handleDone = () => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];

    const updated = stored.map((p, i) =>
      i === stored.length - 1
        ? {
            ...p,
            images: images.filter((img) => img !== null),
          }
        : p
    );

    localStorage.setItem("products", JSON.stringify(updated));
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <AddProductSuccess
        isOpen={isOpen}
        onClose={onClose}
        productId={productId}
        imagePreview={images[0] || defaultImage}
      />
    );
  }

  return (
    <AddProductLayout
      isOpen={isOpen}
      onClose={onClose}
      title={`Add Product #${String(productId).padStart(5, '0')}`}
      imageSrc={images[0] || defaultImage}
      onImageChange={() => {}}
      widthClass="max-w-5xl"
      heightClass="max-h-[365px]"
    >
      <Stepper currentStep={3} totalSteps={4} />

      <h4 className="font-bold text-base mb-2 border-b pb-1">Product Images</h4>

      <div className="w-60 aspect-square rounded-xl overflow-hidden mb-3 border border-gray-300 shadow relative">
        <img
          src={images[0] || defaultImage}
          alt="Main Preview"
          className="w-full h-full object-cover"
        />
        {images[0] ? (
          <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1 cursor-pointer text-white text-sm font-medium">
            <img src={ImageIcon} alt="Change" className="w-6 h-6" />
            Change Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(0, e)}
            />
          </label>
        ) : (
          <label className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center gap-1 cursor-pointer text-gray-600 text-sm font-medium">
            <img src={ImageIcon} alt="Add" className="w-6 h-6" />
            Add Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(0, e)}
            />
          </label>
        )}
      </div>

      <div className="grid grid-cols-6 gap-3 mb-3">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="border-2 rounded-md p-1 flex flex-col items-center justify-center relative h-[120px] w-full"
          >
            <div className="relative w-full h-full rounded overflow-hidden">
              {img ? (
                <>
                  <img src={img} alt="Product" className="object-cover w-full h-full" />
                  <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1 cursor-pointer">
                    <img src={ImageIcon} alt="Change" className="w-8 h-8" />
                    <span className="text-xs text-white font-medium text-center">Change Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageChange(idx, e)}
                    />
                  </label>
                </>
              ) : (
                <label className="flex flex-col items-center justify-center text-xs text-secondary gap-1 cursor-pointer h-full w-full">
                  <img src={ImageIcon} alt="Add" className="w-8 h-8" />
                  <span className="text-center">Add Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(idx, e)}
                  />
                </label>
              )}
            </div>

            <button
              onClick={() => removeImage(idx)}
              className={`mt-1 w-full text-xs p-1 rounded border border-gray-300 flex justify-center items-center ${
                img
                  ? 'bg-white text-red-500 hover:bg-red-100'
                  : 'bg-gray-100 text-gray-400 cursor-default pointer-events-none'
              }`}
            >
              <img src={deleteIcon} alt="Delete" className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={onPrev} variant="outline" size="medium">
          ‹ Prev
        </Button>
        <Button onClick={handleDone} size="medium">
          Done ›
        </Button>
      </div>
    </AddProductLayout>
  );
};

export default AddProductImage;
