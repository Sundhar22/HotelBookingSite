export type Props = {
    page: number;
    pages: number;
    onChangePage(page: number): void;
};

const Pagination = ({ page, pages, onChangePage }: Props) => {
    const getPaginationItems = () => {
        const paginationItems = [];
        const windowSize = 2; // How many pages to show on either side of the current page

        // Add first page
        if (page > windowSize + 2) {
            paginationItems.push(1, '...');
        }

        // Add page window around the current page
        for (let i = Math.max(1, page - windowSize); i <= Math.min(pages, page + windowSize); i++) {
            paginationItems.push(i);
        }

        // Add last page
        if (page < pages - windowSize - 1) {
            paginationItems.push('...', pages);
        }

        return paginationItems;
    };

    const paginationItems = getPaginationItems();

    return (
        <div className="flex justify-center items-center space-x-2">
            <button
                className={`px-2 py-1 border border-gray-300 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => onChangePage(page - 1)}
                disabled={page === 1}
            >
                Previous
            </button>

            <ul className="flex space-x-1">
                {paginationItems.map((item, index) =>
                    typeof item === 'number' ? (
                        <li
                            key={index}
                            className={`px-2 py-1 border border-gray-300 ${page === item ? 'bg-gray-300' : ''}`}
                        >
                            <button onClick={() => onChangePage(item)}>{item}</button>
                        </li>
                    ) : (
                        <li key={index} className="px-2 py-1">...</li>
                    )
                )}
            </ul>

            <button
                className={`px-2 py-1 border border-gray-300 ${page === pages ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => onChangePage(page + 1)}
                disabled={page === pages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
