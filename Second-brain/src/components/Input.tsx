import React from "react";

interface inputProps{
    placeholder:string;
    refrence?:  React.RefObject< HTMLInputElement>;
 }
const Input = ({placeholder,refrence}:inputProps) => {
  return (<div>
    <input placeholder={placeholder} type="text"  ref={refrence} className="px-4 py-2 border rounded m-2"></input>
 </div> )
}

export default Input