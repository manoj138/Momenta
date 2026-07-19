import React from "react";
import { useApp } from "../../../context/AppContext";
import { Layers, Palette, Users, Globe, FileText, CheckCircle2, ChevronRight } from "lucide-react";
import AnimatedCard from "../../../components/common/AnimatedCard";
import { Link } from "react-router-dom";

const SuperAdminDashboard = () => {
  const { categories, templates, admins, enquiries, experiences } = useApp();

  const metrics = [
    { label: "Active Categories", value: categories.length, icon: <Layers className="text-brand-500" size={22} />, path: "/superadmin/categories" },
    { label: "Design Templates", value: templates.length, icon: <Palette className="text-yellow-500" size={22} />, path: "/superadmin/templates" },
    { label: "Admins / Creators", value: admins.length, icon: <Users className="text-indigo-500" size={22} />, path: "/superadmin/admins" },
    { label: "Digital Experiences", value: experiences.length, icon: <Globe className="text-pink-500" size={22} />, path: "/superadmin/experiences" },
    { label: "Client Enquiries", value: enquiries.length, icon: <FileText className="text-teal-500" size={22} />, path: "/superadmin/enquiries" },
  ];

  const pendingEnquiries = enquiries.filter(e => e.status === "New" || e.status === "In Progress");

  return (
    <div className="p-6 md:p-10 space-y-8 bg-slate-950 min-h-screen text-white">
      {/* Welcome header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Super Admin Hub</h1>
          <p className="text-gray-400 text-sm">Review global analytics, manage custom schemas, and oversee enquiries.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {metrics.map((m, idx) => (
          <Link key={idx} to={m.path}>
            <div className="p-5 rounded-2xl bg-slate-900 border border-white/5 shadow-md flex items-center justify-between hover:border-brand-500/30 transition-all duration-300">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{m.label}</span>
                <span className="block text-2xl font-extrabold">{m.value}</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl">
                {m.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enquiries Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-brand-400">Pending Customer Requests</h3>
            <Link to="/superadmin/enquiries" className="text-xs text-gray-400 hover:text-white flex items-center gap-0.5">
              <span>View All Enquiries</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {pendingEnquiries.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/60 border border-white/5 rounded-2xl">
              <p className="text-gray-400 text-sm">No pending enquiries in queue. Everything is up to date!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingEnquiries.slice(0, 4).map((enq) => (
                <div key={enq.id} className="p-5 bg-slate-900/80 border border-white/5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{enq.clientName}</span>
                      <span className="text-[10px] uppercase px-2 py-0.5 rounded-md font-extrabold bg-brand-500/10 text-brand-400">
                        {categories.find(c => c.id === enq.category)?.name || enq.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{enq.clientEmail} • {enq.clientPhone}</p>
                    {enq.notes && <p className="text-[11px] text-gray-500 italic max-w-md truncate">"{enq.notes}"</p>}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] uppercase px-2.5 py-1 rounded-full font-bold ${
                      enq.status === "New" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}>
                      {enq.status}
                    </span>
                    <Link to="/superadmin/enquiries">
                      <button className="text-xs font-semibold bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 cursor-pointer">
                        Manage
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Published cards stats */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-brand-400">Published Experiences</h3>
          {experiences.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/60 border border-white/5 rounded-2xl">
              <p className="text-gray-400 text-sm">No links generated yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {experiences.slice(0, 3).map((exp) => (
                <div key={exp.id} className="p-4 bg-slate-900 border border-white/5 rounded-2xl space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-white">{exp.clientName}</h4>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                        {templates.find(t => t.id === exp.templateId)?.name || exp.templateId}
                      </span>
                    </div>
                    <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full uppercase">
                      {exp.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-[10px] text-brand-400 select-all font-mono">/e/{exp.slug}</span>
                    <a
                      href={`/e/${exp.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] bg-brand-600 hover:bg-brand-700 text-white font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer"
                    >
                      View Live
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
