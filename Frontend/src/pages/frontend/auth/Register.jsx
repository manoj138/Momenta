import React from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import Button from "../../../components/common/Button";

const Register = () => {
  return (
    <div className="bg-slate-950 text-white min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="max-w-md w-full bg-slate-900/60 border border-white/10 rounded-3xl p-8 text-center space-y-6 shadow-premium relative z-10">
        <Sparkles className="text-brand-500 mx-auto" size={40} />
        <h2 className="text-2xl font-extrabold">Register Account</h2>
        <p className="text-gray-400 text-sm">
          To maintain security, Creator accounts are configured and created directly by the Super Admin.
        </p>
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-left text-xs text-gray-300">
          If you are an experience admin, contact the platform owner at <span className="font-bold text-brand-400">admin@momenta.com</span> to get your invite code.
        </div>
        <div className="pt-2">
          <Link to="/login">
            <Button variant="primary" className="cursor-pointer px-6">Go to Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
