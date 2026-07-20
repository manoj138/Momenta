import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { Plus, Trash, Edit, Settings, FolderOpen, Save, X } from "lucide-react";
import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/TextArea";
import Button from "../../../components/common/Button";
import DynamicFormBuilder from "../../../components/features/DynamicFormBuilder";
import { categoryService } from "../../../services/categoryService";

const CategoryManager = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useApp();
  const [activeCategory, setActiveCategory] = useState(null); // The category currently editing fields
  const [isAdding, setIsAdding] = useState(false);
  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!catName) return;

    const catId = catName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");

    const payload = {
      name: catName,
      slug: catId,
      description: catDesc,
      icon: "✨"
    };

    try {
      const res = await categoryService.create(payload);
      addCategory({
        id: res.data?.slug || catId,
        name: catName,
        description: catDesc,
        fields: []
      });
    } catch (err) {
      console.error("Failed to create category on backend:", err);
      addCategory({
        id: catId,
        name: catName,
        description: catDesc,
        fields: []
      });
    }

    setCatName("");
    setCatDesc("");
    setIsAdding(false);
  };

  const handleDelete = async (catId) => {
    try {
      await categoryService.delete(catId);
    } catch (err) {
      console.warn("Failed to delete category on backend:", err);
    }
    deleteCategory(catId);
  };

  const handleSaveFields = (fieldsList) => {
    if (!activeCategory) return;
    updateCategory(activeCategory.id, { fields: fieldsList });
    setActiveCategory(null);
  };

  return (
    <div className="p-6 md:p-10 space-y-8 bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Category Schemas</h1>
        <p className="text-gray-400 text-sm">Configure dynamic form definitions and properties for every card experience category.</p>
      </div>

      {activeCategory ? (
        /* Edit Field Definitions Mode */
        <div className="bg-slate-900 border border-white/5 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div>
              <span className="text-xs text-brand-400 font-bold uppercase tracking-wider">Managing schemas for</span>
              <h2 className="text-xl font-bold text-white">{activeCategory.name} Category</h2>
            </div>
            <button
              onClick={() => setActiveCategory(null)}
              className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <DynamicFormBuilder
            initialFields={activeCategory.fields}
            onSave={handleSaveFields}
          />
        </div>
      ) : (
        /* List Mode */
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">All Categories ({categories.length})</h2>
            <Button
              variant="primary"
              size="sm"
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsAdding(!isAdding)}
            >
              <Plus size={16} />
              <span>{isAdding ? "Cancel" : "Add New Category"}</span>
            </Button>
          </div>

          {isAdding && (
            <form onSubmit={handleCreate} className="bg-slate-900 border border-white/5 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold">New Category Details</h3>
              <Input
                label="Category Display Name"
                placeholder="e.g., House Warming / Vastu Shanti"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                required
              />
              <TextArea
                label="Short Description"
                placeholder="Brief summary of what this category is used for..."
                value={catDesc}
                onChange={(e) => setCatDesc(e.target.value)}
              />
              <div className="flex gap-3">
                <Button variant="primary" type="submit" size="sm" className="cursor-pointer">Save Category</Button>
                <Button variant="outline" size="sm" type="button" onClick={() => setIsAdding(false)} className="cursor-pointer">Cancel</Button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-slate-900 border border-white/5 p-6 rounded-2xl flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                      <FolderOpen size={20} />
                    </div>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="text-gray-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                      title="Delete category"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                  <h3 className="text-lg font-bold">{cat.name}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2">{cat.description || "No description provided."}</p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{(cat.fields || []).length} Custom Fields</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1.5 text-xs bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer"
                    onClick={() => setActiveCategory(cat)}
                  >
                    <Settings size={14} />
                    <span>Manage Fields</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;
