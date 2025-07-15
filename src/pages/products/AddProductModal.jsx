import React, { useState, useEffect } from 'react';
import AddProductLayout from '../../components/ui/AddProductLayout';
import defaultImage from '../../assets/images/AddProduct.png';
import Button from '../../components/atoms/Buttons';
import Stepper from '../../components/ui/Stepper';
import AddProductVariantStep from './AddProductVariant';

const AddProductModal = ({ isOpen, onClose }) => {
  const [productId, setProductId] = useState('');
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subCategory: '',
    type: 'virtual',
    description: '',
  });

  const [showVariant, setShowVariant] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const id = Math.floor(10000 + Math.random() * 90000);
      console.log('[ProductModal] Generated product ID:', id);
      setProductId(id);
    }
  }, [isOpen]);

  const categories = [
    { value: '', label: 'Select', disabled: true },
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (e) => {
    setFormData((prev) => ({ ...prev, type: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('[ProductModal] Calling onNext with productId:', productId);
    setShowVariant(true);
  };

  if (showVariant) {
    return (
      <AddProductVariantStep
        isOpen={isOpen}
        onClose={onClose}
        productId={productId}
        onPrev={() => setShowVariant(false)}
        onNext={() => {
          console.log('Go to next step');
        }}
      />
    );
  }

  return (
    <AddProductLayout
      isOpen={isOpen}
      onClose={onClose}
      title={`Add Product #${productId}`}
      imageSrc={imagePreview}
      onImageChange={handleImageChange}
    >
      <Stepper currentStep={1} totalSteps={4} />

      <h3 className="text-base font-bold mb-3 border-b py-2">Product Details</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full max-w-3xl">
        {/* Product Name */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="border px-3 py-2 outline-none rounded-md text-sm w-full"
            required
          />
        </div>

        {/* Category & Sub Category */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex flex-col w-full">
            <label className="text-sm font-semibold mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border px-3 py-2 outline-none rounded-md text-sm"
              required
            >
              {categories.map(({ value, label, disabled }) => (
                <option
                  key={value || 'placeholder-cat'}
                  value={value}
                  disabled={disabled}
                  hidden={disabled}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-sm font-semibold mb-1">Sub Category</label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              className="border px-3 py-2 outline-none rounded-md text-sm"
              required
            >
              {categories.map(({ value, label, disabled }) => (
                <option
                  key={value || 'placeholder-sub'}
                  value={value}
                  disabled={disabled}
                  hidden={disabled}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Type */}
        <div className="flex gap-6 text-slate-500">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="virtual"
              checked={formData.type === 'virtual'}
              onChange={handleTypeChange}
            />
            <span className="text-sm">Virtual</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="physical"
              checked={formData.type === 'physical'}
              onChange={handleTypeChange}
            />
            <span className="text-sm">Physical</span>
          </label>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border px-3 py-2 rounded-md text-sm resize-none w-full outline-none scrollbar-hide"
            required
          />
        </div>

        {/* Footer Button */}
        <div className="flex justify-end pt-3">
          <Button type="submit" size="medium">
            Next ›
          </Button>
        </div>
      </form>
    </AddProductLayout>
  );
};

export default AddProductModal;
