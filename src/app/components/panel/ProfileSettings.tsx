"use client";
import { useCustomer } from "@/app/action/customer";
import Image from "next/image";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { GrUserSettings } from "react-icons/gr";

export default function ProfileSettings({ customer }: any) {

    const { handleDeleteCustomer } = useCustomer() 
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="px-2 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-700 transition"
      >
      <GrUserSettings size={35}/>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full h-full md:h-auto p-8">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
            >
              <CgClose size={24} />
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Edit Customer Profile
            </h2>
            {/* Profile Image */}
            <div className="flex items-center justify-between gap-2 md:gap-4 w-full shadow-lg py-2 mb-4 px-4">
              <Image
                className=" ml-2 ring-2 ring-gray-300 rounded-full"
                src={`https://ui-avatars.com/api/?background=random&color=fff&name=${customer.name}`}
                alt="Customer Avatar"
                width={75}
                height={75}
                unoptimized
                priority
              />

              <div >
                <h1 className="font-semibold text-lg text-gray-800">
                  {customer.name.toUpperCase()}
                </h1>
                <p className="text-md text-gray-500">Phone: {customer.phone}</p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
        
              <input
                type="text"
                name="fullName"
             
                placeholder={customer?.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
                 <input
                type="number"
                name="phone"
               
                placeholder={customer?.phone}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
             
            
 
              <div className="flex items-center gap-2 w-full">
                <button
                  className="mt-2 px-4 py-3 bg-blue-700 text-white rounded-md hover:bg-blue-900 transition w-[50%]"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => handleDeleteCustomer(customer._id)}
                  className="mt-2 px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition w-[50%]"
                >
                  Delete Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}