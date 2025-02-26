import { useRef } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  async function handleSignUp() {
    
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(`${BACKEND_URL}/signup`, {
        username,
        password
      
    });
    if (response.status == 200) {
      console.log(response.data);
      navigate("/signin");
    }
  }
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-100 to-purple-100 flex justify-center items-center">
      <div className="bg-white shadow-lg border min-w-80 p-10 rounded-2xl">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Create Account</h1>
        <div className="space-y-4">
          <Input  placeholder="username" ref={usernameRef} />
          <Input placeholder="Password" ref={passwordRef} />
        </div>
        <div className="flex justify-center mt-8">
          <Button
          onClick={handleSignUp}
            loading={false}
            widthFull={true}
            variant="primary"
            text="Sign Up"
          />
        </div>
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account? <a href="/signin" className="text-blue-600 hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  )
}

export default SignUp