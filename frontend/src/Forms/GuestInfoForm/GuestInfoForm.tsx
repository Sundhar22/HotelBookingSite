import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UseAppContext } from "../../context/AppContext";
import { useSearchContext } from "../../context/SearchContext";
 
type Props = {
    hotelId: string;
    pricePer24hrs: number;
}

type GuestInfoFormData = {
    children: number;
    adults: number;
    checkIn: Date;
    checkOut: Date;
}

const GuestInfoForm = ({ hotelId, pricePer24hrs }: Props) => {

    const { isLogin } = UseAppContext();

    const search = useSearchContext();


    const navigate = useNavigate();

    const location = useLocation();


    const { watch, register, handleSubmit, setValue, formState: { errors } } = useForm<GuestInfoFormData>(
        {
            defaultValues: {
                children: search.childrenCount || 0,
                adults: search.adultsCount || 1,
                checkIn: search.checkIn || new Date(),
                checkOut: search.checkOut || new Date(),
            }
        }
    );


    const onSubmit = (data: GuestInfoFormData) => {
        search.saveSearchValue(
            "",
            data.checkIn,
            data.checkOut,
            data.adults,
            data.children
        );

        if(isLogin){
            navigate(`/detail/${hotelId}/booking`);
        }else{
            navigate("/sign-in", { state: { from: location} });
        }
    }








    const checkIn = watch("checkIn");
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    const checkOut = watch("checkOut");

    const adultCount = watch("adults");
    const setAdultCount = (count: number) => setValue("adults", count);

    const childrenCount = watch("children");
    const setChildrenCount = (count: number) => setValue("children", count);
    return (

        <div className="flex flex-col bg-blue-600 rounded-md  gap-4 p-4">

            <h3 className="text-md font-bold text-white">${pricePer24hrs} per 24hrs</h3>
            <form action="submit" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-4 items-center">
                    <div className="">
                        <DatePicker
                            required
                            {...register("checkIn", { required: "Check-in date is required" })}
                            selected={checkIn}
                            onChange={(date) => setValue("checkIn", date as Date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkIn}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-in Date"
                            className="min-w-full bg-white p-2 focus:outline-none rounded-sm"
                            wrapperClassName="min-w-full"
                        />
                        {errors.checkIn && <span className="text-red-500 text-sm">{errors.checkIn.message}</span>}
                    </div>
                    <div className="">
                        <DatePicker
                            required
                            {...register("checkOut", {
                                required: "checkOut date is required",
                                validate: (date) => date >= checkIn || "Check-out date must be after or on the day of check-in date"
                            })}
                            selected={checkOut < checkIn ? checkIn : checkOut}
                            onChange={(date) => setValue("checkOut", date as Date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={checkIn}
                            maxDate={maxDate}
                            placeholderText="Check-in Date"
                            className="min-w-full bg-white p-2 focus:outline-none rounded-sm"
                            wrapperClassName="min-w-full"
                        />
                        {errors.checkOut && <span className="text-red-500 text-sm">{errors.checkOut.message}</span>}
                    </div>
                    <div className="grid grid-flow-col justify-evenly">
                        <div className="flex flex-row gap-3 lg:items-center lg:mr-4">
                            <span className="text-white font-semibold text-base lg:mr-2">Adult</span>
                            <input
                                {...register("adults", { required: "Adult count is required" })}
                                className="min-w-fit p-1 focus:outline-none font-bold border-b focus:border-blue-700"
                                type="number"
                                min={1}
                                max={20}
                                value={adultCount}
                                onChange={(event) => setAdultCount(parseInt(event.target.value) || 0)}
                            />
                            {errors.adults && <span className="text-red-500 text-sm">{errors.adults.message}</span>}
                        </div>

                        {/* Children Input */}
                        <div className="flex flex-row gap-3 lg:items-center lg:mr-4">
                            <span className="text-white font-semibold text-base lg:mr-2">Children</span>
                            <input
                                {...register("children", { valueAsNumber: true })}
                                className="max-w-full p-1 focus:outline-none font-bold border-b focus:border-blue-700"
                                type="number"
                                min={0}
                                max={20}
                                value={childrenCount}
                                onChange={(event) => setChildrenCount(parseInt(event.target.value) || 0)}
                            />
                            {errors.children && <span className="text-red-500 text-sm">{errors.children.message}</span>}
                        </div>

                    </div>

                    <div className="flex justify-center">
                        {
                            isLogin ? <Link to={"/sign-in"} className=" bg-white text-blue-600 rounded-md text-xl font-semibold p-2  hover:text-white hover:bg-blue-800  hover:border-white border-2 " type="submit">Book Now</Link>
                                : <button className="bg-white text-blue-600 rounded-md text-xl font-semibold p-2  hover:text-white hover:bg-blue-800  hover:border-white border-2 " type="submit">Sign-In to Book</button>
                        }
                    </div>
                </div>
            </form>

        </div>
    )
}

export default GuestInfoForm