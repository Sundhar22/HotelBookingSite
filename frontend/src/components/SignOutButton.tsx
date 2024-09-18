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
            className="hover:bg-gray-200 px-3 rounded bg-white font-bold text-sm md:text-base flex items-center text-blue-800 whitespace-nowrap">
            Sign Out
        </button>
    )
}
export default SignOutButton

