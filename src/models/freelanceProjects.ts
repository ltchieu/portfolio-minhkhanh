export interface FreelanceProject {
    id: string;
    index: string;
    title: string;
    category: string;
    timeframe: string;
    client: string;
    summary: string;
    description: string;
    result: string;
    highlights: string[];
    images: string[];
    displayType: 'dome' | 'stack' | 'grid';
    tiktokUrl?: string;
}