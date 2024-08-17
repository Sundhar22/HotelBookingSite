import { useFormContext } from "react-hook-form";
import { HotelFormType } from "./ManageHotelForm";



const DetailsSection = () => {

    const { register, formState: { errors } } = useFormContext<HotelFormType>();

    return (

        <div className="flex flex-col gap-4">
            <h1 className="h-1 font-bold text-xl mb-3">
                Add Hotel
            </h1>
            <div>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    <span> Name</span>
                    <input className="border w-full py-1 px-2 font-normal rounded" type="text" placeholder="HotelName"

                        {...register("name", { required: "This field is required" })}>
                    </input>
                </label>
                {errors.name && <span className="text-red-400 font-bold">{errors.name.message}</span>}
            </div>
            <div className="grid grid-cols-2 justify-between gap-4">
                <div>
                    <label className="text-gray-700 text-sm font-bold flex-1">
                        <span>City</span>
                        <input className="border w-full py-1 px-2 font-normal rounded" type="text" placeholder="city"

                            {...register("city", { required: "This field is required" })}>
                        </input>
                    </label>
                    {errors.city && <span className="text-red-400 font-bold">{errors.city.message}</span>}
                </div>
                <div>
                    <label className="text-gray-700 text-sm font-bold flex-1">
                        <span> Country</span>
                        <input className="border w-full py-1 px-2 font-normal rounded" type="text" placeholder="country"

                            {...register("country", { required: "This field is required" })}>
                        </input>
                    </label>
                    {errors.country && <span className="text-red-400 font-bold">{errors.country.message}</span>}
                </div>
            </div>
            <div >
                <label className="text-gray-700 text-sm font-bold flex-1">
                    <span> Description</span>
                    <textarea className="border w-full py-1 px-2 font-normal rounded" placeholder="Enter an Description"
                        rows={10}
                        {...register("description", { required: "This field is required" })}>
                    </textarea>
                </label>
                {errors.description && <span className="text-red-400 font-bold">{errors.description.message}</span>}
            </div>

            <div>
                <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                    <span>PricePer24h</span>

                    <input min={1} type="number" className="border w-full py-1 px-2 font-normal rounded" placeholder="pricePer24h" {...register("pricePer24h", {
                        required: "This field is required"
                    })} />
                </label>
                {errors.pricePer24h && <span className="text-red-400 font-bold">{errors.pricePer24h.message}</span>}

            </div>

            <div>
                <label className="text-gray-700 text-sm font-bold max-w[50%] ">
                    <span> StarRating</span>

                    <select
                        className="border rounded w-full p-2 text-gray-700 font-normal"

                        {...register("starRating", {
                            required: "This felid required"
                        })}>
                        <option className="text-sm font-bold">
                            Select Star Below
                        </option>

                        {[1, 2, 3, 4, 5].map((num ,index) => (<option key={index} value={num}>
                            {num}
                        </option>))}

                    </select>

                </label>
                {errors.starRating&&<span className="text-red-400 font-bold">{errors.starRating.message}</span>}


            </div>
        </div>

    );



}

export default DetailsSection;