'use client'
import React, { useState } from "react"
import Nav from "@/app/components/Nav"
import { useRouter } from 'next/navigation'
import axios from "axios"

interface Task {
    title: string,
    description: string,
    projekt_id: number
}

export default function AddTask({ params }: { params: { slug: number } }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const router = useRouter()

    const addTask = (body: Task) => {
        axios.post('http://127.0.0.1:5000/api/tasks/add', body).then((response) => {
            console.log(response.data)
            router.push('/tasks')
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:px-0 xl:gap-4 dark:bg-gray-900">
                <div className="mb-4 col-span-full xl:mb-2">
                    <Nav />
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"> My Projekt: {params.slug}</h1>
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Create New Task</h1>
                </div>
            </div>
            <div className='flex flex-col'>
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg ">

                    <div className="mb-4">
                        <div className="relative">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                            <input type="text" className=" outline-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder=" Your Title" value={title}
                                onChange={(e) => { setTitle(e.target.value) }} />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <i className="fas fa-user text-gray-400"></i>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="relative">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                            <textarea className=" outline-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder=" Your Description" value={description}
                                onChange={(e) => { setDescription(e.target.value) }} />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <i className="fas fa-user text-gray-400"></i>
                            </div>
                        </div>
                    </div>
                    <button className=" ml-28 mt-8 bg-blue-900 hover:bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value="submit" onClick={() => {
                        addTask({
                            title:title,
                            description:description,
                            projekt_id:params.slug,

                        })
                    }}>Add New Task</button>
                </div></div>
        </div>)
}