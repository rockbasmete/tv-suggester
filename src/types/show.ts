export interface Show {
  id: number;
  name: string;
  genres: string[];
  imageUrl: string | null;
  rating: number | null;
  summary: string | null;
  premiered: string | null;
  language: string | null;
  url: string;
}
