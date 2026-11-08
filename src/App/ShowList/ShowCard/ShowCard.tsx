import type { Show } from '../../../types/show';
import { usePresenter } from './usePresenter';
import styles from './ShowCard.module.scss';

interface ShowCardProps {
  show: Show;
}

export const ShowCard = ({ show }: ShowCardProps) => {
  const { title, imageUrl, year, language, genres, rating, summary, url } = usePresenter(show);

  return (
    <article className={styles.card}>
      {imageUrl ? (
        <img className={styles.poster} src={imageUrl} alt={title} loading="lazy" />
      ) : (
        <div className={styles.noPoster}>Нет постера</div>
      )}
      <div className={styles.body}>
        <div className={styles.head}>
          <h3 className={styles.title}>
            {url ? (
              <a href={url} target="_blank" rel="noreferrer">
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
          <span className={styles.rating}>★ {rating}</span>
        </div>
        <p className={styles.meta}>{[year, language, genres].filter(Boolean).join(' · ')}</p>
        {summary && <p className={styles.summary}>{summary}</p>}
      </div>
    </article>
  );
};
