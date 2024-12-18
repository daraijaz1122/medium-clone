
import { useBlog } from '../hooks';
import { useParams } from 'react-router-dom';
import { Appbar } from '../components/Appbar';
import { Spinner } from '../components/Spinner';
import { Avatar } from '../components/Avatar';
const Blog = () => {

    const { id } = useParams();
   
    const { loading, blog } = useBlog({
        id:id ||  ''
    });
    
    if (loading || !blog) {
        return <div>
             <Appbar />
        
            <div className="h-screen flex flex-col justify-center">
                
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    }
    return (
    <div>
  <Appbar />
  <div className="flex w-full">
    <div className="w-2/3 p-4 ">
      <h1 className="text-3xl font-extrabold  text-center">
        {blog.title}
      </h1>
      <div className='text-center px-44 py-4'>
        {blog.content}
      </div>
    </div>

    {/* Second Part: Author Name */}
    <div className="w-1/3 p-4 bg-gray-100">
       <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                        </div>
                    


    </div>
  </div>
        </div>
    )
}

export default Blog