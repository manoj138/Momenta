import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { Plus, Trash, UserX, UserCheck, Shield, Key } from "lucide-react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

const AdminManager = () => {
  const { admins, categories, addAdmin, updateAdmin, deleteAdmin } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCats, setSelectedCats] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    addAdmin({
      id: `usr_${Date.now()}`,
      name,
      email,
      status: "active",
      categoryAccess: selectedCats.length > 0 ? selectedCats : ["wedding", "birthday"],
    });

    setName("");
    setEmail("");
    setSelectedCats([]);
    setIsAdding(false);
  };

  const handleToggleStatus = (id, currentStatus) => {
    updateAdmin(id, { status: currentStatus === "active" ? "disabled" : "active" });
  };

  const handleCatCheck = (catId) => {
    if (selectedCats.includes(catId)) {
      setSelectedCats(selectedCats.filter(id => id !== catId));
    } else {
      setSelectedCats([...selectedCats, catId]);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Admins & Creators</h1>
          <p className="text-gray-400 text-sm">Create and configure accounts for designers and experience builders.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} variant="primary" className="flex items-center gap-1.5 cursor-pointer">
          <Plus size={16} />
          <span>Create Creator</span>
        </Button>
      </div>

      {isAdding && (
        <form onSubmit={handleCreate} className="bg-slate-900 border border-white/5 p-6 rounded-2xl max-w-xl space-y-5">
          <h3 className="font-bold text-lg text-brand-400 border-b border-white/5 pb-2">Add Experience Creator</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Patil"
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rohan@momenta.com"
              required
            />
          </div>

          {/* Categories Access check list */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Authorized Categories Access</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-slate-950 p-4 border border-white/5 rounded-xl">
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2 text-xs font-medium text-gray-300 hover:text-white cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedCats.includes(cat.id)}
                    onChange={() => handleCatCheck(cat.id)}
                    className="accent-brand-500 rounded border-white/10"
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" onClick={() => setIsAdding(false)} variant="outline" className="border-white/10 text-white cursor-pointer">
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="cursor-pointer">
              Add Creator
            </Button>
          </div>
        </form>
      )}

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {admins.map((adm) => (
          <div key={adm.id} className="bg-slate-900 border border-white/5 p-5 rounded-2xl flex flex-col justify-between h-48 hover:border-brand-500/30 transition-all duration-300">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-linear-to-tr from-brand-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                    {adm.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{adm.name}</h4>
                    <p className="text-gray-400 text-xs">{adm.email}</p>
                  </div>
                </div>
                <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                  adm.status === "active" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                }`}>
                  {adm.status}
                </span>
              </div>

              {/* Scopes */}
              <div className="pt-2">
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Access Roles</span>
                <div className="flex flex-wrap gap-1">
                  {adm.categoryAccess?.map((catId) => (
                    <span key={catId} className="text-[9px] font-bold bg-white/5 border border-white/5 text-gray-300 px-2 py-0.5 rounded">
                      {categories.find(c => c.id === catId)?.name || catId}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-3">
              <button
                onClick={() => handleToggleStatus(adm.id, adm.status)}
                className={`text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                  adm.status === "active" ? "text-amber-400 hover:text-amber-300" : "text-emerald-400 hover:text-emerald-300"
                }`}
              >
                {adm.status === "active" ? (
                  <>
                    <UserX size={13} />
                    <span>Disable Account</span>
                  </>
                ) : (
                  <>
                    <UserCheck size={13} />
                    <span>Enable Account</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  if (confirm("Are you sure you want to delete this creator?")) {
                    deleteAdmin(adm.id);
                  }
                }}
                className="p-1.5 rounded-lg text-danger hover:bg-red-500/10 cursor-pointer"
                title="Delete Admin"
              >
                <Trash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminManager;
