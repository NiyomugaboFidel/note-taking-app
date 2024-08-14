import axios from "axios";
import toast from "react-hot-toast";
import { NotesTypes } from "@/types/notesTypes";
import { useState } from "react";
import useGetNoteList from "./useGetNoteList";

const useCreateNote = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setNotes } = useGetNoteList();

    const createNote = async ({ title, content, userId }: NotesTypes) => {
        if (!handlerError({ title, content, userId })) return;

        setLoading(true);

        try {
            const response = await axios.post('/api/notes', { title, content, userId });
            const data = response.data;
            // Update notes list in useGetNoteList hook
            setNotes(prev => [...prev, data.note]);
            toast.success(data.message);
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

    const handlerError = ({ title, content, userId }: NotesTypes): boolean => {
        if (!userId) {
            toast.error("Your credentials are not ready, please log in again");
            return false;
        }
        if (!title || !content) {
            toast.error("Please fill in all fields");
            return false;
        }

        return true;
    };

    return { loading, createNote };
};

export default useCreateNote;
