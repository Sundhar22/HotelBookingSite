import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { HotelType } from "../../../../backend/src/shared/types";
import DetailsSection from "./DetailsSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import HotelTypes from "./HotelTypes";
import ImageSection from "./ImageSection";

export type HotelFormType = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePer24h: number;
    starRating: number;
    facilities: string[];
    imageUrls: string[];
    imageFiles: FileList;
    adultCounts: number;
    childrenCounts: number;
}

type props = {
    hotel?: HotelType,
    onSave(data: FormData): void,
    isLoading: boolean
}


const ManageHotelForm = ({ onSave, isLoading, hotel }: props) => {



    const formObjects = useForm<HotelFormType>();
    const { handleSubmit, reset } = formObjects;

    useEffect(() => {
        reset(hotel);
    }, [hotel, reset]);



    const onSubmit = handleSubmit(
        (data: HotelFormType) => {

            const formData = new FormData();

            if(hotel){
                formData.append("hotelId",hotel._id);
            }

            formData.append("name", data.name);
            formData.append("city", data.city);
            formData.append("country", data.country);
            formData.append("description", data.description);
            formData.append("type", data.type);
            formData.append("pricePer24h", data.pricePer24h.toString());
            formData.append("starRating", data.starRating.toString());
            formData.append("adultCounts", data.adultCounts.toString());
            formData.append("childrenCounts", data.childrenCounts.toString());
            data.facilities.forEach((facility, i) => {
                formData.append(`facilities[${i}]`, facility);
            });

            if (data.imageUrls) {
                data.imageUrls.forEach((url,index)=>{
                    formData.append(`imageUrls[${index}]`,url);
                })
            }

            Array.from(data.imageFiles).forEach((image) => {
                formData.append(`images`, image);
            });
            onSave(formData);

        }
    )


    return <FormProvider {...formObjects}>
        <form className="grid gap-10" onSubmit={onSubmit}>
            <DetailsSection />
            <HotelTypes />
            <FacilitiesSection />
            <GuestSection />
            <ImageSection />
            <span>
                <button disabled={isLoading} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400">{isLoading ? "Saving..." : "Save"}</button>
            </span>
        </form>
    </FormProvider>
}
export default ManageHotelForm;