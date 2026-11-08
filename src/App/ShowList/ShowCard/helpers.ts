export const stripHtml = (html: string | null): string => {
  if (!html) return '';
  const container = document.createElement('div');
  container.innerHTML = html;
  return (container.textContent ?? '').trim();
};

export const getYear = (premiered: string | null): string =>
  premiered ? premiered.slice(0, 4) : '';

export const formatRating = (rating: number | null): string =>
  rating === null ? '—' : rating.toFixed(1);
