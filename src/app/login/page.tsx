"use client"

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/logoKhaata.png'; 
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { setUser ,  user} = useAuth()
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log( "Respone => ",response)
      
      setUser((prev) => ({
        ...prev,
        user: response.data.user,
        token: response.data.token,
      }));
      
      setSuccess(response.data.message);
      alert(response.data.message)
     
    } catch (err) {
      alert(err.message)
      setError(err.response?.data.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">

    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="YourKhaata.co"
          src={Logo}
          className="mx-auto h-24 rounded-full w-auto mix-blend-multiply"
        />
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
      {success && <p className="text-green-500 text-sm text-center mt-2">{success}</p>} 
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                required
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="text-gray-800 text-sm !mt-8 text-center">Don't have an account?
           <Link href="/signup" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Register here</Link></p>
          
      </div>
    </div>
  </div>
  );
};

export default LoginPage;
