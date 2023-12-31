import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configs";
import authService from "../appwrite/auth";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    // const userData = useSelector((state) => state.userData);
    const [userData,setUserData] = React.useState({})


    useEffect(() => {
        authService.getCurrentUser([]).then(res => {
            setUserData(res)
        })
        if (slug) {
            appwriteService.getPost(slug).then((currPost) => {
                if (currPost) setPost(currPost);
                else navigate("/all-posts");
            });
        } else navigate("/all-posts");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                if(post.image) appwriteService.deleteFile(post.image);
                navigate("/all-posts");
            }
        });
    };

    const isAuthor = (post && userData) ? (post.userId === userData.$id) : false;
    // const isAuthor = true;

    // console.log('current post: ',post)
    // console.log('current user: ',userData)

    return post ? (
        <div className="py-8 flex flex-wrap justify-center items-center">
                <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
                    <img src={appwriteService.getFilePreview(post.image)} alt={post.title} className="rounded-xl w-3/5"/>

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex flex-col items-start">
                            <Link to={`/edit-post/${post.$id}`}>
                                <button className="border border-black rounded-md p-2 mb-2">
                                    Edit
                                </button>
                            </Link>
                            <button onClick={deletePost} className="border border-black rounded-md p-2">
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
        </div>
    ) : null;
}