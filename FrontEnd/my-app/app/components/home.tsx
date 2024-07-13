'use client'

import React , {useState,useEffect} from "react"
import Link from "next/link"
import { jwtDecode } from "jwt-decode";

interface User {
    id:string
    name: string;
    email: string;
    role: string;
}


const HomePage = () => {
    const [user, setUser] = useState<User>({ id: "", name: "", email: "", role: "" });

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        setUser({ id: "", name: "", email: "", role: "" }); // Clear user state
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        
        // Check if token and isAuthenticated are set
        if (token && isAuthenticated) {
            const decodedToken: any = jwtDecode(token);
            setUser({
                id: decodedToken.id,
                name: decodedToken.name,
                email: decodedToken.email,
                role: decodedToken.role
            });
        }
    }, []);

    console.log(user); // Output user details to console (for debugging)

    return (
        <div className="bg-gray">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {/* Conditional rendering of logout link */}
                        {user.id ? (
                            <button onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer">
                                Log out <span aria-hidden="true">&rarr;</span>
                            </button>
                        ) : (
                            <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                                Log in <span aria-hidden="true">&rarr;</span>
                            </Link>
                        )}
                    </div>
                </nav>
            </header>

            {/* Rest of your homepage content */}
            <div className="relative isolate px-6 pt-14 lg:px-8">
                {/* Your main content sections */}
                {/* Example content */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Welcome To Projekt Managment</h1>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
