import { useRef } from "react";
import Button from "../components/Button"
import Input from "../components/Input"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

const SignIn = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  async function handleSignIn() {
    
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(`${BACKEND_URL}/signin`, {
        username,
        password
      
    });
    if (response.status == 200) {
      console.log(response.data);
      const jwt = response.data.token;
      localStorage.setItem("Authorization", jwt);
      navigate("/dashboard");
    }
  }
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-100 to-purple-100 flex justify-center items-center">
      <div className="bg-white shadow-lg border min-w-80 p-10 rounded-2xl">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Welcome Back</h1>
        <div className="space-y-4">
          <Input placeholder="Username" ref={usernameRef} />
          <Input placeholder="Password" ref={passwordRef} />
        </div>
        <div className="flex justify-center mt-8">
          <Button 
            onClick={handleSignIn}
            loading={false}
            widthFull={true} 
            variant="primary" 
            text="Sign In" 
          />
        </div>
        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default SignIn