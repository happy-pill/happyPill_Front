
export interface InfoPageProps {
  title: string;
  description: string;
  sections: Section[];
}

export interface Section {
  title: string;
  content: string | string[];
}