import { Project } from "../models/Project";
import { projects } from "../data/projects";

interface WorkProps {
  setSelectedProject: (project: Project) => void;
}

export default function Work({ setSelectedProject }: WorkProps) {
  return (
    <section id="work" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="font-narrow text-xs font-black text-[#5E5E5E] tracking-[0.2em] block uppercase mb-1">
              CURATED CREATIVE
            </span>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-[#111111]">
              SELECTED WORKS
            </h2>
          </div>
          <p className="font-narrow text-xs font-bold text-[#5E5E5E] tracking-widest max-w-xs md:text-right">
            A precise collision of brutalist layouts, raw textures, and user emotion.
          </p>
        </div>

        {/* Grid Layout for Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#CCCCCC]/60 bg-[#EBEBEB] rounded-sm overflow-hidden">
          {projects.map((project) => (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative aspect-square overflow-hidden cursor-pointer bg-[#111111] border-b border-r border-[#CCCCCC]/60 last:border-b-0"
            >
              {/* Grayscale overlay & zoom image */}
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-1000 ease-out"
                style={{ backgroundImage: `url(${project.image})` }}
              ></div>
              
              {/* Gradient shade that covers card on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="font-narrow text-xs font-black text-[#E31E24] tracking-[0.2em] uppercase block">
                    {project.category}
                  </span>
                  <h4 className="font-display text-3xl sm:text-4xl text-white uppercase leading-none tracking-tight flex items-center justify-between">
                    {project.title}
                    <i className="fa-solid fa-arrow-up-right-from-square text-lg text-white group-hover:text-[#E31E24] transition-colors"></i>
                  </h4>
                  <p className="font-sans text-xs text-white/70 line-clamp-2 max-w-md pt-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {project.tools.slice(0, 3).map((tool, i) => (
                      <span key={i} className="font-mono text-[9px] bg-white/20 text-white px-2 py-0.5 rounded">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subtle text block when not hovered (only on desktop) */}
              <div className="absolute bottom-4 left-4 bg-[#111111]/85 text-white py-1 px-3 rounded font-mono text-[10px] tracking-widest group-hover:opacity-0 transition-opacity duration-300 pointer-events-none uppercase">
                {project.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
