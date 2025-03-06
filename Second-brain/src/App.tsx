import Brain from "./pages/Brain"
import Dashboard from "./pages/Dashboard"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const App = () => {
  return (
   <Router>
 <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/brain/:hash" element={<Brain />} />
 </Routes>
    </Router>)
}

export default App