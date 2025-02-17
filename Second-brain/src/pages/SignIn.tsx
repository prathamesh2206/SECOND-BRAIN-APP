import Button from "../components/Button"
import Input from "../components/Input"
 
const SignIn= () => {
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white  border min-w-48 p-8  rounded-xl">
        <Input placeholder="email" />
        <Input placeholder="password" />
        <div className=" flex justify-center pt-4">
          <Button loading={true}widthFull={true} variant="primary" text="Sign Up" />
        </div>
      </div>
    </div>
  )
}

export default SignIn