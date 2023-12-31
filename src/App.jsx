import React from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth.js"
import {login,logout} from "./store/authSlice.js"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import { Outlet } from 'react-router-dom'

function App() {
	const [loading, setLoading] = React.useState(true)
	const dispatch = useDispatch()

	React.useEffect(()=>{
		authService.getCurrentUser()
		.then(userData=>{
			if(userData){
				dispatch(login({userData}));
			}else{
				dispatch(logout());
			}
		})
		.finally(()=>setLoading(false))
	},[])

	return (
		<>
			{loading ? (
				<div className="flex justify-center items-center h-screen w-full">Loading...</div>
			):(
				<div className="flex min-h-screen min-w-full justify-center content-between flex-wrap">
					<div className="w-full block text-center">
						<Header/>
						<Outlet/>
						<Footer/>
					</div>
				</div>
			)}
		</>
	) 
}

export default App
