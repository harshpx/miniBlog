import React from 'react'
import PreviewCard from './PreviewCard'
import appwriteService from '../appwrite/configs'
import { Link } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'

function AllPosts() {
    const [posts,setPosts] = React.useState([])
    React.useEffect(()=>{
        appwriteService.getPosts([])
        .then(res=>{
            if(res){
                setPosts(res)
                console.log(posts);
            }
        })
    },[])
    return (
        <div className='w-full h-dvh py-8 flex flex-wrap justify-center'>
            {posts?.documents?.map(post => (
               <div key={post.$id}>
                    <PreviewCard {...post}/>
               </div>
            ))}
            <Link to={`/add-post`}>
                <div className="w-[300px] rounded-lg border mx-5 my-1">
                    <button className="flex justify-center items-center w-full h-[250px] p-4"><PlusCircle size={100} /></button>
                    <div className="p-4">
                        <h1 className="text-lg font-semibold">Add Post</h1>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default AllPosts