import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

// Helper to seed localStorage with default data if empty
const seedData = () => {
  const defaultCategories = [
    {
      id: "wedding",
      name: "Wedding",
      description: "Traditional and cinematic wedding invitation cards.",
      fields: [
        { name: "brideName", label: "Bride's Name", type: "text", required: true },
        { name: "groomName", label: "Groom's Name", type: "text", required: true },
        { name: "weddingDate", label: "Wedding Date", type: "date", required: true },
        { name: "weddingTime", label: "Wedding Time", type: "text", placeholder: "e.g., 10:30 AM", required: true },
        { name: "venueName", label: "Venue Name", type: "text", required: true },
        { name: "venueAddress", label: "Complete Address", type: "textarea", required: true },
        { name: "mapsLink", label: "Google Maps Location URL", type: "text", required: false },
        { name: "familyDetails", label: "Family Names (comma separated)", type: "text", required: false },
        { name: "welcomeMessage", label: "Invitation / Special Message", type: "textarea", required: false },
        { name: "bgMusic", label: "Background Music Link (MP3 URL)", type: "text", required: false },
      ]
    },
    {
      id: "birthday",
      name: "Birthday",
      description: "Fun, vibrant, and interactive birthday cards.",
      fields: [
        { name: "personName", label: "Birthday Person Name", type: "text", required: true },
        { name: "age", label: "Age", type: "number", required: true },
        { name: "birthdayDate", label: "Birthday Date", type: "date", required: true },
        { name: "venue", label: "Venue / Party Details", type: "text", required: true },
        { name: "message", label: "Personal Invitation Message", type: "textarea", required: false },
        { name: "surpriseMessage", label: "Surprise Secret Message (revealed on click)", type: "textarea", required: false },
        { name: "bgMusic", label: "Background Music Link (MP3 URL)", type: "text", required: false },
      ]
    },
    {
      id: "proposal",
      name: "Proposal",
      description: "Romantic and emotional proposal page experiences.",
      fields: [
        { name: "yourName", label: "Your Name", type: "text", required: true },
        { name: "partnerName", label: "Partner's Name", type: "text", required: true },
        { name: "proposalDate", label: "Special Date", type: "date", required: true },
        { name: "loveStory", label: "Our Story / Message", type: "textarea", required: true },
        { name: "question", label: "Proposal Question", type: "text", placeholder: "e.g. Will you marry me?", required: true },
        { name: "bgMusic", label: "Romantic Music Link (MP3 URL)", type: "text", required: false },
      ]
    },
    {
      id: "anniversary",
      name: "Anniversary",
      description: "Celebrate milestones, timelines, and relationships.",
      fields: [
        { name: "coupleNames", label: "Couple Names", type: "text", placeholder: "e.g. Rahul & Sneha", required: true },
        { name: "years", label: "Anniversary Year (e.g. 5th, 25th)", type: "text", required: true },
        { name: "anniversaryDate", label: "Anniversary Date", type: "date", required: true },
        { name: "venue", label: "Celebration Venue", type: "text", required: false },
        { name: "story", label: "Love Story & Message", type: "textarea", required: false },
        { name: "bgMusic", label: "Background Music Link (MP3 URL)", type: "text", required: false },
      ]
    },
    {
      id: "surprise",
      name: "Surprise",
      description: "Interactive surprises with custom countdown and reveals.",
      fields: [
        { name: "title", label: "Surprise Title", type: "text", required: true },
        { name: "targetName", label: "Surprise Target Name", type: "text", required: true },
        { name: "revealDate", label: "Reveal Countdown Date", type: "date", required: true },
        { name: "revealMessage", label: "Secret Message", type: "textarea", required: true },
        { name: "bgMusic", label: "Surprise Tune (MP3 URL)", type: "text", required: false },
      ]
    },
    {
      id: "company",
      name: "Company",
      description: "Professional digital invitations for corporate events.",
      fields: [
        { name: "companyName", label: "Company Name", type: "text", required: true },
        { name: "eventType", label: "Event Type (e.g. Launch, Gala, Seminar)", type: "text", required: true },
        { name: "eventDate", label: "Event Date & Time", type: "text", required: true },
        { name: "venue", label: "Venue Details", type: "text", required: true },
        { name: "agenda", label: "Event Agenda / Details", type: "textarea", required: false },
        { name: "contactEmail", label: "RSVP Contact Email", type: "text", required: true },
      ]
    }
  ];

  const defaultTemplates = [
    {
      id: "wedding-royal-gold",
      name: "Royal Gold Invitation",
      category: "wedding",
      description: "Luxurious cream and gold themes with animated vectors, countdown timer, and background music.",
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600",
      demoSlug: "royal-gold-demo",
      status: "published"
    },
    {
      id: "wedding-modern-minimal",
      name: "Modern Minimalist",
      category: "wedding",
      description: "Clean aesthetic invitation focusing on typography, custom slide show, and dynamic RSVP layout.",
      thumbnail: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&q=80&w=600",
      demoSlug: "modern-minimal-demo",
      status: "published"
    },
    {
      id: "birthday-neon-surprise",
      name: "Neon Surprise Reveal",
      category: "birthday",
      description: "Vibrant neon glowing design featuring surprise envelope reveal, confetti pop, and animated comments board.",
      thumbnail: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600",
      demoSlug: "neon-surprise-demo",
      status: "published"
    },
    {
      id: "proposal-sweet-love",
      name: "Sweet Proposal Reveal",
      category: "proposal",
      description: "Romantic story layout with sliding text timelines, interactive 'Yes/No' proposals, and photo hearts.",
      thumbnail: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600",
      demoSlug: "sweet-love-demo",
      status: "published"
    },
    {
      id: "anniversary-memories",
      name: "Anniversary Love Timeline",
      category: "anniversary",
      description: "A chronological timeline layout showcasing photos and memories throughout years of marriage.",
      thumbnail: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600",
      demoSlug: "anniversary-memories-demo",
      status: "published"
    }
  ];

  const defaultAdmins = [
    { id: "usr_creator", name: "Creator Manoj", email: "creator@momenta.com", status: "active", categoryAccess: ["wedding", "birthday", "proposal"] },
    { id: "adm_2", name: "Rohan Patil", email: "rohan@momenta.com", status: "active", categoryAccess: ["wedding", "company"] }
  ];

  const defaultEnquiries = [
    {
      id: "enq_1",
      clientName: "Rahul Deshmukh",
      clientEmail: "rahul@gmail.com",
      clientPhone: "+91 98765 43210",
      category: "wedding",
      status: "New",
      assignedTo: "",
      notes: "Wants premium traditional Marathi style wedding with custom music.",
      submittedDetails: {
        brideName: "Priya",
        groomName: "Rahul",
        weddingDate: "2026-11-20",
        weddingTime: "11:30 AM",
        venueName: "Maratha Durbar Hall",
        venueAddress: "JM Road, Shivajinagar, Pune",
        mapsLink: "https://maps.google.com",
        familyDetails: "Deshmukh & Patil Families",
        welcomeMessage: "We request the honor of your presence at our wedding celebration."
      },
      createdAt: "2026-07-18T10:00:00Z"
    },
    {
      id: "enq_2",
      clientName: "Sneha Shinde",
      clientEmail: "sneha@hotmail.com",
      clientPhone: "+91 99887 76655",
      category: "birthday",
      status: "In Progress",
      assignedTo: "usr_creator",
      notes: "25th Birthday. Surprise Reveal template selected.",
      submittedDetails: {
        personName: "Sneha",
        age: "25",
        birthdayDate: "2026-08-15",
        venue: "Sky Lounge, Kothrud, Pune",
        message: "Join me as I celebrate 25 years of awesome!",
        surpriseMessage: "Wait... there's an afterparty at 10 PM in the basement!"
      },
      createdAt: "2026-07-19T09:12:00Z"
    }
  ];

  const defaultExperiences = [
    {
      id: "exp_demo_wedding",
      slug: "royal-gold-demo",
      templateId: "wedding-royal-gold",
      category: "wedding",
      clientName: "Rahul & Priya",
      status: "published",
      data: {
        brideName: "Priya",
        groomName: "Rahul",
        weddingDate: "2026-11-20",
        weddingTime: "11:30 AM",
        venueName: "Maratha Durbar Hall",
        venueAddress: "JM Road, Shivajinagar, Pune",
        mapsLink: "https://maps.google.com",
        familyDetails: "Deshmukh & Patil Families",
        welcomeMessage: "We request the honor of your presence at our wedding celebration.",
        bgMusic: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        rsvpList: [
          { name: "Amit Kulkarni", count: 2, status: "attending", message: "Congratulations to the beautiful couple!" },
          { name: "Pooja Shah", count: 1, status: "attending", message: "Can't wait to celebrate!" }
        ]
      },
      createdAt: "2026-07-18T12:00:00Z"
    },
    {
      id: "exp_demo_birthday",
      slug: "neon-surprise-demo",
      templateId: "birthday-neon-surprise",
      category: "birthday",
      clientName: "Sneha's 25th",
      status: "published",
      data: {
        personName: "Sneha Shinde",
        age: 25,
        birthdayDate: "2026-08-15",
        venue: "Sky Lounge, Kothrud, Pune",
        message: "Join me as I celebrate 25 years of awesome! Wear your brightest neon outfits.",
        surpriseMessage: "The secret afterparty is at Room 404, Hotel Grand Central starting at 11:00 PM!",
        bgMusic: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        rsvpList: [
          { name: "Kunal", count: 1, status: "attending", message: "Confetti ready! 🎉" }
        ]
      },
      createdAt: "2026-07-19T10:00:00Z"
    }
  ];

  if (!localStorage.getItem("momenta_categories")) {
    localStorage.setItem("momenta_categories", JSON.stringify(defaultCategories));
  }
  if (!localStorage.getItem("momenta_templates")) {
    localStorage.setItem("momenta_templates", JSON.stringify(defaultTemplates));
  }
  if (!localStorage.getItem("momenta_admins")) {
    localStorage.setItem("momenta_admins", JSON.stringify(defaultAdmins));
  }
  if (!localStorage.getItem("momenta_enquiries")) {
    localStorage.setItem("momenta_enquiries", JSON.stringify(defaultEnquiries));
  }
  if (!localStorage.getItem("momenta_experiences")) {
    localStorage.setItem("momenta_experiences", JSON.stringify(defaultExperiences));
  }
};

