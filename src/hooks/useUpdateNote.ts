import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const useUpdateNote = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const updateNote = async ({ id, title, content, userId }: { id: string, title?: string, content?: string, userId: string }) => {
        if (!id || !userId || (!title && !content)) {
            toast.error("Please provide the required fields.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.put('/api/notes', { id, title, content, userId });
            const data = response.data;
            toast.success(data.message || "Note updated successfully.");
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

    return { loading, updateNote };
};

export default useUpdateNote;
