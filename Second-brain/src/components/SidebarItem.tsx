import { ReactElement } from "react";

interface SidebarItemProps {
  title: string;
  startIcon: ReactElement;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ 
  title, 
  startIcon, 
  isActive = false, 
  onClick 
}: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center px-4 py-3 rounded-lg
        transition-all duration-200 group
        ${isActive 
          ? 'bg-purple-50 text-purple-600' 
          : 'text-gray-700 hover:bg-gray-50'
        }
      `}
    >
      <div className={`
        transition-colors duration-200
        ${isActive 
          ? 'text-purple-600' 
          : 'text-gray-500 group-hover:text-purple-600'
        }
      `}>
        {startIcon}
      </div>
      
      <span className={`
        ml-3 font-medium capitalize
        ${isActive 
          ? 'text-purple-600' 
          : 'text-gray-700 group-hover:text-purple-600'
        }
      `}>
        {title}
      </span>

      {isActive && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-600" />
      )}
    </button>
  );
};

export default SidebarItem;