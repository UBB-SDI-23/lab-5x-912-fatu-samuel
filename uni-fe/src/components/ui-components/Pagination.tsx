import { debounce } from "lodash";
import { useCallback, useEffect } from "react";

interface PaginatorProps {
    rowsPerPage: number;
    totalRows: number;
    currentPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    setPage: (page: number) => void;
    goToNextPage: () => void;
    goToPrevPage: () => void;
}

export const Paginator = ({ rowsPerPage, totalRows, currentPage, isFirstPage, isLastPage, setPage, goToNextPage, goToPrevPage }: PaginatorProps) => {

    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const hardPagesFirst = [1, 2]
    const hardPagesLast = [totalPages - 1, totalPages]
    const numberOfPages = 5;

    let pages: number[] = [];
    let dots: number = 0;

    const getCurrentPages = () => {

        for (let i = currentPage - numberOfPages; i <= currentPage + numberOfPages; i++) {
            if (i > 0 && i <= totalPages) {
                pages.push(i)
            }
        }

        const commonFirst = pages.filter(element => hardPagesFirst.includes(element));
        if (commonFirst.length != 0) {
            pages = pages.filter(function (el) {
                return !commonFirst.includes(el);
            })

            dots = 1;
            return;
        }

        if (pages[0] == hardPagesFirst[numberOfPages - 1] + 1) {
            dots = 1;
            return;
        }

        const commonLast = pages.filter(element => hardPagesLast.includes(element));
        if (commonLast.length != 0) {
            pages = pages.filter(function (el) {
                return !commonLast.includes(el);
            })

            dots = -1;
            return;
        }

        if (pages[pages.length - 1] == hardPagesLast[0] - 1) {
            dots = -1;
            return;
        }
    }

    getCurrentPages();

    return (
        <div className='pagination'>

            <button className={currentPage === 1 ? 'active floating' : 'floating'} onClick={() => setPage(1)}>1</button>
            <button className={currentPage === 2 ? 'active floating' : 'floating'} onClick={() => setPage(2)}>2</button>
            <button className={currentPage === 3 ? 'active floating' : 'floating'} onClick={() => setPage(3)}>3</button>
            <button className={currentPage === 4 ? 'active floating' : 'floating'} onClick={() => setPage(4)}>4</button>
            <button className={currentPage === 5 ? 'active floating' : 'floating'} onClick={() => setPage(5)}>5</button>

            {(dots == -1 || dots == 0) && <span className='floating'>...</span>}

            {pages.map((page) => (
                <button className={currentPage === page ? 'active floating' : 'floating'} onClick={() => setPage(page)}>{page}</button>
            ))}


            {(dots == 1 || dots == 0) && <span className='floating'>...</span>}


            <button className={currentPage === totalPages - 4 ? 'active floating' : 'floating'} onClick={() => setPage(totalPages - 4)}>{totalPages - 2}</button>
            <button className={currentPage === totalPages - 3 ? 'active floating' : 'floating'} onClick={() => setPage(totalPages - 3)}>{totalPages - 3}</button>
            <button className={currentPage === totalPages - 2 ? 'active floating' : 'floating'} onClick={() => setPage(totalPages - 2)}>{totalPages - 4}</button>
            <button className={currentPage === totalPages - 1 ? 'active floating' : 'floating'} onClick={() => setPage(totalPages - 1)}>{totalPages - 1}</button>
            <button className={currentPage === totalPages ? 'active floating' : 'floating'} onClick={() => setPage(totalPages)}>{totalPages}</button>

        </div >
    )
}