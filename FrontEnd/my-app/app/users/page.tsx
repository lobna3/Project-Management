import React from 'react'
import Nav from '../components/Nav'

interface User {
    id: number,
    name: string,
    email: string,
    role: string
}

const UsersPage = async () => {

    const res = await fetch('http://127.0.0.1:5000/api/users/getAll', { cache: 'no-store' })
    const users: User[] = await res.json()

    return (

        <div>
            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full mb-1">
                    <Nav />
                    <h1>Users</h1>
                    <p>{new Date().toLocaleTimeString()}</p>
                    <br />
                    {users.map((user) =>
                        <ul key={user.id}>
                            <li>User Name : {user.name}</li>
                            <li>User Email : {user.email}</li>
                            <li>User Role : {user.role}</li>
                            <br />
                        </ul>

                    )}

                </div>
            </div></div>
    )
}


export default UsersPage