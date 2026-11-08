import type { Show } from '../types/show';

export const uniqueGenres = (shows: Show[]): string[] => {
  const genres = new Set<string>();
  shows.forEach((show) => show.genres.forEach((genre) => genres.add(genre)));
  return Array.from(genres).sort((a, b) => a.localeCompare(b));
};
