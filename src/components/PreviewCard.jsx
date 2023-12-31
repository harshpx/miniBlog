import React from 'react'
import appwriteService from '../appwrite/configs.js'
import { Link } from 'react-router-dom'

function PreviewCard({$id, title, image}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-[300px] rounded-lg border mx-5 my-1">
                {image ? <img src={appwriteService.getFilePreview(image)} alt="" className="h-[200px] w-full rounded-3xl object-cover p-4"/> : null}
                <div className="p-4">
                    <h1 className="text-lg font-semibold">{title}</h1>
                    <button type="button" className="mt-4 rounded-md bg-black px-2.5 py-1 text-md font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Read</button>
                </div>
            </div>
        </Link>
    )
}

export default PreviewCard
