"use client";
import { useState } from "react";
import { useAuthentication } from "@/app/action/auth";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import logo from '@/assets/logoKhaata.png'



const Navar = () => {

  const { user } = useAuth();
  const { handleLogout } = useAuthentication();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  let userProfile = "";
  if (!user?.user?.username) {
    userProfile =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnOdXyDhfh8hsqc_m7EzsYyGf8Tc4Y-r7jlg&s";
  } else {
    userProfile = `https://ui-avatars.com/api/?background=random&color=fff&name=${user?.user?.username}`;
  }

  return (
    <nav className="bg-white/25 text-dark backdrop-blur-lg sticky top-0 border-b-4 border-l-indigo-700 z-20">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-14 items-center justify-between">
          <div className="flex items-center justify-between space-x-40 sm:items-stretch sm:justify-start">
            <div className="flex items-center text-gray-900">
              <Link href="/">
                <Image
                  alt="png"
                  src={logo} 
                  className="mx-auto h-14 rounded-full w-auto mix-blend-multiply inline-block"
                  width={56}
                  height={56}
                  unoptimized
                />

                <span>YourKHAATA.co</span>
              </Link>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {user?.token ? (
              <div className="flex items-center font-bold cursor-pointer">
                <button
                  onClick={handleLogout}
                  className="flex items-center text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 space-x-2"
                >
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <span className="button rounded-lg bg-blue-600 hover:bg-blue-700 p-3 w-24 text-center mx-1 text-gray-100">
                <Link href="/login">Login</Link>
              </span>
            )}

            <div className="relative ml-1">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <Image
                  className="h-12 w-12 ring-1 rounded-full p-1"
                  src={userProfile}
                  alt="User Profile"
                  width={48}
                  height={48}
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navar;
