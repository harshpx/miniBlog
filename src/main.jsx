import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Root from './Root.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Home from './components/Home.jsx'
import Protected from './components/AuthLayout.jsx'
import AllPosts from './components/AllPosts.jsx'
import MyPosts from './components/MyPosts.jsx'
import AddPost from './components/AddPost.jsx'
import EditPost from './components/EditPost.jsx'
import Post from './components/Post.jsx'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root/>}>

      <Route path="/" element={<Home/>}/>

      <Route path="login"
      element= { 
        <Protected auth={false}>
          <Login/>
        </Protected>
      }
      />

      <Route path="signup" 
      element={ 
        <Protected auth={false}>
          <Signup/>
        </Protected> 
      }
      />

      <Route path="/all-posts"
      element={
        <Protected auth>
          <AllPosts/>
        </Protected>
      }
      />
      <Route path="/my-posts"
      element={
        <Protected auth>
          <MyPosts/>
        </Protected>
      }
      />

      <Route path='/add-post'
      element={
        <Protected auth>
          <AddPost/>
        </Protected>
      }
      />

      <Route path='/edit-post/:slug'
      element={
        <Protected auth>
          <EditPost/>
        </Protected>
      }
      />

      <Route path='/post/:slug' element={<Post/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="contact" element={<Contact/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes}>
      <Root/>
    </RouterProvider>
  </React.StrictMode>
)
