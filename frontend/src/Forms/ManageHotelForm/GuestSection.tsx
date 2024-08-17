import { useFormContext } from "react-hook-form";
import { HotelFormType } from "./ManageHotelForm";


const GuestSection = () => {

    const { register, formState: { errors } } = useFormContext<HotelFormType>();

    return (
        <div className="">
            <h1 className="font-bold text-xl mb-2">Guests</h1>

            <div className="grid grid-cols-2 rounded-md bg-gray-300 p-5">

                <div >
                    <label className="grid max-w-[95%] gap-1">
                    <span>Adults</span>
                    <input {...register("adultCount", {
                        required: "This field is required",
                        min: { value: 1, message: "At least 1 adult must be present" }
                    })} className="border rounded-md text-gray-700 outline-none px-1 py-0.5 " type="number" min={1} />
                    
                    </label>
                    
                    {errors.adultCount && <span className="text-red-400 font-bold">{errors.adultCount.message}</span>}
                </div>

                <div >
                    <label className="grid max-w-[95%] gap-1">
                    <span>Children</span>
                    <input {...register("children", {
                        required: "This field is required",
                        min: { value: 0, message: "Minimum 0 children allowed" }
                    })} className="border rounded-md text-gray-700 outline-none px-1 py-0.5 " type="number" min={0} />
                
                    </label>
                    
                        {errors.children && <span className="text-red-400 font-bold">{errors.children.message}</span>}

                </div>


            </div>


        </div>

    );

}
export default GuestSection;

