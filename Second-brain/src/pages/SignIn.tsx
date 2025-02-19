import Button from "../components/Button"
import Input from "../components/Input"

const SignIn = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-100 to-purple-100 flex justify-center items-center">
      <div className="bg-white shadow-lg border min-w-80 p-10 rounded-2xl">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Welcome Back</h1>
        <div className="space-y-4">
          <Input placeholder="Email address" />
          <Input placeholder="Password" />
        </div>
        <div className="flex justify-center mt-8">
          <Button 
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