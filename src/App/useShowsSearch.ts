import { useCallback, useEffect, useState } from 'react';
import { fetchShows } from '../api/tvmazeApi';
import type { Show } from '../types/show';

const isAbortError = (error: unknown): boolean =>
  error instanceof DOMException && error.name === 'AbortError';

const LOAD_ERROR = 'Не удалось загрузить данные. Проверьте сеть и попробуйте снова.';
const EMPTY_SHOWS: Show[] = [];

interface SearchState {
  key: string;
  shows: Show[];
  error: string | null;
}

export const useShowsSearch = (query: string) => {
  const [state, setState] = useState<SearchState>({ key: '', shows: [], error: null });
  const [attempt, setAttempt] = useState(0);

  const trimmedQuery = query.trim();
  const requestKey = `${trimmedQuery}#${attempt}`;

  // сброс результатов при очистке запроса (паттерн adjust-state-during-render)
  const [prevKey, setPrevKey] = useState(requestKey);
  if (prevKey !== requestKey) {
    setPrevKey(requestKey);
    if (!trimmedQuery) setState({ key: requestKey, shows: [], error: null });
  }

  useEffect(() => {
    if (!trimmedQuery) return;

    const controller = new AbortController();

    fetchShows(trimmedQuery, controller.signal)
      .then((shows) => {
        if (!controller.signal.aborted) setState({ key: requestKey, shows, error: null });
      })
      .catch((fetchError: unknown) => {
        if (!controller.signal.aborted && !isAbortError(fetchError)) {
          setState({ key: requestKey, shows: [], error: LOAD_ERROR });
        }
      });

    return () => controller.abort();
  }, [trimmedQuery, requestKey]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  const isActual = state.key === requestKey;

  return {
    shows: isActual ? state.shows : EMPTY_SHOWS,
    error: isActual ? state.error : null,
    isLoading: trimmedQuery.length > 0 && !isActual,
    retry,
  };
};
