import type { Show } from '../../types/show';
import { usePresenter } from './usePresenter';
import styles from './ShowList.module.scss';
import { ShowCard } from './ShowCard/ShowCard';
import { Pagination } from './Pagination/Pagination';

interface ShowListProps {
  shows: Show[];
  totalCount: number;
  hasQuery: boolean;
}

export const ShowList = ({ shows, totalCount, hasQuery }: ShowListProps) => {
  const { visibleShows, currentPage, pageCount, hasResults, onPageChange } = usePresenter(shows);

  if (!hasResults) {
    return (
      <p className={styles.empty}>
        {hasQuery
          ? 'Ничего не найдено. Попробуйте изменить запрос или сбросить фильтр жанра.'
          : 'Введите название сериала, чтобы начать поиск.'}
      </p>
    );
  }

  return (
    <>
      <p className={styles.counter}>Найдено шоу: {totalCount}</p>
      <ul className={styles.list}>
        {visibleShows.map((show) => (
          <li key={show.id}>
            <ShowCard show={show} />
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={onPageChange} />
    </>
  );
};
