import React from 'react'
import {useForm} from 'react-hook-form'
import Input from './Input'
import RTE from './RTE'
import SelectComp from './SelectComp'
import appwriteService from "../appwrite/configs"
import authService from '../appwrite/auth'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function PostForm({post}) {
    
    const {register,handleSubmit,control,watch,setValue,getValues} = useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",}
    })

    const navigate = useNavigate()
    // const {userData} = useSelector(state=>state.userData)
    const [userData,setUserData] = React.useState({})

    React.useEffect(()=>{
        authService.getCurrentUser([]).then(res => {
            setUserData(res)
        })
    },[])


    const submit = async (data) => {
        if(post){
            const file = data.image.length>0 ? await appwriteService.uploadFile(data.image[0]) : null

            // if(file){
            //     appwriteService.deleteFile(post.image)
            // }
            appwriteService.deleteFile(post.image)


            const dbPost = await appwriteService.updatePost(post.$id,{...data, image: file ? file.$id : null})

            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        } else{
            console.log(data.image)
            const file = data.image.length>0 ? await appwriteService.uploadFile(data.image[0]) : null

            if(file){data.image = file.$id}
            else{data.image = null}
            
            const dbPost = await appwriteService.createPost({...data, userId: userData.$id})
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
    }

    const slugTransform = React.useCallback((value) => {
        if(value && typeof(value)==='string'){
            return value.trim().toLowerCase().replace(/[^a-zA-z\d]+/g, '-')
        }
        return ""
    },[])

    React.useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title))
            }
        })
        return ()=>{
            subscription.unsubscribe()
        }
    },[watch,slugTransform,setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className='w-2/3 px-2'>
                <Input label="Title: " placeholder="Title" className="mb-4" {...register("title",{required:true})}/>
                <Input label="Slug: " placeholder="Slug" className="mb-4" {...register("slug",{required:true})} onInput={(e)=>{
                    setValue("slug",slugTransform(e.currentTarget.value))
                }}/>
                <RTE label="content" name="content" control={control} defaultValue={getValues("content")}/>
            </div>
            <div className='w-1/3 px-2'>
                <Input label="Image: " type="file" className="mb-4" accept="image/png, image/jpg, image/jpeg, image/gif image/svg" {...register("image",{required: false})}/>
                {post && (
                    <div className='w-full mb-4'>
                        <img src={appwriteService.getFilePreview(post.image)} alt={post.title} className=' rounded-lg'/>
                    </div>
                )}
                <SelectComp options={["active", "inactive"]} label="Status" className="mb-4" {...register("status",{required:true})}/>

                <button type='submit' className='w-full'>
                    {post ? "Update" : "Create"}
                </button>
            </div>
        </form>
    )
}

export default PostForm