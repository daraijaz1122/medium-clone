import { Appbar } from "../components/Appbar";
import BlogCard from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"


const Blogs = () => {

  const { loading, blogs } = useBlogs();
  console.log(blogs)

if (loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }
  return (
    <div>
       <Appbar/>
    <div className="flex items-center flex-col justify-center">
     
      {
        blogs.map(blog =>
          <BlogCard
        id={blog.id }
        title={blog.title}
        content={blog.content}
        authorName={blog.author.name || "Anonymous"}
        publishedDate="4 dec 2023"
      />
        )
}

    </div>  
    </div>
  )
}

export default Blogs