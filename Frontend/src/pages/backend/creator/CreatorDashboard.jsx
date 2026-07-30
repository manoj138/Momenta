import React from "react";
import { useApp } from "../../../context/AppContext";
import { useAuth } from "../../../context/AuthContext";
import { FileText, CheckCircle2, ChevronRight, Activity, PlusCircle, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../components/common/Button";

const CreatorDashboard = () => {
  const { enquiries, experiences, categories, deleteExperience, fetchApiData } = useApp();
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  React.useEffect(() => {
    fetchApiData();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchApiData();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Filter tasks assigned to this creator OR unassigned new customer submissions
  const creatorTasks = enquiries.filter(
    (e) => (e.assignedTo === user?.id || !e.assignedTo || user?.role === "superadmin") && 
           (e.status !== "Completed" && e.status !== "Cancelled")
  );

  const completedCount = enquiries.filter(
    (e) => (e.assignedTo === user?.id || user?.role === "superadmin") && e.status === "Completed"
  ).length;

  const activeExperiences = experiences.filter(
    (exp) => exp.status === "published"
  );

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
        <div className="p-5 bg-slate-900 border border-white/5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Assigned Tasks</span>
            <span className="block text-2xl font-extrabold">{creatorTasks.length}</span>
          </div>
          <div className="p-3 bg-brand-500/10 text-brand-400 rounded-xl">
            <Activity size={22} />
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-white/5 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Completed Invitations</span>
            <span className="block text-2xl font-extrabold">{completedCount}</span>
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
          <h3 className="text-lg font-bold text-brand-400">Your Assigned Production Queue</h3>

          {creatorTasks.length === 0 ? (
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
                    <p className="text-[11px] text-gray-500">Submitted: {new Date(task.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link to={`/creator/experience/create/${task.id}`}>
                      <Button variant="primary" size="sm" className="flex items-center gap-1.5 cursor-pointer">
                        <PlusCircle size={14} />
                        <span>Launch Creator Studio</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
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
