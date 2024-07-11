'use client'

import React, { useState } from "react"
import Link from "next/link"
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation'
import { MdError } from "react-icons/md";

interface User {
    email: string,
    password: string
}

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [user, setUser] = useState({})
    const router = useRouter()

    async function postData(newData: User) {
        try {
            const res = await fetch('http://127.0.0.1:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            });
    
            const data = await res.json();
    
            if (!res.ok) {
                throw new Error(data.error || 'Failed to login');
            }
    
            localStorage.setItem('token', data.token);
            localStorage.setItem('isAuthenticated', 'true');
            const decodedToken = jwtDecode<{ email: string }>(data.token);
            setUser(decodedToken);
            console.log(decodedToken);
    
            router.push('/');
            return data;
        } catch (err: any) { // Specify the type of 'err' explicitly
            console.error('Login failed:', err);
            setError(err.message);
        }
    }

    return (
        <div className="bg-sky">
             <header className="absolute inset-x-0 top-0 z-50">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src="" className='mx-auto h-10 w-auto'></img>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login in to Projet Managment</h2>
                {error && <span className="error-message mt-8 flex items-center justify-center bg-[#EF665B] p-2 w-68 text-sm font-bold text-[#fff] rounded-lg" id="name-error"><MdError size={23} className='mr-3' /> {error}</span>}

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
                    <button className="flex mt-4 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm 
                    " onClick={() => {
                            postData({
                                email: email,
                                password: password
                            })
                        }}>Login</button>
                </div>

                <h3 className="mt-10 text-center text-sm text-gray-500">
                    Not a member? <Link href='/register' className="font-bold text-indigo-600 ml-1">Register</Link></h3>

            </div>
        </div>
        </header>
        </div>
    )
}

export default Login

