'use client'
import React from "react";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "@/app/context/AuthContext";
import { useCustomer } from "@/app/action/customer";
import Link from "next/link";


const AddCustomer = () => {

  const { user }:any  = useAuth();

  const { open ,setOpen, name, setName, phone, setPhone,handleAddCustomer} = useCustomer();

  return (
    <>
      {!user?.token ? (
        <Link
          href="/login"
          className="bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </Link>
      ) : (
        <button
        onClick={() => setOpen(true)}
        className="rounded-lg md:w-72 w-60 py-3 block md:px-4 px-1 text-sm md:text-md bg-gradient-to-r from-blue-600 to-blue-500
         text-white font-semibold shadow-md hover:from-blue-500 hover:to-blue-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Add New Customer
      </button>
      
      )}

      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-500 bg-opacity-50">
          <div className="relative w-full max-w-lg bg-white p-8 rounded-3xl shadow-xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <IoMdClose className="text-2xl" />
            </button>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">Add New Customer</h2>

              <form onSubmit={handleAddCustomer} className="space-y-4">
                <div className="relative">
                  <label className="block text-lg font-semibold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    placeholder="Customer Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 block w-full rounded-lg bg-gray-50 border border-gray-300 py-2 px-4 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-lg font-semibold text-gray-700">Phone Number</label>
                  <input
                    type="number"
                    placeholder="Customer Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2 block w-full rounded-lg bg-gray-50 border border-gray-300 py-2 px-4 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform duration-200 ease-in-out transform hover:scale-105"
                  >
                    Add Customer Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCustomer;
