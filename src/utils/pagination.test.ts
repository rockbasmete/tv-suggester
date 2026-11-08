import { describe, expect, it } from 'vitest';
import { getPageCount, getPageItems, PAGE_SIZE } from './pagination';

describe('pagination', () => {
  it('считает число страниц по 3 элемента', () => {
    expect(getPageCount(0)).toBe(1);
    expect(getPageCount(1)).toBe(1);
    expect(getPageCount(3)).toBe(1);
    expect(getPageCount(4)).toBe(2);
    expect(getPageCount(10)).toBe(4);
  });

  it('возвращает срез элементов для страницы', () => {
    const items = [1, 2, 3, 4, 5, 6, 7];

    expect(getPageItems(items, 1)).toEqual([1, 2, 3]);
    expect(getPageItems(items, 2)).toEqual([4, 5, 6]);
    expect(getPageItems(items, 3)).toEqual([7]);
  });

  it('размер страницы равен 3', () => {
    expect(PAGE_SIZE).toBe(3);
  });
});
