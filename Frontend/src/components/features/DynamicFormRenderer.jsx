import React from "react";
import { CheckCircle2, Trash2, RefreshCw, Music } from "lucide-react";
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
      const uploadedUrl = await uploadService.uploadFile(file);
      if (uploadedUrl) {
        handleValueChange(name, uploadedUrl);
      } else {
        alert("Failed to upload file to backend server. Please check your backend connection.");
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

          case "file_upload": {
            const isAudioField = field.name.toLowerCase().includes("music") || 
                                field.name.toLowerCase().includes("audio") || 
                                field.name.toLowerCase().includes("song") ||
                                (typeof val === "string" && (val.endsWith(".mp3") || val.endsWith(".wav") || val.endsWith(".ogg")));

            const hasValidMedia = typeof val === "string" && val.length > 0 && (val.startsWith("http") || val.startsWith("/uploads"));

            return (
              <div key={field.name} className="col-span-1 md:col-span-2 border border-gray-200 dark:border-slate-800 p-4 rounded-2xl space-y-3 bg-gray-50/50 dark:bg-slate-900/40">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </span>
                </div>

                {hasValidMedia ? (
                  <div className="space-y-3 bg-white dark:bg-slate-950 p-4 border border-gray-200 dark:border-slate-800 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/20">
                        <CheckCircle2 size={14} />
                        <span>Uploaded & Active</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleValueChange(field.name, "")}
                        className="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Trash2 size={14} />
                        <span>Remove</span>
                      </button>
                    </div>

                    {isAudioField ? (
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
                          <Music size={16} className="text-brand-500 animate-pulse" />
                          <span className="truncate max-w-xs">{val.split("/").pop()}</span>
                        </div>
                        <audio controls src={val} className="w-full h-10 rounded-lg focus:outline-none" />
                      </div>
                    ) : (
                      <div className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-slate-800 bg-black/5 dark:bg-black/40 p-2 flex justify-center">
                        <img 
                          src={val} 
                          alt={field.label} 
                          className="max-h-64 object-contain rounded-lg"
                        />
                      </div>
                    )}

                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[11px] text-gray-400 font-mono truncate max-w-sm">{val}</span>
                      <label className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline cursor-pointer flex items-center gap-1">
                        <RefreshCw size={13} />
                        <span>Change File</span>
                        <input
                          type="file"
                          className="hidden"
                          accept={isAudioField ? "audio/*" : "image/*"}
                          onChange={(e) => handleFileChange(field.name, e)}
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <FileUpload
                    name={field.name}
                    label={field.label}
                    accept={isAudioField ? "audio/*" : "image/*"}
                    onChange={(e) => handleFileChange(field.name, e)}
                    error={error}
                  />
                )}
              </div>
            );
          }

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
