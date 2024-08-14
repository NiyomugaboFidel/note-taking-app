import { useAuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetNoteList = () => {
    const [notes, setNotes] = useState<object[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { authUser }: any = useAuthContext();

    useEffect(() => {
        const getNotesList = async () => {
            if (!authUser || !authUser.id) {
                return;
            }

            setLoading(true);
            try {
                const res = await axios.get('/api/notes', {
                    params: { userId: authUser.id },
                });
                const data = res.data;
                setNotes(data.notes);
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

        getNotesList();
    }, [authUser ,authUser?.id]); // authUser?.id is already included as a dependency

    return { loading, notes, setNotes };
};

export default useGetNoteList;
