import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { Search, FileText, Calendar, Edit3, X, User, Check, RefreshCw } from "lucide-react";
import Select from "../../../components/common/Select";
import Modal from "../../../components/common/Modal";

const EnquiryManager = () => {
  const { enquiries, categories, admins, updateEnquiryStatus } = useApp();
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  // Handler to assign and change status
  const handleUpdate = (id, status, assignedTo, notes = "") => {
    updateEnquiryStatus(id, status, notes, assignedTo);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry(prev => ({ ...prev, status, assignedTo, notes }));
    }
  };

  const statuses = [
    "New", "Contacted", "In Progress", "Preview Sent", "Changes Requested", "Completed", "Cancelled"
  ];

  const filtered = enquiries.filter((e) => {
    const matchStatus = filterStatus === "all" || e.status === filterStatus;
    const matchSearch = e.clientName.toLowerCase().includes(search.toLowerCase()) ||
                        e.clientEmail.toLowerCase().includes(search.toLowerCase()) ||
                        e.clientPhone.includes(search);
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6 md:p-10 space-y-8 bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Customer Lead Pipelines</h1>
        <p className="text-gray-400 text-sm">Assign enquiries to creator specialists and track production delivery status.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900 p-5 rounded-2xl border border-white/5">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            <Search size={16} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, phone..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest shrink-0">Filter Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-slate-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Pipeline Statuses</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Leads Table list */}
      <div className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden shadow-premium">
        {filtered.length === 0 ? (
          <div className="p-20 text-center text-gray-400">No client enquiries matching filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-slate-950/40 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  <th className="py-4 px-6">Client Info</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Assigned Creator</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Received Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filtered.map((enq) => {
                  const assignedCreator = admins.find(a => a.id === enq.assignedTo);
                  return (
                    <tr key={enq.id} className="hover:bg-white/2 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-white text-sm">{enq.clientName}</div>
                        <div className="text-gray-400 text-[11px]">{enq.clientEmail} • {enq.clientPhone}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-brand-400">
                          {categories.find(c => c.id === enq.category)?.name || enq.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {assignedCreator ? (
                          <div className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                            <User size={13} />
                            <span>{assignedCreator.name}</span>
                          </div>
                        ) : (
                          <span className="text-gray-500 font-medium italic">Unassigned</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          enq.status === "New" ? "bg-amber-500/15 text-amber-400" :
                          enq.status === "Completed" ? "bg-emerald-500/15 text-emerald-400" :
                          "bg-blue-500/15 text-blue-400"
                        }`}>
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-450">
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <Calendar size={13} />
                          <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-3.5 py-1.5 rounded-lg cursor-pointer transition-all"
                        >
                          Review Lead
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Lead Details Modal */}
      {selectedEnquiry && (
        <Modal
          isOpen={!!selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          title="Inquiry Workspace"
        >
          <div className="space-y-6 text-slate-800 dark:text-white">
            {/* Lead Meta */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-slate-950 p-4 border border-gray-150 dark:border-slate-850 rounded-2xl">
              <div>
                <span className="text-[10px] font-bold text-gray-450 dark:text-gray-500 uppercase tracking-widest block">Client Name</span>
                <span className="text-sm font-bold">{selectedEnquiry.clientName}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-450 dark:text-gray-500 uppercase tracking-widest block">Contact Phone</span>
                <span className="text-sm font-bold">{selectedEnquiry.clientPhone}</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-gray-200 dark:border-white/5">
                <span className="text-[10px] font-bold text-gray-450 dark:text-gray-500 uppercase tracking-widest block">Email Contact</span>
                <span className="text-xs font-semibold">{selectedEnquiry.clientEmail}</span>
              </div>
            </div>

            {/* Custom Submitted Fields Details */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-sm text-brand-600 dark:text-brand-400 border-b border-gray-100 dark:border-white/5 pb-1 flex items-center gap-1">
                <FileText size={14} />
                <span>Submitted Design Details</span>
              </h4>
              <div className="space-y-2 bg-gray-50/50 dark:bg-slate-900/30 p-4 border border-gray-100 dark:border-slate-800 rounded-2xl max-h-60 overflow-y-auto">
                {Object.entries(selectedEnquiry.submittedDetails || {}).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-start gap-4 py-1 text-xs">
                    <span className="font-bold text-gray-500 dark:text-gray-400 capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                    <span className="font-medium text-right max-w-xs break-words">{String(val)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Workflow Assignment panel */}
            <div className="space-y-4 border-t border-gray-200 dark:border-white/5 pt-4">
              <h4 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <RefreshCw size={14} />
                <span>Production Assignment</span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Assign Creator Specialist"
                  value={selectedEnquiry.assignedTo || ""}
                  onChange={(e) => handleUpdate(selectedEnquiry.id, selectedEnquiry.status, e.target.value, selectedEnquiry.notes)}
                  options={[
                    { value: "", label: "Unassigned / Keep Queue" },
                    ...admins.map(a => ({ value: a.id, label: a.name }))
                  ]}
                />

                <Select
                  label="Inquiry Status"
                  value={selectedEnquiry.status}
                  onChange={(e) => handleUpdate(selectedEnquiry.id, e.target.value, selectedEnquiry.assignedTo, selectedEnquiry.notes)}
                  options={statuses.map(s => ({ value: s, label: s }))}
                />
              </div>

              <div className="pt-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 block mb-1">Super Admin Comments / Notes</label>
                <textarea
                  value={selectedEnquiry.notes || ""}
                  onChange={(e) => handleUpdate(selectedEnquiry.id, selectedEnquiry.status, selectedEnquiry.assignedTo, e.target.value)}
                  placeholder="Type instructions or feedback here..."
                  className="w-full p-3 text-xs bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-brand-500"
                  rows={2}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EnquiryManager;
