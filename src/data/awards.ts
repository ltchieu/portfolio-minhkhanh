import { Award } from "../models/Award";

// Vite eager glob for image assets in /assets/image/Award & Certification/
const awardImageMap = import.meta.glob<string>(
  '../../assets/image/Award & Certification/**/*.{png,jpg,jpeg,PNG,JPG,JPEG}',
  { eager: true, import: 'default' }
);

function getAwardImg(filenameSubstring: string): string {
  const matchKey = Object.keys(awardImageMap).find((k) =>
    k.toLowerCase().includes(filenameSubstring.toLowerCase())
  );
  return matchKey && awardImageMap[matchKey] ? awardImageMap[matchKey] : '';
}

// Official IELTS PDF document asset URL
export const ieltsPdfUrl = new URL(
  '../../assets/image/Award & Certification/VN10126518035-25-06-2026-ETRF.pdf',
  import.meta.url
).href;

export const awards: Award[] = [
  // =========================================================================
  // TOP 4 PRIMARY HIGHLIGHTED AWARDS & CERTIFICATIONS
  // =========================================================================
  {
    id: 'ielts-etrf',
    isFeatured: true,
    year: '2024 - 2026',
    category: 'INTERNATIONAL LANGUAGE PROFICIENCY',
    title: 'IELTS Academic Official Test Report (ETRF)',
    issuer: 'IDP Education / Cambridge English',
    role: 'Advanced Professional Proficiency',
    project: 'Official Language Certification',
    description: 'Official IELTS Test Report Form certifying advanced C1/C2 level academic English proficiency across Listening, Reading, Writing, and Speaking skills.',
    pdfUrl: ieltsPdfUrl,
    image: getAwardImg('Content Marketing')
  },
  {
    id: 'nckh-cap-truong',
    isFeatured: true,
    year: '2022 - 2023',
    category: 'ACADEMIC RESEARCH & INNOVATION',
    title: 'University Scientific Research Excellence Award',
    issuer: 'HCMC Open University Research Board',
    role: 'Principal Researcher & Author',
    project: 'NCKH Cấp Trường Competition',
    description: 'Awarded for outstanding university-level scientific research work (NCKH Cấp Trường) evaluating digital media communication and student engagement strategies.',
    image: getAwardImg('NCKH Cấp Trường')
  },
  {
    id: 'rbl-certificate',
    isFeatured: true,
    year: '2023',
    category: 'EXECUTIVE LEADERSHIP & MANAGEMENT',
    title: 'Research & Business Leadership (RBL) Certificate',
    issuer: 'RBL Leadership Academy',
    role: 'Certified Leadership Graduate',
    project: 'Leadership & Business Excellence',
    description: 'Certified completion of executive Research & Business Leadership (RBL) intensive training in strategic planning, project management, and organizational leadership.',
    image: getAwardImg('RBL Certificate')
  },
  {
    id: 'content-marketing-all-in-one',
    isFeatured: true,
    year: '2023',
    category: 'DIGITAL MARKETING & STRATEGY',
    title: 'Content Marketing All-In-One Professional Certificate',
    issuer: 'Professional Marketing Institute',
    role: 'Certified Content Strategist',
    project: 'Content Strategy & Copywriting',
    description: 'Mastery certification covering multi-channel content strategy, SEO copywriting, audience targeting, brand storytelling, and digital campaign analytics.',
    image: getAwardImg('Content Marketing All in One')
  },

  // =========================================================================
  // NORMAL AWARDS & CERTIFICATIONS (REMAINING ITEMS)
  // =========================================================================
  {
    id: 'mindfulness-bootcamp',
    isFeatured: false,
    year: '2023',
    category: 'EMOTIONAL INTELLIGENCE & WELLNESS',
    title: 'Mindfulness & Emotional Intelligence Leadership',
    issuer: 'Search Inside Yourself Leadership Institute (SIYLI)',
    role: 'Bootcamp Graduate',
    project: 'Mindful Leadership Training',
    description: 'Certified completion of Search Inside Yourself mindfulness and emotional intelligence bootcamp for empathetic team leadership and stress resilience.',
    image: getAwardImg('Mindfulness Bootcamp')
  },
  {
    id: 'mc-phoenix-academy',
    isFeatured: false,
    year: '2022',
    category: 'PUBLIC SPEAKING & EVENT HOSTING',
    title: 'Professional Event Host & MC Certification',
    issuer: 'Phoenix Academy of Public Speaking',
    role: 'Certified Event Host',
    project: 'Stage Hosting & Broadcast Operations',
    description: 'Professional certification in live stage hosting, voice modulation, crisis management, and event anchor operations.',
    image: getAwardImg('MC Phoenix Academy')
  },
  {
    id: 'cup-can-bo-hoi-tieu-bieu',
    isFeatured: false,
    year: '2022',
    category: 'COMMUNITY & VOLUNTEER HONORS',
    title: 'Outstanding Youth Association Leader Trophy of Honor',
    issuer: 'HCMC Student Union Committee',
    role: 'Exemplary Youth Officer',
    project: 'Student Movement Excellence',
    description: 'Trophy of honor awarded for exceptional leadership, dedication, and contributions to university student movement initiatives.',
    image: getAwardImg('Cúp vinh danh')
  },
  {
    id: 'thanh-tich-xuat-sac-cong-tac-hoi',
    isFeatured: false,
    year: '2021 - 2022',
    category: 'COMMUNITY & VOLUNTEER HONORS',
    title: 'Merit Certificate for Student Union & Community Service',
    issuer: 'Executive Committee of Student Union',
    role: 'Lead Executive Officer',
    project: 'Faculty Outreach Campaigns',
    description: 'Official Certificate of Merit for outstanding achievements in community outreach and student union campaign operations.',
    image: getAwardImg('Thành tích xuất sắc')
  },
  {
    id: 'thu-cam-on-ubnd-p1-q3',
    isFeatured: false,
    year: '2022',
    category: 'GOVERNMENT & CIVIC RECOGNITION',
    title: 'Civic Commendation — Ward 1 District 3 People’s Committee',
    issuer: 'People’s Committee of Ward 1, District 3, HCMC',
    role: 'Volunteer Campaign Director',
    project: 'Municipal Outreach & Welfare',
    description: 'Official diplomatic Letter of Appreciation from Ward 1 District 3 People’s Committee for community welfare and civic project leadership.',
    image: getAwardImg('Thư cảm ơn UBND')
  },
  {
    id: 'moet-advanced-it-certificate',
    isFeatured: false,
    year: '2021',
    category: 'INFORMATION TECHNOLOGY',
    title: 'Advanced & National IT Competency Certification',
    issuer: 'Ministry of Education and Training (MOET)',
    role: 'Certified IT Professional',
    project: 'National IT Competency',
    description: 'National IT Proficiency Certificate covering advanced office software, database management, and digital information systems.',
    image: getAwardImg('Tin học Nâng cao')
  },
  {
    id: 'htv-vnexpress-pr-training',
    isFeatured: false,
    year: '2023',
    category: 'PRESS & BROADCAST MEDIA',
    title: 'Journalism & Broadcast PR Masterclass',
    issuer: 'HTV Television & Người Lao Động / VNExpress Press Network',
    role: 'Certified PR Specialist',
    project: 'Media Training Workshop',
    description: 'Professional press training certificate conducted by leading news directors from HTV, Người Lao Động, and VNExpress.',
    image: getAwardImg('Tập huấn truyền thông')
  },
  {
    id: 'usw-sea-scholarship',
    isFeatured: false,
    year: '2023',
    category: 'ACADEMIC SCHOLARSHIP HONORS',
    title: 'University of South Wales SEA Scholarship Distinction',
    issuer: 'University of South Wales (UK)',
    role: 'Scholarship Interview Finalist',
    project: 'International Academic Distinction',
    description: 'Scholarship interview qualification award for academic distinction by University of South Wales Southeast Asia Admissions.',
    image: getAwardImg('USW SEA')
  },
  {
    id: 'disc-behavior-assessment',
    isFeatured: false,
    year: '2022',
    category: 'BEHAVIORAL SCIENCE & HR',
    title: 'DISC Behavioral & Team Profiling Certification',
    issuer: 'HR Behavioral Assessment Center',
    role: 'Certified Practitioner',
    project: 'Team Dynamics & Communication',
    description: 'Certification in DISC behavioral profiling for workplace communication, leadership optimization, and team synergy.',
    image: getAwardImg('DISC')
  },
  {
    id: 'physiognomy-interpersonal-communication',
    isFeatured: false,
    year: '2022',
    category: 'INTERPERSONAL PSYCHOLOGY',
    title: 'Interpersonal Psychology & Non-Verbal Communication',
    issuer: 'Communication Arts Institute',
    role: 'Certified Trainee',
    project: 'Behavioral Psychology',
    description: 'Specialized training in non-verbal cues, micro-expressions, and high-impact interpersonal rapport building.',
    image: getAwardImg('nhantuong')
  }
];
