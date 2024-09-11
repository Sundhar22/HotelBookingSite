import React, { useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import HotelFacilitiesFilter from "../components/HotelFacilities";
import HotelTypeFilter from "../components/HotelTypeFilter";
import MaxPrice from "../components/MaxPrice";
import Pagination from "../components/Pagination";
import SearchResultCard from "../components/SearchResultCard";
import SortFilter from "../components/SortFilter";
import StarRatingFilter from "../components/StarRatingFilter";
import { useSearchContext } from "../context/SearchContext";

const Search = () => {

    const searchData = useSearchContext();
    const [page, setPage] = useState<number>(1);
    const [selectedRatings, setSelectRatings] = useState<string[]>([])
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
    const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | undefined>()
    const [selectedSortOption, setSelectedSortOption] = useState<string | undefined>()

    const handleSelectedRatings = (event: React.ChangeEvent<HTMLInputElement>) => {

        const val = event.target.value;
        setSelectRatings((prev) =>
            event.target.checked ? [...prev, val] : prev.filter((x) => x !== val)
        )


    }

    const handleSelectedTypes = (event: React.ChangeEvent<HTMLInputElement>) => {

        const val = event.target.value;
        setSelectedTypes((prev) =>
            event.target.checked ? [...prev, val] : prev.filter((x) => x !== val)
        )


    }
    const handleSelectedFacilities = (event: React.ChangeEvent<HTMLInputElement>) => {

        const val = event.target.value;
        setSelectedFacilities((prev) =>
            event.target.checked ? [...prev, val] : prev.filter((x) => x !== val)
        )

    }



    const searchParams = {
        destination: searchData.destination,
        checkIn: searchData.checkIn.toISOString(),
        checkOut: searchData.checkOut.toISOString(),
        adultsCount: searchData.adultsCount.toString(),
        childrenCount: searchData.childrenCount.toString(),
        page: page.toString(),
        stars: selectedRatings,
        type: selectedTypes,
        facilities: selectedFacilities,
        maxPrice: selectedMaxPrice?.toString(),
        sortOption: selectedSortOption
    }

    const { data: hotelData } = useQuery(["searchHotels", searchParams], () => {
        return apiClient.searchHotels(searchParams)
    }
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">

                <div className="space-y-5 ">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by: </h3>
                    {/* filters */}
                    <StarRatingFilter selectedRatings={selectedRatings} onChange={handleSelectedRatings} />
                    <HotelTypeFilter onChange={handleSelectedTypes} selectedHotelTypes={selectedTypes} />
                    <HotelFacilitiesFilter onChange={handleSelectedFacilities} selectedHotelFacilities={selectedFacilities} />
                    <MaxPrice setMaxPrice={setSelectedMaxPrice} maxPrice={selectedMaxPrice} />
                </div>

            </div>

            <div className="flex flex-col gap-5">

                <div className="flex justify-between items-center">

                    <span className="text-xl font-bold">
                        {hotelData?.pagination.totalHotels || 0} Hotels found
                        {searchData.destination !== "" || undefined ? ` in ${searchData.destination}` : ""}
                    </span>

                    <SortFilter setSort={setSelectedSortOption} sort={selectedSortOption} />

                </div>

                {hotelData?.data.map((hotel) => <SearchResultCard key={hotel._id} hotel={hotel} />)}
                {hotelData?.data && <div className="flex max-w-full justify-center">
                    <Pagination onChangePage={(x) => setPage(x)} page={hotelData?.pagination.page || 1} pages={hotelData?.pagination.pages || 1} />
                </div>}
            </div>


        </div>
    )
}

export default Search;