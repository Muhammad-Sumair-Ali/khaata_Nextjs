'use client'
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "@/app/context/AuthContext";
import { useAddCustomer } from "@/app/action/customer";
import axios from "axios";

const AddCustomer = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

 console.log(user)

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.post("/api/customers/addcustomer",
        { name, phone },
        {
          headers: {
            Authorization: `Bearer ${ user.token || token}`,
          },
        }
      );

      alert(response.data.message || "Customer added successfully!");
    } catch (error) {
      console.error("Error adding customer:", error); // Log the error
      alert(error.response?.data?.message || "Something went wrong!");
    }
  }
  


  const isSelect = () => {
    alert("Please login first");
  };

  return (
    <>
      {!user?.token ? (
        <button
          onClick={isSelect}
          className="bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add New Customer
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg w-72 py-3 px-2 bg-blue-700 hover:bg-blue-700 text-white"
        >
          Add New Customer
        </button>
      )}

      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
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
                    type="text"
                    placeholder="Customer Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2 block w-full rounded-lg bg-gray-50 border border-gray-300 py-2 px-4 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
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
