import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children, auth = true}) {
    const navigate = useNavigate()
    const authStatus = useSelector(state=>state.status)
    const [loader, setLoader] = React.useState(true)

    React.useEffect(()=>{
        if(auth && authStatus !== auth){
            navigate('/login')
        } else if(!auth && authStatus !== auth){
            navigate('/all-posts')
        }
        setLoader(false)
    },[authStatus, navigate, auth])

    return (
        <>
            {loader ? <span>Loading....</span>: <div>{children}</div>}
        </>
    )
}

export default Protected