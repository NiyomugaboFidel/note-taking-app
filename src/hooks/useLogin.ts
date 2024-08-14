"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { UserTypes } from "@/types/user";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useAuthContext } from "@/context/AuthContext";



const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { authUser, setAuthUser }: any = useAuthContext();
    const router = useRouter();

    const login = async ({ email, password }: UserTypes) => {
        if (!handlerError({ email, password })) return;
        setLoading(true);
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            const data = response.data;
            if (data.success) {
                router.push(`/home?userId=${data?.user?.id}`)
               }

            localStorage.setItem('data', JSON.stringify(data.user));
            localStorage.setItem('token', JSON.stringify(data.token));
            setAuthUser(data.user);
            toast.success(data.message);
            if (data.success) {
             router.push(`/home?userId=${data?.user?.id}`);
            }

        } catch (error: any) {
            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error?.replace(/[^a-zA-Z0-9]/g, '') ||
                error.message?.replace(/[^a-zA-Z0-9]/g, '');

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handlerError = ({ email, password }: { email: string, password: string }): boolean => {
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return false;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }
        return true;
    };
    return { loading, login };
};
export default useLogin;
