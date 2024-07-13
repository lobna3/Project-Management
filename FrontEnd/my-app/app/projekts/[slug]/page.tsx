
'use client'

import Nav from "@/app/components/Nav";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';


interface Projekt {
    id: number,
    title: string,
    description: string,
    imageUrl: string,
    category: string,
    evaluation: string,
    user_id: number,
    createdAt: Date,
    updatedAt: Date,
    user: {
        name: string,
        email: string,
        role: string
    },
    tasks: {
        id:number,
        title: string,
        description: string
    }[]
}

const initialProjectState: Projekt = {
    id: 0,
    title: "",
    description: "",
    imageUrl: "",
    category: "",
    evaluation: "",
    user_id: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
        name: "",
        email: "",
        role: ""
    },
    tasks: []
};

export default function OneProjekt({ params }: { params: { slug: string } }) {
    const [projekt, setProjekt] = useState<Projekt>(initialProjectState);
    const [refetsch,setRefetsch]=useState(false)

    const fetchProject = async (id: string) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/tasks/getProjekts/${id}`);
            console.log(response.data);
            setProjekt(response.data);

        } catch (error) {
            console.error('Error fetching project:', error);
        }
    };
    const deleteTask = (id: number) => {
        axios.delete(`http://127.0.0.1:5000/api/tasks/${id}`).then((response) => {
            console.log('Task deleted successfully', response.data)
            setRefetsch(!refetsch)
        }).catch((error) => { console.log(error) })
    }

    useEffect(() => {
        if (params.slug) {
            fetchProject(params.slug);
        }
    }, [params.slug,refetsch]);

    return (
        <>
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full mb-1">
                    <Nav />
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Projekt Information</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
                    </div>

                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            {/* Display project details */}
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Title</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{projekt.title}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Category</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{projekt.category}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Evaluation</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{projekt.evaluation}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Date</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{moment(projekt.createdAt).format("DD MMM YYYY HH:mm:ss")}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{projekt.description}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Tasks</dt>
                                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                        {/* List tasks */}
                                        {projekt.tasks.map((task, index) => (
                                            <li key={index} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                <div className="flex w-0 flex-1 items-center">
                                                    <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">

                                                    </svg>
                                                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                        <span className="truncate font-medium">{task.title}</span>
                                                        <span className="text-gray-500">{task.description}</span>
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex-shrink-0">
                                                    <button  onClick={()=>{deleteTask(task.id)}} className="font-medium text-indigo-600 hover:text-indigo-500">Delete</button>
                                                </div>

                                            </li>
                                        ))}
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </>
    );
}
