import React, { useState } from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import { Sidebar } from "../../components/sidebar/Sidebar";
import SubHeader from "../../hooks/SubHeader";
import AddCategoryModal from "./AddCategoryModal";
import ViewCategoryModal from "./ViewCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import AddCategoryIcon from "../../assets/icons/AddCategory.svg";

const Category = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("products-add-category");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleAddCategory = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
    setShowAddModal(false);
  };

  const handleUpdateCategory = (updatedCat) => {
    setCategories((prev) =>
      prev.map((c) => (c.name === updatedCat.name ? updatedCat : c))
    );
    setShowEditModal(false);
    setShowViewModal(false);
    setSelectedCategory(null);
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setCategories((prev) => prev.filter((cat) => cat !== categoryToDelete));
    setShowEditModal(false);
    setShowViewModal(false);
    setSelectedCategory(null);
  };

  const handleEditFromView = () => {
    setShowViewModal(false);
    setShowEditModal(true);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeItem={activeMenuItem}
        onItemClick={setActiveMenuItem}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <SubHeader
            title="Category"
            buttonText="Add Category"
            icon={AddCategoryIcon}
            onClick={() => setShowAddModal(true)}
          />

<div className="grid grid-cols-2 sm:grid-cols-6 mt-5 gap-4">
  {categories.map((cat, index) => (
    <div
      key={index}
      className="bg-[#6b5b95] rounded-2xl p-3 w-44 h-44 flex flex-col items-center justify-between text-white shadow"
    >
      {/* Image */}
      <img
        src={cat.imageUrl}
        alt={cat.name}
        className="w-full h-f object-cover"
      />

      {/* Truncated Category Name */}
      <span
        onClick={() => {
          setSelectedCategory(cat);
          setShowViewModal(true);
        }}
        className="bg-white text-black px-3 py-[2px] rounded-full text-sm font-semibold w-[140px] text-center cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
        title={cat.name} // Optional: shows full name on hover
      >
        {cat.name}
      </span>
    </div>
  ))}
</div>


          <AddCategoryModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSave={handleAddCategory}
          />

          <ViewCategoryModal
            isOpen={showViewModal}
            category={selectedCategory}
            onClose={() => {
              setShowViewModal(false);
              setSelectedCategory(null);
            }}
            onUpdate={handleEditFromView} // Edit button in View triggers edit modal
            onDelete={handleDeleteCategory}
          />

          <EditCategoryModal
            isOpen={showEditModal}
            category={selectedCategory}
            onClose={() => {
              setShowEditModal(false);
              setSelectedCategory(null);
            }}
            onUpdate={handleUpdateCategory}
          />
        </main>
      </div>
    </div>
  );
};

export default Category;
