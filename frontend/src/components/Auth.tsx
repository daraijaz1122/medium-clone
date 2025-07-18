import { useState } from "react"
import InputBox from "./InputBox"
import axios from "axios"
import { ApiConstants } from "../utils/ApiConstants"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const Auth = () => {
    const [isSigninForm, setIssignForm] = useState(false)
    const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("")
 const navigate = useNavigate()
  const handleSubmit = async () => {
    if (!isSigninForm) {
      try {
        setLoading(true)
        const response = await axios.post(ApiConstants.SIGNUP, {
          email,
          password,
          name
        })
        setLoading(false)
        const jwt = response.data.jwt;
        localStorage.setItem("token", jwt)
       
        toast.success("User registered successfully")
         navigate("/dashboard")
      } catch(error) {
         setLoading(false)
        //@ts-ignore
        return toast.error(error.response.data.message)
       }
    }
    if (isSigninForm) {
      try {
        setLoading(true)
        const response = await axios.post(ApiConstants.SIGNIN, {
          email,
          password,
        })
         setLoading(false)
        const jwt = response.data.token;
        localStorage.setItem("token", jwt)
       
        toast.success("logged in successfully")
        navigate("/dashboard")
      } catch (error) {
        
        setLoading(false)
         //@ts-ignore
        return toast.error(error.response.data.message)
    }
    }
  }
  
  const handleClick = () => {
    setIssignForm(!isSigninForm)
  }
  return (
    <div className="flex h-screen items-center justify-center  flex-col ">
      <div className="items-center flex flex-col  boder-b-2 shadow-2xl p-5 rounded-lg ">
         <div className="flex flex-col justify-center ">
         
        <div className="text-3xl  font-extrabold px-10">
          {!isSigninForm ? "Create An Account ? " : "Login to existing account"}
           </div>
        
        <div onClick={handleClick} className="cursor-pointer font-semibold mt-2 text-blue-400 px-14">
          {!isSigninForm?"Already have an account ? Sign In":"Don't have an account ? Sign Up"}
        </div>
        
      </div>
      <div className="w-full mt-4 p-4">
          <InputBox label="Email" placeholder="johndoe@gmail.com" type="text" onChange={(e) => setEmail(e.target.value)} />
          <InputBox label="Password" placeholder="********" type="password" onChange={(e) => setPassword(e.target.value)} />
          { !isSigninForm && <InputBox label="Name" placeholder="John Doe" type="text" onChange={(e) => setName(e.target.value)} />}
        <div className="px-2 mt-8 items-center ">
           <button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700 items-center w-full text-white 
           py-2 rounded-lg flex justify-center  ">
            {loading?<Loader className="animate-spin w-5 h-5"/>:(!isSigninForm ? "Sign Up" : "Sign In")}
            </button>
            
        </div>
       
      </div>
      </div>
     
         
     </div>     
   
  )
}

export default Auth