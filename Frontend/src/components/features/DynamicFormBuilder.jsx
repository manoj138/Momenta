import React, { useState } from "react";
import { Plus, Trash, ArrowUp, ArrowDown, Settings } from "lucide-react";
import Input from "../common/Input";
import Select from "../common/Select";
import Switch from "../common/Switch";
import Button from "../common/Button";

const DynamicFormBuilder = ({ initialFields = [], onSave }) => {
  const [fields, setFields] = useState(initialFields);

  const addField = () => {
    const newField = {
      name: `field_${Date.now()}`,
      label: "New Custom Field",
      type: "text",
      required: false,
      placeholder: "",
    };
    setFields([...fields, newField]);
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];
    // Auto-generate name based on label to make it a clean camelCase key
    if (key === "label") {
      updated[index].name = value
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+(.)/g, (match, group) => group.toUpperCase())
        .replace(/\s+/g, "");
    }
    updated[index][key] = value;
    setFields(updated);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const moveField = (index, direction) => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === fields.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...fields];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setFields(updated);
  };

  const handleSave = () => {
    onSave(fields);
  };

  const fieldTypes = [
    { value: "text", label: "Text Input" },
    { value: "number", label: "Number Input" },
    { value: "textarea", label: "Paragraph (Text Area)" },
    { value: "date", label: "Date Picker" },
    { value: "file_upload", label: "Media Upload (Image/Music)" },
    { value: "switch", label: "Yes/No (Toggle Switch)" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Form Field Architect</h3>
          <p className="text-sm text-gray-500">Design the structure of details required for this experience category.</p>
        </div>
        <Button onClick={addField} variant="outline" className="flex items-center gap-1.5 cursor-pointer">
          <Plus size={16} />
          <span>Add Field</span>
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-2xl">
          <p className="text-gray-500 dark:text-gray-400">No fields configured. Click "Add Field" to start building.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.name || index}
              className="flex flex-col md:flex-row gap-4 p-5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-850 rounded-2xl items-start md:items-center relative"
            >
              {/* Field details */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                <Input
                  label="Field Label"
                  value={field.label}
                  onChange={(e) => updateField(index, "label", e.target.value)}
                  placeholder="e.g. Venue Address"
                  required
                />
                
                <Select
                  label="Control Type"
                  value={field.type}
                  onChange={(e) => updateField(index, "type", e.target.value)}
                  options={fieldTypes}
                />

                <Input
                  label="Placeholder Hint"
                  value={field.placeholder || ""}
                  onChange={(e) => updateField(index, "placeholder", e.target.value)}
                  placeholder="e.g. Enter bride name"
                />

                <div className="flex items-center justify-start md:justify-center h-full pt-6">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Required Field</span>
                    <Switch
                      checked={field.required}
                      onChange={(checked) => updateField(index, "required", checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 border-t md:border-t-0 border-gray-150 pt-3 md:pt-0 w-full md:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => moveField(index, "up")}
                  disabled={index === 0}
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-150 dark:hover:bg-slate-850 disabled:opacity-30 cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => moveField(index, "down")}
                  disabled={index === fields.length - 1}
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-150 dark:hover:bg-slate-850 disabled:opacity-30 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => removeField(index)}
                  className="p-2 rounded-lg text-danger hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
                  title="Delete Field"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-gray-250 dark:border-slate-800">
        <Button onClick={handleSave} variant="primary" className="cursor-pointer">
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default DynamicFormBuilder;
