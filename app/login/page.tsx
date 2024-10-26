"use client";

import { authenticate } from "@/auth_lib";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

const Login = () => {
    const [error, dispatch] = useFormState(authenticate, undefined);

    return (
        <main className="flex h-screen w-screen flex-col items-center justify-center bg-blue-100">
            <div className="mx-4 flex flex-col items-start rounded-md bg-white p-4">
                <h1>Login</h1>
                <form className="mt-4 max-w-[600px]" action={dispatch}>
                    <input
                        required
                        className="product-input w-full"
                        type="email"
                        name="email"
                        placeholder="Input email"
                    />
                    <input
                        required
                        className="product-input mt-2 w-full"
                        type="password"
                        name="password"
                        placeholder="Input password"
                    />
                    <SubmitButton />
                </form>
                <span className="mt-4 self-center">
                    {"Don't"} have an account?{" "}
                    <Link
                        href={"/register"}
                        className="cursor-pointer font-semibold text-blue-500 underline"
                    >
                        Register
                    </Link>
                </span>
                {error && (
                    <span className="mt-2 text-sm font-normal text-red-500">
                        {error.message}
                    </span>
                )}
            </div>
        </main>
    );
};

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            aria-disabled={pending}
            className={
                "btn-filled-primary mt-4 w-full " +
                (pending ? "bg-slate-400 hover:bg-slate-400" : "")
            }
        >
            Login
        </button>
    );
};

export default Login;
