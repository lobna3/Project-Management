import React from 'react'

interface User {
    id: number,
    name: string,
    email: string,
    role: string
}

const UsersPage = async () => {

    const res = await fetch('http://127.0.0.1:5000/api/users/getAll', {cache: 'no-store'})
    const users: User[] = await res.json()
    
    return (

        <div>
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
    )
}


export default UsersPage