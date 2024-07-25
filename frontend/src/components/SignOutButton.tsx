import { useMutation, useQueryClient } from "react-query";
import * as api from "../api-client";
import { UseAppContext } from "../context/AppContext";
const SignOutButton = () => {
    const query = useQueryClient();
    const { showToast } = UseAppContext();
    const mutate = useMutation(api.signOut, {
        onSuccess: async () => {

            await query.invalidateQueries('validateToken')

            showToast({ message: "SignOut successfully", type: "SUCCESS" })
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }

    })
    return (

        <button
            onClick={
                () => {
                    mutate.mutate()
                }
            }
            className="hover:bg-gray-200 px-5 rounded bg-white font-bold flex items-center text-blue-600">
            Sign Out
        </button>
    )
}
export default SignOutButton