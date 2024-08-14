"use client"
import axios from "axios";
import toast from "react-hot-toast";
import { UserTypes } from "@/types/user";
import { useState } from "react";
import { useRouter } from "next/navigation";

const useSignup = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const signup = async ({ username, email, password }: UserTypes) => {
        if (!handlerError({ username, email, password })) return;

        setLoading(true);

        try {
            const response = await axios.post('/api/auth/register', { username, email, password });
            const data = response.data;
            console.log(data);
            toast.success(data.message);
            router.push('/login')
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 
                error.response?.data?.error?.replace(/[^a-zA-Z0-9]/g, '') || 
                error.message?.replace(/[^a-zA-Z0-9]/g, '');

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handlerError = ({ username, email, password }: UserTypes): boolean => {
        if (!username || !email || !password) {
            toast.error("Please fill in all fields");
            return false;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }

        return true;
    };

    return { loading, signup };
};

export default useSignup;
