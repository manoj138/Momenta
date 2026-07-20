import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { CheckCircle2, Sparkles, AlertCircle, ArrowLeft } from "lucide-react";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import DynamicFormRenderer from "../../components/features/DynamicFormRenderer";
import { enquiryService } from "../../services/enquiryService";

const EnquiryForm = () => {
  const { categories, templates, addEnquiry } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const presetTemplateId = searchParams.get("template") || "";

  // Find category based on preset template
  const presetTemplate = templates.find(t => t.id === presetTemplateId);
  const initialCategory = presetTemplate ? presetTemplate.category : (categories[0]?.id || "wedding");

  // Form states
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [dynamicValues, setDynamicValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Get active fields schema
  const activeCategoryObj = categories.find(c => c.id === selectedCategory);
  const fields = activeCategoryObj ? activeCategoryObj.fields : [];

  // Reset fields when category changes
  useEffect(() => {
    setDynamicValues({});
    setErrors({});
  }, [selectedCategory]);

  const handleDynamicChange = (name, value) => {
    setDynamicValues({
      ...dynamicValues,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!clientName.trim()) newErrors.clientName = "Name is required";
    if (!clientEmail.trim()) newErrors.clientEmail = "Email is required";
    if (!clientPhone.trim()) newErrors.clientPhone = "WhatsApp number is required";

    fields.forEach((f) => {
      if (f.required && (!dynamicValues[f.name] || String(dynamicValues[f.name]).trim() === "")) {
        newErrors[f.name] = `${f.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const enquiryPayload = {
      client_name: clientName,
      client_email: clientEmail,
      client_phone: clientPhone,
      category_id: typeof selectedCategory === 'number' ? selectedCategory : null,
      form_data: dynamicValues,
      notes: presetTemplateId ? `Preselected Theme: ${presetTemplate?.name || presetTemplateId}` : "General category enquiry",
    };

    try {
      await enquiryService.create(enquiryPayload);
      addEnquiry(enquiryPayload);
      setIsSuccess(true);
    } catch (err) {
      console.error("Failed to submit enquiry to backend:", err);
      // Fallback
      addEnquiry(enquiryPayload);
      setIsSuccess(true);
    }
  };

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  if (isSuccess) {
    return (
      <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden transition-colors">
        <div className="absolute inset-0 bg-brand-500/5 blur-[100px] pointer-events-none" />
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-gray-250 dark:border-white/10 rounded-3xl p-8 text-center space-y-6 shadow-premium relative z-10">
          <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={36} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Request Submitted!</h2>
            <p className="text-slate-655 dark:text-gray-400 text-sm leading-relaxed">
              Hey {clientName}, thank you for choosing Momenta! Our experience admins will review your request, assign it to a Creator, and generate your live preview link soon.
            </p>
          </div>
          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl transition-all cursor-pointer border-0"
            >
              Back to Home
            </button>
            <button
              onClick={() => {
                setClientName("");
                setClientEmail("");
                setClientPhone("");
                setDynamicValues({});
                setIsSuccess(false);
              }}
              className="w-full bg-slate-100 dark:bg-white/5 border border-gray-255 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white font-semibold py-3 rounded-xl transition-all cursor-pointer text-xs"
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen py-16 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="space-y-4 text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-200/50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-full text-xs text-brand-650 dark:text-brand-400 font-semibold">
            <Sparkles size={12} />
            <span>Interactive Form Wizard</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold">Request Your Experience</h1>
          <p className="text-slate-650 dark:text-gray-400 text-sm">
            Provide details below. Selecting a category will dynamically generate corresponding data inputs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900/60 border border-gray-200 dark:border-white/5 rounded-3xl p-6 md:p-10 shadow-premium space-y-8">
          
          {/* Section 1: Customer Contact details */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-b border-gray-200 dark:border-white/5 pb-2 text-brand-650 dark:text-brand-400">1. Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Full Name"
                value={clientName}
                onChange={(e) => {
                  setClientName(e.target.value);
                  if (errors.clientName) setErrors({ ...errors, clientName: "" });
                }}
                placeholder="Rahul Deshmukh"
                error={errors.clientName}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={clientEmail}
                onChange={(e) => {
                  setClientEmail(e.target.value);
                  if (errors.clientEmail) setErrors({ ...errors, clientEmail: "" });
                }}
                placeholder="rahul@gmail.com"
                error={errors.clientEmail}
                required
              />
              <Input
                label="WhatsApp Mobile Number"
                value={clientPhone}
                onChange={(e) => {
                  setClientPhone(e.target.value);
                  if (errors.clientPhone) setErrors({ ...errors, clientPhone: "" });
                }}
                placeholder="+91 98765 43210"
                error={errors.clientPhone}
                required
              />
            </div>
          </div>

          {/* Section 2: Choose category */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-b border-gray-200 dark:border-white/5 pb-2 text-brand-650 dark:text-brand-400">2. Select Experience Category</h3>
            <div className="max-w-md">
              <Select
                label="Experience Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                options={categoryOptions}
              />
              {presetTemplate && (
                <p className="text-xs text-brand-650 dark:text-brand-400 mt-2 font-medium">
                  Applying preset layout: <span className="font-bold">{presetTemplate.name}</span>
                </p>
              )}
            </div>
          </div>

          {/* Section 3: Dynamic Category Fields */}
          {fields.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold border-b border-gray-200 dark:border-white/5 pb-2 text-brand-650 dark:text-brand-400">
                3. Customize Experience Details ({activeCategoryObj?.name})
              </h3>
              <DynamicFormRenderer
                fields={fields}
                formData={dynamicValues}
                onChange={handleDynamicChange}
                errors={errors}
              />
            </div>
          )}

          {/* Errors Summary */}
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-500/25 p-4 rounded-2xl flex items-start gap-3">
              <AlertCircle className="text-red-500 dark:text-red-400 shrink-0 mt-0.5" size={18} />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-red-700 dark:text-red-300">Validation Failures</h4>
                <p className="text-xs text-red-600 dark:text-red-200">Please review highlight fields marked in red above before submitting.</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-205 dark:border-white/5 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-xs font-bold text-gray-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-white flex items-center gap-1.5 transition-all cursor-pointer bg-transparent border-0"
            >
              <ArrowLeft size={14} />
              <span>Cancel & Back</span>
            </button>
            
            <Button type="submit" variant="primary" className="cursor-pointer shadow-lg shadow-brand-500/20 px-8 py-3">
              Submit Request Form
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;
