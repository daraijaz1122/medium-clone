import { Circle } from "./Circle";
import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";
interface BlogCardProps{
    id: number,
    authorName: string,
    content: string,
    publishedDate: string,
    title:string
}
const BlogCard = ({id,authorName,content,publishedDate,title}:BlogCardProps) => {
   return <Link to={`/blog/${id}`}>
        <div className=" mt-4 p-4  border-b border-slate-200 py-4 w-screen max-w-screen-md cursor-pointer shadow-md">
            <div className="flex">
                <Avatar name={authorName} />
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
                <div className=" pl-2 flex justify-center flex-col">
                    <Circle />
                </div>
                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>
    </Link>
}


export default BlogCard