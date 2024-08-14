"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

const NotePage = ({ params }: { params: { id: string } }) => {
  const { id } = useParams();
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`/api/notes/note/`, {
          params: { id: params.id },
        });
        setNote(response.data.note);
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

    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#0e0e0e] min-h-screen p-8 flex items-center justify-center">
        <div className="max-w-4xl mx-auto bg-[#1c1c1c] rounded-md p-6 shadow-lg grid grid-cols-1 gap-6 animate-pulse">
          <div className="h-10 bg-gray-700 rounded w-3/4"></div>
          <div className="h-6 bg-gray-700 rounded w-full"></div>
          <div className="h-6 bg-gray-700 rounded w-full"></div>
          <div className="h-6 bg-gray-700 rounded w-5/6"></div>
          <div className="h-6 bg-gray-700 rounded w-4/5"></div>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Note not found.</div>
      </div>
    );
  }

  return (
    <div className="bg-[#0e0e0e] min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-[#1c1c1c] rounded-md p-6 shadow-lg grid grid-cols-1 gap-6">
        <h1 className="text-4xl font-semibold text-green-500">{note.title}</h1>
        <div
          className="text-base text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
      </div>
    </div>
  );
};

export default NotePage;
