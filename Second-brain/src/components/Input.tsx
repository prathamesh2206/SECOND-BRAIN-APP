import React from "react";

interface inputProps{
    placeholder:string;
    refrence?:  React.RefObject< HTMLInputElement>;
 }
const Input = ({placeholder,refrence}:inputProps) => {
  return (
    <input placeholder={placeholder} ref={refrence} type="text" className="px-4 py-2 border rounded m-2"></input>
  )
}

export default Input