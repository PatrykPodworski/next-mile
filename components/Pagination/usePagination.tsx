import { useState } from "react";

const usePagination = (initialPage: number, pagesCount: number) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePrevious = () =>
    setCurrentPage((state) => (state > 0 ? state - 1 : state));

  const handleNext = () =>
    setCurrentPage((state) => (state < pagesCount - 1 ? state + 1 : state));

  const handleClick = (page: number) => setCurrentPage(page);

  return {
    currentPage,
    pagesCount,
    handleClick,
    handleNext,
    handlePrevious,
  };
};

export default usePagination;
