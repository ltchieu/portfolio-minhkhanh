import type { FreelanceProject } from '../models/freelanceProjects';

// Dynamically import all images under assets/image/Freelance Project using Vite import.meta.glob
const imageModules = import.meta.glob<string>(
  '/assets/image/Freelance Project/**/*.{jpg,jpeg,png,JPG,PNG}',
  { eager: true, import: 'default' }
);

// Helper function to filter images by subfolder name
const getImagesForFolder = (folderName: string): string[] => {
  return Object.keys(imageModules)
    .filter((path) => path.includes(folderName))
    .map((path) => imageModules[path]);
};

// 1. Cocorose x Cheese Coffee images (87 images)
const cocoroseImages = getImagesForFolder('2023.08.21 Cocorose x CheeseCoffee');

// 2. Com Gung Ceramic images (10 images)
const comGungImages = getImagesForFolder('Cốm Gừng Ceramic _ Side project');

// 3. Private Wedding Planner images (6 images)
const weddingPlannerImages = getImagesForFolder('Private wedding planner');

// 4. Brochure of Ballet Exhibition images (6 images)
const brochureImages = getImagesForFolder('Brochure of Ballet Exhibition (practice)');

// 5. Typography Wedding LED images (6 images)
const weddingLedImages = getImagesForFolder('Typography Wedding LED');

// 6. FWD Standee images (1 image)
const fwdImages = getImagesForFolder('FWD Standee');

export const freelanceProjects: FreelanceProject[] = [
  {
    id: 'cocorose-cheese-coffee',
    index: '01',
    title: 'Cocorose x Cheese Coffee Brand Activation',
    category: 'Brand Collaboration & Event Execution',
    timeframe: 'August 2023',
    client: 'Cocorose & Cheese Coffee',
    summary: 'Coordinated an exclusive brand crossover launch event featuring venue styling, photography direction, and 350+ live attendees.',
    description: 'Led end-to-end communication, creative direction, and venue operations for the high-profile Cocorose x Cheese Coffee collaboration in HCMC. Managed multimedia content creation, social media promotion, and visual assets while coordinating with 5 key vendor partners across decoration, printing, catering, and photography.',
    result: '350+ guests attended the launch event, producing over 87+ high-resolution creative visual assets, expanding brand engagement by +25% on launch day, and achieving seamless coordination with zero operational delays.',
    highlights: ['350+ Event Attendees', '87 High-Res Campaign Assets', '5 External Vendors Synchronized', '100% On-time Timeline Execution'],
    images: cocoroseImages,
    displayType: 'dome'
  },
  {
    id: 'com-gung-ceramic',
    index: '02',
    title: 'Cốm Gừng Ceramic — Brand & Product Photography',
    category: 'Brand Identity & Editorial Photography',
    timeframe: 'Side Project / 2023',
    client: 'Cốm Gừng Ceramic Studio',
    summary: 'Crafted organic artisanal brand identity and product photography celebrating ceramic textures and raw earthy aesthetics.',
    description: 'Conceptualized editorial art direction, studio lighting, and prop styling for Cốm Gừng Ceramic\'s flagship tableware series. Produced a cohesive visual story highlighting hand-carved textures, subtle glaze variations, and natural warmth.',
    result: 'Delivered 10 curated hero campaign photographs, establishing a high-end minimalist brand aesthetic adopted for e-commerce, digital catalogs, and social media lookbooks.',
    highlights: ['10 Hero Product Shots', 'Tactile Studio Styling', 'Minimalist Art Direction', 'E-commerce Ready Asset Pack'],
    images: comGungImages,
    displayType: 'stack',
    tiktokUrl: 'https://www.tiktok.com/@comgung_ceramic/video/7546055391021419797?is_from_webapp=1&web_id=7532402553843549703'
  },
  {
    id: 'private-wedding-planner',
    index: '03',
    title: 'Intimate Private Wedding Experience',
    category: 'Bespoke Event Planning & Spatial Styling',
    timeframe: 'Freelance Event Project',
    client: 'Private Client',
    summary: 'Curated end-to-end wedding concept planning, floral aesthetics, micro-timeline management, and guest flow.',
    description: 'Oversewed spatial layout, customized guest welcome kits, stage lighting, and full-day event orchestration. Acted as the primary point of contact between the couple, floral designers, sound/lighting crews, and venue management.',
    result: 'Seamless delivery of 4 key ceremonial phases, 100% adherence to micro-timeline, and glowing feedback from the couple and 120+ attendees.',
    highlights: ['Bespoke Spatial Styling', 'Micro-Timeline Execution', 'Multi-vendor Synchronization', 'Intimate Guest Experience'],
    images: weddingPlannerImages,
    displayType: 'grid'
  },
  {
    id: 'ballet-exhibition-brochure',
    index: '04',
    title: 'Ballet Exhibition Editorial Brochure Design',
    category: 'Print Editorial & Typography Design',
    timeframe: 'Design Practice & Exhibition Showcase',
    client: 'Cultural Arts Concept',
    summary: 'Designed an editorial print brochure showcasing fluid typographic movement and ballet performance mockups.',
    description: 'Developed typographic grids, page hierarchy, and tactile paper mockups for a classical ballet exhibition. Embedded delicate serif headings, balanced margins, and movement-inspired layout rhythm.',
    result: 'Created a 12-page exhibition program layout complete with outer cover vector mockups and print-ready specs.',
    highlights: ['12-Page Layout Hierarchy', 'Custom Typographic Grid', 'High-Fidelity 3D Print Mockups', 'Harmonious Spatial Balance'],
    images: brochureImages,
    displayType: 'grid'
  },
  {
    id: 'typography-wedding-led',
    index: '05',
    title: 'Typography Wedding LED Motion Visuals',
    category: 'Stage Motion Graphics & Visual Direction',
    timeframe: 'Event Visual Direction',
    client: 'Wedding Production Concept',
    summary: 'Designed bespoke typographic screen motion visuals tailored to the emotional sequence of wedding ceremonies.',
    description: 'Produced key visual LED graphics for the stage backdrop across 6 critical program milestones: Event Welcome, Groom Entrance, Bride Entrance, Family Toast, Cake & Champagne Ceremony, and Closing Remarks.',
    result: 'Enhanced stage atmosphere and stage photography lighting through synchronized 4K visual assets.',
    highlights: ['6 Key Milestone Sequences', 'Synchronized Stage Visuals', 'Custom Motion Typography', 'High-Impact Backdrop Ambience'],
    images: weddingLedImages,
    displayType: 'grid'
  },
  {
    id: 'fwd-standee',
    index: '06',
    title: 'FWD Insurance Corporate Event Standee',
    category: 'Key Visual & Large-Format Graphic Design',
    timeframe: 'Corporate Project',
    client: 'FWD Insurance Campaign',
    summary: 'Designed high-visibility event standees aligned with corporate brand guidelines for venue activations.',
    description: 'Created large-format vector layouts balancing clear value propositions, sponsor logos, and brand color palette compliance.',
    result: 'Approved for full-scale physical print and deployed across conference venue entry gates.',
    highlights: ['Vector Print Asset', 'Corporate Guideline Alignment', 'High Visual Contrast', 'Event Floor Deployment'],
    images: fwdImages,
    displayType: 'grid'
  }
];
