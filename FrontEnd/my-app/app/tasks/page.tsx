'use client'

import React, { useState, useEffect } from "react"
import Nav from "../components/Nav"
import axios from "axios"


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
    tasks: [
        {
            title: string,
            description: string
        }]
}
const Tasks = () => {
    const [projekts, setProjekts] = useState([])

    const fetchProjekt = () => {
        axios.get('http://127.0.0.1:5000/api/tasks/getProjekts').then((response) => {
            console.log(response.data)
            setProjekts(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchProjekt()
    }, [])


    return (
        <div>
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full mb-1">
                    <div className="mb-4">
                        <Nav />
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All Pojekts with Tasks</h1>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" className="p-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            User Name
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            User Email
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Projekt title
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Projekt Evaluation
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Tasks Title
                                        </th>
                                        <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    {projekts.map((ele: Projekt) =>

                                        <tr className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                                            <td className="w-4 p-4">
                                                <div className="flex items-center">
                                                    <input aria-describedby="checkbox-1" type="checkbox"
                                                        className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label className="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                <div className="text-base font-semibold text-gray-900 dark:text-white">{ele.user.name}</div>
                                                <div className="text-sm font-normal text-gray-500 dark:text-gray-400"></div>
                                            </td>
                                            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{ele.user.email}</td>
                                            <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">{ele.title}</td>
                                            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{ele.evaluation}</td>
                                            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{ele.tasks.map((task) => <ul>
                                                <li>Task Title: {task.title}</li>
                                            </ul>)}</td>
                                            <td className="p-4 space-x-2 whitespace-nowrap">
                                                <button id="createProductButton" type="submit" className="text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                                    data-drawer-target="drawer-create-product-default" data-drawer-show="drawer-create-product-default" aria-controls="drawer-create-product-default" data-drawer-placement="right"
                                                >
                                                    Add new Tasks
                                                </button>

                                            </td>
                                        </tr>)}


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Tasks