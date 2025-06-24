
import React from 'react'
import './App.scss'
import Navbar from "./Components/Navbar/Navbar";
import Footer from './Components/Footer/Footer';
import { BrowserRouter, Navigate } from "react-router-dom";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import MainPage from "./Page/MainPage/Mainpage"
import About from "./Page/About/About";
import Leadership from "./Page/Leadership/Leadership";
import Board from "./Page/Board/Board";
import Service from "./Page/Service/Service";
import Contact from "./Page/Contact/Contact";
import SinglePost from './Page/SinglePost/SinglePost';

import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';



import AdminNavbar from "./Components/AdminNavbar/AdminNavbar";
import AdminLogin from './Page/Admin/AdminLogin';
import AdminEditPost from "./Page/Admin/AdminEditPost";
import AdminCreatePost from "./Page/Admin/AdminCreatePost";
import AdminPosts from "./Page/Admin/AdminPosts"
import AdminContacts from "./Page/Admin/AdminContacts";
function AuthRedirectRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    const verifytoken = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/auth/verify-token", {}, {
          withCredentials: true
        })
        setIsAuthenticated(true)
      } catch (error) {
        console.log("토큰인증 실패:", error)
        setIsAuthenticated(false)
      }
    }
    verifytoken()
  }, [])

  if (isAuthenticated == null) {
    return null
  }
  return isAuthenticated ? <Navigate to="/admin/posts" replace /> : <Outlet />
}
function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [user, setUser] = useState(null);
  useEffect(() => {
    const verifytoken = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {}, {
          withCredentials: true
        })
        setIsAuthenticated(response.data.isValid)
        setUser(response.data.user)
      } catch (error) {
        console.log("토큰인증 실패:", error)
        setIsAuthenticated(false)
        setUser(null)
      }
    }
    verifytoken()
  }, [])

  if (isAuthenticated == null) {
    return null
  }
  return isAuthenticated ? (<Outlet context={{ user }} />) : (<Navigate to="/admin" replace />)
}


function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/leadership",
        element: <Leadership />,
      },
      {
        path: "/board",
        element: <Board />,
      },
      {
        path: "/post/:id",
        element: <SinglePost />,
      },
      {
        path: "/our-services",
        element: <Service />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },



    ]
  },
  {
    path: "/admin",
    element: <AuthRedirectRoute />,
    children: [{
      index: true,
      element: <AdminLogin />
    }]
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children:  [
      {
        element: <AdminLayout />,
        children: [
          {
            path: "posts",
            element: <AdminPosts />,
          },
          {
            path: "create-post",
            element: <AdminCreatePost />,
          },
          {
            path: "edit-post/:id",
            element: <AdminEditPost />,
          },
          {
            path: "contacts",
            element: <AdminContacts />,
          },
        ],
      }
    ]
  },
])
function App() {
  return <RouterProvider router={router} />
}

export default App
