import React from 'react'

const Pagination = ({ nPages, currentPage, setCurrentPage, setPageChanged }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    const pageRangeOptimal = [currentPage - 1, currentPage, currentPage + 1];

    const updatedRange = realPageRange(pageRangeOptimal);

    function realPageRange() {
        let newArray = [];
        if (currentPage === 1) {
            const tempOptimal = [currentPage, currentPage + 1, currentPage + 2];
            pageNumbers.forEach(element => {
                if (tempOptimal.includes(element)) {
                    newArray.push(element);
                }
            });
            return newArray;
        }
        if (currentPage === nPages) {
            const tempOptimal = [nPages - 2, nPages - 1, nPages];
            pageNumbers.forEach(element => {
                if (tempOptimal.includes(element)) {
                    newArray.push(element);
                }
            });
            return newArray;
        }
        pageNumbers.forEach(element => {
            if (pageRangeOptimal.includes(element)) {
                newArray.push(element);
            }
        });
        return newArray;
    }

    const changePage = async (pageNumber) => {
        await setCurrentPage(pageNumber);
        setPageChanged(a => !a);
    }


    return (
        <nav>
            <ul className='pagination pagination-lg justify-content-end'>
                {updatedRange.map(pgNumber => (
                    <li key={pgNumber}
                        className={`page-item user-select-none ${currentPage === pgNumber ? 'active' : ''} `} >

                        <div onClick={() => changePage(pgNumber)}
                            className='page-link' role='button'>

                            {pgNumber}
                        </div>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination