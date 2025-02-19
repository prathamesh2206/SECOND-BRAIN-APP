import { ReactElement } from "react";

interface ButtonProps {
    variant:'primary'|'secondary';
    text:string;
    startIcon?:ReactElement;
    onClick?:()=>void;
    widthFull?:boolean;
    loading?:boolean;
}
const variantClasses={
    primary:'bg-purple-600 hover:bg-purple-700 text-white shadow-sm',
    secondary:'bg-purple-100 hover:bg-purple-200 text-purple-600 border border-purple-200'
}
const basicStyles ='px-4 py-2 rounded-lg font-medium flex items-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'
const Button = (
    {variant,text,startIcon,onClick,widthFull,loading}:ButtonProps) => {
  return (
    <button onClick={onClick} className={`${variantClasses[variant]} ${basicStyles} ${widthFull ? ' w-full justify-center' : ''} ${loading ? ' opacity-70 cursor-not-allowed' : ''}`} disabled={loading}>
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
          Loading...
        </div>
      ) : (
        text
      )}
    </button>
  )
}

export default Button