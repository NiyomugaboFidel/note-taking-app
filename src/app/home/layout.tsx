"use client"
import Navbar from "@/components/layout/Navbar";
import { useState } from "react";

export default function HomeLayout({
  children,
  sidebar,
  menubar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  menubar: React.ReactNode;
}) {
   const [selected, setSelected] = useState('menubar') 

  return (
    <>
      <div className=" h-full  flex justify-center items-start gap-2 w-full bg-primary-300 ">
        <aside className={`${selected === 'sidebar'? 'block' : 'hidden'} md:w-2/8 md:block w-full overflow-hidden h-[100vh] bg-primary-300 lg:w-1/5 `}>
          {sidebar }
        </aside>

        <aside className={`${selected === 'menubar'? 'block' : 'hidden'} h-[100vh] lg:block w-full  lg:w-2/6 `}>
          {menubar}
        </aside>

        <main className={` ${selected === 'main'? 'block' : 'hidden'}  h-[100vh] lg:block bg-primary-100 w-full lg:w-3/6 main   `}>
          {children}
        </main>
      </div>
      <nav className="flex z-10 lg:hidden fixed bottom-0    w-full">
        <Navbar setSelected={setSelected} selected={selected} />
      </nav>
    </>
  );
}
