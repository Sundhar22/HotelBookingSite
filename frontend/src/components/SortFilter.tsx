type Props = {
    sort?: string;
    setSort(sort: string): void;
}
const SortFilter = ({ sort, setSort }: Props) => {
    return (
        <div className=" flex gap-5">
            <p className="text-md font-semibold mb-2">SortBy</p>
            
            <select className="p-2 border rounded-md w-full"
                value={sort}
                onChange={(event) =>
                    setSort(event.target.value)
                }>
                <option value="pricePer24hAsc">Price {'(low to high)'}</option>

                <option value="pricePer24hDesc">Price {'(high to low)'}</option>
                <option value="starRating">Star Rating</option>
            </select>
        </div>
    )
}

export default SortFilter