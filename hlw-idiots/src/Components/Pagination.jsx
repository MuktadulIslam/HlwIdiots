import { useCallback, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Button2 = ({ content, onClick, active, disabled }) => {
    return (
        <button
            className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 text-sm font-normal transition-colors rounded-lg
            ${active ? "bg-lime-800 text-white" : "text-lime-500"}
            ${!disabled
                    ? "hover:bg-lime-500 hover:text-white"
                    : "text-lime-300 bg-white cursor-not-allowed"
                }
            `}
            onClick={onClick}
            disabled={disabled}
        >
            {content}
        </button>
    );
}

const PaginationNav1 = ({
    gotoPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageIndex,
    setPage,
    paginationUrl
}) => {
    const renderPageLinks = useCallback(() => {
        if (pageCount === 0) return null;
        const visiblePageButtonCount = 5;
        let numberOfButtons =
            pageCount < visiblePageButtonCount ? pageCount : visiblePageButtonCount;
        const pageIndices = [pageIndex];
        numberOfButtons--;
        [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
            const pageNumberBefore = pageIndices[0] - 1;
            const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;
            if (
                pageNumberBefore >= 0 &&
                (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount - 1)
            ) {
                pageIndices.unshift(pageNumberBefore);
            } else {
                pageIndices.push(pageNumberAfter);
            }
        });
        return pageIndices.map((pageIndexToMap) => (
            <li key={pageIndexToMap}>
                <Link to={`${paginationUrl}${pageIndexToMap}`}>
                    <Button2
                        content={pageIndexToMap + 1}
                        onClick={() => {
                            setPage(pageIndexToMap);
                            gotoPage(pageIndexToMap);
                        }}
                        active={pageIndex === pageIndexToMap}
                    />
                </Link>
            </li>
        ));
    }, [gotoPage, pageCount, pageIndex, paginationUrl, setPage]);

    return (
        <ul className="flex gap-2">
            <li>
                <Link to={`${paginationUrl}0`}>
                    <Button2
                        content={
                            <div className="flex ml-1">
                                <FaChevronLeft size="0.6rem" />
                                <FaChevronLeft size="0.6rem" className="-translate-x-1/2" />
                            </div>
                        }
                        onClick={() => {
                            setPage(0);
                            gotoPage(0);
                        }}
                        disabled={!canPreviousPage}
                    />
                </Link>
            </li>
            {renderPageLinks()}
            <li>
                <Link to={`${paginationUrl}${pageCount - 1}`}>
                    <Button2
                        content={
                            <div className="flex ml-1">
                                <FaChevronRight size="0.6rem" />
                                <FaChevronRight size="0.6rem" className="-translate-x-1/2" />
                            </div>
                        }
                        onClick={() => {
                            setPage(pageCount - 1);
                            gotoPage(pageCount - 1);
                        }}
                        disabled={!canNextPage}
                    />
                </Link>
            </li>
        </ul>
    );
}

const Pagination = ({ pageCount, setPage, paginationUrl, page }) => {
    const [pageIndex, setPageIndex] = useState(parseInt(page));

    return (
        <div className="flex gap-3 flex-wrap p-6 py-12">
            <PaginationNav1
                gotoPage={setPageIndex}
                canPreviousPage={pageIndex > 0}
                canNextPage={pageIndex < pageCount - 1}
                pageCount={pageCount}
                pageIndex={pageIndex}
                setPage={setPage}
                paginationUrl={paginationUrl}
            />
        </div>
    );
};

export default Pagination;