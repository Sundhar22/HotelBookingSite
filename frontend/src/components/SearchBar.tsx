import { FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../context/SearchContext";

import "react-datepicker/dist/react-datepicker.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdTravelExplore } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {


    const navigate = useNavigate();
    const search = useSearchContext();

    const [destination, setDestination] = useState<string>(search.destination || "");
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn || new Date());
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut || new Date());
    const [adultCount, setAdultCount] = useState<number>(search.adultsCount || 1);
    const [childrenCount, setChildrenCount] = useState<number>(search.childrenCount || 0);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchValue(
            destination,
            checkIn,
            checkOut,
            adultCount,
            childrenCount
        );

        navigate("/search");
    }

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    return (
        <form onSubmit={handleSubmit} className="shadow-md container mx-auto py-6 px-6 -mt-7 bg-white rounded-lg w-full max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-center md:flex-wrap md:justify-between gap-4">

                {/* Location Input */}
                <div className="flex flex-col md:items-center md:mr-4 md:flex-grow">
                    <div className="flex items-center gap-2 mb-2 md:mb-0">
                        <MdTravelExplore size={25} className="text-blue-700" />
                        <span className="font-semibold text-base">Location</span>
                    </div>
                    <input
                        placeholder="Where are you going?"
                        className="text-md w-full md:w-auto focus:outline-none border-b focus:border-blue-700 md:ml-2 p-2 rounded-lg"
                        value={destination}
                        name="destination"
                        onChange={(event) => setDestination(event.target.value)}
                    />
                </div>

                {/* Adult Input */}
                <div className="flex flex-col md:items-center md:mr-4">
                    <span className="font-semibold text-base md:mr-2">Adult</span>
                    <input
                        className="w-full md:w-24 p-2 focus:outline-none font-bold border-b focus:border-blue-700 rounded-lg"
                        type="number"
                        min={1}
                        max={20}
                        value={adultCount}
                        onChange={(event) => setAdultCount(parseInt(event.target.value) || 0)}
                    />
                </div>

                {/* Children Input */}
                <div className="flex flex-col md:items-center md:mr-4">
                    <span className="font-semibold text-base md:mr-2">Children</span>
                    <input
                        className="w-full md:w-24 p-2 focus:outline-none font-bold border-b focus:border-blue-700 rounded-lg"
                        type="number"
                        min={0}
                        max={20}
                        value={childrenCount}
                        onChange={(event) => setChildrenCount(parseInt(event.target.value) || 0)}
                    />
                </div>

                {/* Check-In Input */}
                <div className="flex flex-col md:items-center md:mr-4">
                    <span className="font-semibold text-base md:mr-2">Check-In</span>
                    <DatePicker
                        selected={checkIn}
                        onChange={(date) => setCheckIn(date as Date)}
                        selectsStart
                        startDate={checkIn}
                        endDate={checkIn}
                        minDate={minDate}
                        maxDate={maxDate}
                        placeholderText="Check-in Date"
                        className="w-full md:w-32 bg-white focus:outline-none border-b focus:border-blue-700 rounded-lg p-2"
                    />
                </div>

                {/* Check-Out Input */}
                <div className="flex flex-col md:items-center md:mr-4">
                    <span className="font-semibold text-base md:mr-2">Check-Out</span>
                    <DatePicker
                        selected={checkOut}
                        onChange={(date) => setCheckOut(date as Date)}
                        selectsEnd
                        startDate={checkIn}
                        endDate={checkOut}
                        minDate={checkIn}
                        maxDate={maxDate}
                        placeholderText="Check-out Date"
                        className="w-full md:w-32 bg-white focus:outline-none border-b focus:border-blue-700 rounded-lg p-2"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-center md:justify-start">
                    <button type="submit" name="Search" className="rounded-full bg-blue-700 text-white p-3 w-full md:w-auto flex items-center justify-center">
                        <FaArrowRightLong className="text-2xl" />
                    </button>
                </div>
            </div>
        </form>
    );


}

export default SearchBar;
