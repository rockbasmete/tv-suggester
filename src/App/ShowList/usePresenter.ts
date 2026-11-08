import { useState } from 'react';
import type { Show } from '../../types/show';
import { getPageCount, getPageItems } from '../../utils/pagination';

export const usePresenter = (shows: Show[]) => {
  const [page, setPage] = useState(1);

  // возврат на первую страницу при изменении выдачи
  const [prevShows, setPrevShows] = useState(shows);
  if (prevShows !== shows) {
    setPrevShows(shows);
    setPage(1);
  }

  const pageCount = getPageCount(shows.length);
  const currentPage = Math.min(page, pageCount);

  return {
    visibleShows: getPageItems(shows, currentPage),
    currentPage,
    pageCount,
    hasResults: shows.length > 0,
    onPageChange: setPage,
  };
};
