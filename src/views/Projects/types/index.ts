export interface Repository {
    name: string;
    description?: string;
    html_url: string;
    readme?: string;
    languages?: string[];
    languageStats?: { [key: string]: number };
  }
  
  export interface LanguageStats {
    name: string;
    percentage: number;
  }