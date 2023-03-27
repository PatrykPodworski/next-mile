import ChevronLeft from "../icons/ChevronLeft";
import ChevronRight from "../icons/ChevronRight";
import PaginationItem from "./PaginationItem";

const Pagination = ({
  current,
  pagesCount,
  handleClick,
  handleNext,
  handlePrevious,
}: PaginationProps) => {
  return (
    <ul className="btn-group w-full justify-center">
      <PaginationItem onClick={handlePrevious}>
        <ChevronLeft />
      </PaginationItem>
      {Array.from(Array(pagesCount).keys()).map((x) => (
        <PaginationItem
          key={x}
          active={current === x}
          onClick={() => handleClick(x)}
        >
          {x + 1}
        </PaginationItem>
      ))}
      <PaginationItem onClick={handleNext}>
        <ChevronRight />
      </PaginationItem>
    </ul>
  );
};

type PaginationProps = {
  pagesCount: number;
  current: number;
  handlePrevious: () => void;
  handleNext: () => void;
  handleClick: (page: number) => void;
};

export default Pagination;
