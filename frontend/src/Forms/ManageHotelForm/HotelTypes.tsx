import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormType } from "./ManageHotelForm";


const HotelTypes = () => {

    const { register, watch, formState: { errors } } = useFormContext<HotelFormType>();

    const watchInput = watch("type");

    return (

        <div className="grid gap-5">
            <h1 className="h-1 font-bold text-xl mb-3">Type</h1>
            <div className="grid grid-cols-5 gap-2">
                {hotelTypes.map((type, index) => (
                    <label
                        key={index}
                        className={watchInput === type
                            ? "text-gray-700 text-sm font-bold flex gap-2 rounded-full cursor-pointer bg-blue-200 px-5 py-2"
                            : "text-gray-700 text-sm font-bold flex gap-2 rounded-full cursor-pointer bg-gray-200 px-5 py-2"
                        }
                    >

                        <input
                            type="radio"
                            value={type}
                            {...register("type", { required: "This felid required" })}
                            className="hidden"
                        >
                        </input>
                        <span>{type}</span>

                    </label>
                ))}
            </div>
            {errors.type && <span className="text-red-400 font-bold">{errors.type.message}</span>}

        </div>

    )

}

export default HotelTypes;