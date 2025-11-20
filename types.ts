export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Zap' | 'Database' | 'Image' | 'Code' | 'Server' | 'Layout';
}

export interface PortfolioItem {
  id: string;
  clientName: string;
  websiteType: string;
  beforeScore: number;
  afterScore: number;
  loadTimeBefore: string;
  loadTimeAfter: string;
  description: string;
  imageUrl: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  isThinking?: boolean;
}

export enum NavSection {
  HOME = 'home',
  SERVICES = 'services',
  PORTFOLIO = 'portfolio',
  ADVISOR = 'advisor',
  CONTACT = 'contact'
}