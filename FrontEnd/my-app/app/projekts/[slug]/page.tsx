'use client'

import Nav from "@/app/components/Nav";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';

interface Project {
    title: string;
    category: string;
    evaluation: string;
    createdAt: string;
    description: string;
}

const initialProjectState: Project = {
    title: "",
    category: "",
    evaluation: "",
    createdAt: "",
    description: "",
   
};

export default function OneProjekt({ params }: { params: { slug: string } }) {
    const [projekt, setProjekt] = useState<Project>(initialProjectState);

    const fetchProject = async (id: string) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/projekts/getAll/${id}`);
            setProjekt(response.data);
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    };

    useEffect(() => {
        if (params.slug) {
            fetchProject(params.slug);
        }
    }, [params.slug]);

    return (
        <>
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
                        <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                {/* List attachments */}
                                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                    <div className="flex w-0 flex-1 items-center">
                                        <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            {/* SVG icon */}
                                        </svg>
                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                            <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                                            <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
                                    </div>
                                </li>
                                {/* Add more attachments */}
                            </ul>
                        </dd>
                    </div>
                </dl>
            </div>
        </>
    );
}
