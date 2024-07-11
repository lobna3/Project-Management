'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MdError } from "react-icons/md";

interface User {

    name: string,
    email: string,
    password: string
    role: string
}

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const router = useRouter()

    async function postData(newData: User) {
        const res = await fetch('http://127.0.0.1:5000/api/users/register', {
            method: 'POST', // specify the HTTP method
            headers: {
                'Content-Type': 'application/json' // indicate the content type of the request body
            },
            body: JSON.stringify(newData) // stringify JSON object

        });


        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        console.log(res)
        router.push('/login')
        return res.json(); // parse the JSON response

    }

    const handelErr = () => {
        if (!name && !password && !email && !confirm) {
            setError('Please fill all the fields')
            return;
        }
        if (!name) {
            setError('Please enter your name')
            return;
        }
        else if (!email) {
            setError('Please enter your email')
            return;
        }

        else if (!password) {
            setError('Please enter your password')
            return;
        }

        else if (!confirm) {
            setError('Please enter your confirm password')
            return;
        }

        setError('')

    }
    const checkemail = () => {
        if (email) {
            const emailPattern = /\S+@\S+\.\S+/;
            if (!emailPattern.test(email)) {
                setError('enter valid email')
                return;
            }
        }
    }
    const checkPass = () => {
        if (password) {
            const passwordPattern = /^[a-zA-Z\d]{8,}$/;
            if (!passwordPattern.test(password)) {
                setError('Password must be at least 8 characters long and one number');
                return;
            }
        }
    }

    return (
        <div className='flex flex-col justify-center items-center'>

            <div className="sub-tit flex flex-col mt-8 p-2 items-center justify-center gap-4">
                <img src="" className='h-10'></img>
                {error && <span className="error-message flex items-center justify-center bg-[#EF665B] p-2 w-64 text-sm font-bold text-[#fff] rounded-lg" id="name-error"><MdError size={23} className='mr-3' /> {error}</span>
                }
            </div>
            <div className="max-w-md mx-auto flex items-center justify-center bg-white mt-4 p-4 rounded-lg ">

                <form noValidate>
                    <div className="cont1 flex gap-3">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                            <div className="relative">
                                <input type="text" id="name" name="name" className=" outline-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your name" 
                                onChange={(e) => { setName(e.target.value), setError('') }} />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <i className="fas fa-user text-gray-400"></i>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                            <div className="relative">
                                <input type="email" className="outline-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email"
                                    value={email} onChange={(e) => { setEmail(e.target.value), setError('') }} />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <i className="fas fa-envelope text-gray-400"></i>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="cont-2 flex gap-3">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                            <div className="relative">
                                <input type="password" className=" outline-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your password"
                                    value={password} onChange={(e) => { setPassword(e.target.value), setError('') }} />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <i className="fas fa-lock text-gray-400"></i>
                                </div>

                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
                            <div className="relative">
                                <input type="password" className="outline-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Confirm Password"
                                    onChange={(e) => { setConfirm(e.target.value), setError('') }} />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <i className="fas fa-phone text-gray-400"></i>
                                </div>
                            </div>
                        </div>
                    </div>


                    <button className=" ml-28 mt-8 bg-sky-400 hover:bg-sky-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value="submit"
                        onClick={() => {
                            postData({
                                name: name,
                                email: email,
                                password: password,
                                role: 'Admin',
                            }), handelErr(), checkPass(), checkemail()
                        }} >Register</button>

                    <h3 className='mt-10 ml-24'>Already have an account? <Link href='/login' className="font-bold text-sky-400 ml-1">Login</Link> </h3>
                </form>
            </div>
        </div>
    )
}

export default Register