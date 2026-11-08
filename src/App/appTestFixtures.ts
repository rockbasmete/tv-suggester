import { vi } from 'vitest';
import type { Show } from '../types/show';

export const makeShow = (id: number, name: string, genres: string[]): Show => ({
  id,
  name,
  genres,
  imageUrl: null,
  rating: 7.5,
  summary: `<p>${name} description</p>`,
  premiered: '2020-01-01',
  language: 'English',
  url: '',
});

export const mockShows: Show[] = [
  makeShow(1, 'Alpha Show', ['Drama', 'Comedy']),
  makeShow(2, 'Beta Show', ['Comedy']),
  makeShow(3, 'Gamma Show', ['Crime']),
  makeShow(4, 'Delta Show', ['Drama']),
  makeShow(5, 'Epsilon Show', ['Comedy', 'Crime']),
];

export const tvmazeResponse = mockShows.map((show) => ({
  show: { id: show.id, name: show.name, genres: show.genres },
}));

export const fetchMock = vi.fn();

export const mockFetchSuccess = () => {
  fetchMock.mockResolvedValue({ ok: true, json: async () => tvmazeResponse });
};
