import { FormProvider, useForm } from "react-hook-form";
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
    imageFiles: FileList;
    adultCount: number;
    children: number;
}

type props ={
    onSave(data: FormData) :void,
    isLoading: boolean

}


const ManageHotelForm = ({onSave,isLoading}:props) => {

    

    const formObjects = useForm<HotelFormType>();
    const { handleSubmit } = formObjects;
    const onSubmit = handleSubmit(
        (data: HotelFormType) => {

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("city", data.city);
            formData.append("country", data.country);
            formData.append("description", data.description);
            formData.append("type", data.type);
            formData.append("pricePer24h", data.pricePer24h.toString());
            formData.append("starRating", data.starRating.toString());
            formData.append("adultCounts", data.adultCount.toString());
            formData.append("childrenCounts", data.children.toString());
            data.facilities.forEach((facility,i) => {
                formData.append(`facilities${[i]}`, facility);
            });
            Array.from(data.imageFiles).forEach((image) => {
                formData.append("images", image);
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
                <button disabled = {isLoading} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400">{isLoading?"Saving...":"Save"}</button>
            </span>
        </form>
    </FormProvider>
}
export default ManageHotelForm;