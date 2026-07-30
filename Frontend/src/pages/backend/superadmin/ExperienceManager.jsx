import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { Search, Globe, Eye, Trash, ToggleLeft, ToggleRight, ExternalLink } from "lucide-react";
import Button from "../../../components/common/Button";

const ExperienceManager = () => {
  const { experiences, templates, categories, updateExperience, deleteExperience } = useApp();
  const [search, setSearch] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("all");
  const [copiedId, setCopiedId] = useState(null);

  const handleToggleStatus = (id, currentStatus) => {
    updateExperience(id, { status: currentStatus === "published" ? "draft" : "published" });
  };

  const handleCopyLink = (exp) => {
    const fullUrl = `${window.location.origin}/e/${exp.slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(exp.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = experiences.filter((e) => {
    const matchesSearch = (e.clientName || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.slug || "").toLowerCase().includes(search.toLowerCase());
    const matchesTemplate = selectedTemplate === "all" || e.templateId === selectedTemplate || e.componentName === selectedTemplate;
    return matchesSearch && matchesTemplate;
  });

  return (
    <div className="p-6 md:p-10 space-y-8 bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Active Experience Directory</h1>
        <p className="text-gray-400 text-sm">Review, monitor guest RSVP logs, and filter live customer links by template.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center bg-slate-900 p-5 rounded-2xl border border-white/5">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            <Search size={16} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search client or link slug..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>

        {/* Dynamic Template Filter Dropdown */}
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="px-4 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500 cursor-pointer"
        >
          <option value="all">📁 All Templates ({experiences.length} links)</option>
          {templates && templates.map((tpl) => {
            const count = experiences.filter(
              (exp) => exp.templateId === tpl.id || exp.componentName === tpl.component_name || exp.templateId === tpl.slug || exp.componentName === tpl.id
            ).length;
            return (
              <option key={tpl.id} value={tpl.component_name || tpl.id || tpl.slug}>
                ✨ {tpl.name} ({count} live links)
              </option>
            );
          })}
        </select>
      </div>

      {/* Grid catalog */}
      {filtered.length === 0 ? (
        <div className="p-16 text-center bg-slate-900 rounded-2xl border border-white/5">
          <p className="text-gray-400">No client experiences matched search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((exp) => {
            const template = templates.find((t) => t.id === exp.templateId);
            const cat = categories.find((c) => c.id === exp.category);
            return (
              <div key={exp.id} className="bg-slate-900 border border-white/5 p-5 rounded-2xl flex flex-col justify-between h-52 hover:border-brand-500/30 transition-all duration-300">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-base text-white">{exp.clientName}</h4>
                      <span className="text-[10px] text-brand-400 uppercase tracking-widest font-bold">
                        {cat?.name || exp.category} • {template?.name || exp.templateId}
                      </span>
                    </div>
                    
                    <span className={`text-[9px] uppercase px-2.5 py-0.5 rounded-full font-bold ${
                      exp.status === "published"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}>
                      {exp.status}
                    </span>
                  </div>

                  <div className="text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Globe size={13} />
                      <span className="font-mono text-gray-300 truncate">/e/{exp.slug}</span>
                    </div>
                    <div className="text-[10px] text-gray-500">
                      Guests: {exp.data?.rsvpList?.length || 0} RSVPs submitted
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-4">
                  <div className="flex gap-2">
                    <a
                      href={`/e/${exp.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                      title="Launch Viewer"
                    >
                      <ExternalLink size={12} />
                      <span>Visit</span>
                    </a>

                    <button
                      onClick={() => handleCopyLink(exp)}
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                      title="Copy URL"
                    >
                      <span>{copiedId === exp.id ? "✓ Copied" : "📋 Copy"}</span>
                    </button>

                    <button
                      onClick={() => handleToggleStatus(exp.id, exp.status)}
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                    >
                      <span>{exp.status === "published" ? "Disable" : "Publish"}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this client experience?")) {
                        deleteExperience(exp.id);
                      }
                    }}
                    className="p-2 rounded-lg text-danger hover:bg-red-500/10 cursor-pointer"
                    title="Delete Experience"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExperienceManager;
