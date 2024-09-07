import {  useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import * as api from "../api-client";
import ManageHotelForm from "../Forms/ManageHotelForm/ManageHotelForm";
import { UseAppContext } from "../context/AppContext";

const EditHotel = () => {
    const { hotelId } = useParams();
    const {showToast}=UseAppContext();
    const { data: myHotel } = useQuery<HotelType>(
        "fetchMyHotelIdData",
        () => api.getHotel(hotelId as string),
        {
            enabled: !!hotelId
        }
    );

    
    const {mutate,isLoading} = useMutation(api.updatedHotel,{
        onSuccess: () => {
            showToast({ message: "Hotel updated successfully", type: "SUCCESS" })
        },

        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    })


    const handleSave =(data:FormData)=>{

        mutate(data);

    }




    return <ManageHotelForm hotel={myHotel} isLoading={isLoading} onSave={handleSave}/>;
};

export default EditHotel;