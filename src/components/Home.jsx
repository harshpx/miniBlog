import React from 'react'
import authService from '../appwrite/auth'
import { useSelector } from 'react-redux'
import BlueLogo from '../assets/logo-color.png'

function Home() {
    
    const loginStatus = useSelector(state => state.status)
    const [userInfo,setUserInfo] = React.useState([])
    React.useEffect(()=>{
        authService.getCurrentUser()
        .then(res => {
            if(res) setUserInfo(res.name)
        })
    },[loginStatus])

    if(loginStatus === true){
        return (
            <div className=' w-full py-8 text-center flex flex-wrap'>
                <div className=' p-2 w-full'>
                <h1 className='text-2xl font-bold hover:text-gray-500'>Welcome {userInfo}</h1>
                </div>
            </div>
        )
    } else return (
        <div className=' w-full py-8 mt-4 text-center flex flex-wrap justify-center'>
            <div className='mt-10'>
                <h1 className='text-2xl font-bold'>Welcome to</h1>
                <img src={BlueLogo} alt="Logo" className='w-96'/>
            </div>
            <div className=' p-2 w-full'>
                <h1 className='text-2xl font-bold'>Login to read posts</h1>
            </div>
        </div>
    )
    
}

export default Home
