import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";

const useDeleteNote = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { authUser }: any = useAuthContext();


    const deleteNote = async ({ id, userId }: { id: string, userId: string }) => {
        // if (!id || !userId) {
        //     toast.error("Please provide the required fields.");
        //     return;
        // }

        setLoading(true);

        try {
            const response = await axios.delete('/api/notes', {
                params: { id, userId },
            });
            const data = response.data;
            toast.success(data.message || "Note deleted successfully.");
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                error.response?.data?.error?.replace(/[^a-zA-Z0-9]/g, '') ||
                error.message?.replace(/[^a-zA-Z0-9]/g, '');

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { loading, deleteNote };
};

export default useDeleteNote;
