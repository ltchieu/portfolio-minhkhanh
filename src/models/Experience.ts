export interface ExperienceSectionItemObj {
  subtitle: string;
  subitems: string[];
}

export type ExperienceSectionItem = string | ExperienceSectionItemObj;

export interface ExperienceSectionContent {
  title: string;
  items: ExperienceSectionItem[];
}

export interface Experience {
  id: string;
  index: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  description: string;
  image: string;
  tech: string[];
  sections?: ExperienceSectionContent[];
}
