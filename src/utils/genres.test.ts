import { describe, expect, it } from 'vitest';
import type { Show } from '../types/show';
import { uniqueGenres } from './genres';

const makeShow = (id: number, genres: string[]): Show => ({
  id,
  name: `Show ${id}`,
  genres,
  imageUrl: null,
  rating: null,
  summary: null,
  premiered: null,
  language: null,
  url: '',
});

describe('uniqueGenres', () => {
  it('возвращает уникальные жанры в алфавитном порядке', () => {
    const shows = [
      makeShow(1, ['Drama', 'Comedy']),
      makeShow(2, ['Comedy']),
      makeShow(3, ['Crime', 'Drama']),
    ];

    expect(uniqueGenres(shows)).toEqual(['Comedy', 'Crime', 'Drama']);
  });

  it('возвращает пустой массив для пустой выдачи', () => {
    expect(uniqueGenres([])).toEqual([]);
  });
});
