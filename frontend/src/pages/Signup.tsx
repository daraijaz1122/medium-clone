import Auth from "../components/Auth"
import Qoute from "../components/Qoute"


const Signup = () => {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2">
      <Auth />
      <div className="hidden lg:block">
        <Qoute />
      </div>


    </div>
  )
}

export default Signup