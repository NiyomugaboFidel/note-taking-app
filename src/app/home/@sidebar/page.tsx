"use client";
import { IoDocumentsOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import { FaFolderPlus } from "react-icons/fa";
import Image from "next/image";
import useGetNoteList from "@/hooks/useGetNoteList";
import Link from "next/link";

const SkeletonLoader = () => (
  <div className="h-full bg-primary-300 py-2">
        <div className="flex items-center justify-center flex-col w-full px-1">
          <div className="flex justify-between items-center w-full px-2">
            {/* Skeleton for logo */}
            <div className="w-full flex items-center justify-start">
              <div className="w-[40px] h-[40px] bg-gray-700 rounded-full animate-pulse"></div>
            </div>
            {/* Skeleton for new note button */}
            <div className="w-full">
              <div className="rounded-sm py-2 text-center w-[150px] bg-gray-700 animate-pulse"></div>
            </div>
          </div>

          {/* Skeleton for search bar */}
          <div className="w-full flex mt-4  rounded-full items-center justify-center px-2 mx-4">
            <div className="h-[48px] w-full bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="py-1">
          {/* Skeleton for Recents section */}
          <div className="py-2 bg-[#0e0e0e] my-2 rounded-md">
            <div className="px-4 h-[20px] bg-gray-700 rounded-full animate-pulse"></div>
            <div className="overflow-y-auto px-1 h-[40vh] mt-2">
              <ul className="flex flex-col font-sans justify-center items-start">
                {[...Array(5)].map((_, index) => (
                  <li key={index} className="rounded-sm w-full bg-gray-700 my-1 animate-pulse h-[40px]"></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skeleton for Folders section */}
          <div className="overflow-y-auto bg-[#0e0e0e] rounded-lg py-2 px-1 h-[40vh]">
            <div className="px-4 h-[20px] bg-gray-700 rounded-full animate-pulse mb-2"></div>
            <ul className="flex flex-col font-sans justify-center items-start w-full">
              {[...Array(3)].map((_, index) => (
                <li key={index} className="rounded-sm w-full bg-gray-700 my-1 animate-pulse h-[40px]"></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
);
const Sidebar = () => {
  const { loading, notes } = useGetNoteList();

  if (loading) {
    return<div className="flex flex-col gap-2"> <p>Loading <span className="text-Blue-400">...</span></p><SkeletonLoader /></div>
  }

  if (notes.length === 0) {
    return <div className="flex flex-col gap-2"> <p>Empety ...</p><SkeletonLoader /></div>
  }
  return (
    <div className="h-full bg-primary-300 py-2">
      <div className="flex items-center justify-center flex-col w-full px-1">
        <div className="flex justify-between items-center w-full px-2">
          {/* logo */}
          <div className="w-full flex items-center justify-start">
            <Image
              height={100}
              width={100}
              className="w-[40px]"
              src="./notefy-logo.svg"
              alt=""
            />
          </div>
          {/* new note */}
          <div className="w-full">
            <button className="rounded-sm py-2 text-center w-[150px] bg-[#0e0e0e] gap-2 flex items-center justify-center">
              <FaPlus />
              <p className="text-center text-bodyDefault">New Note</p>
            </button>
          </div>
        </div>

        <div className="w-full flex mt-4 border rounded-full items-center justify-center px-2 mx-4">
          <input
            placeholder="Search your note"
            className="h-full border-none outline-none text-bodySmall py-3 p-1 w-full placeholder:px-1 bg-transparent"
            type="text"
          />
          <IoSearch className="text-[20px]" />
        </div>
      </div>
      <div className="py-1">
        <div className="py-2 bg-[#0e0e0e] my-2 rounded-md">
          <p className="px-4 hover:underline transition-all ease-in-out cursor-pointer text-start text-bodyDefault text-customSilver-dark">
            Recents
          </p>
          <div className="overflow-y-auto px-1 h-[40vh] w-full">
            <ul className="flex flex-col font-sans justify-center items-start w-full">
              {notes.map((item: any) => (
                <Link key={item._id} href={`/notes/${item._id}`}>
                  <li className="rounded-sm w-full bg-black my-1 hover:bg-Blue-400 flex items-center py-2 px-2 justify-start gap-2">
                    <IoDocumentsOutline className="text-bodyLarge d" />
                    <p className="text-bodyDefault font-semibold w-full text-[#ccc] line-clamp-1">
                      {item.title}
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>

        <div className="overflow-y-auto bg-[#0e0e0e] rounded-lg py-2 px-1 h-[40vh]">
          <span className="px-4 hover:underline text-bodyDefault text-customSilver-dark flex justify-between items-center">
            <p>Folders</p>
            <FaFolderPlus className="text-bodyLarge" />
          </span>
          <ul className="flex flex-col font-sans justify-center items-start w-full">
            <li className="rounded-sm bg-black my-1 hover:bg-Blue-400 flex items-center py-2 px-2 justify-start w-full gap-2">
              <FaFolderOpen className="text-bodyLarge d" />
              <p className="w-full overflow-hidden text-bodyDefault font-semibold text-[#aaa] line-clamp-1">
                Reflection on the Month of June
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
