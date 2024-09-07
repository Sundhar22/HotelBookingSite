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

        <form onSubmit={handleSubmit} className=" shadow-md container mx-auto py-6 px-8 -mt-7 bg-white rounded-full w-1/3.8  md:w-1/2">
            <div className="flex ">

                <div className="grid">

                    <div className="flex gap-1">
                        <MdTravelExplore size={25} className="mr-2" />
                        <span className="font-semibold text-base" >Location</span>

                    </div>

                    <input
                        placeholder="Where are you going?"
                        className="text-md w-full focus:outline-none"
                        value={destination}
                        required
                        onChange={(event) => setDestination(event.target.value)}
                    />    </div>
                <div className="bg-gray-200 min-w-0.5"></div>

                <div className="mx-3  grid">
                    <span className="font-semibold text-base" >Adult</span>
                    <input
                        className="w-full p-1 focus:outline-none font-bold"
                        type="number"
                        min={1}
                        max={20}
                        value={adultCount}
                        onChange={(event) => setAdultCount(parseInt(event.target.value) || 0)}
                    />
                </div>
                <div className="bg-gray-200 min-w-0.5"></div>

                <div className=" mx-3 grid">
                    <span className="font-semibold text-base" >Children</span>
                    <input
                        className="w-full p-1 focus:outline-none font-bold"
                        type="number"
                        min={0}
                        max={20}
                        value={childrenCount}
                        onChange={(event) => setChildrenCount(parseInt(event.target.value) || 0)}
                    />    </div>
                <div className="bg-gray-200 min-w-0.5"></div>

                <div className=" mx-3 grid">
                    <span className="font-semibold text-base" >Check-In</span>

                    <DatePicker
                        selected={checkIn}
                        onChange={(date) => setCheckIn(date as Date)}
                        selectsStart
                        startDate={checkIn}
                        endDate={checkIn}
                        minDate={minDate}
                        maxDate={maxDate}
                        placeholderText="Check-in Date"
                        className="w-32 bg-white  focus:outline-none"
                        wrapperClassName="w-32"
                    />
                </div>
                <div className="bg-gray-200 min-w-0.5"></div>

                <div className=" mx-3 grid ">
                    <span className="font-semibold text-base" >Check-Out</span>

                    <DatePicker
                        selected={checkOut}
                        onChange={(date) => setCheckOut(date as Date)}
                        selectsEnd
                        startDate={checkIn}
                        endDate={checkOut}
                        minDate={checkIn}
                        maxDate={maxDate}
                        placeholderText="Check-out Date"
                        className="w-32 bg-white  focus:outline-none"
                        wrapperClassName="w-32"
                    />
                </div>


                <button type="submit" className="rounded-full bg-blue-700 flex items-center justify-center p-4" ><FaArrowRightLong className="text-2xl text-white" /></button>


            </div>
        </form>
    )

}

export default SearchBar;