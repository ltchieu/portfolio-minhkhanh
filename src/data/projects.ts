import { Project } from "../models/Project";

// Vite glob to import authentic image assets from /assets/image/Activities/
// Note: Relative path from src/data/ to root assets/ is ../../assets/
const activityImages = import.meta.glob<string>(
  '../../assets/image/Activities/**/*.{webp,png,jpg,jpeg,PNG,JPG,JPEG}',
  { eager: true, import: 'default' }
);

export function getActivityImage(pathSubstring: string): string {
  const matchKey = Object.keys(activityImages).find(key =>
    key.toLowerCase().includes(pathSubstring.toLowerCase())
  );
  if (matchKey && activityImages[matchKey]) {
    return activityImages[matchKey];
  }
  // Fallback to first available image key if exact substring match is not found
  const firstKey = Object.keys(activityImages)[0];
  return firstKey ? activityImages[firstKey] : '';
}

export const projects: Project[] = [
  {
    id: "xuan-tinh-nguyen-2021",
    title: "XUÂN TÌNH NGUYỆN 2021",
    category: "COMMUNITY & VOLUNTEER CAMPAIGN",
    image: getActivityImage('XTN21 FB Cover.webp') || getActivityImage('Background XTN21') || getActivityImage('Poster.webp'),
    description: "End-to-end event management, wall painting art, porridge preparation, and night delivery for underprivileged communities.",
    narrative: "Xuân Tình Nguyện 2021 was a major community outreach campaign organized by the Faculty Youth Union. Khanh coordinated volunteer teams across multiple operational fronts: wall mural painting for local primary schools, preparing and distributing midnight porridge to night workers, and designing the full campaign branding package including social media covers, avatars, and official gratitude letters.",
    deliverables: ["Campaign Visual Identity", "Midnight Porridge Outreach", "Community Wall Mural Painting", "Social Media & Avatar Frames"],
    tools: ["Adobe Photoshop", "Event Logistics", "Community Relations", "Content Production"],
    year: "2021"
  },
  {
    id: "xuan-tinh-nguyen-2022",
    title: "XUÂN TÌNH NGUYỆN 2022",
    category: "COMMUNITY OUTREACH & EXHIBITION",
    image: getActivityImage('XTN22 Cover-01.webp') || getActivityImage('Saigon lưu lạc ký-01.webp'),
    description: "Documentary filmmaking, orphan shelter visits, volunteer game organizing, and 'Saigon Lưu Lạc Ký' thematic exhibition.",
    narrative: "In Xuân Tình Nguyện 2022, Khanh led communications and event production for the 'Saigon Lưu Lạc Ký' campaign. The program combined volunteer games, visits to children's shelters, official project acceptance ceremonies, and documentary film production highlighting community resilience during the post-pandemic spring season.",
    deliverables: ["Thematic Exhibition Design", "Documentary Video Production", "Children Shelter Workshops", "Volunteer Game Organization"],
    tools: ["Adobe Premiere Pro", "Creative Direction", "Exhibition Scenography", "Event Operations"],
    year: "2022"
  },
  {
    id: "phoenix-music-festival-2022",
    title: "THE PHOENIX MUSIC FESTIVAL",
    category: "MUSIC FESTIVAL & BRAND ACTIVATION",
    image: getActivityImage('Poster-02-edited.webp') || getActivityImage('Poster-04-01.webp'),
    description: "Full visual identity, promotional poster design, VIP wristband graphics, and 1x2m standee campaign for live music festival.",
    narrative: "The Phoenix 2022 was an energetic music festival gathering over 500+ attendees. Khanh developed the complete visual package including high-impact key visuals, promotional poster series, VIP wristband entry passes, stage branding, and promotional standees displayed across campus venues.",
    deliverables: ["Key Visual & Poster Design", "Festival Wristbands & Lanyards", "1x2m Promotional Standees", "Social Media Teaser Campaign"],
    tools: ["Adobe Illustrator", "Photoshop", "Print Production", "Brand Identity"],
    year: "2022"
  },
  {
    id: "dai-hoi-doan-2022",
    title: "YOUTH UNION CONGRESS 2022",
    category: "CORPORATE & DIPLOMATIC EVENT",
    image: getActivityImage('Avatar-01.webp') || getActivityImage('Cover-01.webp'),
    description: "Official publication design, delegate badges, invitation covers, and executive slide presentations for Youth Union Congress.",
    narrative: "For the Youth Union Congress 2022 (Đại Hội Đoàn Khoa), Khanh was responsible for all official corporate graphics and print publications. This included designing the congress draft booklet, voting cards, guest badges, official invitations sent to District 3 Youth Union, and presentation background decks for executive board reporting.",
    deliverables: ["Official Draft & Report Booklets", "Delegate & VIP Guest Badges", "Voting Cards & Invitations", "Presentation Decks & Wallpapers"],
    tools: ["InDesign", "Illustrator", "Typography", "Official Press Logistics"],
    year: "2022"
  }
];
