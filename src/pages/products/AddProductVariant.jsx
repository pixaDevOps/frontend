import React, { useState, useRef } from 'react';
import AddProductLayout from '../../components/ui/AddProductLayout';
import Stepper from '../../components/ui/Stepper';
import Button from '../../components/atoms/Buttons';
import defaultImage from '../../assets/images/AddProduct.png';
import { Plus } from 'lucide-react';
import AddProductImage from './AddProductImage';

const initialVariant = {
  sellingPrice: '',
  basePrice: '',
  discount: '',
  hsnCode: '',
  gst: '',
  size: '',
  weight: '',
  dimensions: {
    length: '',
    width: '',
    height: '',
    breadth: '',
  },
};

const AddProductVariantStep = ({ isOpen, onClose, productId, onNext, onPrev }) => {
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const [variantType, setVariantType] = useState('variants');
  const [variants, setVariants] = useState([initialVariant]);
  const [showImageStep, setShowImageStep] = useState(false);

  const scrollRef = useRef(null);
  const bottomRef = useRef(null);

  const handleInputChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleDimensionChange = (index, dim, value) => {
    const updated = [...variants];
    updated[index].dimensions[dim] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants((prev) => {
      const updated = [...prev, initialVariant];
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return updated;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (showImageStep) {
    return (
      <AddProductImage
        isOpen={isOpen}
        onClose={onClose}
        productId={productId}
        onPrev={() => setShowImageStep(false)}
        onNext={onNext}
      />
    );
  }

  return (
    <AddProductLayout
      isOpen={isOpen}
      onClose={onClose}
      widthClass="max-w-4xl"
      title={`Add Product #${String(productId).padStart(5, '0')}`}
      imageSrc={imagePreview}
      onImageChange={handleImageChange}
      scrollClass="overflow-y-auto scrollbar-hide"
    >
      <Stepper currentStep={2} totalSteps={4} />

      <div className="flex gap-3 text-xs font-medium mb-3 text-slate-500">
        <label className="flex gap-1 items-center">
          <input
            type="radio"
            value="single"
            checked={variantType === 'single'}
            onChange={() => setVariantType('single')}
          />
          Single
        </label>
        <label className="flex gap-1 items-center">
          <input
            type="radio"
            value="variants"
            checked={variantType === 'variants'}
            onChange={() => setVariantType('variants')}
          />
          Variants
        </label>
      </div>

      {/* Scrollable Variant Container */}
      <div className="max-h-[365px] overflow-y-auto scrollbar-hide pr-1" ref={scrollRef}>
        {variants.map((variant, index) => (
          <div key={index} className="mb-3 pb-4">
            <h4 className="font-bold border-b text-medium mb-3">Variant – {index + 1}</h4>

            <div className="w-full md:w-2/3 mb-2">
              <label className="text-xs font-semibold mb-1 block">Selling Price</label>
              <input
                type="text"
                placeholder="₹0000"
                value={variant.sellingPrice}
                onChange={(e) => handleInputChange(index, 'sellingPrice', e.target.value)}
                className="border px-3 py-2 rounded-md text-xs w-full outline-none"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-2 w-full md:w-2/3">
              <div className="flex flex-col w-full">
                <label className="text-xs font-semibold mb-1">Base Price</label>
                <input
                  type="text"
                  placeholder="₹0000"
                  value={variant.basePrice}
                  onChange={(e) => handleInputChange(index, 'basePrice', e.target.value)}
                  className="border px-3 py-2 rounded-md text-xs w-full outline-none"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-xs font-semibold mb-1">Discount</label>
                <input
                  type="text"
                  placeholder="00%"
                  value={variant.discount}
                  onChange={(e) => handleInputChange(index, 'discount', e.target.value)}
                  className="border px-3 py-2 rounded-md text-xs w-full outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-2 w-full md:w-2/3">
              <div className="flex flex-col w-full">
                <label className="text-xs font-semibold mb-1">HSN Code</label>
                <input
                  type="text"
                  placeholder="Enter HSN code"
                  value={variant.hsnCode}
                  onChange={(e) => handleInputChange(index, 'hsnCode', e.target.value)}
                  className="border px-3 py-2 rounded-md text-xs w-full outline-none"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-xs font-semibold mb-1">GST</label>
                <input
                  type="text"
                  placeholder="Auto%"
                  value={variant.gst}
                  onChange={(e) => handleInputChange(index, 'gst', e.target.value)}
                  className="border px-3 py-2 rounded-md text-xs w-full outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-2 w-full md:w-2/3">
              <div className="flex flex-col w-full">
                <label className="text-xs font-semibold mb-1">Weight</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="90.00"
                    value={variant.weight}
                    onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                    className="border px-3 py-2 rounded-md text-xs w-full pr-14 outline-none"
                  />
                  <div className="absolute top-0 right-0 h-full flex items-center pr-3 pl-2 border-l border-gray-300 text-xs text-gray-400">
                    Gms
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {['length', 'width', 'height', 'breadth'].map((dim) => (
                <div key={dim} className="flex flex-col">
                  <label className="text-xs font-semibold mb-1 capitalize">{dim}</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="90.00"
                      value={variant.dimensions[dim]}
                      onChange={(e) => handleDimensionChange(index, dim, e.target.value)}
                      className="border px-3 py-2 rounded-md text-xs w-full pr-14 outline-none"
                    />
                    <div className="absolute top-0 right-0 h-full flex items-center pr-3 pl-2 border-l border-gray-300 text-xs text-gray-400">
                      Cm
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Scroll anchor for auto-scroll */}
        <div ref={bottomRef} />
      </div>

      {/* Footer Buttons */}
      <div className="flex items-center justify-between ">
        <button
          onClick={addVariant}
          className="flex items-center gap-2 text-sm text-blue-600 font-medium border border-blue-500 px-3 py-1.5 rounded-md hover:bg-blue-50"
        >
          <Plus size={16} /> Add Variant
        </button>

        <div className="flex gap-2">
          <Button onClick={onPrev} variant="outline" size="medium">
            ‹ Prev
          </Button>
          <Button onClick={() => setShowImageStep(true)} size="medium">
            Next ›
          </Button>
        </div>
      </div>
    </AddProductLayout>
  );
};

export default AddProductVariantStep;
