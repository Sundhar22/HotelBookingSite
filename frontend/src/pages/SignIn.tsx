import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as api from '../api-client';
import { UseAppContext } from "../context/AppContext";
export type SignInFormData = {
    email: string;
    password: string;
}
const SignIn = () => {
    const
        { register, formState: { errors }, handleSubmit } = useForm<SignInFormData>();

    const { showToast } = UseAppContext();
    const navigate = useNavigate();
    const query = useQueryClient();
    const mutation = useMutation(api.signIn, {
        onError: (e: Error) => {
            showToast({ message: e.message, type: "ERROR" })
        },
        onSuccess: async () => {
            showToast({ message: "Successfully loggedIn", type: "SUCCESS" })
            await query.invalidateQueries('validateToken')
            navigate('/')
        }
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    8
    return (
        <>
            <h1>Sign In</h1>
            <form onSubmit={onSubmit}>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    <span>Email</span>
                    <input type="email" className="border rounded w-full py-1 px-2 font-normal"
                        {...register("email", { required: "This field is required" })} />
                    {errors.email && <span className="text-red-500 font-bold">{errors.email.message}</span>}
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1">
                    <span>Password</span>
                    <input type="password" className="border rounded w-full py-1 px-2 font-normal"
                        {...register("password", { required: "This field is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
                    {errors.password && <span className="text-red-500 font-bold">{errors.password.message}</span>}
                </label>

                <button type="submit"  >SignIn</button>
            </form>
        </>
    )
}
export default SignIn;