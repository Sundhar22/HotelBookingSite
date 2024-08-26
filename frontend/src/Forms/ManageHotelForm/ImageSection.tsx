import React from "react";
import { useFormContext } from "react-hook-form";
import { HotelFormType } from "./ManageHotelForm";



const ImageSection = () => {


    const { register, formState: { errors }, watch, setValue } = useFormContext<HotelFormType>();


    const existingImages = watch("imageUrls");

    const handleDelete = (imgUrl: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setValue("imageUrls", existingImages.filter((url) => url != imgUrl));
    }


    return (
        <div >

            <h1 className="font-bold text-xl mb-2">Images</h1>


            {
                existingImages && <div className="grid grid-cols-6 gap-4" >
                    {
                        existingImages.map((urls, i) => {
                            return (
                                <div className="relative group">
                                    <img key={i} src={urls} alt="hotel-image" className="min-h-full object-cover">
                                    </img>
                                    <button
                                        onClick={(event) => handleDelete(urls, event)}
                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white">
                                        delete
                                    </button>
                                </div>
                            )
                        })
                    }

                </div>
            }
            <div className="border p-2 mt-16">
                <input type="file"
                    multiple
                    accept="image/*"

                    {...register("imageFiles", {

                        validate: (imageFiles) => {

                            const value = imageFiles.length + (existingImages?.length || 0);
                            if (value > 6) {
                                return "Maximum 6 images allowed"
                            }
                            if (value === 0) {
                                return "At least one image is required";
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

