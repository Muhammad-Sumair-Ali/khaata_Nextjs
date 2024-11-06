"use client";

import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { GrUserSettings } from "react-icons/gr";
import { FiEdit, FiSettings, FiTrash2 } from "react-icons/fi";

export default function AdminSettings({ admin }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="z-50">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 mx-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700
         hover:to-blue-900 transition-all"
      >
        <FiSettings size={30} />
      </button>

      {isOpen && (
        <div
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen w-screen bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white w-full max-w-3xl rounded-2xl p-4 md:px-8 shadow-xl  "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-3xl font-bold text-blue-900">Update Profile</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800">
                <CgClose size={32} />
              </button>
            </div>

            <div className="flex justify-between items-center text-center mb-2">
              <div className="flex items-center gap-2">
                <img
                src="https://i.pravatar.cc/300"
                alt="Profile Picture"
                className="rounded-full w-28 h-28 border-4 border-blue-700 mb-1 transition-transform duration-300 hover:scale-105 shadow-lg"
              />
              <input type="file" id="upload_profile" hidden />
              <label
                htmlFor="upload_profile"
                className="text-blue-800 font-thin px-2 py-2 text-md rounded-lg mt-2 cursor-pointer hover:text-blue-800 transition"
              >
               Muhammad Sumair<br/>
               <strong className="text-gray-800">Web Developer</strong>
              </label>
              </div>
              <div className="flex space-x-4 mt-2">
                <button className="flex items-center px-4 py-2 text-blue-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                  <FiEdit size={18} className="mr-1" /> Edit Details
                </button>
                <button className="flex items-center px-4 py-2 text-red-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                  <FiTrash2 size={18} className="mr-1" /> Delete Account
                </button>
              </div>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="Software Developer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="john.doe@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="+1 (555) 123-4567"
                  />
                </div>
              </div>

        

              <div className="flex justify-end space-x-4 mt-5">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
