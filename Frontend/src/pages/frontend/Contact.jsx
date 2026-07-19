import React, { useState } from "react";
import { Mail, Phone, MapPin, Sparkles, Send, CheckCircle2 } from "lucide-react";
import Input from "../../components/common/Input";
import TextArea from "../../components/common/TextArea";
import Button from "../../components/common/Button";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !msg) return;
    setSuccess(true);
    setName("");
    setEmail("");
    setMsg("");
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen py-20 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-500/5 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10 space-y-12">
        
        {/* Intro */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-brand-400">
            <Sparkles size={12} />
            <span>Support Desk</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold">Get In Touch</h1>
          <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
            Have questions about customized templates, branding or partnership options? Drop us a line below.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Support Details */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-start gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl">
              <Mail className="text-brand-400 mt-1 shrink-0" size={20} />
              <div className="space-y-1">
                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Us</span>
                <span className="text-sm font-medium">support@momenta.com</span>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl">
              <Phone className="text-indigo-400 mt-1 shrink-0" size={20} />
              <div className="space-y-1">
                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Call Us</span>
                <span className="text-sm font-medium">+91 99887 76655</span>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl">
              <MapPin className="text-pink-400 mt-1 shrink-0" size={20} />
              <div className="space-y-1">
                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Location</span>
                <span className="text-sm font-medium">FC Road, Shivajinagar, Pune, India</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 bg-slate-900/60 border border-white/5 p-8 rounded-3xl shadow-premium relative">
            {success ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-lg font-bold">Message Sent Successfully!</h3>
                <p className="text-sm text-gray-400 max-w-xs mx-auto">Thank you for writing. Our customer care assistant will connect with you via email shortly.</p>
                <Button onClick={() => setSuccess(false)} variant="outline" size="sm" className="mt-2 text-xs border-white/10 text-white hover:bg-white/10 cursor-pointer">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Deshmukh"
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@gmail.com"
                  required
                />
                <TextArea
                  label="Message / Inquiry details"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Tell us what you'd like to ask..."
                  rows={4}
                  required
                />
                <Button type="submit" variant="primary" className="w-full flex items-center justify-center gap-1.5 cursor-pointer">
                  <Send size={16} />
                  <span>Send Message</span>
                </Button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
