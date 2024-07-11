'use client'

import React, { useState } from "react"
import Link from "next/link"
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation'

interface User {
    email: string,
    password: string
}

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error,setError]=useState('')
    const [user,setUser]=useState({})
    const router = useRouter()

    async function postData(newData: User) {
        const res = await fetch('http://127.0.0.1:5000/api/users/login', {
            method: 'POST', // specify the HTTP method
            headers: {
                'Content-Type': 'application/json' // indicate the content type of the request body
            },
            body: JSON.stringify(newData) // stringify JSON object

        });
        const data = await res.json(); // Parse JSON response
        localStorage.setItem('token', data.token); // Assuming the response has a 'token' field
        localStorage.setItem('isAuthenticated', 'true'); // Store as string
        const decodedToken = jwtDecode(data.token); // Decode JWT token
        setUser(decodedToken)
        console.log(user)
        
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
       
        return res.json(); // parse the JSON response
    }


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src="" className='mx-auto h-10 w-auto'></img>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login in to Projekt Managments</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-semibold leading-6 text-gray-900">Password</label>

                        </div>
                        <div className="mt-2">
                            <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                </form>
                <div>
                    <button className="flex mt-4 w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm 
                    " onClick={()=>{postData({
                        email:email,
                        password:password
                    }), router.push('/')
                    }}>Login</button>
                </div>

                <h3 className="mt-10 text-center text-sm text-gray-500">
                    Not a member? <Link href='/register' className="font-bold text-sky-400 ml-1">Register</Link></h3>

            </div>
        </div>
    )
}

export default Login

