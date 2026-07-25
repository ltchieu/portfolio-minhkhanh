import { Award } from "../models/Award";

// Vite eager glob for image assets in /assets/image/Award & Certification/
const awardImageMap = import.meta.glob<string>(
  '../../assets/image/Award & Certification/**/*.{webp,png,jpg,jpeg,PNG,JPG,JPEG}',
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

// Official IELTS PNG image asset URL
export const ieltsImgUrl = new URL(
  '../../assets/image/Award & Certification/IELTS.png',
  import.meta.url
).href;

export const awards: Award[] = [
  // =========================================================================
  // TOP 4 PRIMARY HIGHLIGHTED AWARDS & CERTIFICATIONS
  // =========================================================================
  {
    id: 'usw-sea-scholarship',
    isFeatured: true,
    year: '2025',
    category: 'POSTGRADUATE SCHOLARSHIP DISTINCTION',
    title: 'Southeast Asian Postgraduate Excellence Scholarship (£6,000)',
    issuer: 'University of South Wales – UK',
    role: 'Shortlisted Candidate (£6,000 Award)',
    project: 'Postgraduate Excellence Scholarship',
    description: 'Selected for the competitive interview round for the Southeast Asian Postgraduate Excellence Scholarship worth £6,000 at the University of South Wales, UK.',
    image: getAwardImg('USW SEA Scholarship Interview')
  },
  {
    id: 'nckh-cap-truong',
    isFeatured: true,
    year: '2022-2023',
    category: 'ACADEMIC RESEARCH & INNOVATION',
    title: 'Recorded the University-Level Student Scientific Research Competition (2022-2023)',
    issuer: 'HCMC Open University Research Board',
    role: 'Principal Researcher & Author',
    project: 'NCKH Cấp Trường Competition',
    description: 'Officially recorded in the University-Level Student Scientific Research Competition (2022-2023) for academic research competition.',
    image: getAwardImg('NCKH Cấp Trường')
  },
  {
    id: 'ielts-etrf',
    isFeatured: true,
    year: '2026',
    category: 'INTERNATIONAL LANGUAGE PROFICIENCY',
    title: 'IELTS Academic Official Test Report (ETRF)',
    issuer: 'IDP Education / Cambridge English',
    role: 'Advanced Professional Proficiency',
    project: 'Official Language Certification',
    description: 'Official IELTS Academic Test Report Form certifying B2 level academic English proficiency across Listening, Reading, Writing, and Speaking skills.',
    pdfUrl: ieltsPdfUrl,
    image: ieltsImgUrl
  },
  {
    id: 'outstanding-student-association',
    isFeatured: true,
    year: '2020 - 2023',
    category: 'STUDENT LEADERSHIP & MERIT HONORS',
    title: 'Outstanding Achievements in Student Association Work and Student Movements',
    issuer: 'Vietnamese Students’ Association',
    role: 'Student Association Leader',
    project: 'Student Movements & Youth Operations',
    description: 'Recognized for outstanding achievements in Student Association work and active leadership in student movements.',
    image: getAwardImg('Thành tích xuất sắc')
  },

  // =========================================================================
  // NORMAL AWARDS & CERTIFICATIONS (ADDITIONAL CERTIFICATIONS & HONORS)
  // =========================================================================
  {
    id: 'fullstack-marketing-management',
    isFeatured: false,
    year: '2026',
    category: 'MARKETING MANAGEMENT & STRATEGY',
    title: 'Fullstack Marketing Management',
    issuer: 'Run By Linh - Academy & Transformation Firm',
    role: 'Marketing Management Graduate',
    project: 'Integrated Marketing Strategy',
    description: 'An intensive marketing program covering integrated marketing, digital marketing, branding, campaign planning, content strategy, customer journey, AI applications, and business-oriented marketing thinking.',
    image: getAwardImg('RBL Certificate')
  },
  {
    id: 'mindfulness-emotional-intelligence',
    isFeatured: false,
    year: '2025',
    category: 'EMOTIONAL INTELLIGENCE & LEADERSHIP',
    title: 'Mindfulness & Emotional Intelligence Leadership',
    issuer: 'Search Inside Yourself Leadership Institute (SIYLI)',
    role: 'Certified Boot Camp Graduate',
    project: 'Mindful Leadership',
    description: 'Certified completion of Search Inside Yourself mindfulness and emotional intelligence bootcamp for empathetic team leadership and stress resilience.',
    image: getAwardImg('Mindfulness Bootcamp')
  },
  {
    id: 'professional-event-host-mc',
    isFeatured: false,
    year: '2025',
    category: 'PUBLIC SPEAKING & EVENT HOSTING',
    title: 'Professional Event Host & MC Certification',
    issuer: 'Phoenix MC Academy',
    role: 'Certified Event Host & MC',
    project: 'Public Speaking & Hosting',
    description: 'Professional certification in live stage hosting, voice modulation, crisis management, and event anchor operations.',
    image: getAwardImg('MC Phoenix Academy')
  },
  {
    id: 'applied-physiognomy',
    isFeatured: false,
    year: '2023',
    category: 'INTERPERSONAL PSYCHOLOGY & ANALYSIS',
    title: 'Applied Physiognomy',
    issuer: 'Polytechnic Training Institute',
    role: 'Course Graduate',
    project: 'Human Profiling & Psychology',
    description: 'Completed a course on physiognomy analysis and its applications in work and life.',
    image: getAwardImg('nhantuong')
  },
  {
    id: 'content-marketing-all-in-one',
    isFeatured: false,
    year: '2023',
    category: 'DIGITAL CONTENT & MARKETING STRATEGY',
    title: 'Content Marketing All in One',
    issuer: 'ABC Digi',
    role: 'Certified Content Marketer',
    project: 'Content Marketing Strategy',
    description: 'Completed a comprehensive course in Content Marketing.',
    image: getAwardImg('Content Marketing All in One')
  }
];
