"use client";
import Image from "next/image";
import React from "react";
import Logo from "@/assets/logoKhaata.png";

const WelcomeUser = () => {
  return (
    <div className="flex flex-col items-center justify-center -mt-28 h-screen bg-gray-50 p-4">
      <Image
        src={Logo}
        alt="YourKhaata Logo"
        className="mb-4 rounded-full"
        width={200}
        height={200}
        unoptimized
        priority
      />
      <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
        Welcome to Your Khaata!
      </h2>
      <p className="text-lg text-gray-600 mb-4 font-serif">
        No customers available! Add new customers to get started.
      </p>
      <p className="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition duration-300">
        Add New Customer
      </p>
    </div>
  );
};

export default WelcomeUser;
