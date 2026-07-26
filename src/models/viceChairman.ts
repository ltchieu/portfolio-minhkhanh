export interface ViceChairmanActivityItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  folderPath?: string;
  driveLink?: string;
  newsLink?: string;
}

export interface ViceChairmanData {
  welcomeDay2022: ViceChairmanActivityItem;
  springVolunteering2022: ViceChairmanActivityItem;
  midAutumnVolunteering2022: ViceChairmanActivityItem;
  ousGotTalent2022: ViceChairmanActivityItem;
  springVolunteering2021: ViceChairmanActivityItem;
}
