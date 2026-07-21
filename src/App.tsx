import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ExperienceSection from "./components/Experience";
import Work from "./components/Work";
import Awards from "./components/Awards";
import Footer from "./components/Footer";
import ManifestoModal from "./components/ManifestoModal";
import ProjectLightbox from "./components/ProjectLightbox";

import { Project } from "./models/Project";

export default function App() {
  // Navigation & Interactive states
  const [activeExperience, setActiveExperience] = useState<string | null>("axon-studio");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showManifesto, setShowManifesto] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Real-time local clock (Krasnodar time is UTC +3)
  const [currentTime, setCurrentTime] = useState("");
  const [currentDateString, setCurrentDateString] = useState("");

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      // GMT+7 offset is 7 hours in milliseconds
      const gmt7Offset = 7 * 60 * 60 * 1000;
      const gmt7Date = new Date(now.getTime() + gmt7Offset);
      
      // Format time using UTC methods to ensure it shows exactly GMT+7 regardless of browser location
      const hours = String(gmt7Date.getUTCHours()).padStart(2, "0");
      const minutes = String(gmt7Date.getUTCMinutes()).padStart(2, "0");
      const seconds = String(gmt7Date.getUTCSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
      
      // Format date
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
      ];
      
      const dayName = days[gmt7Date.getUTCDay()];
      const dayNum = gmt7Date.getUTCDate();
      const monthName = months[gmt7Date.getUTCMonth()];
      const year = gmt7Date.getUTCFullYear();
      
      setCurrentDateString(`${dayNum} ${monthName} ${year}`);
    };

    updateTimeAndDate();
    const interval = setInterval(updateTimeAndDate, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInquireProject = (title: string) => {
    setSelectedProject(null);
    const subject = encodeURIComponent(`Inquiry: ${title}`);
    const body = encodeURIComponent(`Hi Liza! I absolutely love your "${title}" project and would love to collaborate on a similar concept for my brand.`);
    window.location.href = `mailto:liz.contentcreator@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-[#FAF9F6] text-[#111111] font-sans antialiased overflow-x-hidden min-h-screen selection:bg-[#E31E24] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
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
      <Footer />

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

    </div>
  );
}
