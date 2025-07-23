import React from "react";
import { X } from "lucide-react";
import Button from "../../components/buttons/Buttons";

// Status color mapping
const statusColorMap = {
  Deliver: "bg-green-500",
  "In-progress": "bg-yellow-500",
  Cancel: "bg-red-500",
};

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-xl p-6 relative overflow-hidden">
        
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-red-500" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Header Section */}
        <div className="mb-4 flex justify-between items-start flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-black dark:text-white">
              Order ID : <span>{order.id}</span>
            </h2>
            <p className="text-sm text-black dark:text-white font-semibold">
              {order.name}, Ph no-{order.phone}/{order.phone}
            </p>
            <p className="text-sm text-gray-500 line-clamp-3 max-w-[400px]">
              {order.address}
              <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                Home
              </span>
            </p>
          </div>

          {/* Order Status */}
          <div className="p-6 py-0 px-6">
            <span
              className={`px-8 py-1 rounded-md text-xs font-semibold text-white text-center inline-block min-w-[100px] ${
                statusColorMap[order.status] || "bg-gray-500"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Order Items */}
          <div className="md:col-span-2 border-r pr-4">
            <h3 className="text-base font-bold text-black dark:text-white mb-2">Order</h3>
            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2 scrollbar-hide">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between border-b pb-3">
                  <div className="flex gap-3 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded bg-gray-100"
                    />
                    <div className="text-sm text-black dark:text-white">
                      <p>{item.name}</p>
                    </div>
                  </div>

                  {/* Quantity and Price columns */}
                  <div className="flex items-center gap-6">
                    <div className="text-sm text-gray-500 text-center">
                      <p>Quantity</p>
                      <p className="font-semibold text-black dark:text-white text-sm">
                        {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 text-center">
                      <p>Price</p>
                      <p className="font-semibold text-black dark:text-white text-sm">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-base font-bold text-black dark:text-white mb-2">Pricing</h3>
              <div className="text-sm text-black dark:text-white space-y-3">
                <div className="flex justify-between">
                  <span>Total Cost :</span>
                  <span>₹{order.totalCost}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deliver Charge :</span>
                  <span>₹{order.delivery}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Tax 18% :</span>
                  <span>₹{order.tax}</span>
                </div>
                <div className="flex justify-between font-semibold text-base">
                  <span>Total Amount :</span>
                  <span>₹{order.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Done Button aligned bottom right */}
            <div className="mt-6 pt-4 flex justify-end">
              <Button onClick={onClose} size="large">
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
