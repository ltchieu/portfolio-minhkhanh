import { ChangeEvent, FormEvent, Dispatch, SetStateAction } from "react";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ContactFormData } from "../models/Contact";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  formData: ContactFormData;
  setFormData: Dispatch<SetStateAction<ContactFormData>>;
  isSubmitting: boolean;
  submitSuccess: boolean;
  formErrors: Partial<ContactFormData>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleFormSubmit: (e: FormEvent) => void;
}

export default function ContactDrawer({
  isOpen,
  onClose,
  formData,
  isSubmitting,
  submitSuccess,
  formErrors,
  handleInputChange,
  handleFormSubmit,
}: ContactDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Dark glass backdrop overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#111111]/70 backdrop-blur-sm cursor-pointer"
          ></motion.div>

          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <motion.div 
              id="contact-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="w-screen max-w-lg bg-white p-8 md:p-12 flex flex-col justify-between shadow-2xl relative h-full overflow-y-auto"
            >
              <div>
                {/* Close button top right */}
                <button 
                  id="contact-close"
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 rounded-full border border-[#CCCCCC] hover:border-[#E31E24] hover:text-[#E31E24] transition-all cursor-pointer"
                  aria-label="Close panel"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                  <span className="font-narrow text-xs font-black text-[#E31E24] tracking-[0.25em] block uppercase">
                    INQUIRE &amp; COLLABORATE
                  </span>
                  <h3 className="font-display text-3xl uppercase leading-none tracking-tight text-[#111111]">
                    SAY HELLO
                  </h3>
                  <div className="h-0.5 bg-[#111111] w-16"></div>
                  <p className="font-sans text-xs text-[#5E5E5E] leading-relaxed">
                    Let&apos;s build an enduring design concept. Enter your inquiry details below, and I will get back to you within 24 hours.
                  </p>
                </div>

                {/* SUCCESS VIEW */}
                {submitSuccess ? (
                  <motion.div 
                    id="contact-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-12 bg-green-50 border border-green-200 p-6 rounded text-center space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto shadow">
                      <Send className="w-5 h-5 animate-bounce" />
                    </div>
                    <h4 className="font-display text-lg uppercase text-green-800">
                      MESSAGE DISPATCHED!
                    </h4>
                    <p className="font-sans text-xs text-green-700">
                      Thank you for reaching out! Liza will review your proposal and respond promptly to schedule a call.
                    </p>
                  </motion.div>
                ) : (
                  /* FORM VIEW */
                  <form onSubmit={handleFormSubmit} className="mt-8 space-y-5">
                    
                    {/* Name field */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="font-narrow text-[10px] font-black text-[#111111] uppercase tracking-wider block">
                        Full Name / Agency
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-sm border ${formErrors.name ? "border-[#E31E24] focus:ring-[#E31E24]" : "border-[#CCCCCC] focus:ring-[#111111]"} focus:outline-none focus:ring-2 text-sm text-[#111111]`}
                      />
                      {formErrors.name && (
                        <p className="text-[10px] text-[#E31E24] font-medium">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Email field */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="font-narrow text-[10px] font-black text-[#111111] uppercase tracking-wider block">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 rounded-sm border ${formErrors.email ? "border-[#E31E24] focus:ring-[#E31E24]" : "border-[#CCCCCC] focus:ring-[#111111]"} focus:outline-none focus:ring-2 text-sm text-[#111111]`}
                      />
                      {formErrors.email && (
                        <p className="text-[10px] text-[#E31E24] font-medium">{formErrors.email}</p>
                      )}
                    </div>

                    {/* Project Type Dropdown */}
                    <div className="space-y-1.5">
                      <label htmlFor="projectType" className="font-narrow text-[10px] font-black text-[#111111] uppercase tracking-wider block">
                        Collaboration Nature
                      </label>
                      <select 
                        id="projectType" 
                        name="projectType" 
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-sm border border-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-[#111111] text-sm text-[#111111] bg-white"
                      >
                        <option value="UGC Video Campaign">UGC Video Campaign</option>
                        <option value="Content Strategy &amp; Branding">Content Strategy &amp; Branding</option>
                        <option value="Architectural Design Consultation">Architectural Design Consultation</option>
                        <option value="UI/UX &amp; WebGL Showcase">UI/UX &amp; WebGL Showcase</option>
                        <option value="Full Creative Collaboration">Full Creative Collaboration</option>
                      </select>
                    </div>

                    {/* Budget Select */}
                    <div className="space-y-1.5">
                      <label htmlFor="budget" className="font-narrow text-[10px] font-black text-[#111111] uppercase tracking-wider block">
                        Estimated Budget (USD)
                      </label>
                      <select 
                        id="budget" 
                        name="budget" 
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-sm border border-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-[#111111] text-sm text-[#111111] bg-white"
                      >
                        <option value="Under $2,000">Under $2,000</option>
                        <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000+">$10,000+</option>
                      </select>
                    </div>

                    {/* Message textarea */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="font-narrow text-[10px] font-black text-[#111111] uppercase tracking-wider block">
                        Brief Inquiry / Narrative
                      </label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your amazing vision..."
                        className={`w-full px-4 py-3 rounded-sm border ${formErrors.message ? "border-[#E31E24] focus:ring-[#E31E24]" : "border-[#CCCCCC] focus:ring-[#111111]"} focus:outline-none focus:ring-2 text-sm text-[#111111] resize-none`}
                      ></textarea>
                      {formErrors.message && (
                        <p className="text-[10px] text-[#E31E24] font-medium">{formErrors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#111111] hover:bg-[#E31E24] text-white py-3.5 px-6 rounded-sm font-narrow text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>DISPATCHING...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>SEND INQUIRY</span>
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                )}
              </div>

              {/* Bottom footer tag */}
              <div className="border-t border-[#CCCCCC]/40 pt-6 mt-8 flex justify-between items-center text-[10px] font-mono text-[#5E5E5E]">
                <span>RESPONDS IN 24H</span>
                <span>KRR UTC+3</span>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
