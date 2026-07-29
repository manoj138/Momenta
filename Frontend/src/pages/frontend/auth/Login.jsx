import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Sparkles, AlertCircle } from "lucide-react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setError("");
    setLoading(true);
    
    const res = await login(email, password);
    setLoading(false);
    
    if (res.success) {
      if (res.user.role === "superadmin" || res.user.role === "super_admin") {
        navigate("/superadmin");
      } else {
        navigate("/creator");
      }
    } else {
      setError(res.message);
    }
  };


  return (
    <div className="bg-slate-950 text-white min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900/60 border border-white/10 rounded-3xl p-8 shadow-premium relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-brand-400">
            <Sparkles size={12} />
            <span>Momenta Control Console</span>
          </div>
          <h2 className="text-2xl font-extrabold">Welcome Back</h2>
          <p className="text-gray-400 text-xs">Log in as a Super Admin or Creator to build digital cards.</p>
        </div>

        {error && (
          <div className="bg-red-950/20 border border-red-500/25 p-3.5 rounded-xl flex items-start gap-2 text-xs text-red-300">
            <AlertCircle className="shrink-0 text-red-400 mt-0.5" size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. superadmin@momenta.com"
            required
          />
          
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button type="submit" variant="primary" className="w-full py-2.5 font-bold cursor-pointer" disabled={loading}>
            {loading ? "Authenticating..." : "Login"}
          </Button>
        </form>

        <div className="text-center">
          <Link to="/" className="text-xs text-gray-400 hover:text-white transition-all underline">
            Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
