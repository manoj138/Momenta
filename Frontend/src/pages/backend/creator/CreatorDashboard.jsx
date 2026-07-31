import React from "react";
import { useApp } from "../../../context/AppContext";
import { useAuth } from "../../../context/AuthContext";
import { FileText, CheckCircle2, ChevronRight, Activity, PlusCircle, Trash2, Pencil, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../components/common/Button";

const CreatorDashboard = () => {
  const { enquiries, experiences, categories, deleteExperience, deleteEnquiry, fetchApiData } = useApp();
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("queue"); // "queue" | "completed"

  React.useEffect(() => {
    fetchApiData();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchApiData();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Filter tasks assigned to this creator OR unassigned new customer submissions OR all pending customer inquiries
  const creatorTasks = enquiries.filter((e) => {
    const statusLower = (e.status || "").toLowerCase();
    const isFinished = statusLower === "completed" || statusLower === "cancelled";
    return !isFinished;
  });

  const completedEnquiries = enquiries.filter((e) => {
    const statusLower = (e.status || "").toLowerCase();
    return statusLower === "completed";
  });

  const completedCount = completedEnquiries.length;

  const activeExperiences = experiences.filter(
    (exp) => exp.status === "published"
  );

  const getSlugFromNotes = (notes) => {
    if (!notes) return "";
    const match = notes.match(/\/e\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : "";
  };

  const handleDeleteEnquiry = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete the enquiry for "${name}"? This action cannot be undone.`)) {
      await deleteEnquiry(id);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 bg-slate-950 min-h-screen text-white">
      {/* Welcome */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Creator Studio Dashboard</h1>
          <p className="text-gray-400 text-sm">Welcome back, {user?.name}. Start creating immersive digital experiences below.</p>
        </div>
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="bg-white/5 border-white/10 hover:bg-white/10 text-xs font-bold px-4 py-2 cursor-pointer flex items-center gap-2"
        >
          <Activity size={14} className={isRefreshing ? "animate-spin text-brand-400" : "text-brand-400"} />
          <span>{isRefreshing ? "Refreshing Queue..." : "Refresh Live Queue"}</span>
        </Button>
      </div>

      {/* Metric summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => setActiveTab("queue")}
          className={`p-5 bg-slate-900 border rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
            activeTab === "queue" ? "border-brand-500/50 ring-2 ring-brand-500/20" : "border-white/5 hover:border-white/20"
          }`}
        >
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Pending Queue</span>
            <span className="block text-2xl font-extrabold text-white">{creatorTasks.length}</span>
          </div>
          <div className="p-3 bg-brand-500/10 text-brand-400 rounded-xl">
            <Activity size={22} />
          </div>
        </div>

        <div 
          onClick={() => setActiveTab("completed")}
          className={`p-5 bg-slate-900 border rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
            activeTab === "completed" ? "border-emerald-500/50 ring-2 ring-emerald-500/20" : "border-white/5 hover:border-white/20"
          }`}
        >
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">Completed Invitations</span>
            <span className="block text-2xl font-extrabold text-emerald-400">{completedCount}</span>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-white/5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Active Links</span>
            <span className="block text-2xl font-extrabold">{activeExperiences.length}</span>
          </div>
          <div className="p-3 bg-pink-500/10 text-pink-400 rounded-xl">
            <FileText size={22} />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Task Lists */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tab Controls */}
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <button
              onClick={() => setActiveTab("queue")}
              className={`text-sm font-bold pb-2 transition-all border-b-2 cursor-pointer ${
                activeTab === "queue"
                  ? "border-brand-500 text-brand-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Pending Queue ({creatorTasks.length})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`text-sm font-bold pb-2 transition-all border-b-2 cursor-pointer ${
                activeTab === "completed"
                  ? "border-emerald-500 text-emerald-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Completed Invitations ({completedEnquiries.length})
            </button>
          </div>

          {activeTab === "queue" ? (
            creatorTasks.length === 0 ? (
              <div className="p-12 text-center bg-slate-900 border border-white/5 rounded-2xl">
                <p className="text-gray-400 text-sm">No pending customer inquiries assigned to you. Enjoy your day! 🎉</p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {creatorTasks.map((task) => (
                  <div key={task.id} className="p-5 bg-slate-900 border border-white/5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{task.clientName}</span>
                        <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400">
                          {categories.find(c => c.id === task.category)?.name || task.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">Contact: {task.clientPhone} • {task.clientEmail}</p>
                      <p className="text-[11px] text-gray-400 font-medium flex items-center gap-1.5 pt-0.5">
                        <Clock size={12} className="text-brand-400 shrink-0" />
                        <span>Submitted: {new Date(task.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} at {new Date(task.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link to={`/creator/experience/create/${task.id}`}>
                        <Button variant="primary" size="sm" className="flex items-center gap-1.5 cursor-pointer">
                          <PlusCircle size={14} />
                          <span>Launch Creator Studio</span>
                        </Button>
                      </Link>
                      <button
                        onClick={() => handleDeleteEnquiry(task.id, task.clientName)}
                        className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 rounded-xl border border-rose-500/20 transition-all cursor-pointer flex items-center justify-center"
                        title="Delete Enquiry"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            completedEnquiries.length === 0 ? (
              <div className="p-12 text-center bg-slate-900 border border-white/5 rounded-2xl">
                <p className="text-gray-400 text-sm">No completed invitations yet. Publish your first digital card to see it here! ✨</p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {completedEnquiries.map((item) => {
                  const liveSlug = getSlugFromNotes(item.notes);

                  return (
                    <div key={item.id} className="p-5 bg-slate-900 border border-emerald-500/20 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg shadow-emerald-950/20">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-white text-base">{item.clientName}</span>
                          <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                            <CheckCircle2 size={11} />
                            <span>Completed & Published</span>
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">Contact: {item.clientPhone} • {item.clientEmail}</p>
                        <p className="text-[11px] text-gray-400 font-medium flex items-center gap-1.5 pt-0.5">
                          <Clock size={12} className="text-emerald-400 shrink-0" />
                          <span>Submitted: {new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} at {new Date(item.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-400 pt-0.5">
                          <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-gray-300">Category: {item.category}</span>
                          {liveSlug && (
                            <span className="font-mono text-emerald-400 text-[11px]">Link: /e/{liveSlug}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        {liveSlug && (
                          <a
                            href={`/e/${liveSlug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                          >
                            <FileText size={14} />
                            <span>Visit Live Card</span>
                          </a>
                        )}
                        <Link to={`/creator/experience/create/${item.id}`}>
                          <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10 text-xs font-bold py-2 flex items-center gap-1.5">
                            <Pencil size={13} />
                            <span>Edit Card</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>

        {/* Quick Guidelines & Active Links Directory */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-brand-400">Live Customer Links Directory</h3>
            <div className="p-5 bg-slate-900 border border-white/5 rounded-2xl space-y-4 max-h-96 overflow-y-auto">
              {experiences.length === 0 ? (
                <p className="text-gray-500 text-xs">No active customer links created yet.</p>
              ) : (
                experiences.map((exp) => (
                  <div key={exp.id} className="p-3 bg-slate-950 border border-white/5 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white truncate">{exp.clientName}</span>
                      <span className="text-[9px] uppercase px-2 py-0.5 rounded font-bold bg-emerald-500/10 text-emerald-400">
                        {exp.status || "published"}
                      </span>
                    </div>

                    <div className="text-[11px] text-pink-400 font-medium">
                      📁 {exp.componentName || exp.templateId || "Birthday Cinematic Love"}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                      <span className="font-mono text-gray-400 truncate">/e/{exp.slug}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/e/${exp.slug}`);
                            alert(`Copied link: ${window.location.origin}/e/${exp.slug}`);
                          }}
                          className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] text-gray-300 hover:text-white cursor-pointer"
                          title="Copy URL"
                        >
                          📋 Copy
                        </button>
                        <a
                          href={`/e/${exp.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2 py-1 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 rounded text-[10px] cursor-pointer"
                          title="Visit Experience"
                        >
                          🚀 Visit
                        </a>
                        <Link
                          to={`/creator/experience/edit/${exp.id}`}
                          className="p-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded text-[10px] cursor-pointer transition-colors"
                          title="Edit Experience & Media"
                        >
                          <Pencil size={13} />
                        </Link>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete experience link "/e/${exp.slug}"?`)) {
                              deleteExperience(exp.id);
                            }
                          }}
                          className="p-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded text-[10px] cursor-pointer transition-colors"
                          title="Delete Experience"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-brand-400">Workflow Rules</h3>
            <div className="p-5 bg-slate-900 border border-white/5 rounded-2xl text-xs text-gray-300 space-y-4">
              <div>
                <span className="font-bold text-brand-400 block mb-1">1. Review Inquiries</span>
                <p className="text-gray-400">Check client notes and verify details before selecting a template.</p>
              </div>
              <div>
                <span className="font-bold text-brand-400 block mb-1">2. Build live preview</span>
                <p className="text-gray-400">Use the Creator studio split panel. Upload high resolution assets for best aesthetics.</p>
              </div>
              <div>
                <span className="font-bold text-brand-400 block mb-1">3. Generate Link</span>
                <p className="text-gray-400">Set the custom URL slug according to client's choice and share it for feedback.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreatorDashboard;
