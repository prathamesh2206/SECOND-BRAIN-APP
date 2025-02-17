import Button from "../components/Button"
import Input from "../components/Input"

const SignUp = () => {
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center">
      <div className="bg-white rounded border min-w-48">
        <Input placeholder="email" />
        <Input placeholder="password" />'
        <Button variant="primary" text="Sign Up" />'
      </div>
    </div>
  )
}

export default SignUp