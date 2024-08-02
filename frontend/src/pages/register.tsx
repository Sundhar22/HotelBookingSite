import { useForm } from "react-hook-form";
import {  useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../api-client";
import { UseAppContext } from "../context/AppContext";

export type RegisterType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}


const Register = () => {
    const query = useQueryClient();
    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterType>();

    const { showToast } = UseAppContext();

    const navigate = useNavigate();

    const onSubmit = handleSubmit(
        (data) => {
            mutation.mutate(data);
        }
    )

    const mutation = useMutation(api.register, {
        onSuccess: async () => {
            showToast({ message: "Account created successfully", type: "SUCCESS" });
            await query.invalidateQueries('validateToken')
            navigate('/')
        },
        onError: (errors: Error) => {
            showToast({ message: errors.message, type: "ERROR" })
        }
    });

    return (

        <form className="flex flex-col gap-5 " onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create an Account</h2>
            <div className="flex flex-col  md:flex-row gap-5">

                <label className="text-gray-700 text-sm font-bold flex-1">
                    <span>FullName</span>
                    <input type="text" className="border rounded w-full py-1 px-2 font-normal"

                        {...register("firstName", { required: "This field is required" })} />
                    {errors.firstName && <span className="text-red-500 font-bold">{errors.firstName.message}</span>}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    <span>LastName</span>
                    <input type="text" className="border rounded w-full py-1 px-2 font-normal"
                        {...register("lastName", { required: "This field is required" })} />
                    {errors.lastName && <span className="text-red-500 font-bold">{errors.lastName.message}</span>}
                </label>

            </div>

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

            <label className="text-gray-700 text-sm font-bold flex-1">
                <span>Confirm Password</span>
                <input type="password" className="border rounded w-full py-1 px-2 font-normal"
                    {...register("confirmPassword", {
                        validate: value => {
                            if (value === null || value === "") return "Please confirm your password";
                            else if (value !== watch("password")) return "Passwords do not match";
                            // else return true;
                        }
                    })} />
                {errors.confirmPassword && <span className="text-red-500 font-bold">{errors.confirmPassword.message}</span>}
            </label>
            <span>
                <button type="submit" className="bg-blue-500 text-white py-2 px-5 rounded">Register</button>
            </span>
            <span className="flex gap-1">
                <p>Do You Have Account already?</p> <Link to={"/sign-in"} className="underline ">Sign in here</Link>
            </span>
        </form>

    );

}
export default Register;