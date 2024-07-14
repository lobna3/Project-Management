 "use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { MdError } from 'react-icons/md';
import RegisterPopSucc from '../components/RegisterPopSucc';

interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
 

  const handleValidation = () => {
    if (!name || !email || !password || !confirm) {
      setError('Please fill all the fields');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return false;
    }

    if (!/^[a-zA-Z\d]{8,}$/.test(password)) {
      setError('Password must be at least 8 characters long and contain a number');
      return false;
    }

    if (password !== confirm) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!handleValidation()) {
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role:'User',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to register user');
      }

      setSuccess('User created successfully');
 
    } catch (error) {
      setError('Failed to register user');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='sub-tit flex flex-col mt-8 p-2 items-center justify-center gap-4'>
      <img src="" className='mx-auto h-10 w-auto'></img>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register in to Project Management</h2>
        {error && (
          <span className='error-message flex items-center justify-center bg-[#EF665B] p-2 w-64 text-sm font-bold text-[#fff] rounded-lg'>
            <MdError size={23} className='mr-3' />
            {error}
          </span>
        )}
      </div>

      <div className='max-w-md mx-auto flex items-center justify-center bg-white mt-4 p-4 rounded-lg'>
        <form onSubmit={handleSubmit} noValidate>
          <div className='cont1 flex gap-3'>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Name:</label>
              <div className='relative'>
                <input
                  type='text'
                  className='outline-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  placeholder='Enter your name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Email:</label>
              <div className='relative'>
                <input
                  type='email'
                  className='outline-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className='cont-2 flex gap-3'>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Password:</label>
              <div className='relative'>
                <input
                  type='password'
                  className='outline-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Confirm Password:</label>
              <div className='relative'>
                <input
                  type='password'
                  className='outline-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  placeholder='Confirm Password'
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            type='submit'
            className='ml-28 mt-8 bg-blue-900 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Register
          </button>

          {success && <RegisterPopSucc />}
        </form>
      </div>

      <h3 className='mt-10 ml-24'>
        Already have an account? <Link href='/login' className='font-bold text-indigo-600 ml-1'>Login</Link>
      </h3>
    </div>
  );
};

export default Register;
