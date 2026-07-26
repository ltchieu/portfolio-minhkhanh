export interface PRInternSectionData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  folderPath: string;
  newsLink?: string;
  socialPostLink?: string;
}

export interface PRInternData {
  mouSigning: PRInternSectionData;
  prPractice: PRInternSectionData;
  admissionPhotography: PRInternSectionData;
  extracurricularPhotography: PRInternSectionData;
}
