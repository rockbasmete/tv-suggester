import { useCallback, useMemo, useState } from 'react';
import { uniqueGenres } from '../utils/genres';
import { useShowsSearch } from './useShowsSearch';

export const usePresenter = () => {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const { shows, isLoading, error, retry } = useShowsSearch(query);

  // сброс жанрового фильтра при новой поисковой выдаче
  const [prevShows, setPrevShows] = useState(shows);
  if (prevShows !== shows) {
    setPrevShows(shows);
    setSelectedGenre(null);
  }

  const genres = useMemo(() => uniqueGenres(shows), [shows]);

  const filteredShows = useMemo(
    () =>
      selectedGenre
        ? shows.filter((show) => show.genres.includes(selectedGenre))
        : shows,
    [shows, selectedGenre],
  );

  const onQueryChange = useCallback((value: string) => setQuery(value), []);
  const onGenreSelect = useCallback((genre: string | null) => setSelectedGenre(genre), []);

  return {
    query,
    isLoading,
    error,
    retry,
    shows: filteredShows,
    totalCount: filteredShows.length,
    genres,
    selectedGenre,
    onQueryChange,
    onGenreSelect,
  };
};
