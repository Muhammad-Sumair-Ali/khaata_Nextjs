"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/logoKhaata.png'; 
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext';
import { _useAuth } from '../action/auth';

const SignupPage = () => {
  const { user } = useAuth()
  const router = useRouter()
  
 const { handleSignup,email, setEmail,username, setUsername,password, setPassword,business,setBusiness,error,success} = _useAuth(user)

  useEffect(() => {
    if (user.token) {
      router.push('/');
    }
  }, [user.token, router]);
  return (
    <div className="flex justify-center items-center h-screen">

    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="YourKhaata.co"
          src={Logo}
          className="mx-auto rounded-full mix-blend-multiply"
          width={150}
          height={150}
          unoptimized
          priority 
        />
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Signup & 
          Register Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSignup} className="space-y-6">
        {error && <p className="text-red-500 text-md text-center mt-2">{error}</p>}
        {success && <p className="text-green-500 text-md text-center mt-2">{success}</p>}
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
             Full Name
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Full Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="business" className="block text-sm font-medium leading-6 text-gray-900">
            Business Name
            </label>
            <div className="mt-2">
              <input
                id="business"
                name="business"
                type="text"
                placeholder="Business Name"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Username"
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
                placeholder="Password"
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
              Signup Now
            </button>
          </div>
        </form>
        <p className="text-gray-800 text-sm !mt-8 text-center"> Already have a acount
           <Link href="/login" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Login here</Link></p>
          
        
      </div>
    </div>
  </div>
  );
};

export default SignupPage;
