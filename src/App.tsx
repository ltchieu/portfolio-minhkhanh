import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ExperienceSection from "./components/Experience";
import Work from "./components/Work";
import Awards from "./components/Awards";
import Footer from "./components/Footer";
import ManifestoModal from "./components/ManifestoModal";
import ProjectLightbox from "./components/ProjectLightbox";
import ContactDrawer from "./components/ContactDrawer";

import { Project } from "./models/Project";
import { ContactFormData } from "./models/Contact";

export default function App() {
  // Navigation & Interactive states
  const [activeExperience, setActiveExperience] = useState<string | null>("axon-studio");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showManifesto, setShowManifesto] = useState(false);
  const [showContactDrawer, setShowContactDrawer] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Real-time local clock (Krasnodar time is UTC +3)
  const [currentTime, setCurrentTime] = useState("");
  const [currentDateString, setCurrentDateString] = useState("");

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      // Get UTC time and add 3 hours for Krasnodar (UTC+3)
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const krasnodarDate = new Date(utc + 3600000 * 3);
      
      // Format time
      const hours = String(krasnodarDate.getHours()).padStart(2, "0");
      const minutes = String(krasnodarDate.getMinutes()).padStart(2, "0");
      const seconds = String(krasnodarDate.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
      
      // Format date
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
      ];
      
      const dayName = days[krasnodarDate.getDay()];
      const dayNum = krasnodarDate.getDate();
      const monthName = months[krasnodarDate.getMonth()];
      const year = krasnodarDate.getFullYear();
      
      setCurrentDateString(`${dayNum} ${monthName} ${year}`);
    };

    updateTimeAndDate();
    const interval = setInterval(updateTimeAndDate, 1000);
    return () => clearInterval(interval);
  }, []);

  // Contact Form State
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    projectType: "UGC Video Campaign",
    budget: "$2,000 - $5,000",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<ContactFormData>>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof ContactFormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const errors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) errors.message = "Please write a brief message";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowContactDrawer(false);
        setFormData({
          name: "",
          email: "",
          projectType: "UGC Video Campaign",
          budget: "$2,000 - $5,000",
          message: ""
        });
      }, 3000);
    }, 1500);
  };

  const handleInquireProject = (title: string) => {
    setSelectedProject(null);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        projectType: "Content Strategy & Branding",
        message: `Hi Liza! I absolute love your "${title}" project and would love to collaborate on a similar concept for my brand.`
      }));
      setShowContactDrawer(true);
    }, 400);
  };

  return (
    <div className="bg-[#FAF9F6] text-[#111111] font-sans antialiased overflow-x-hidden min-h-screen selection:bg-[#E31E24] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setShowContactDrawer={setShowContactDrawer}
      />

      {/* 2. Welcome Hero Section */}
      <Hero 
        currentDateString={currentDateString}
        currentTime={currentTime}
      />

      {/* 3. Introduction Section */}
      <About 
        setShowManifesto={setShowManifesto}
      />

      {/* 4. Experience Timeline Accordion */}
      <ExperienceSection 
        activeExperience={activeExperience}
        setActiveExperience={setActiveExperience}
      />

      {/* 5. Selected Works Portfolio */}
      <Work 
        setSelectedProject={setSelectedProject}
      />

      {/* 6. Awards Curation */}
      <Awards />

      {/* 7. Contact CTA & Footer */}
      <Footer 
        setShowContactDrawer={setShowContactDrawer}
      />

      {/* 8. Manifesto Lightbox Modal */}
      <ManifestoModal 
        isOpen={showManifesto}
        onClose={() => setShowManifesto(false)}
      />

      {/* 9. Portfolio Works Detail Lightbox */}
      <ProjectLightbox 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={handleInquireProject}
      />

      {/* 10. Slide Drawer Contact Form */}
      <ContactDrawer 
        isOpen={showContactDrawer}
        onClose={() => setShowContactDrawer(false)}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
        submitSuccess={submitSuccess}
        formErrors={formErrors}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}
