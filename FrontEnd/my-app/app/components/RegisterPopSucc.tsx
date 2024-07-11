'use client'
import React from 'react'
import { FcOk } from "react-icons/fc"
import Link from 'next/link'

const RegisterPopSucc = () => {
  return (
  <div className="pop-up-container flex items-center justify-center bg-gray-900 bg-opacity-75 fixed top-0 left-0 right-0 bottom-0 z-50">
  <div className="sign-up-msg flex items-center flex-col p-12 bg-gray-800 text-white rounded-lg shadow-lg w-96">
   <FcOk className=' absolute -mt-20  ' size={70}/>
    <h1 className="font-bold text-3xl mb-2">Success</h1>
    <h2 className="text-sm mb-4">You logged successfully!</h2>
    <Link href='/login'>
    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring- -500">
      Sign Up
    </button>
    </Link>
  </div>
</div>
  )
}

export default RegisterPopSucc