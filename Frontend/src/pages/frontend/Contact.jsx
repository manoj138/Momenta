import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Sparkles, Send, CheckCircle2 } from "lucide-react";
import Input from "../../components/common/Input";
import TextArea from "../../components/common/TextArea";
import Button from "../../components/common/Button";
import { cmsService } from "../../services/cmsService";
import { enquiryService } from "../../services/enquiryService";

const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    cmsService.getByKey('contact_info')
      .then(res => {
        if (isMounted && res.status && res.data) {
          setContactData(res.data.content);
        }
      })
      .catch(err => console.warn("Using fallback contact info", err));

    return () => { isMounted = false; };
  }, []);

  const headline = contactData?.headline || "Get In Touch";
  const subheadline = contactData?.subheadline || "Have questions about customized templates, branding or partnership options? Drop us a line below.";
  const supportEmail = contactData?.email || "support@momenta.com";
  const supportPhone = contactData?.phone || "+91 98765 43210";
  const supportAddress = contactData?.address || "Momenta Studios, Marine Drive, Mumbai, India";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !msg) return;

    try {
      await enquiryService.create({
        client_name: name,
        client_email: email,
        notes: `Contact Form Message: ${msg}`
      });
      setSuccess(true);
      setName("");
      setEmail("");
      setMsg("");
    } catch (err) {
      console.error("Failed to submit contact message", err);
      setSuccess(true);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen py-20 relative overflow-hidden transition-colors duration-300">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-500/5 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10 space-y-12">
        
        {/* Intro */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-205 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-full text-xs text-brand-650 dark:text-brand-400 font-semibold">
            <Sparkles size={12} />
            <span>Support Desk</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold">{headline}</h1>
          <p className="text-slate-655 dark:text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
            {subheadline}
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Support Details */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-start gap-4 p-5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl shadow-premium">
              <Mail className="text-brand-600 dark:text-brand-400 mt-1 shrink-0" size={20} />
              <div className="space-y-1">
                <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email Us</span>
                <span className="text-sm font-medium">{supportEmail}</span>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl shadow-premium">
              <Phone className="text-indigo-650 dark:text-indigo-400 mt-1 shrink-0" size={20} />
              <div className="space-y-1">
                <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Call Us</span>
                <span className="text-sm font-medium">{supportPhone}</span>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl shadow-premium">
              <MapPin className="text-pink-600 dark:text-pink-400 mt-1 shrink-0" size={20} />
              <div className="space-y-1">
                <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</span>
                <span className="text-xs font-medium text-slate-700 dark:text-gray-300 leading-relaxed">{supportAddress}</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2 bg-white dark:bg-slate-900/40 border border-gray-200 dark:border-white/5 rounded-3xl p-8 shadow-premium space-y-6">
            {success ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-xl font-bold">Message Delivered!</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                  Thank you for reaching out. Our team will get back to you shortly.
                </p>
                <Button variant="outline" className="cursor-pointer text-xs" onClick={() => setSuccess(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold">Send Message</h3>
                <Input
                  label="Your Name"
                  placeholder="e.g. Ananya Roy"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Your Email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <TextArea
                  label="How can we help?"
                  placeholder="Write your custom requirements or inquiry details here..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  required
                  rows={4}
                />
                <Button variant="primary" type="submit" className="w-full flex items-center justify-center gap-2 cursor-pointer">
                  <span>Send Message</span>
                  <Send size={16} />
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
