import ChevronLeft from "../icons/ChevronLeft";
import ChevronRight from "../icons/ChevronRight";
import LinkPaginationItem from "./LinkPaginationItem";

const LinkPagination = ({
  current,
  pagesCount,
  baseHref,
}: LinkPaginationProps) => {
  return (
    <ul className="btn-group w-full justify-center">
      <LinkPaginationItem href={`${baseHref}/${current > 1 ? current - 1 : 1}`}>
        <ChevronLeft />
      </LinkPaginationItem>
      {Array.from(Array(Math.min(10, pagesCount)).keys()).map((x) => (
        <LinkPaginationItem
          key={x}
          active={current === x + 1}
          href={`${baseHref}/${x + 1}`}
        >
          {x + 1}
        </LinkPaginationItem>
      ))}
      <LinkPaginationItem
        href={`${baseHref}/${
          current < pagesCount + 1 ? current + 1 : pagesCount + 1
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
