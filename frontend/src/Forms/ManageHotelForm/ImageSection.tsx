import { useFormContext } from "react-hook-form";
import { HotelFormType } from "./ManageHotelForm";



const ImageSection = () => {


    const { register, formState: { errors } } = useFormContext<HotelFormType>();

    return (
        <div className="">

            <h1 className="font-bold text-xl mb-2">Images</h1>

            <div className="border p-2">
                <input type="file"
                    multiple
                    accept="image/*"

                    {...register("imageFiles", {
                        required: "At least one image is required",
                        validate: (value) => {
                            if (value.length > 6) {
                                return "Maximum 6 images allowed"
                            }
                            return true;
                        }
                    })}


                />

            </div>

            {errors.imageFiles && <p className="text-red-500 text-lg">{errors.imageFiles.message}</p>}

        </div>
    )

}

export default ImageSection;

