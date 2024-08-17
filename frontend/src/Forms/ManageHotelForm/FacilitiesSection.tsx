import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormType } from "./ManageHotelForm";



const FacilitiesSection = () => {

    const { register, formState: { errors } } = useFormContext<HotelFormType>();

    return (
        <div>
            <h1 className="font-bold text-xl mb-2">Facilities</h1>
            <div className="grid grid-cols-5 ">

                {

                    hotelFacilities.map((facility, index) => (
                        <label key={index} className="flex  gap-3 items-center text-gray-700 text-lg">
                            <input className="size-4" type="checkbox" value={facility} {...register("facilities", {
                                validate: (value) => {
                                    if (value.length === 0) {
                                        return "Please select at least one facility"
                                    }
                                    return true;
                                }
                            })} />
                            {facility}
                        </label>
                    ))

                }
            </div>

            {errors.facilities && <p className="text-red-500 text-lg">{errors.facilities.message}</p>}
        </div>
    )

}

export default FacilitiesSection;