import React, { createContext, useContext, useState, useEffect } from "react";
const AppContext = createContext(null);

export const safeSetLocalStorage = (key, data) => {
  try {
    const serialized = typeof data === "string" ? data : JSON.stringify(data);
    localStorage.setItem(key, serialized);
  } catch (err) {
    console.warn(`[LocalStorage Shield] Storage limit exceeded for key "${key}":`, err.message);
  }
};

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

      const birthdayBelatedApologyFields = [
        { name: "personName", label: "Birthday Person's Name", type: "text", required: true, placeholder: "e.g. Sneha Shinde" },
        { name: "petName", label: "Nickname / Pet Name (Optional)", type: "text", required: false, placeholder: "e.g. Cutie / Champion" },
        { name: "secretPin", label: "4-Digit Secret PIN Lock", type: "text", required: false, placeholder: "e.g. 1234 (Leave blank for no lock)" },
        { name: "lateReason", label: "Late Apology Excuse / Reason", type: "textarea", required: false, placeholder: "Finding the perfect words for someone as special as you took a little extra time! ✨" },
        { name: "scratchTitle", label: "Scratch Coupon Gift Title", type: "text", required: false, placeholder: "SURPRISE GIFT COUPON 🎁" },
        { name: "scratchMessage", label: "Scratch Coupon Gift Message", type: "textarea", required: false, placeholder: "I know I was a bit late, but you'll always be my #1! Enjoy your special week 🎉✨" },
        { name: "letterText", label: "Envelope Heartfelt Letter Message", type: "textarea", required: false, placeholder: "Write your heartfelt belated birthday letter..." },
        { name: "stayCute", label: "Finale Subheading / Tagline", type: "text", required: false, placeholder: "HAPPY BELATED BIRTHDAY TO MY FAVORITE PERSON 🎂✨" },
        { name: "iloveYou", label: "Grand Finale Main Heading", type: "text", required: false, placeholder: "ONCE AGAIN, SORRY FOR BEING LATE! 🥺 HAPPY BIRTHDAY! 🎉💖" },
        { name: "meanToMe", label: "Grand Finale Closing Quote", type: "textarea", required: false, placeholder: "Finding the perfect words took a little extra time, but my wishes for you are timeless. ❤️" },
        { name: "photo1", label: "Memory Photo 1", type: "file_upload", required: true, placeholder: "" },
        { name: "photo2", label: "Memory Photo 2", type: "file_upload", required: true, placeholder: "" },
        { name: "photo3", label: "Memory Photo 3 (Center Hero Photo)", type: "file_upload", required: true, placeholder: "" },
        { name: "photo4", label: "Memory Photo 4", type: "file_upload", required: true, placeholder: "" },
        { name: "photo5", label: "Memory Photo 5", type: "file_upload", required: true, placeholder: "" },
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
          id: "birthday-belated-apology",
          dbId: "local-birthday-belated-apology",
          name: "Belated Birthday Apology & Love",
          category: "birthday",
          description: "An emotional belated birthday surprise gift with interactive time-rewind clock, cute forgiveness quiz, 3D polaroid reel, and wax-sealed love letter.",
          thumbnail: "",
          previewUrl: "/e/birthday-belated-apology",
          componentName: "BirthdayBelatedApology",
          status: "published",
          fields: birthdayBelatedApologyFields,
          demoSlug: "birthday-belated-apology"
        }
      ];

      // Smart deduplication helper
      const getTemplateDedupeKey = (t) => {
        if (
          t.componentName === "BirthdayCinematicLove" ||
          t.id === "birthday-cinematic-love" ||
          t.id === "birthday-cinematic" ||
          t.slug === "birthday-cinematic-love" ||
          t.slug === "birthday-cinematic"
        ) {
          return "birthday-cinematic-love";
        }
        return t.componentName || t.slug || t.id;
      };

      const uniqueTemplates = [];
      const seenKeys = new Set();

      // Process fetched DB templates
      fetchedTpls.forEach((fTpl) => {
        const key = getTemplateDedupeKey(fTpl);
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          uniqueTemplates.push(fTpl);
        }
      });

      // Merge local templates safely
      localTemplates.forEach((localTpl) => {
        const key = getTemplateDedupeKey(localTpl);
        const existingIdx = uniqueTemplates.findIndex((t) => getTemplateDedupeKey(t) === key);
        if (existingIdx >= 0) {
          if (!uniqueTemplates[existingIdx].fields || uniqueTemplates[existingIdx].fields.length < localTpl.fields.length) {
            uniqueTemplates[existingIdx].fields = localTpl.fields;
          }
        } else {
          seenKeys.add(key);
          uniqueTemplates.push(localTpl);
        }
      });

      setTemplates(uniqueTemplates);
    } catch (e) {
      console.warn("Backend Templates API unavailable:", e.message);
    }

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const expRes = await experienceService.getAll();
        let apiExps = [];
        if (expRes && expRes.status && expRes.data && expRes.data.length > 0) {
          apiExps = expRes.data.map(e => ({
            id: String(e.id || e._id),
            slug: e.slug,
            templateId: e.template?.slug || e.template_slug || e.template_id,
            category: e.category?.slug || e.category_slug || e.category_id,
            clientName: e.client_name || e.clientName || e.title,
            status: e.is_published ? "published" : "draft",
            data: e.data,
            createdAt: e.createdAt
          }));
        }

        let localExps = [];
        try {
          const stored = localStorage.getItem("momenta_local_experiences");
          if (stored) localExps = JSON.parse(stored);
        } catch (err) {}

        const mergedExps = [...apiExps];
        localExps.forEach(localExp => {
          if (!mergedExps.some(e => e.slug === localExp.slug)) {
            mergedExps.push(localExp);
          }
        });

        setExperiences(mergedExps);
      } catch (e) {
        console.warn("Backend Experiences API notice:", e.message);
      }

      try {
        const enqRes = await enquiryService.getAll();
        if (enqRes && enqRes.status && enqRes.data && enqRes.data.length > 0) {
          const formattedEnqs = enqRes.data.map(e => ({
            id: String(e.id || e._id),
            clientName: e.client_name || e.clientName || "Client",
            clientEmail: e.client_email || e.clientEmail || "",
            clientPhone: e.client_phone || e.clientPhone || "",
            category: e.category?.slug || e.category_slug || e.category_id || e.category || "birthday",
            categoryId: e.category_id || e.category_slug,
            templateId: e.template?.slug || e.template_slug || e.template_id || e.templateId || "birthday-cinematic-love",
            submittedDetails: e.form_data || e.submittedDetails || {},
            status: e.status || "New",
            assignedTo: e.assigned_to_user_id || e.assignedTo || "",
            notes: e.notes || "",
            createdAt: e.createdAt || new Date().toISOString()
          }));
          setEnquiries(formattedEnqs);
        }
      } catch (e) {
        console.warn("Backend Enquiries API notice:", e.message);
      }

      const userStr = localStorage.getItem("users") || localStorage.getItem("user");
      let currentUser = null;
      try {
        currentUser = userStr ? JSON.parse(userStr) : null;
      } catch (err) {}

      if (currentUser && (currentUser.role === "superadmin" || currentUser.role === "super_admin")) {
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
          // Silently ignore permission notice for user listing
        }
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
      id: enquiry.id || `enq_${Date.now()}`,
      clientName: enquiry.clientName || enquiry.client_name || "Client",
      client_name: enquiry.client_name || enquiry.clientName || "Client",
      clientEmail: enquiry.clientEmail || enquiry.client_email || "",
      client_email: enquiry.client_email || enquiry.clientEmail || "",
      clientPhone: enquiry.clientPhone || enquiry.client_phone || "",
      client_phone: enquiry.client_phone || enquiry.clientPhone || "",
      category: enquiry.category || enquiry.category_id || "birthday",
      categoryId: enquiry.category_id || enquiry.category || "birthday",
      templateId: enquiry.templateId || enquiry.template_id || "",
      template_id: enquiry.template_id || enquiry.templateId || "",
      submittedDetails: enquiry.submittedDetails || enquiry.form_data || {},
      form_data: enquiry.form_data || enquiry.submittedDetails || {},
      createdAt: new Date().toISOString(),
      status: enquiry.status || "New",
      assignedTo: enquiry.assignedTo || enquiry.assigned_to_user_id || "",
      notes: enquiry.notes || "",
      ...enquiry,
    };
    setEnquiries((prev) => {
      const updated = [fullEnquiry, ...prev.filter(e => e.id !== fullEnquiry.id)];
      safeSetLocalStorage("momenta_local_enquiries", updated);
      return updated;
    });
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
      id: experience.id || `exp_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "published",
      is_published: true,
      ...experience,
      data: {
        rsvpList: [],
        ...experience.data
      }
    };
    setExperiences((prev) => {
      const updated = [fullExperience, ...prev.filter(e => e.slug !== fullExperience.slug)];
      safeSetLocalStorage("momenta_local_experiences", updated);
      return updated;
    });
    return fullExperience;
  };
  const updateExperience = (id, updatedFields) => {
    setExperiences((prev) => {
      const updated = prev.map((e) => (e.id === id || e.slug === id ? { ...e, ...updatedFields } : e));
      safeSetLocalStorage("momenta_local_experiences", updated);
      return updated;
    });
  };
  const deleteExperience = async (id) => {
    setExperiences((prev) => {
      const updated = prev.filter((e) => e.id !== id && e.slug !== id);
      safeSetLocalStorage("momenta_local_experiences", updated);
      return updated;
    });

    try {
      await experienceService.delete(id);
    } catch (e) {
      console.warn("Backend experience delete API notice:", e.message);
    }
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
        fetchApiData,
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
