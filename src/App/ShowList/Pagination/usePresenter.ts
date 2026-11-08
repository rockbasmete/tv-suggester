interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export const usePresenter = ({ currentPage, pageCount, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return {
    pages,
    isVisible: pageCount > 1,
    canPrev: currentPage > 1,
    canNext: currentPage < pageCount,
    onPrev: () => onPageChange(currentPage - 1),
    onNext: () => onPageChange(currentPage + 1),
    onSelect: onPageChange,
  };
};
