import { useState } from "react"
import { Appbar } from "../components/Appbar"
import axios from "axios";
import { ApiConstants } from "../utils/ApiConstants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
  return (
      <div>
          <Appbar />  
          <div className="flex justify-center">
             
              <div className="w-2/3 mt-8 shadow-lg p-4 rounded-lg">
                  <div className=" text-3xl font-extrabold p-4 text-center">
                      Write a blog
                  </div>
                 <div className="mb-6 w-full">
                    <label  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Title</label>
                     <input onChange={(e)=>setTitle(e.target.value)} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                  </div> 

                  <div>    
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Description</label>
                      <textarea id="message"
                          onChange={(e)=>setContent(e.target.value)}
                          className="block p-2.5 w-full h-48 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                          placeholder="Write your thoughts here...">
                          
                          </textarea>

                  </div>

                  <button
                      onClick={async () =>{ 
                          const response = await axios.post(ApiConstants.BACKEND_URL + `/api/v1/blog`, {
                              title,content
                          }, {
                              headers: {
                                  Authorization:localStorage.getItem("token")
                              }
                          })
                          navigate(`/blog/${response.data.id}`);
                          toast.success("blog created successfully")

                    }}
                      className="bg-blue-300 font-semibold hover:bg-blue-400  w-full mt-4 rounded-lg py-2">
                      Publish
                  </button>
              </div>
              
          </div>

    </div>
  )
}

export default CreateBlog