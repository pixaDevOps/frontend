// src/pages/products/AddProductSuccess.js

import React from 'react';
import AddProductLayout from '../../components/ui/AddProductLayout';
import Stepper from '../../components/ui/Stepper';
import successIcon from '../../assets/icons/ProductAdded.svg'; 

const AddProductSuccess = ({ isOpen, onClose, productId, imagePreview }) => {
  return (
    <AddProductLayout
      isOpen={isOpen}
      onClose={onClose}
      title={`Add Product #${String(productId).padStart(5, '0')}`}
      imageSrc={imagePreview}
      onImageChange={() => {}}
      widthClass="max-w-4xl"
      heightClass="max-h-[365px]"
    >
      <Stepper currentStep={4} totalSteps={4} />

      <div className="flex flex-col items-center justify-center w-full mt-4">
        <img src={successIcon} alt="Success" className="w-80 h-auto mb-4" />
        <h2 className="text-xl font-bold text-green-600 text-center">
          Product Successfully Added
        </h2>
      </div>
    </AddProductLayout>
  );
};

export default AddProductSuccess;
