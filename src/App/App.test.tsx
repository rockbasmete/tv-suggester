import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { App } from './App';
import { fetchMock, mockFetchSuccess } from './appTestFixtures';

const advance = async (ms: number) => {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
};

const search = async (value: string) => {
  fireEvent.change(screen.getByLabelText('Поиск сериала'), { target: { value } });
  await advance(500);
};

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    fetchMock.mockReset();
    mockFetchSuccess();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('не запрашивает API до ввода запроса', () => {
    render(<App />);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByText(/введите название сериала/i)).toBeInTheDocument();
  });

  it('отправляет один запрос после дебаунса и показывает карточки', async () => {
    render(<App />);
    await search('murder');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Найдено шоу: 5')).toBeInTheDocument();
    expect(screen.getByText('Alpha Show')).toBeInTheDocument();
  });

  it('отправляет запрос только после остановки ввода (debounce)', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Поиск сериала'), { target: { value: 'mu' } });
    await advance(200);
    expect(fetchMock).not.toHaveBeenCalled();

    await advance(300);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('показывает по 3 элемента на страницу и переключает страницы', async () => {
    render(<App />);
    await search('show');

    const list = screen.getByRole('list');
    expect(within(list).getAllByRole('listitem')).toHaveLength(3);
    expect(screen.queryByText('Delta Show')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Вперёд →' }));

    expect(within(list).getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Delta Show')).toBeInTheDocument();
  });

  it('фильтрует по жанру и сбрасывает фильтр', async () => {
    render(<App />);
    await search('show');

    fireEvent.click(screen.getByRole('button', { name: 'Comedy' }));

    expect(screen.getByText('Найдено шоу: 3')).toBeInTheDocument();
    expect(screen.getByText('Alpha Show')).toBeInTheDocument();
    expect(screen.queryByText('Gamma Show')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Сбросить фильтр' }));

    expect(screen.getByText('Найдено шоу: 5')).toBeInTheDocument();
  });

  it('показывает ошибку с кнопкой повтора при сбое запроса', async () => {
    fetchMock.mockRejectedValue(new Error('network down'));
    render(<App />);
    await search('show');

    expect(screen.getByRole('alert')).toHaveTextContent(/не удалось загрузить/i);

    mockFetchSuccess();
    fireEvent.click(screen.getByRole('button', { name: 'Повторить' }));
    await advance(0);

    expect(screen.getByText('Alpha Show')).toBeInTheDocument();
  });
});
