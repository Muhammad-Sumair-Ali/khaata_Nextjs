"use client";
import { useAuthentication } from "@/app/action/auth";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FiEdit, FiSettings, FiTrash2 } from "react-icons/fi";


export default function AdminSettings({ admin ,isOpen, setIsOpen}) {
  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [business, setBusiness] = useState('');
  const [username, setUsername] = useState('');

  const handleUpdateUserDetails = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    
    if(!email &&!business &&!username) {
      alert("Please fill all the details");
      return;
    }
    try {
      const response = await axios.put(`/api/users/updatedetails/${admin._id}`,{
        email,
        business,
        username
      })
       const token = localStorage.getItem("token")
        localStorage.removeItem("user")
        localStorage.setItem("user" , JSON.stringify(response.data.user))


        setUser(() => ({
          user: response.data.user,
          token: token
        }));

        alert("User details updated successfully");
        setIsOpen(false);
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Update failed";
      alert(errorMessage);
      
    }
  }



 const {handleDeleteUser} = useAuthentication()
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 mx-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700
         hover:to-blue-900 transition-all"
      >
        <FiSettings size={30} />
      </button>

      {isOpen && (
        <div
          className="fixed top-0 left-0 right-0 flex items-center justify-center md:h-screen h-[100vh]  w-screen bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}>
          <div className="bg-white w-full max-w-3xl rounded-2xl p-2 md:px-4 shadow-xl mx-2  py-5"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-3xl font-bold text-blue-900">Update Admin Profile</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800">
                <CgClose size={32} />
              </button>
            </div>

            <div className="flex justify-between items-center text-center mb-2">
              <div className="flex items-center gap-1">
                <Image
                src={`https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(admin.username)}`}
                width={200}
                height={200}
                unoptimized 
                alt="Profile Picture"
                className="rounded-full w-28 h-28 border-4 border-blue-700 mb-1 transition-transform duration-300 hover:scale-105 shadow-lg"
              />
              <input type="file" id="upload_profile" hidden />
              <label
                htmlFor="upload_profile"
                className="text-blue-800 font-mono px-2 py-2 text-md rounded-lg mt-2 cursor-pointer hover:text-blue-800 transition"
              >
               {admin?.username.toUpperCase()}<br/>
               <strong className="text-gray-800">Admin </strong>
              </label>
              </div>
              <div className="flex flex-col gap-2 mx-4">
                <button className="flex items-center px-4 py-2 text-blue-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                  <FiEdit size={18} className="mr-1" /> Edit Details
                </button>
                <button onClick={() => handleDeleteUser(admin?._id)} className="flex items-center px-4 py-2 text-red-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                  <FiTrash2 size={18} className="mr-1" /> Delete Account
                </button>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleUpdateUserDetails}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                   Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder={admin.username}
                  />
                </div>
                <div>
                  <label htmlFor="BusinessName" className="block text-sm font-medium text-gray-700">
                  Business Name
                  </label>
                  <input
                    type="text"
                    id="BusinessName"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder={admin?.businessName || "Add Your Business Name"}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder={admin.email}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <input
                  disabled
                   readOnly
                    type="tel"
                    id="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="Owner"
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
    </>
  );
}
