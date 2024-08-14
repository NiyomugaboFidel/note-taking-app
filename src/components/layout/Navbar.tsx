import Link from "next/link";
import { MdMenuBook } from "react-icons/md";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { LuPenSquare } from "react-icons/lu";
import { IoMdNotifications } from "react-icons/io";
const Navbar = ({ setSelected , selected}: { setSelected: (value: string) => void, selected:string }) => {

  const icons = [
    {
      lebal: "sidebar",
      icon: <BsReverseLayoutTextSidebarReverse/>
    },
    {
      lebal: "menubar",
      icon: <MdMenuBook />,
    },
    {
      lebal: "main",
      icon:  <LuPenSquare />,
    },
    {
      lebal: "main",
      icon: <IoMdNotifications /> ,
    },
  ];
  return (
    <div className="bg-primary-300 h-[8vh] z-10 w-full">
      <div className="w-full px-5 flex items-center justify-center h-full">
        <ul className="flex  gap-10 items-center justify-around w-full ">
          {icons.map((item, index) => (
            <li key={index} className={`${selected === item.lebal ? 'bg-primary-100 ': null} p-2 rounded-sm hover:bg-primary-100 text-bodyLarge transition-all ease-in-out duration-300`} onClick={() => setSelected(item.lebal)}>
               {item.icon}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
