"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFetch } from "../../action/customer";
import AddCustomer from "../AddCustomer";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";

const ListingCustomers = ({ setCustomerActive, customerActive }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const { data } = useFetch("/api/customers/allcustomers");
  const handleResize = () => {
    setIsMobile(window.innerWidth < 720);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCustomerClick = (customer) => {
    if (isMobile) {
      router.push(`/singlepage/${customer._id}`);
    } else {
      setCustomerActive(customer);
    }
  };

  return (
    <>
      <div className="bg-white p-2 shadow-md">
        <div className="flex items-center gap-2 flex-nowrap relative">
          <input
            type="text"
            placeholder="Search Customer"
            className="block w-full rounded-lg border-none bg-gray-200 py-3 px-4 text-md text-black 
            focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <AddCustomer customer={customerActive} />
        </div>
      </div>

      <ul className="overflow-y-auto h-[calc(100vh-80px)] p-2 space-y-3">
        <div className="text-center my-2">
          {!user ? (
            <h2 className="text-red-600 text-lg bg-red-100 border border-red-400 px-4 py-4 rounded-lg">
              Not Available Customers! Please Login First{" "}
              <span className="text-lime-600">Make sure you loggedIn </span>
            </h2>
          ) : (
            ""
          )}
        </div>

        <div className="text-center my-2">
          {data?.length <= 0 && (
            <h2 className="text-red-600 text-lg bg-red-100 border border-red-400 px-4 py-4 rounded-lg">
              Customers Not Available!{" "}
              <span className="text-lime-600">Add Now New Customers</span>
            </h2>
          )}
        </div>

        {data?.map((customer) => (
          <li
            className="cursor-pointer w-full rounded-lg shadow-sm"
            key={customer._id}
            onClick={() => handleCustomerClick(customer)}
          >
            <div className="flex items-center justify-between gap-2 w-full px-2 py-2 rounded-lg ring-gray-200 ring-1 bg-white shadow-md hover:bg-blue-100 transition-all duration-200 ease-in-out">
              <div className="flex items-center gap-2 md:gap-4">
                <Image
                  className=" ml-2 ring-2 ring-gray-300 rounded-full"
                  src={`https://ui-avatars.com/api/?background=random&color=fff&name=${customer.name}`}
                  alt="Customer Avatar"
                  width={56}
                  height={56}
                  unoptimized 
                  priority 
                />

                <div>
                  <h1 className="font-semibold text-md text-gray-800">
                    {customer.name.toUpperCase()}
                  </h1>
                  <p className="text-sm text-gray-500">
                    Phone: {customer.phone}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-blue-700 text-white text-base rounded-lg h-16 w-24 flex flex-col items-center justify-center p-2 shadow-lg">
                  <p className="text-2xl font-bold">{customer.totalGet}</p>
                  <small className="text-sm">Maine liye</small>
                </button>

                <button className="bg-red-500 text-white text-base rounded-lg h-16 w-24 flex flex-col items-center justify-center p-2 shadow-lg">
                  <p className="text-2xl font-bold">{customer.totalGive}</p>
                  <small className="text-sm">Maine diye</small>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListingCustomers;
