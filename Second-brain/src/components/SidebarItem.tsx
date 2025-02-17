import { ReactElement } from "react";

interface SidebarItemProps {
      title: string;
      startIcon: ReactElement;
}
  const SidebarItem = ({ title,startIcon}:SidebarItemProps) => {
  return (
    <div className="flex items-center  text-gray-700 py-2 cursor-pointer hover:bg-gray-300 rounded-md max-w-48 pl-4 transition-all duration-150"> 
      <div className=" pr-2 py"> 
        {startIcon} </div>
      <div className=" pr-2 py">
        {title}</div>
    </div>
  )
}
  
export default SidebarItem