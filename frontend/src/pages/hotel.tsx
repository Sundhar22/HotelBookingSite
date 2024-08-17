
import { UseAppContext } from "../context/AppContext";
import ManageHotelForm from "../Forms/ManageHotelForm/ManageHotelForm";
import { useMutation } from "react-query";
import * as api from '../api-client';
 const AddHotel =()=>{

    const { showToast } = UseAppContext();

    const {mutate,isLoading} = useMutation(api.addHotel, {

        onSuccess: () => {
            showToast({ message: "Hotel added successfully", type: "SUCCESS" })
        },

        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    })

    const handleSave = (data: FormData) => {
        mutate(data);
    }


    return (<ManageHotelForm  onSave={handleSave} isLoading={isLoading}/>)
}
export default AddHotel;