export interface InfoPageProps {
  title: string;
  description: string;
  sections: Section[];
}

export interface Section {
  title: string;
  content: Paragraph[] | string;
}

export interface Paragraph {
  heading: string;
  body: string;
}