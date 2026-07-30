import React from "react";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import DatePicker from "../common/DatePicker";
import Switch from "../common/Switch";
import FileUpload from "../common/FileUpload";
import Select from "../common/Select";

import { uploadService } from "../../services/uploadService";

const DynamicFormRenderer = ({ fields = [], formData = {}, onChange, errors = {} }) => {
  const handleValueChange = (name, value) => {
    onChange(name, value);
  };

  const handleFileChange = async (name, e) => {
    const file = e.target.value;
    if (!file) return;

    if (file instanceof File) {
      // 1. Upload directly via Cloudinary / Server API to get clean HTTPS URL
      const uploadedUrl = await uploadService.uploadFile(file);
      if (uploadedUrl) {
        handleValueChange(name, uploadedUrl);
      } else {
        // Fallback to local URL object (NOT Base64) for preview
        const localUrl = URL.createObjectURL(file);
        handleValueChange(name, localUrl);
      }
    } else {
      handleValueChange(name, file);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map((field) => {
        const val = formData[field.name] !== undefined ? formData[field.name] : "";
        const error = errors[field.name];

        switch (field.type) {
          case "text":
            return (
              <div key={field.name} className="col-span-1">
                <Input
                  label={field.label}
                  value={val}
                  onChange={(e) => handleValueChange(field.name, e.target.value)}
                  placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                  error={error}
                  required={field.required}
                />
              </div>
            );

          case "number":
            return (
              <div key={field.name} className="col-span-1">
                <Input
                  label={field.label}
                  type="number"
                  value={val}
                  onChange={(e) => handleValueChange(field.name, e.target.value)}
                  placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                  error={error}
                  required={field.required}
                />
              </div>
            );

          case "textarea":
            return (
              <div key={field.name} className="col-span-1 md:col-span-2">
                <TextArea
                  label={field.label}
                  value={val}
                  onChange={(e) => handleValueChange(field.name, e.target.value)}
                  placeholder={field.placeholder || `Enter details for ${field.label.toLowerCase()}`}
                  error={error}
                  required={field.required}
                />
              </div>
            );

          case "date":
            return (
              <div key={field.name} className="col-span-1">
                <DatePicker
                  name={field.name}
                  label={field.label}
                  value={val}
                  onChange={(e) => handleValueChange(field.name, e.target.value)}
                  placeholder={field.placeholder || "Select date"}
                  error={error}
                  required={field.required}
                />
              </div>
            );

          case "select":
            return (
              <div key={field.name} className="col-span-1">
                <Select
                  label={field.label}
                  name={field.name}
                  value={val}
                  onChange={(e) => handleValueChange(field.name, e.target.value)}
                  options={field.options || []}
                  placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`}
                  error={error}
                  required={field.required}
                />
              </div>
            );

          case "file_upload":
            return (
              <div key={field.name} className="col-span-1 md:col-span-2 border border-gray-150 dark:border-slate-800 p-4 rounded-xl space-y-3 bg-gray-50/50 dark:bg-slate-900/40">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </span>
                </div>
                
                {/* File Upload Zone */}
                <FileUpload
                  name={field.name}
                  label={field.label}
                  onChange={(e) => handleFileChange(field.name, e)}
                  error={error}
                />
                
                {/* Fallback Text Input to paste URL directly */}
                <div className="pt-2">
                  <Input
                    label="Or paste direct media URL instead"
                    value={typeof val === "string" ? val : ""}
                    onChange={(e) => handleValueChange(field.name, e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="text-xs"
                  />
                </div>

                {val && typeof val === "string" && val.startsWith("http") && (
                  <div className="text-xs text-brand-600 dark:text-brand-400 bg-brand-50/50 dark:bg-brand-950/20 px-3 py-1.5 rounded-lg flex items-center gap-2 overflow-hidden truncate">
                    <span>Loaded:</span>
                    <a href={val} target="_blank" rel="noreferrer" className="underline truncate">{val}</a>
                  </div>
                )}
              </div>
            );

          case "switch":
          case "boolean":
            return (
              <div key={field.name} className="col-span-1 flex items-center gap-4 h-full pt-6">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </span>
                <Switch
                  checked={Boolean(val)}
                  onChange={(checked) => handleValueChange(field.name, checked)}
                />
                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default DynamicFormRenderer;
