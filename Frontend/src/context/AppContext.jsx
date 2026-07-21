import React, { createContext, useContext, useState, useEffect } from "react";
const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [experiences, setExperiences] = useState([]);

  // Fetch live data from Backend API
  const fetchApiData = async () => {
    const { categoryService } = await import("../services/categoryService");
    const { templateService } = await import("../services/templateService");
    const { experienceService } = await import("../services/experienceService");

    try {
      const catRes = await categoryService.getAll();
      if (catRes && catRes.status && catRes.data && catRes.data.length > 0) {
        const formattedCats = catRes.data.map(c => ({
          id: c.slug || String(c.id),
          name: c.name,
          description: c.description,
          fields: (c.fields || []).map(f => ({
            name: f.field_name,
            label: f.label,
            type: f.field_type,
            placeholder: f.placeholder,
            required: f.is_required
          }))
        }));
        setCategories(formattedCats);
      }
    } catch (e) {
      console.warn("Backend Categories API unavailable:", e.message);
    }

    try {
      const tplRes = await templateService.getAll();
      if (tplRes && tplRes.status && tplRes.data && tplRes.data.length > 0) {
        const formattedTpls = tplRes.data.map(t => ({
          id: t.slug || String(t.id),
          dbId: t.id || t._id || String(t.id),
          name: t.name,
          category: t.category?.slug || 'wedding',
          description: t.description,
          thumbnail: t.thumbnail,
          previewUrl: t.preview_url,
          componentName: t.component_name,
          fields: t.schema_contract || [],
          demoSlug: t.slug === 'wedding-animated' ? 'wedding-animated-demo' : (t.slug === 'birthday-neon-surprise' ? 'neon-surprise-demo' : t.slug)
        }));
        setTemplates(formattedTpls);
      }
    } catch (e) {
      console.warn("Backend Templates API unavailable:", e.message);
    }

    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const expRes = await experienceService.getAll();
        if (expRes && expRes.status && expRes.data && expRes.data.length > 0) {
          const formattedExps = expRes.data.map(e => ({
            id: String(e.id),
            slug: e.slug,
            templateId: e.template?.slug || e.template_id,
            category: e.category?.slug || e.category_id,
            clientName: e.client_name || e.title,
            status: e.is_published ? "published" : "draft",
            data: e.data,
            createdAt: e.createdAt
          }));
          setExperiences(formattedExps);
        }
      } catch (e) {
        console.warn("Backend Experiences API notice:", e.message);
      }
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  // CRUD actions
  // Categories
  const addCategory = (category) => {
    setCategories((prev) => [...prev, category]);
  };
  const updateCategory = (id, updatedFields) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c)));
  };
  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // Templates
  const addTemplate = (template) => {
    setTemplates((prev) => [...prev, template]);
  };
  const updateTemplate = (id, updatedFields) => {
    setTemplates((prev) => prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t)));
  };
  const deleteTemplate = (id) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  // Admins
  const addAdmin = (admin) => {
    setAdmins((prev) => [...prev, admin]);
  };
  const updateAdmin = (id, updatedFields) => {
    setAdmins((prev) => prev.map((a) => (a.id === id ? { ...a, ...updatedFields } : a)));
  };
  const deleteAdmin = (id) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  // Enquiries
  const addEnquiry = (enquiry) => {
    const fullEnquiry = {
      id: `enq_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "New",
      assignedTo: "",
      notes: "",
      ...enquiry,
    };
    setEnquiries((prev) => [fullEnquiry, ...prev]);
    return fullEnquiry;
  };
  const updateEnquiryStatus = (id, status, notes = "", assignedTo = null) => {
    setEnquiries((prev) => prev.map((e) => {
      if (e.id === id) {
        const changes = { status };
        if (notes !== "") changes.notes = notes;
        if (assignedTo !== null) changes.assignedTo = assignedTo;
        return { ...e, ...changes };
      }
      return e;
    }));
  };

  // Experiences
  const addExperience = (experience) => {
    const fullExperience = {
      id: `exp_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "draft",
      ...experience,
      data: {
        rsvpList: [],
        ...experience.data
      }
    };
    setExperiences((prev) => [fullExperience, ...prev]);
    return fullExperience;
  };
  const updateExperience = (id, updatedFields) => {
    setExperiences((prev) => prev.map((e) => (e.id === id ? { ...e, ...updatedFields } : e)));
  };
  const deleteExperience = (id) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  };
  const addRSVPToExperience = (slug, rsvp) => {
    setExperiences((prev) => prev.map((exp) => {
      if (exp.slug === slug) {
        const rsvpList = exp.data.rsvpList || [];
        return {
          ...exp,
          data: {
            ...exp.data,
            rsvpList: [...rsvpList, rsvp],
          },
        };
      }
      return exp;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        categories,
        templates,
        admins,
        enquiries,
        experiences,
        addCategory,
        updateCategory,
        deleteCategory,
        addTemplate,
        updateTemplate,
        deleteTemplate,
        addAdmin,
        updateAdmin,
        deleteAdmin,
        addEnquiry,
        updateEnquiryStatus,
        addExperience,
        updateExperience,
        deleteExperience,
        addRSVPToExperience,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
