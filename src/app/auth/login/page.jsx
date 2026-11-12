"use client";
import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";

const Login = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = async (info) => {
        const { data, error } = await authClient.signIn.email({
            email: info.email,
            password: info.password,
            rememberMe: true,
            callbackURL: "/"
        });
        console.log("signup page ", { data, error });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 p-6 max-w-sm">
            <h2 className="text-xl mb-5 font-semibold">Signin Here !!</h2>

            <label>Email : </label>
            <input
                type="email"
                className="w-[250px] border px-2 py-1 rounded"
                {...register("email", { required: "Email address is required" })}
                aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p role="alert" className="text-red-500 text-sm">{errors.email.message}</p>}

            <label>Password : </label>
            <input
                type="password"
                className="w-[250px] border px-2 py-1 rounded"
                {...register("password", { required: "Password is required" })}
                aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && <p role="alert" className="text-red-500 text-sm">{errors.password.message}</p>}

            <input
                type="submit"
                value="login"
                className="w-[250px] mt-2 bg-blue-600 text-white py-1 rounded cursor-pointer hover:bg-blue-700"
            />
        </form>
    );
};

export default Login;
