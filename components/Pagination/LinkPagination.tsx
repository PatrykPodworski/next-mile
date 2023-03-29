import ChevronLeft from "../icons/ChevronLeft";
import ChevronRight from "../icons/ChevronRight";
import LinkPaginationItem from "./LinkPaginationItem";

const LinkPagination = ({
  current,
  pagesCount,
  baseHref,
}: LinkPaginationProps) => {
  const numberOfPages = Math.min(pagesCount, 10);

  return (
    <ul className="btn-group w-full justify-center">
      <LinkPaginationItem
        href={`${baseHref}/${current - 1 > 0 ? current - 1 : 1}`}
      >
        <ChevronLeft />
      </LinkPaginationItem>
      {Array.from(Array(numberOfPages).keys())
        .map((x) => x + 1)
        .map((x) => (
          <LinkPaginationItem
            key={x}
            active={current === x}
            href={`${baseHref}/${x}`}
          >
            {x}
          </LinkPaginationItem>
        ))}
      <LinkPaginationItem
        href={`${baseHref}/${
          current + 1 < numberOfPages ? current + 1 : numberOfPages
        }`}
      >
        <ChevronRight />
      </LinkPaginationItem>
    </ul>
  );
};

type LinkPaginationProps = {
  pagesCount: number;
  current: number;
  baseHref: string;
};

export default LinkPagination;
