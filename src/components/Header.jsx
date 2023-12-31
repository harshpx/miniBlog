import React from 'react'
import ColorLogo from '../assets/logo-inline-no-background.png'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { logout } from '../store/authSlice'



export default function Header() {

  const homeMenuItems = [
    {name: 'Home', href: '/' },
    {name: 'About', href: '/about'},
    {name: 'Contact', href: '/contact'},
  ]
  
  const userMenuItems = [
    {name: 'All Posts', href: '/all-posts'},
    {name: 'My Posts', href: '/my-posts'},
    {name: 'Create New Post +', href: '/add-post'}
  ]

  const loginStatus = useSelector(state=>state.status)
  const [menuItems, setMenuItems] = React.useState(homeMenuItems)

  const navigate = useNavigate()

  React.useEffect(()=>{
    if(loginStatus){
      setMenuItems(userMenuItems)
    }else{
      setMenuItems(homeMenuItems)
    }
  },[loginStatus])

  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout().then(()=>{
      dispatch(logout())
      navigate('/')
    })
  }

  return (
    <section className='sticky top-0 left-0 w-full border-b'>
      <div className="flex flex-wrap min-w-full items-center justify-between py-1 bg-white">
        <div className=" inline-flex items-center h-14 w-48">
          <img src={ColorLogo} alt="" className="w-40 p-4 object-cover"/>
        </div>
        <div className="">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({isActive})=>
                  `text-sm font-semibold text-gray-800 hover:text-gray-400 ${isActive ? "border border-black rounded-md p-2 hover:text-gray-800" : ""}`
                }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        {/* login-signup/Logout button */}
        <div className="flex items-center justify-end w-48 px-2">
          {loginStatus ? 
          <>
            <button type="button" className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" onClick={logoutHandler}>Logout</button>
          </>
          :
          <>
            <button type="button" className="rounded-md px-3 py-2 text-sm font-semibold text-black border border-black shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mr-2" onClick={()=>navigate('/login')}>Login</button>

            <button type="button" className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" onClick={()=>{navigate('/signup')}}>Sign Up</button>
          </>}
        </div>
      </div>
    </section>
  )
}



{/* <button type="button" className="rounded-md px-3 py-2 text-sm font-semibold text-black border border-black shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mr-2">Log In</button>

<button type="button" className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Sign Up</button> */}