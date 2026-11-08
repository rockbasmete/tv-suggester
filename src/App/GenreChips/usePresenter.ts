interface GenreChipsProps {
  genres: string[];
  selected: string | null;
  onSelect: (genre: string | null) => void;
}

export const usePresenter = ({ genres, selected, onSelect }: GenreChipsProps) => {
  const chips = genres.map((genre) => ({ genre, isActive: genre === selected }));

  const onChipClick = (genre: string) => onSelect(genre === selected ? null : genre);

  return {
    isVisible: genres.length > 0,
    chips,
    selected,
    onChipClick,
    onReset: () => onSelect(null),
  };
};
