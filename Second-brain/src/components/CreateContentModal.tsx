import CrossIcon from "../icons/CrossIcon"
import Button from "./Button"
import Input from "./Input"
interface modalProps{
    open:boolean;
    onClose:()=>void;
}

const CreateContentModal = ({open,onClose}:modalProps) => {
  return (
    <div>
    { open &&  <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 bg-opacity-60 flex justify-center items-center">
        <div className="flex justify-center ">
            <span className="bg-white opacity-100 p-4 rounded-xl">
                <div className=" flex justify-end">
                    <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon />
                    </div>
                </div>
                <div>
                <div className="flex flex-col gap-4">
                    <Input placeholder="title" />
                    <Input placeholder="link"/>
                    
                </div>
                <div className=" flex justify-center">
                <Button variant="primary" text="submit" />
                </div>
                </div>
            </span>
        </div>
        </div>}
    </div>
  )
}

export default CreateContentModal