import { usePresenter } from './usePresenter';
import styles from './App.module.scss';
import { SearchBar } from './SearchBar/SearchBar';
import { GenreChips } from './GenreChips/GenreChips';
import { ShowList } from './ShowList/ShowList';

export const App = () => {
  const {
    query,
    isLoading,
    error,
    retry,
    shows,
    totalCount,
    genres,
    selectedGenre,
    onQueryChange,
    onGenreSelect,
  } = usePresenter();

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>TV Suggester</h1>
        <p className={styles.subtitle}>Найди свой следующий сериал</p>
      </header>

      <SearchBar value={query} onChange={onQueryChange} />

      {error ? (
        <div className={styles.error} role="alert">
          <p>{error}</p>
          <button className={styles.retryButton} onClick={retry}>
            Повторить
          </button>
        </div>
      ) : (
        <>
          <GenreChips genres={genres} selected={selectedGenre} onSelect={onGenreSelect} />
          {isLoading ? (
            <p className={styles.status}>Загрузка…</p>
          ) : (
            <ShowList shows={shows} totalCount={totalCount} hasQuery={query.trim().length > 0} />
          )}
        </>
      )}
    </div>
  );
};
