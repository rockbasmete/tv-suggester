import { usePresenter } from './usePresenter';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const { pages, isVisible, canPrev, canNext, onPrev, onNext, onSelect } = usePresenter(props);

  if (!isVisible) return null;

  return (
    <nav className={styles.root} aria-label="Пагинация">
      <button type="button" className={styles.button} disabled={!canPrev} onClick={onPrev}>
        ← Назад
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={page === props.currentPage ? `${styles.button} ${styles.active}` : styles.button}
          onClick={() => onSelect(page)}
        >
          {page}
        </button>
      ))}
      <button type="button" className={styles.button} disabled={!canNext} onClick={onNext}>
        Вперёд →
      </button>
    </nav>
  );
};
