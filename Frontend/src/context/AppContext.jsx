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
    const { enquiryService } = await import("../services/enquiryService");
    const { userService } = await import("../services/userService");

    try {
      const catRes = await categoryService.getAll();
      if (catRes && catRes.status && catRes.data && catRes.data.length > 0) {
        const formattedCats = catRes.data.map(c => ({
          id: c.slug || String(c.id),
          dbId: c.id || c._id || String(c.id),
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
      let fetchedTpls = [];
      if (tplRes && tplRes.status && tplRes.data && tplRes.data.length > 0) {
        fetchedTpls = tplRes.data.map(t => ({
          id: t.slug || String(t.id),
          dbId: t.id || t._id || String(t.id),
          name: t.name,
          category: t.category?.slug || 'wedding',
          description: t.description,
          thumbnail: t.thumbnail,
          previewUrl: t.preview_url,
          componentName: t.component_name,
          status: t.is_active ? "published" : "draft",
          fields: t.schema_contract || [],
          demoSlug: t.slug === 'wedding-animated' ? 'wedding-animated-demo' : (t.slug === 'birthday-neon-surprise' ? 'neon-surprise-demo' : t.slug)
        }));
      }

      const birthdayCinematicFields = [
        { name: "personName", label: "Birthday Person's Name", type: "text", required: true, placeholder: "e.g. Sneha Shinde" },
        { name: "petName", label: "Nickname / Pet Name (Optional)", type: "text", required: false, placeholder: "e.g. Gurlll / Bbg" },
        { name: "secretPin", label: "4-Digit Secret PIN Lock", type: "text", required: false, placeholder: "e.g. 1234 (Leave blank for no lock)" },
        { name: "letterText", label: "Envelope Love Letter Message", type: "textarea", required: false, placeholder: "Write your special letter for the recipient..." },
        { name: "favNotification", label: "Notification Banner Text", type: "text", required: false, placeholder: "e.g. YOU ARE MY FAVORITE NOTIFICATION 💖" },
        { name: "stayCute", label: "Wish Tagline Subheading", type: "text", required: false, placeholder: "e.g. STAY CUTE, STAY HAPPY, STAY MINE 💖" },
        { name: "iloveYou", label: "Grand Finale Heading", type: "text", required: false, placeholder: "e.g. I LOVE YOU ❤️" },
        { name: "meanToMe", label: "Grand Finale Quote/Subtitle", type: "textarea", required: false, placeholder: "e.g. You don't know how much you mean to me" },
        { name: "photo1", label: "Polaroid Photo Card 1", type: "file_upload", required: true, placeholder: "" },
        { name: "photo2", label: "Polaroid Photo Card 2", type: "file_upload", required: true, placeholder: "" },
        { name: "photo3", label: "Polaroid Photo Card 3", type: "file_upload", required: true, placeholder: "" },
        { name: "language", label: "Default Language", type: "select", options: [{ label: "English", value: "en" }, { label: "Marathi", value: "mr" }], required: false, placeholder: "" },
        { name: "bgMusic", label: "Background Music Track", type: "file_upload", required: false, placeholder: "" }
      ];

      // Local template injection to ensure it is always loaded and customizable in UI
      const localTemplates = [
        {
          id: "birthday-cinematic-love",
          dbId: "local-birthday-cinematic-love",
          name: "Birthday Cinematic Premium",
          category: "birthday",
          description: "A premium cinematic storytelling surprise gift experience for birthdays with interactive canvas particles, 3D polaroid cards, and virtual envelope.",
          thumbnail: "",
          previewUrl: "/e/birthday-cinematic-love",
          componentName: "BirthdayCinematicLove",
          status: "published",
          fields: birthdayCinematicFields,
          demoSlug: "birthday-cinematic-love"
        },
        {
          id: "birthday-cinematic",
          dbId: "local-birthday-cinematic",
          name: "Birthday Cinematic",
          category: "birthday",
          description: "A premium cinematic storytelling surprise gift experience for birthdays with interactive canvas particles, 3D polaroid cards, and virtual envelope.",
          thumbnail: "",
          previewUrl: "/e/birthday-cinematic-love",
          componentName: "BirthdayCinematicLove",
          status: "published",
          fields: birthdayCinematicFields,
          demoSlug: "birthday-cinematic-love"
        }
      ];

      // Merge fetched templates with local ones to prevent duplication & ensure schema fields are full
      const allTemplates = [...fetchedTpls];
      localTemplates.forEach(localTpl => {
        const existingIdx = allTemplates.findIndex(t => t.id === localTpl.id);
        if (existingIdx >= 0) {
          allTemplates[existingIdx].fields = localTpl.fields;
        } else {
          allTemplates.push(localTpl);
        }
      });

      setTemplates(allTemplates);
    } catch (e) {
      console.warn("Backend Templates API unavailable:", e.message);
    }

    const token = localStorage.getItem("token");
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

      try {
        const enqRes = await enquiryService.getAll();
        if (enqRes && enqRes.status && enqRes.data && enqRes.data.length > 0) {
          const formattedEnqs = enqRes.data.map(e => ({
            id: String(e.id),
            clientName: e.client_name,
            clientEmail: e.client_email,
            clientPhone: e.client_phone,
            category: e.category?.slug || e.category_id,
            categoryId: e.category_id,
            templateId: e.template_id,
            submittedDetails: e.form_data || {},
            status: e.status || "New",
            assignedTo: e.assigned_to_user_id || "",
            notes: e.notes || "",
            createdAt: e.createdAt
          }));
          setEnquiries(formattedEnqs);
        }
      } catch (e) {
        console.warn("Backend Enquiries API notice:", e.message);
      }

      try {
        const userRes = await userService.getAll();
        if (userRes && userRes.status && userRes.data && userRes.data.length > 0) {
          const formattedUsers = userRes.data.map(u => ({
            id: String(u.id),
            name: u.name,
            email: u.email,
            role: u.role,
            status: u.status
          }));
          setAdmins(formattedUsers);
        }
      } catch (e) {
        console.warn("Backend Users API notice:", e.message);
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
