import React from 'react'
import PostForm from './PostForm'
import appwriteService from '../appwrite/configs'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post,setPost] = React.useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    React.useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug)
            .then(post=>{
                if(post){
                    setPost(post)
                }
            })
        }else{
            navigate('/')
        }
    },[slug,navigate])

    return (
        <>
            {post ? 
            <div className='py-8'>
                <PostForm post={post}/>
            </div> : null}
        </>
    )
}

export default EditPost
