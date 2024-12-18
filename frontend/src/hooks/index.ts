import axios from "axios";
import { useEffect, useState } from "react";
import { ApiConstants } from "../utils/ApiConstants";

export interface Blog {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id: string}) => {
    
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${ApiConstants.BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization:localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.post);
                setLoading(false);
        })
    }, [id])
    return {
        loading,
        blog

    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([])
    
    useEffect(() => {
        axios.get(`${ApiConstants.BACKEND_URL}/api/v1/blog/all/blogs`, {
            headers: {
                
                Authorization:localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.posts);
                setLoading(false)
        })
    },[])
    return {
        loading,
        blogs
}
    
}