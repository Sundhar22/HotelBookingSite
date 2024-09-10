export type Props = {
    page: number;
    pages: number;
    onChangePage(page: number): void;
}

const Pagination = ({ page, pages, onChangePage }: Props) => {


    const startPages = Array.from({ length: pages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center">
            <ul className="flex">
                {startPages.map((x) => (
                    <li
                        className={`px-2 py-1 mx-1 flex border border-slate-300 ${page === x ? "bg-gray-200" : ""
                            }`}
                    >
                        <button onClick={() => onChangePage(x)}>{x}</button>
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default Pagination;