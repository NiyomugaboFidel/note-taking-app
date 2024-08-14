"use client";

import Link from "next/link";
import useGetNoteList from "@/hooks/useGetNoteList";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const SkeletonLoader = () => (
  <div className="bg-[#0e0e0e] h-[100vh] p-4 rounded-md">
    <div className="animate-pulse space-y-4">
      <div className="bg-gray-800 h-8 rounded w-1/3"></div>
      <div className="bg-gray-800 h-8 rounded w-2/3"></div>
      <div className="space-y-3">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-gray-800 h-16 rounded w-full"></div>
        ))}
      </div>
    </div>
  </div>
);

const Menubar = () => {
  const { loading, notes } = useGetNoteList();

  if (loading) {
    return<div className="flex flex-col gap-2"> <p>Loading <span className="text-Blue-400">...</span></p><SkeletonLoader /></div>
  }

  if (notes.length === 0) {
    return <div className="flex flex-col gap-2"> <p>Empety ...</p><SkeletonLoader /></div>
  }

  return (
    <div className="bg-[#0e0e0e] h-[100vh] rounded-md">
    <div>
      <div className="flex justify-between items-center px-2">
        <h4 className="text-bodyLarge font-semibold px-4 py-2">Personal</h4>
        <span className="text-bodyDefault font-semibold bg-primary-300 w-[40px] text-center hover:bg-primary-200 h-full p-1 rounded-full">
          {notes.length}
        </span>
      </div>
      <div className="flex items-center justify-start flex-col px-3 h-[85vh] transition-all ease-in-out duration-300 overflow-auto">
        {notes.map((item: any) => (
          <Link
            key={item._id}
            href={`/notes/${item._id}`}
            className="bg-primary-200 py-4 my-1 w-full rounded-[4px] shadow-sm px-2 hover:bg-[#000d] transition-all ease-in-out duration-300"
          >
            <h4 className="text-bodyLarge font-semibold text-start text-green-500">{item.title}</h4>
            <span className="flex items-start justify-start flex-col w-full">
              <time className="text-bodyDefault text-start font-serif text-gray-500">11/08/2024</time>
              <p
                className="text-bodyDefault line-clamp-1"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </span>
            <span className="flex gap-3 items-center justify-end">
              <CiEdit className="hover-icon" />
              <MdDelete className="text-Blue-400 hover-icon" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Menubar;
