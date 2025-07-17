import React, { useEffect, useState } from "react";
import EyeIcon from "../../assets/icons/Eye.svg";
import EditIcon from "../../assets/icons/Edit.svg";
import DeleteIcon from "../../assets/icons/Delete.svg";
import fallbackImage from "../../assets/images/AddProduct.png";
import AddProductModal from "../../pages/products/AddProductModal";
import ViewProductModal from "../../pages/products/ViewProductModal";
import { DeleteConfirm } from "../../components/molecules/DeleteConfirm";
import { DeletedStatus } from "../../components/molecules/DeletedStatus";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
    setShowDeleteConfirm(true);
  };

  const handleConfirmedDelete = () => {
    const updated = products.filter((item) => item.id !== deleteTarget?.id);
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
    <div className="overflow-x-auto mt-4 rounded-2xl border border-gray-200 dark:border-gray-700">
      <table className="min-w-full text-sm">
        <thead className="border-b dark:bg-gray-800 text-gray-700 dark:text-white font-medium">
          <tr>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Product ID</th>
            <th className="p-4 text-left">Product Name</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Stock</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Sub Category</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {products.map((item, idx) => (
            <tr key={idx} className="text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900">
              <td className="p-4">
                <img
                  src={item.images?.[0] || item.image || fallbackImage}
                  onError={handleImageError}
                  alt={item.name}
                  className="w-10 h-10 object-cover rounded bg-gray-200"
                />
              </td>
              <td className="p-4 text-gray-600 dark:text-gray-300 font-medium">#{item.id}</td>
              <td className="p-4">{item.name}</td>
              <td className="p-4">{item.sellingPrice || "—"}</td>
              <td className="p-4">—</td>
              <td className="p-4">{item.category}</td>
              <td className="p-4">{item.subCategory}</td>
              <td className="p-4">
                <div className="inline-flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleViewClick(item)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 border-r"
                  >
                    <img src={EyeIcon} alt="View" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditClick(item)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 border-r"
                  >
                    <img src={EditIcon} alt="Edit" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <img src={DeleteIcon} alt="Delete" className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditOpen && (
        <AddProductModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          editData={selectedProduct}
        />
      )}

      {/* View Modal */}
      {isViewOpen && (
        <ViewProductModal
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          product={selectedProduct}
        />
      )}

      {/* Delete Confirmation */}
      <DeleteConfirm
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setDeleteTarget(null);
        }}
        onDelete={handleConfirmedDelete}
        message={deleteMessage}
      />

      {/* Deleted Status */}
      <DeletedStatus
        isOpen={showDeletedPopup}
        onClose={() => setShowDeletedPopup(false)}
        message={deleteMessage}
      />
    </div>
  );
};

export default ProductTable;
