"use client";

import React, { useEffect, useState } from "react";
import EyeIcon from "../../assets/icons/Eye.svg";
import EditIcon from "../../assets/icons/Edit.svg";
import DeleteIcon from "../../assets/icons/Delete.svg";
import fallbackImage from "../../assets/images/AddProduct.png";

import AddProductModal from "./AddProductModal";
import ViewProductModal from "./ViewProductModal";
import { DeleteConfirm } from "../../components/ui/DeleteConfirm";
import { DeletedStatus } from "../../components/ui/DeletedStatus";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeletedPopup, setShowDeletedPopup] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, [isEditOpen, isViewOpen]);

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const handleViewClick = (product) => {
    setSelectedProduct(product);
    setIsViewOpen(true);
  };

const handleDeleteClick = (product) => {
  setDeleteTarget(product);
  setDeleteMessage(`product `);
  setShowDeleteConfirm(true);
};


  const handleConfirmedDelete = () => {
    const updated = products.filter((p) => p.id !== deleteTarget?.id);
    localStorage.setItem("products", JSON.stringify(updated));
    setProducts(updated);

    setDeleteMessage("Product ");
    setShowDeleteConfirm(false);
    setShowDeletedPopup(true);

    setTimeout(() => {
      setShowDeletedPopup(false);
      setDeleteTarget(null);
    }, 2000);
  };

  return (
    <div className="overflow-x-auto mt-4 rounded-2xl border border-border bg-background dark:bg-gray-900">
      <table className="min-w-full text-sm">
        <thead className="border-b bg-background dark:bg-gray-800 text-primaryFont dark:text-white font-semibold">
          <tr>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Product ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Stock</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Sub Category</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border dark:divide-gray-700">
          {products.map((item) => (
            <tr
              key={item.id}
              className="text-primaryFont dark:text-white bg-background dark:bg-gray-900  dark:hover:bg-gray-800 transition"
            >
              <td className="p-4">
                <img
                  src={item.images?.[0] || item.image || fallbackImage}
                  onError={handleImageError}
                  alt={item.name || "Product"}
                  className="w-10 h-10 object-cover rounded bg-tabBg"
                />
              </td>
              <td className="p-4 font-medium text-placeholder">#{item.id}</td>
              <td className="p-4">{item.name}</td>
              <td className="p-4">{item.sellingPrice || "—"}</td>
              <td className="p-4">{item.stock ?? "—"}</td>
              <td className="p-4">{item.category}</td>
              <td className="p-4">{item.subCategory}</td>
              <td className="p-4">
                <div className="inline-flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleViewClick(item)}
                    title="View"
                    className="p-2 hover:bg-tabBg dark:hover:bg-gray-800 border-r border-border"
                  >
                    <img src={EyeIcon} alt="View" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditClick(item)}
                    title="Edit"
                    className="p-2 hover:bg-tabBg dark:hover:bg-gray-800 border-r border-border"
                  >
                    <img src={EditIcon} alt="Edit" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item)}
                    title="Delete"
                    className="p-2 hover:bg-tabBg dark:hover:bg-gray-800"
                  >
                    <img src={DeleteIcon} alt="Delete" className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      {isEditOpen && (
        <AddProductModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          editData={selectedProduct}
        />
      )}
      {isViewOpen && (
        <ViewProductModal
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          product={selectedProduct}
        />
      )}
      <DeleteConfirm
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setDeleteTarget(null);
        }}
        onDelete={handleConfirmedDelete}
        message={deleteMessage}
      />
      <DeletedStatus
        isOpen={showDeletedPopup}
        onClose={() => setShowDeletedPopup(false)}
        message={deleteMessage}
      />
    </div>
  );
};

export default ProductTable;
