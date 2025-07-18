// src/pages/products/ViewProductModal.jsx
import React from "react";
import Button from "../../components/buttons/Buttons";
import defaultImage from "../../assets/images/AddProduct.png";

const ViewProductModal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  const {
    id,
    name,
    category,
    subCategory,
    description,
    images = [],
    variants = [],
  } = product;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 " >
      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6 scrollbar-hide">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">View Product #{id.toString().padStart(5, "0")}</h2>
          <button onClick={onClose} className="text-2xl font-light">×</button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
          {/* Left - Images */}
          <div>
            <img
              src={images[0] || defaultImage}
              alt="Main"
              className="w-86 h-80 object-cover rounded-lg mb-2"
            />
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumb-${idx}`}
                  className="w-16 h-16 object-cover rounded border border-gray-300"
                />
              ))}
            </div>
          </div>

          {/* Right - Details and Variants */}
          <div>
            <h3 className="text-lg font-semibold border-b pb-1 mb-2">Product Details</h3>
            <div className="mb-2">
              <p className="text-sm font-medium">Product Name</p>
              <p className="text-sm font-semibold  dark:text-gray-300">{name}</p>
            </div>
            <div className="flex gap-4 mb-2">
              <div>
                <p className="text-sm font-medium">Category</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{category}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Sub Category</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{subCategory}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium">Description</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {description || "—"}
              </p>
            </div>

            {/* Variant Section */}
            {variants.length > 0 && (
              <div className="space-y-6">
                {variants.map((variant, idx) => (
                  <div key={idx}>
                    <h4 className="text-sm font-bold border-b pb-1 mb-2">
                      Variant – {idx + 1}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-2">
                     
                      <div>
                        <p className="font-medium">Base Price</p>
                        <p className="line-through">₹{variant.basePrice}</p>
                      </div>
                      <div>
                        <p className="font-medium">Discount</p>
                        <p>{variant.discount || "0%"}</p>
                      </div>
                      <div>
                        <p className="font-medium">HSN Code</p>
                        <p>{variant.hsnCode}</p>
                      </div>
                      <div>
                        <p className="font-medium">GST</p>
                        <p>{variant.gst}</p>
                      </div>
                      <div>
                        <p className="font-medium">Weight</p>
                        <p>{variant.weight || "—"} Kg</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      {['length', 'width', 'height', 'breadth'].map((dim) => (
                        <div key={dim}>
                          <p className="font-medium capitalize">{dim}</p>
                          <p>{variant.dimensions?.[dim] || "—"} cm</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={onClose} size="medium">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;
