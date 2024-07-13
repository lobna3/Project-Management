'use client'

import React, { useState, useEffect } from "react"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from "next/link"

interface Project {
    title: string;
    category: string;
    evaluation: string;
    createdAt: string;
    description: string;
    imageUrl: string
}

const initialProjectState: Project = {
    title: "",
    category: "",
    evaluation: "",
    createdAt: "",
    description: "",
    imageUrl: ""

}

export default function UpdateProjekt({ params }: { params: { slug: string } }) {

    const [projekt, setProjekt] = useState<Project>(initialProjectState);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [category, setCategory] = useState("")
    const [evaluation, setEvaluation] = useState("")
    const router = useRouter()


    const updateProjekt = (id: string,newData:any) => {
        axios.put(`http://127.0.0.1:5000/api/projekts/${id}`,newData).then((response) => {
            console.log('Projekt updated successfully', response.data)
            router.push('/projekts')
        }).catch((error) => { console.log(error) })
    }
    
    const fetchProject = async (id: string) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/projekts/getAll/${id}`);
            console.log(response.data)
            setProjekt(response.data);
            setTitle(response.data.title)
            setDescription(response.data.description)
            setCategory(response.data.category)
            setEvaluation(response.data.evaluation)
            setImageUrl(response.data.imageUrl)
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    }



    useEffect(() => {
        if (params.slug) {
            fetchProject(params.slug);
        }
    }, [params.slug]);

    return (
        <div>
            <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:px-0 xl:gap-4 dark:bg-gray-900">
                <div className="mb-4 col-span-full xl:mb-2">
                    <nav className="flex mb-5" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                            <li className="inline-flex items-center">
                                <Link href="/" className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-500">
                                    <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <Link href="/projekts" className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-primary-500">Projekts</Link>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <Link href="/" className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500" aria-current="page">Tasks</Link>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">My Projekt: {params.slug}</h1>
                </div>
            </div>
            <div className='flex flex-col'>
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg ">

                    <div className="mb-4">
                        <div className="relative">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                            <input type="text" className=" outline-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder=" Your Title"
                                value={title}
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
                    <div className="mb-4">
                        <div className="relative">
                            <label className="block text-gray-700 text-sm font-bold mb-2"> Choose a Category:</label>
                            <select onChange={(e) => { setCategory(e.target.value) }} className=" outline-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="It" >It</option>
                                <option value="Managments" >Managments</option>
                                <option value="Marketing" >Marketing</option>
                            </select>
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <i className="fas fa-user text-gray-400"></i>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="relative">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Evaluation:</label>
                            <input type="text" className=" outline-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Your Evaluation"
                                value={evaluation} onChange={(e) => { setEvaluation(e.target.value) }}
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <i className="fas fa-user text-gray-400"></i>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image:</label>
                        <img src={imageUrl} className='w-14 mt-6' />
                        <input type="file" className="outline-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setImageUrl(e.target.value)} />
                    </div>

                    <button className=" ml-28 mt-8 bg-blue-800 hover:bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value="submit" onClick={() => {
                        updateProjekt(params.slug,{
                            title:title, 
                            category: category,
                            evaluation: evaluation,
                            description: description,
                            imageUrl: imageUrl,
                           
                        })
                    }}>Update Projekt</button>
                </div>


            </div>

        </div>
    )
}