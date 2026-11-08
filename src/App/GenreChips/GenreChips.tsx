import { usePresenter } from './usePresenter';
import styles from './GenreChips.module.scss';

interface GenreChipsProps {
  genres: string[];
  selected: string | null;
  onSelect: (genre: string | null) => void;
}

export const GenreChips = ({ genres, selected, onSelect }: GenreChipsProps) => {
  const { isVisible, chips, onChipClick, onReset } = usePresenter({ genres, selected, onSelect });

  if (!isVisible) return null;

  return (
    <div className={styles.root}>
      <div className={styles.chips}>
        {chips.map(({ genre, isActive }) => (
          <button
            key={genre}
            type="button"
            className={isActive ? `${styles.chip} ${styles.chipActive}` : styles.chip}
            onClick={() => onChipClick(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
      {selected && (
        <button type="button" className={styles.resetButton} onClick={onReset}>
          Сбросить фильтр
        </button>
      )}
    </div>
  );
};
