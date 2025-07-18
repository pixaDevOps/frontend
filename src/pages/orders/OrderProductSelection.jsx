import React, { useState, useEffect } from 'react';
import OrderProductLayout from './components/OrderProductLayout';
import Stepper from '../../components/ui/Stepper';
import Button from '../../components/buttons/Buttons';
import { Plus, Minus } from 'lucide-react';
import OrderReviewSummary from './OrderReviewSummary';

// Dummy product list
const DUMMY_PRODUCTS = [
  { id: 'p001', code: '00001', name: 'Drugless Kingdom Book Version-1 (Kannada)' },
  { id: 'p002', code: '00002', name: 'Drugless Kingdom Book Version-1 (English)' },
  { id: 'p003', code: '00003', name: 'Crystal Healing Book (Hindi)' },
  { id: 'p004', code: '00004', name: 'Aura Cleansing Toolkit' },
  { id: 'p005', code: '00005', name: 'Vastu Energy Stickers (Set of 10)' },
];

const OrderProductSelection = ({ isOpen, onClose, onPrev }) => {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const results = DUMMY_PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(results);
  }, [search]);

  const handleQuantityChange = (productId, amount) => {
    setSelectedProducts((prev) => {
      const currentQty = prev[productId]?.quantity || 1;
      const newQty = Math.max(1, currentQty + amount);
      return {
        ...prev,
        [productId]: {
          ...prev[productId],
          quantity: newQty,
        },
      };
    });
  };

  const handleAdd = (product) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [product.id]: {
        ...product,
        quantity: prev[product.id]?.quantity || 1,
      },
    }));
  };

  const isSelected = (productId) => selectedProducts.hasOwnProperty(productId);

  if (showSummary) {
    return (
      <OrderReviewSummary
        isOpen={isOpen}
        onClose={onClose}
        onPrev={() => setShowSummary(false)}
        onDone={() => {
          console.log('Order Placed', selectedProducts);
          onClose();
        }}
        selectedProducts={selectedProducts}
      />
    );
  }

  return (
    <OrderProductLayout
      isOpen={isOpen}
      onClose={onClose}
      title="Add new Order"
      showFooter
      footerContent={
        <>
          <Button onClick={onPrev} size="medium" color="secondary">
            ‹ Prev
          </Button>
          <Button onClick={() => setShowSummary(true)} size="medium">
            Next ›
          </Button>
        </>
      }
    >
      <Stepper currentStep={2} totalSteps={4} />

      <div className="flex flex-col gap-4 pb-6">
        <h4 className="text-sm font-semibold">Add Product</h4>
        <hr />

        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product..."
            className="flex-1 border px-3 py-2 rounded-md text-sm outline-none"
          />
          <Button size="medium" className="min-w-[80px]">
            Done
          </Button>
        </div>

        {/* Product List (only when searched) */}
        {search.trim() === '' ? (
          <p className="text-sm text-gray-400 px-4 py-6 text-center">
            Start typing to search for a product...
          </p>
        ) : (
          <div className="border rounded-md bg-white flex-1 overflow-y-auto scrollbar-hide max-h-[300px]">
            {filteredProducts.length === 0 ? (
              <p className="text-sm text-gray-400 px-4 py-6 text-center">No products found.</p>
            ) : (
              filteredProducts.map((product) => {
                const selected = isSelected(product.id);
                const qty = selectedProducts[product.id]?.quantity || 1;

                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between px-4 py-3 border-b"
                  >
                    <div className="flex flex-col text-sm text-gray-700">
                      <span className="text-[10px] text-gray-400">#{product.code}</span>
                      <span>{product.name}</span>
                    </div>

                    <div className="flex items-center gap-2 min-w-[170px] justify-end">
                      <button
                        onClick={() => handleQuantityChange(product.id, 1)}
                        className="text-blue-600 border border-blue-600 rounded-full w-7 h-7 flex items-center justify-center"
                      >
                        <Plus size={14} />
                      </button>
                      <span className="text-sm w-6 text-center">
                        {qty.toString().padStart(2, '0')}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(product.id, -1)}
                        className="text-blue-600 border border-blue-600 rounded-full w-7 h-7 flex items-center justify-center"
                      >
                        <Minus size={14} />
                      </button>
                      <div className="w-[70px]">
                        <Button
                          size="small"
                          color={selected ? 'gray' : 'secondary'}
                          disabled={selected}
                          onClick={() => handleAdd(product)}
                          className="w-full rounded-sm font-semibold"
                        >
                          {selected ? 'Added' : 'Add'}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </OrderProductLayout>
  );
};

export default OrderProductSelection;
