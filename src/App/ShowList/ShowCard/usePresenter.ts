import { useMemo } from 'react';
import type { Show } from '../../../types/show';
import { formatRating, getYear, stripHtml } from './helpers';

export const usePresenter = (show: Show) => {
  return useMemo(
    () => ({
      title: show.name,
      imageUrl: show.imageUrl,
      year: getYear(show.premiered),
      language: show.language ?? '',
      genres: show.genres.join(' · '),
      rating: formatRating(show.rating),
      summary: stripHtml(show.summary),
      url: show.url,
    }),
    [show],
  );
};
