import React from 'react'
import appwriteService from '../appwrite/configs'
import authService from '../appwrite/auth'
import { useSelector } from 'react-redux'
import PreviewCard from './PreviewCard'
import { Link } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'

function MyPosts() {
    const [posts,setPosts] = React.useState([])
    const [userData,setUserData] = React.useState({})
    
    React.useEffect(()=>{
        authService.getCurrentUser().then(res => {
            if(res) setUserData(res)
        })
        appwriteService.getPosts([]).then(response => {
            if(response){
                setPosts(response)
            }
            
        })
    },[])
    
    return (
        <div className='w-full h-dvh py-8 flex flex-wrap justify-center'>
            {posts?.documents?.map(post => (post.userId===userData.$id) ? (
                <div key={post.$id}>
                    <PreviewCard {...post}/>
                </div>
            ): null )}
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

export default MyPosts
