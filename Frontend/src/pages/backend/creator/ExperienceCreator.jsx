import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import { ArrowLeft, Save, Globe, Eye, Sparkles, CheckCircle2 } from "lucide-react";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";
import Button from "../../../components/common/Button";
import DynamicFormRenderer from "../../../components/features/DynamicFormRenderer";
import DevicePreviewMock from "../../../components/common/DevicePreviewMock";
import { experienceService } from "../../../services/experienceService";

// Template Components
import WeddingRoyalGold from "../../experience/templates/wedding/WeddingRoyalGold";
import WeddingAnimated from "../../experience/templates/wedding/WeddingAnimated";
import BirthdayNeonSurprise from "../../experience/templates/birthday/BirthdayNeonSurprise";
import BirthdayCinematicLove from "../../experience/templates/birthday/BirthdayCinematicLove";

const ExperienceCreator = () => {
  const { enquiryId } = useParams();
  const navigate = useNavigate();
  const { enquiries, templates, categories, addExperience, updateEnquiryStatus } = useApp();

  // Find the enquiry
  const enquiry = enquiries.find((e) => e.id === enquiryId);

  // Filter templates matching this enquiry category (safe optional chaining)
  const availableTemplates = enquiry 
    ? templates.filter((t) => t.category === enquiry.category)
    : [];

  // Studio states (placed unconditionally at the top)
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [formData, setFormData] = useState({
    bgMusic: "",
  });
  const [slug, setSlug] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const initialLoadRef = useRef(false);

  // Synchronize dynamic form data once the enquiry loads from context
  useEffect(() => {
    if (enquiry && enquiry.submittedDetails && !initialLoadRef.current) {
      console.log("Syncing form data with loaded enquiry details:", enquiry.submittedDetails);
      
      // Double-safe: Normalise keys to have both camelCase and snake_case versions
      const normalized = {};
      Object.entries(enquiry.submittedDetails).forEach(([key, val]) => {
        normalized[key] = val;
        if (key.includes("_")) {
          const camel = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
          normalized[camel] = val;
        } else {
          const snake = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
          normalized[snake] = val;
        }
      });

      setFormData((prev) => ({
        ...prev,
        ...normalized,
      }));
      initialLoadRef.current = true;
    }
  }, [enquiry]);

  // Synchronize template selection once the available templates list loads
  useEffect(() => {
    if (availableTemplates.length > 0 && !selectedTemplateId) {
      console.log("Defaulting selected template to:", availableTemplates[0].id);
      setSelectedTemplateId(availableTemplates[0].id);
    }
  }, [availableTemplates, selectedTemplateId]);

  // Auto-generate slug from clientName
  useEffect(() => {
    if (enquiry) {
      const cleanSlug = enquiry.clientName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-");
      setSlug(`${cleanSlug}-${enquiry.category}`);
    }
  }, [enquiry]);

  // Early return checks must be placed AFTER all Hook declarations to obey rules of hooks
  if (!enquiry) {
    return (
      <div className="bg-slate-950 text-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Inquiry Not Found</h2>
        <p className="text-gray-400 mb-6">The assigned lead reference does not exist or has been deleted.</p>
        <Link to="/creator">
          <Button variant="primary" className="cursor-pointer">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const handleFieldChange = (name, value) => {
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      // Double-safe: If the field uses snake_case, synchronize the camelCase version as well
      if (name.includes("_")) {
        const camel = name.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        next[camel] = value;
      } else {
        // If the field uses camelCase, synchronize the snake_case version
        const snake = name.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
        next[snake] = value;
      }
      return next;
    });
  };

  const handlePreview = () => {
    const payload = {
      templateId: selectedTemplateId,
      data: formData,
      clientName: enquiry.clientName
    };
    console.log("Opening preview with payload:", payload);
    localStorage.setItem("momenta_preview_data", JSON.stringify(payload));
    window.open("/e/preview", "_blank");
  };

  const handleUpdatePreview = (e) => {
    if (e) e.preventDefault();
    const payload = {
      templateId: selectedTemplateId,
      data: formData,
      clientName: enquiry.clientName
    };
    console.log("Saving & updating preview with payload:", payload);
    localStorage.setItem("momenta_preview_data", JSON.stringify(payload));
    setShowSaveMessage(true);
    setTimeout(() => {
      setShowSaveMessage(false);
    }, 3000);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!slug) return;

    const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);
    const activeCategoryObj = categories.find((c) => c.id === enquiry.category);

    // Create the experience payload
    const experiencePayload = {
      slug: slug.trim(),
      template_id: selectedTemplate?.dbId || selectedTemplateId,
      category_id: activeCategoryObj?.dbId || enquiry.categoryId,
      title: `${enquiry.clientName}'s Experience`,
      client_name: enquiry.clientName,
      is_published: true,
      data: formData,
    };

    try {
      await experienceService.create(experiencePayload);
    } catch (err) {
      console.warn("Failed to create experience on backend:", err);
    }

    addExperience({
      slug: slug.trim(),
      templateId: selectedTemplateId,
      category: enquiry.category,
      clientName: enquiry.clientName,
      status: "published",
      data: formData,
    });

    // Mark enquiry status as "Completed"
    updateEnquiryStatus(enquiry.id, "Completed", `Published live link: /e/${slug}`);
    setIsPublished(true);
  };

  // Resolve template selected for real-time live preview
  const renderLiveTemplate = () => {
    switch (selectedTemplateId) {
      case "wedding-royal-gold":
      case "wedding-modern-minimal":
        return <WeddingRoyalGold data={formData} isDemo={true} />;
      case "wedding-animated":
        return <WeddingAnimated data={formData} isDemo={true} />;
      case "birthday-neon-surprise":
        return <BirthdayNeonSurprise data={formData} isDemo={true} />;
      case "birthday-cinematic":
      case "birthday-cinematic-love":
        return <BirthdayCinematicLove data={formData} isDemo={true} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-amber-50/40 text-slate-800">
            <Sparkles size={40} className="text-amber-600 mb-3" />
            <h3 className="text-lg font-bold font-serif mb-1">Select a Template Theme</h3>
            <p className="text-xs text-slate-500 max-w-xs">Use the toolbar controls to select your design layout and start customizing client assets.</p>
          </div>
        );
    }
  };

  const selectedTemplate = templates.find(
    (t) => t.id === selectedTemplateId || t.slug === selectedTemplateId || t.demoSlug === selectedTemplateId
  );
  const activeCategoryObj = categories.find((c) => c.id === enquiry.category);
  const formFields = (selectedTemplate && selectedTemplate.fields && selectedTemplate.fields.length > 0)
    ? selectedTemplate.fields
    : (activeCategoryObj?.fields || []);

  if (isPublished) {
    return (
      <div className="bg-slate-950 text-white min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-500/5 blur-[100px] pointer-events-none" />
        <div className="max-w-md w-full bg-slate-900 border border-white/10 rounded-3xl p-8 text-center space-y-6 shadow-premium relative z-10">
          <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
            <CheckCircle2 size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Experience Published!</h2>
            <p className="text-gray-400 text-sm">
              The digital experience card has been generated successfully and is now active.
            </p>
          </div>
          <div className="bg-slate-950 p-4 border border-white/5 rounded-xl space-y-2 text-left">
            <span className="block text-[10px] text-gray-500 uppercase tracking-widest font-bold">Unique Live Link</span>
            <div className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-lg font-mono text-xs text-brand-400 select-all overflow-hidden truncate">
              <span className="truncate">/e/{slug}</span>
              <a href={`/e/${slug}`} target="_blank" rel="noreferrer" className="text-white hover:underline shrink-0 ml-2">Visit</a>
            </div>
          </div>
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => navigate("/creator")}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl transition-all cursor-pointer"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col h-screen overflow-hidden">
      {/* Studio Header bar */}
      <div className="h-16 border-b border-white/5 bg-slate-900 px-6 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/creator")}
            className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
          </button>
          <div>
            <h2 className="font-extrabold text-sm flex items-center gap-1.5">
              <span>Studio Workspace</span>
              <span>•</span>
              <span className="text-xs font-medium text-brand-400">Creator Studio</span>
            </h2>
            <p className="text-[11px] text-gray-400">Building card invitation for {enquiry.clientName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePreview}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-750 border border-white/10 hover:border-white/20 text-gray-200 font-bold text-xs px-4 py-2 rounded-lg cursor-pointer transition-all"
          >
            <Eye size={14} className="text-brand-400" />
            <span>Check Design (Preview)</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer shadow-md shadow-brand-500/10"
          >
            <Save size={14} />
            <span>Publish Experience</span>
          </button>
        </div>
      </div>

      {/* Full width workspace */}
      <div className="flex-1 overflow-y-auto bg-slate-950 p-6 md:p-10">
        <div className="max-w-4xl mx-auto w-full space-y-8 bg-slate-900 border border-white/5 rounded-3xl p-6 md:p-10 shadow-premium">
          <div className="space-y-6">
            <h3 className="text-base font-bold text-brand-400 border-b border-white/5 pb-2">1. Choose Theme Template</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableTemplates.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => setSelectedTemplateId(tpl.id)}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between h-28 cursor-pointer transition-all ${
                    selectedTemplateId === tpl.id
                      ? "bg-brand-600/15 border-brand-500 text-white shadow-md"
                      : "bg-slate-950 border-white/5 hover:border-white/10 text-gray-400"
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-sm text-white">{tpl.name}</h4>
                    <p className="text-[10px] text-gray-400 line-clamp-2 mt-1 leading-relaxed">{tpl.description}</p>
                  </div>
                  {selectedTemplateId === tpl.id && <span className="text-[9px] bg-brand-500 text-white px-2 py-0.5 rounded font-bold self-end uppercase">Selected</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-base font-bold text-brand-400 border-b border-white/5 pb-2">2. Link Configurations</h3>
            <div className="grid grid-cols-1 gap-4 max-w-sm">
              <Input
                label="Custom URL Slug Path"
                value={slug}
                onChange={(e) => setSlug(e.target.value.replace(/\s+/g, "-"))}
                placeholder="e.g. rahul-priya-wedding"
                required
              />
            </div>
          </div>

          {formFields.length > 0 && (
            <div className="space-y-6 pb-6">
              <h3 className="text-base font-bold text-brand-400 border-b border-white/5 pb-2">3. Experience Content</h3>
              <DynamicFormRenderer
                fields={formFields}
                formData={formData}
                onChange={handleFieldChange}
              />

              {/* Form Save and Update Button */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleUpdatePreview}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl cursor-pointer shadow-lg shadow-brand-500/10 flex items-center gap-2 border-0"
                >
                  <Save size={15} />
                  <span>Save & Update Preview</span>
                </button>

                {showSaveMessage && (
                  <span className="text-xs text-emerald-400 font-semibold animate-pulse">
                    ✓ Preview data updated! Check your preview tab.
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCreator;
