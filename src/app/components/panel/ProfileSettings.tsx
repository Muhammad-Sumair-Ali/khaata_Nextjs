"use client";
import { useCustomerActions } from "@/app/action/customer";
import Image from "next/image";
import { CgClose } from "react-icons/cg";
import { GrUserSettings } from "react-icons/gr";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function ProfileSettings({ customer }: any) {
  const {user} = useAuth()
  const { updateCustomer, name, setName, phone, setPhone  ,deleteCustomer, isMutating, open, setOpen }: any = useCustomerActions(customer );


  // confirmation modal
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = () => {
    setConfirmOpen(true); 
  };

  const confirmDelete = async () => {
    setConfirmOpen(false);
    await deleteCustomer(customer._id);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        className="px-2 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-700 transition"
      >
        <GrUserSettings size={35} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full h-full md:h-auto p-8">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
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
                className="ml-2 ring-2 ring-gray-300 rounded-full"
                src={`https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(customer.name)}`}
                alt="Avatar"
                width={75}
                height={75}
                unoptimized
                priority
              />
              <div>
                <h1 className="font-semibold text-lg text-gray-800">
                  {customer.name.toUpperCase()}
                </h1>
                <p className="text-md text-gray-500">Phone: {customer.phone}</p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-3 gap-3">
              <form onSubmit={updateCustomer}>
                <input
                  type="text"
                  name="fullName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={customer?.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <input
                  type="number"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={customer?.phone || "add phone"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2 w-full mt-4">
                  <button
                    type="submit"
                    className="mt-2 px-4 py-3 bg-blue-700 text-white rounded-md hover:bg-blue-900 transition w-[50%]"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="mt-2 px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition w-[50%]"
                    disabled={isMutating} // Disable button when loading
                  >
                    {isMutating ? "Deleting..." : "Delete Customer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="text-xl mb-4">Are you sure you want to delete this customer?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                disabled={isMutating}
              >
                {isMutating ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
