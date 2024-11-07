"use client";
import { useState } from "react";
import { useAuthentication } from "@/app/action/auth";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logoKhaata.png";
import AdminSettings from "../panel/AdminSettings";

const Navar = () => {
  const { user }:any  = useAuth();
  const { handleLogout } = useAuthentication();
  const [isOpen, setIsOpen] = useState(false);

  let userProfile = "";
  if (!user?.user?.username) {
    userProfile =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnOdXyDhfh8hsqc_m7EzsYyGf8Tc4Y-r7jlg&s";
  } else {
    userProfile = `https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(user?.user?.username)}`;
  }

  return (
    <nav className="bg-white/25 text-dark backdrop-blur-lg  border-b-4 border-l-indigo-700 z-20">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-14 items-center justify-between">
          <div className="flex items-center justify-between space-x-40 sm:items-stretch sm:justify-start">
            <div className="flex items-center text-gray-900 h-auto w-auto">
              <Link href="/">
                <Image
                  alt="png"
                  src={logo}
                  className="mx-auto rounded-full mix-blend-multiply inline-block"
                  width={75}
                  height={75}
                  unoptimized
                  priority
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

              <AdminSettings admin={user.user} setIsOpen={setIsOpen} isOpen={isOpen}/>
            <div className="ml-1">
              <span
                className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <Image
                  className="ring-1 rounded-full p-1 "
                  src={userProfile}
                  alt="User Profile"
                  width={48}
                  height={48}
                  unoptimized
                  priority
                />
              </span>
             
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navar;
