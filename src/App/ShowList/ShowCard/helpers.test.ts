import { describe, expect, it } from 'vitest';
import { formatRating, getYear, stripHtml } from './helpers';

describe('stripHtml', () => {
  it('удаляет HTML-теги из описания', () => {
    expect(stripHtml('<p>Hello <b>world</b></p>')).toBe('Hello world');
  });

  it('возвращает пустую строку для null', () => {
    expect(stripHtml(null)).toBe('');
  });
});

describe('getYear', () => {
  it('извлекает год из даты премьеры', () => {
    expect(getYear('2011-04-17')).toBe('2011');
    expect(getYear(null)).toBe('');
  });
});

describe('formatRating', () => {
  it('форматирует рейтинг с одним знаком', () => {
    expect(formatRating(8.123)).toBe('8.1');
    expect(formatRating(null)).toBe('—');
  });
});
