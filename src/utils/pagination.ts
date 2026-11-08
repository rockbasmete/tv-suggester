export const PAGE_SIZE = 3;

export const getPageCount = (itemsCount: number): number =>
  Math.max(1, Math.ceil(itemsCount / PAGE_SIZE));

export const getPageItems = <T>(items: T[], page: number): T[] => {
  const start = (page - 1) * PAGE_SIZE;
  return items.slice(start, start + PAGE_SIZE);
};
