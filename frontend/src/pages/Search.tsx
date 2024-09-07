import { useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import SearchResultCard from "../components/SearchResultCard";
import { useSearchContext } from "../context/SearchContext";

const Search = () => {

    const searchData = useSearchContext();
    const [page, setPage] = useState<number>(1);
    console.log(setPage)

    const searchParams = {
        destination: searchData.destination,
        checkIn: searchData.checkIn.toISOString(),
        checkOut: searchData.checkOut.toISOString(),
        adultsCount: searchData.adultsCount.toString(),
        childrenCount: searchData.childrenCount.toString(),
        page: page.toString()
    }

    const { data: hotelData } = useQuery(["searchHotels", searchParams], () => {
        return apiClient.searchHotels(searchParams)
    }
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">

                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by: </h3>
                    {/* filters */}
                </div>

            </div>

            <div className="flex flex-col gap-5">

                <div className="flex justify-items-center items-center">

                    <span className="text-xl font-bold">
                        {hotelData?.pagination.totalHotels} Hotels found
                        {searchData.destination ? ` in ${searchData.destination}` : ""}
                    </span>

                </div>

                {hotelData?.data.map((hotel) => <SearchResultCard key={hotel._id} hotel={hotel} />)}

            </div>

        </div>
    )
}

export default Search;