export const AppProvider = ({ children }) => {
  useEffect(() => {
    seedData();
  }, []);

  const [categories, setCategories] = useState(() => {
    seedData();
    return JSON.parse(localStorage.getItem("momenta_categories") || "[]");
  });

  const [templates, setTemplates] = useState(() => {
    return JSON.parse(localStorage.getItem("momenta_templates") || "[]");
  });

  const [admins, setAdmins] = useState(() => {
    return JSON.parse(localStorage.getItem("momenta_admins") || "[]");
  });

  const [enquiries, setEnquiries] = useState(() => {
    return JSON.parse(localStorage.getItem("momenta_enquiries") || "[]");
  });

  const [experiences, setExperiences] = useState(() => {
    return JSON.parse(localStorage.getItem("momenta_experiences") || "[]");
  });

  // State Save Side-effects
  const saveCategories = (newCategories) => {
    setCategories(newCategories);
    localStorage.setItem("momenta_categories", JSON.stringify(newCategories));
  };

  const saveTemplates = (newTemplates) => {
    setTemplates(newTemplates);
    localStorage.setItem("momenta_templates", JSON.stringify(newTemplates));
  };

  const saveAdmins = (newAdmins) => {
    setAdmins(newAdmins);
    localStorage.setItem("momenta_admins", JSON.stringify(newAdmins));
  };

  const saveEnquiries = (newEnquiries) => {
    setEnquiries(newEnquiries);
    localStorage.setItem("momenta_enquiries", JSON.stringify(newEnquiries));
  };

  const saveExperiences = (newExperiences) => {
    setExperiences(newExperiences);
    localStorage.setItem("momenta_experiences", JSON.stringify(newExperiences));
  };

  // CRUD actions
  // Categories
  const addCategory = (category) => {
    const updated = [...categories, category];
    saveCategories(updated);
  };
  const updateCategory = (id, updatedFields) => {
    const updated = categories.map((c) => (c.id === id ? { ...c, ...updatedFields } : c));
    saveCategories(updated);
  };
  const deleteCategory = (id) => {
    const updated = categories.filter((c) => c.id !== id);
    saveCategories(updated);
  };

  // Templates
  const addTemplate = (template) => {
    const updated = [...templates, template];
    saveTemplates(updated);
  };
  const updateTemplate = (id, updatedFields) => {
    const updated = templates.map((t) => (t.id === id ? { ...t, ...updatedFields } : t));
    saveTemplates(updated);
  };
  const deleteTemplate = (id) => {
    const updated = templates.filter((t) => t.id !== id);
    saveTemplates(updated);
  };

  // Admins
  const addAdmin = (admin) => {
    const updated = [...admins, admin];
    saveAdmins(updated);
  };
  const updateAdmin = (id, updatedFields) => {
    const updated = admins.map((a) => (a.id === id ? { ...a, ...updatedFields } : a));
    saveAdmins(updated);
  };
  const deleteAdmin = (id) => {
    const updated = admins.filter((a) => a.id !== id);
    saveAdmins(updated);
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
    const updated = [fullEnquiry, ...enquiries];
    saveEnquiries(updated);
    return fullEnquiry;
  };
  const updateEnquiryStatus = (id, status, notes = "", assignedTo = null) => {
    const updated = enquiries.map((e) => {
      if (e.id === id) {
        const changes = { status };
        if (notes !== "") changes.notes = notes;
        if (assignedTo !== null) changes.assignedTo = assignedTo;
        return { ...e, ...changes };
      }
      return e;
    });
    saveEnquiries(updated);
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
    const updated = [fullExperience, ...experiences];
    saveExperiences(updated);
    return fullExperience;
  };
  const updateExperience = (id, updatedFields) => {
    const updated = experiences.map((e) => (e.id === id ? { ...e, ...updatedFields } : e));
    saveExperiences(updated);
  };
  const deleteExperience = (id) => {
    const updated = experiences.filter((e) => e.id !== id);
    saveExperiences(updated);
  };
  const addRSVPToExperience = (slug, rsvp) => {
    const updated = experiences.map((exp) => {
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
    });
    saveExperiences(updated);
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
