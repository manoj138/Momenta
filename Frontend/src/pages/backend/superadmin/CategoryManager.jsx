import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { Plus, Trash, Edit, Settings, FolderOpen, Save, X } from "lucide-react";
import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/TextArea";
import Button from "../../../components/common/Button";
import DynamicFormBuilder from "../../../components/features/DynamicFormBuilder";

const CategoryManager = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useApp();
  const [activeCategory, setActiveCategory] = useState(null); // The category currently editing fields
  const [isAdding, setIsAdding] = useState(false);
  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!catName) return;

    const catId = catName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");

    addCategory({
      id: catId,
      name: catName,
      description: catDesc,
      fields: [],
    });

    setCatName("");
    setCatDesc("");
    setIsAdding(false);
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
        /* Category Lists Mode */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Categories Grid list */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-brand-400">Available Categories</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-slate-900 border border-white/5 p-5 rounded-2xl flex flex-col justify-between h-48 hover:border-brand-500/30 transition-all duration-300">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <FolderOpen className="text-brand-400" size={18} />
                      <h4 className="font-bold text-base text-white">{cat.name}</h4>
                    </div>
                    <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">{cat.description}</p>
                    <span className="inline-block text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 px-2 py-0.5 rounded-md font-bold">
                      {cat.fields.length} Configured Fields
                    </span>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1 cursor-pointer bg-transparent border-0"
                    >
                      <Settings size={14} />
                      <span>Edit Fields Schema</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this category?")) {
                          deleteCategory(cat.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-danger hover:bg-red-500/10 cursor-pointer"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Create Category Panel */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-bold text-brand-400">Create Category</h3>
            
            <form onSubmit={handleCreate} className="bg-slate-900 border border-white/5 p-6 rounded-2xl space-y-4">
              <Input
                label="Category Name"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                placeholder="e.g. Anniversary"
                required
              />
              
              <TextArea
                label="Category Description"
                value={catDesc}
                onChange={(e) => setCatDesc(e.target.value)}
                placeholder="Details of the cards and invitations under this category..."
                rows={3}
              />

              <Button type="submit" variant="primary" className="w-full flex items-center justify-center gap-1 cursor-pointer">
                <Plus size={16} />
                <span>Add Category</span>
              </Button>
            </form>
          </div>

        </div>
      )}
    </div>
  );
};

export default CategoryManager;
