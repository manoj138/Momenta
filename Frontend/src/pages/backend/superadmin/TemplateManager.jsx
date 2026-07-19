import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { Plus, Trash, Edit, Check, X, Palette, Eye } from "lucide-react";
import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/TextArea";
import Select from "../../../components/common/Select";
import Button from "../../../components/common/Button";
import { Link } from "react-router-dom";

const TemplateManager = () => {
  const { templates, categories, addTemplate, updateTemplate, deleteTemplate } = useApp();
  
  // States
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]?.id || "wedding");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600");
  const [demoSlug, setDemoSlug] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name) return;

    const slugVal = demoSlug || name.toLowerCase().trim().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");

    addTemplate({
      id: `tpl_${Date.now()}`,
      name,
      category,
      description,
      thumbnail,
      demoSlug: `${slugVal}-demo`,
      status: "published",
    });

    setName("");
    setDescription("");
    setDemoSlug("");
    setIsAdding(false);
  };

  const handleToggleStatus = (id, currentStatus) => {
    updateTemplate(id, { status: currentStatus === "published" ? "draft" : "published" });
  };

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <div className="p-6 md:p-10 space-y-8 bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Template Catalog</h1>
          <p className="text-gray-400 text-sm">Upload, review, configure design parameters and status options of digital themes.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} variant="primary" className="flex items-center gap-1 cursor-pointer">
          <Plus size={16} />
          <span>Add Template</span>
        </Button>
      </div>

      {isAdding && (
        /* Create Form */
        <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl max-w-2xl">
          <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-5">
            <h3 className="font-bold text-lg">Add Design Template</h3>
            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-white cursor-pointer"><X size={18} /></button>
          </div>

          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Template Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Royal Gold Suite"
                required
              />
              <Select
                label="Assigned Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={categoryOptions}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Custom Demo URL Slug (Optional)"
                value={demoSlug}
                onChange={(e) => setDemoSlug(e.target.value)}
                placeholder="e.g. royal-gold (will suffix -demo)"
              />
              <Input
                label="Cover Image Thumbnail URL"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://example.com/thumbnail.png"
              />
            </div>

            <TextArea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Design layout summary, sections included..."
              rows={3}
            />

            <div className="flex justify-end gap-3 pt-3">
              <Button type="button" onClick={() => setIsAdding(false)} variant="outline" className="border-white/10 text-white cursor-pointer">
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="cursor-pointer">
                Create Template
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <div key={tpl.id} className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-brand-500/30 transition-all duration-300">
            {/* Image header */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-850">
              <img
                src={tpl.thumbnail}
                alt={tpl.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-brand-600/90 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md backdrop-blur-md">
                {categories.find(c => c.id === tpl.category)?.name || tpl.category}
              </div>
              <span className={`absolute top-3 right-3 text-[9px] uppercase px-2 py-0.5 rounded-md font-bold ${
                tpl.status === "published" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
              }`}>
                {tpl.status}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="font-bold text-base text-white">{tpl.name}</h4>
                <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">{tpl.description}</p>
                <div className="text-[10px] text-gray-500 font-mono">Demo: /templates/{tpl.category}/{tpl.demoSlug}</div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-4">
                <div className="flex gap-2">
                  <Link to={`/templates/${tpl.category}/${tpl.demoSlug}`} target="_blank">
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px]" title="Preview Demo">
                      <Eye size={12} />
                      <span>Demo</span>
                    </button>
                  </Link>

                  <button
                    onClick={() => handleToggleStatus(tpl.id, tpl.status)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                    title="Toggle Status"
                  >
                    <span>Status</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this template?")) {
                      deleteTemplate(tpl.id);
                    }
                  }}
                  className="p-2 rounded-lg text-danger hover:bg-red-500/10 cursor-pointer"
                  title="Delete Template"
                >
                  <Trash size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateManager;
