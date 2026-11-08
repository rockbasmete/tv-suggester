import { usePresenter } from './usePresenter';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const { input, onInputChange, onSubmit, onClear } = usePresenter({ value, onChange });

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <input
        className={styles.input}
        type="search"
        placeholder="Название сериала, например: murder"
        value={input}
        onChange={(event) => onInputChange(event.target.value)}
        aria-label="Поиск сериала"
      />
      {input && (
        <button type="button" className={styles.clearButton} onClick={onClear}>
          Очистить
        </button>
      )}
    </form>
  );
};
