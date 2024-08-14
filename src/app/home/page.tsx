"use client";

import { useState } from 'react';
import Input from "@/components/forms/inputField";
import toast from "react-hot-toast";
import TextEditor from '@/components/common/TextEditor';
import useCreateNote from '@/hooks/useCreateNote';
import { useAuthContext } from '@/context/AuthContext';

const HomePage = () => {
  const [editorData, setEditorData] = useState<string>("");
  const [inputs, setInputs] = useState({ title: "", content: "" });
  const { authUser }: any = useAuthContext();
  const { createNote } = useCreateNote();
  const [loading, setLoading] = useState<boolean>(false);

  const handleEditorUpdate = (content: string) => {
    setEditorData(content);
    setInputs(prevInputs => ({ ...prevInputs, content }));
  };

  const handleUpdateClick = async () => {
    const userId = authUser?.id;

    if (!inputs.title || !inputs.content) {
      return toast.error("Please fill in all fields.");
    }

    setLoading(true);
    await createNote({ title: inputs.title, content: inputs.content, userId });
    setInputs({ title: "", content: "" });
    setEditorData('');
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="h-full bg-primary-300">
        <div className="flex flex-col justify-start items-center">
          <div className="bg-[#0e0e0e] py-6 px-4 rounded-lg shadow-lg max-w-3xl w-full animate-pulse">
            <div className="h-8 bg-gray-700 rounded mb-6 w-1/3"></div>
            <div className="h-12 bg-gray-700 rounded mb-6 w-full"></div>
            <div className="h-64 bg-gray-800 rounded mb-6 w-full"></div>
            <div className="flex justify-end">
              <div className="h-10 bg-blue-700 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-primary-300">
      <div className="flex flex-col justify-start items-center">
        <div className="bg-[#0e0e0e] py-6 px-4 rounded-lg shadow-lg max-w-3xl w-full">
          <h1 className="text-bodyLarge font-semibold px-2 mb-4 text-white">Custom Text Editor</h1>
          
          <div className="mb-4">
            <Input
              type="text"
              onChange={(e) => setInputs(prevInputs => ({ ...prevInputs, title: e.target.value }))}
              label=""
              value={inputs.title}
              placeholder="Write Title"
              className="bg-primary-100 p-3 rounded-sm w-full outline-none text-bodyLarge font-mono"
            />
          </div>
          
          <div className="relative mb-4">
            <div className="quill-editor-container bg-primary-100 p-2 rounded-md shadow-inner max-h-96 overflow-auto">
              <TextEditor initialValue={editorData} onUpdate={handleEditorUpdate} />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleUpdateClick}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded shadow-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
