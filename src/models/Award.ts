export interface Award {
  id: string;
  year: string;
  category: string;
  title: string;
  issuer: string;
  role: string;
  project: string;
  description: string;
  image?: string;
  pdfUrl?: string;
  isFeatured?: boolean;
}
