import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
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


    return (
        <div className=" grid grid-flow-row gap-8">
            <h1 className="text-xl font-semibold ">Sign In</h1>
            <form className="grid grid-flow-row gap-4 " onSubmit={onSubmit}>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    <span >Email</span>
                    <input type="email" className="border  mt-3 rounded w-full py-2 px-2 font-normal"
                        {...register("email", { required: "This field is required" })} />
                    {errors.email && <span className="text-red-500 font-bold">{errors.email.message}</span>}
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1">
                    <span>Password</span>

                    <input type="password" className="border mt-3 rounded w-full py-2 px-2 font-normal"
                        {...register("password", { required: "This field is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
                    {errors.password && <span className="text-red-500 font-bold">{errors.password.message}</span>}
                </label>

                <span className="flex gap-3 flex-row items-center ">
                    <button className=" justify-self-center max-w-fit bg-white text-blue-800 rounded-md text-xl font-semibold px-4 py-2  hover:text-white hover:bg-blue-800  hover:border-white border-2 " type="submit"  >Sign In</button>

                    <p>Don't You Have Account already?</p> <Link to={"/register"} className="underline ">Register here</Link>
                </span>

            </form>
        </div>
    )
}
export default SignIn;