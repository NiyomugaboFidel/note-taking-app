"use client";
import Button from "@/components/common/Button";
import Input from "@/components/forms/inputField";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import useLogin from "@/hooks/useLogin";
import toast from "react-hot-toast";
import Image from "next/image";

const LoginPage = () => {
    const [inputs, setInputs] = useState({ email: '', password: '' });
    const { loading, login } = useLogin();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!inputs.email || !inputs.password) {
            return toast.error("Please fill in all fields.");
        }

        try {
            await login(inputs);
            setInputs({ email: '', password: '' });
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className="h-full w-full bg-white">
            <div className="flex flex-col items-center gap-2 bg-white justify-center w-full h-full px-2 pt-[2rem]">
                <div className="py-2">
                    <Image height={100} width={100} src="/notefy-logo.svg" alt="Notefy Logo" />
                </div>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-primary-300 font-serif text-bodyLarge md:text-display4 text-center font-bold">
                        Welcome to notefy Community <br /> Of Users
                    </h2>
                    <div className="py-2 px-2 w-full h-full">
                        <Input
                            type="email"
                            label="Email"
                            placeholder="example@gmail.com"
                            value={inputs.email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setInputs({ ...inputs, email: e.target.value })
                            }
                        />
                        <Input
                            type="password"
                            label="Password"
                            placeholder="******"
                            value={inputs.password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setInputs({ ...inputs, password: e.target.value })
                            }
                        />
                    </div>
                    <Button type="submit" label={loading ? 'Login...' : 'Login'} disabled={loading} />
                    <p className="text-bodySmall py-2 text-center text-primary-300">
                        Don&apos;t you have an account? 
                        <Link className="px-1 text-blue-400 underline" href='/signup'>Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
