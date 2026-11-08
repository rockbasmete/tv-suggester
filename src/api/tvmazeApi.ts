import type { Show } from '../types/show';

interface TvmazeSearchItem {
  show: {
    id: number;
    name: string;
    genres: string[];
    image?: { medium?: string } | null;
    rating?: { average?: number | null } | null;
    summary?: string | null;
    premiered?: string | null;
    language?: string | null;
    url?: string;
  };
}

const SEARCH_URL = 'https://api.tvmaze.com/search/shows';

const mapToShow = (item: TvmazeSearchItem): Show => ({
  id: item.show.id,
  name: item.show.name,
  genres: item.show.genres ?? [],
  imageUrl: item.show.image?.medium ?? null,
  rating: item.show.rating?.average ?? null,
  summary: item.show.summary ?? null,
  premiered: item.show.premiered ?? null,
  language: item.show.language ?? null,
  url: item.show.url ?? '',
});

export const fetchShows = async (query: string, signal?: AbortSignal): Promise<Show[]> => {
  const url = `${SEARCH_URL}?q=${encodeURIComponent(query)}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`TVmaze API вернул статус ${response.status}`);
  }

  const data = (await response.json()) as TvmazeSearchItem[];
  return data.map(mapToShow);
};
