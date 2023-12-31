import React from 'react'
import { ArrowRight } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { login as storeLogin} from '../store/authSlice.js'
import Input from './Input.jsx'
import authService from '../appwrite/auth.js'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'
import BlackLogo from '../assets/logo-black.png'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const [error, setError] = React.useState(null)
    
    
    const login = async (data)=>{
        setError("")
        try {
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) {dispatch(storeLogin()); navigate('/all-posts'); console.log('logged in');}
                else navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <div className="mb-2 flex justify-center">
                       {/* <img src={BlackLogo} alt="" className='w-40 h-24 object-cover'/> */}
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        Sign in to your <img src={BlackLogo} alt="" className='h-24 object-cover inline-block w-20'/> account
                    </h2>
                    
                    <form onSubmit={handleSubmit(login)} className="mt-8">
                        <div className="space-y-5">
                        <div>
                            <div className="mt-2">
                                <Input label="Email Address" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" type="email" placeholder="Email" {...register("email",{
                                    required: true,
                                    validate: {
                                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
                                    }
                                })}/>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                            </div>
                            <div className="mt-2">
                                <Input label="Password" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" type="password" placeholder="Password" {...register("password",{
                                    required: true,
                                })}/>
                            </div>
                        </div>
                        <div>
                            <button
                            type="submit" className="inline-flex w-1/2 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">Login<ArrowRight className="ml-2" size={16} />
                            </button>
                        </div>
                        </div>
                    </form>
                    <div className='mt-5'>
                    <a href="#" className="text-sm mt-10 font-semibold text-black hover:underline">Forgot Password?</a>
                    </div>
                    <p className="mt-2 text-center text-sm text-gray-600 ">
                        Don&apos;t have an account?{' '}
                        <NavLink
                        to="/signup"
                        title=""
                        className="font-semibold text-black transition-all duration-200 hover:underline"
                        >
                        Create an account
                        </NavLink>
                    </p>
                    {error && <p className="mt-2 text-center text-sm text-red-600 ">{error}</p>}
                </div>
            </div>
        </section>
    )
}

export default Login