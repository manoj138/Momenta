import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { Plus, Trash, UserX, UserCheck, Shield, Key } from "lucide-react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { userService } from "../../../services/userService";

const AdminManager = () => {
  const { admins, categories, addAdmin, updateAdmin, deleteAdmin } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCats, setSelectedCats] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setErrorMsg("");

    const creatorPayload = {
      name,
      email,
      password,
      role: "creator",
      category_permissions: selectedCats.length > 0 ? selectedCats : ["wedding", "birthday"]
    };

    try {
      const res = await userService.create(creatorPayload);
      if (res.status) {
        addAdmin({
          id: String(res.data?.id || Date.now()),
          name,
          email,
          status: "active",
          categoryAccess: selectedCats.length > 0 ? selectedCats : ["wedding", "birthday"]
        });
      }
    } catch (err) {
      console.warn("Backend user creation error:", err);
      // Fallback to local
      addAdmin({
        id: `usr_${Date.now()}`,
        name,
        email,
        status: "active",
        categoryAccess: selectedCats.length > 0 ? selectedCats : ["wedding", "birthday"]
      });
    }

    setName("");
    setEmail("");
    setPassword("");
    setSelectedCats([]);
    setIsAdding(false);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await userService.update(id, { status: newStatus });
    } catch (err) {
      console.warn("Failed to update status on backend:", err);
    }
    updateAdmin(id, { status: newStatus });
  };

  const handleDelete = async (id) => {
    try {
      await userService.delete(id);
    } catch (err) {
      console.warn("Failed to delete user on backend:", err);
    }
    deleteAdmin(id);
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
          <span>{isAdding ? "Cancel" : "Create Creator"}</span>
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

          <Input
            label="Assign Creator Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Set password for this Creator"
            required
          />

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

          <div className="flex gap-3 pt-2">
            <Button variant="primary" type="submit" size="sm" className="cursor-pointer">Create Account Credentials</Button>
            <Button variant="outline" size="sm" type="button" onClick={() => setIsAdding(false)} className="cursor-pointer">Cancel</Button>
          </div>
        </form>
      )}

      {/* Admin Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {admins.map((adm) => (
          <div key={adm.id} className="bg-slate-900 border border-white/5 p-6 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 font-bold text-sm">
                  {adm.name ? adm.name.charAt(0).toUpperCase() : "A"}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${adm.status === "active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                    {adm.status}
                  </span>
                  <button
                    onClick={() => handleDelete(adm.id)}
                    className="text-gray-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                    title="Delete user account"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold">{adm.name}</h3>
                <p className="text-xs text-gray-400">{adm.email}</p>
              </div>

              {/* Authorized categories badges */}
              <div className="space-y-1">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Category Scope</span>
                <div className="flex flex-wrap gap-1.5">
                  {(adm.categoryAccess || []).map((catId) => (
                    <span key={catId} className="px-2 py-0.5 bg-slate-950 border border-white/10 rounded-md text-[10px] text-gray-300 font-medium">
                      {catId}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 text-xs bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer"
                onClick={() => handleToggleStatus(adm.id, adm.status)}
              >
                {adm.status === "active" ? <UserX size={14} /> : <UserCheck size={14} />}
                <span>{adm.status === "active" ? "Deactivate" : "Activate"}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminManager;
