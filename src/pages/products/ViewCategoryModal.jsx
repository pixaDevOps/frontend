import React, { useEffect, useRef, useState } from "react";
import ImageIcon from "../../assets/icons/AddImage.svg";
import DeleteIcon from "../../assets/icons/Delete.svg";
import { X } from "lucide-react";
import { DeleteConfirm } from "../../components/ui/DeleteConfirm";
import { DeletedStatus } from "../../components/ui/DeletedStatus";
import Button from "../../components/buttons/Buttons";

const ViewCategoryModal = ({ isOpen, onClose, category, onUpdate, onDelete }) => {
  if (!isOpen || !category) return null;

  const [catName] = useState(category.name || "");
  const [catImage] = useState(category.imageUrl || "");
  const [subcategories, setSubcategories] = useState(category.subcategories || []);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeletedPopup, setShowDeletedPopup] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setSubcategories(category.subcategories || []);
      setIsDeleting(false);
      setIsEditing(false);
      setShowDeletedPopup(false);
    }
  }, [isOpen, category]);

  const handleConfirmedDelete = () => {
    setShowDeleteConfirm(false);

    if (deleteTarget === "category") {
      setIsDeleting(true);
      setDeleteMessage("Category ");
      setShowDeletedPopup(true);

      // Delay onDelete and closing modal
      setTimeout(() => {
        onDelete(category); // triggers delete in parent
        setShowDeletedPopup(false);
        onClose(); // close the modal
      }, 2000);
    } else if (typeof deleteTarget === "number") {
      const updated = [...subcategories];
      updated.splice(deleteTarget, 1);
      setSubcategories(updated);
      setDeleteMessage("Sub Category ");
      setTimeout(() => {
        setShowDeletedPopup(true);
        setTimeout(() => setShowDeletedPopup(false), 2000);
      }, 100);
    }
  };

  const handleUpdate = () => {
    setIsEditing(true);
    onUpdate(category);
  };

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div
          ref={modalRef}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-3xl border border-gray-300 dark:border-gray-700 p-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold text-black dark:text-white">Category</h2>
            <button onClick={onClose} className="text-red-500">
              <X size={22} />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col md:flex-row gap-3">
            {/* Left - Category Image */}
            <div className="w-full md:w-1/2">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-300 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800 dark:to-purple-900 flex items-center justify-center">
                {catImage ? (
                  <img src={catImage} alt="Category" className="w-full h-full object-cover" />
                ) : (
                  <img src={ImageIcon} alt="Add" className="w-12 h-12 opacity-60" />
                )}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1.5 rounded-full text-base font-semibold text-black shadow min-w-[260px] text-center">
                  {catName}
                </div>
              </div>
            </div>

           {/* Right - Subcategories */}
<div className="w-full md:w-1/2 flex flex-col justify-between h-[355px]">
  <div>
    <h3 className="text-base font-bold text-black dark:text-white mb-2">Sub Category</h3>

    <div className="overflow-y-auto max-h-[260px] pr-1 pb-2 scrollbar-thin ">
      {subcategories.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {subcategories.map((sub, idx) => (
            <div
              key={`${sub}-${idx}`}
              className="flex items-center border border-gray-300 rounded px-2 py-1 bg-white dark:bg-gray-800"
            >
              <input
                type="text"
                value={sub}
                readOnly
                className="w-full bg-transparent text-sm text-black dark:text-white outline-none"
              />
              <button
                onClick={() => {
                  setDeleteTarget(idx);
                  setShowDeleteConfirm(true);
                }}
                className="ml-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500"
              >
                <img src={DeleteIcon} alt="Delete" className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-500 font-medium text-center py-10">
          No subcategories found.
        </div>
      )}
    </div>
  </div>

  {/* Buttons pinned to bottom */}
  <div className="flex justify-center gap-4 mt-auto pt-4">
    <Button
      size="fixed"
      color="secondary"
      onClick={handleUpdate}
      disabled={isEditing}
    >
      {isEditing ? "Updating..." : "Edit"}
    </Button>
    <Button
      size="fixed"
      color="danger"
      onClick={() => {
        setDeleteTarget("category");
        setShowDeleteConfirm(true);
      }}
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  </div>
</div>

          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirm
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setDeleteTarget(null);
        }}
        onDelete={handleConfirmedDelete}
        message={deleteTarget === "category" ? " Category?" : " Sub Category?"}
      />

      {/* Deleted Status Popup */}
      <DeletedStatus
        isOpen={showDeletedPopup}
        onClose={() => setShowDeletedPopup(false)}
        message={deleteMessage}
      />
    </>
  );
};

export default ViewCategoryModal;
