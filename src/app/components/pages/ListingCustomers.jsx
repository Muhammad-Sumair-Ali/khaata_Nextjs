"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFetch } from "../../action/customer";
import AddCustomer from "../AddCustomer";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import Logo from "@/assets/logoKhaata.png";
import WelcomeUser from "../panel/WelcomeUser";
import Link from "next/link";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";

const ListingCustomers = ({ setCustomerActive, customerActive }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [refreshToggle, setRefreshToggle] = useState(false);
  const { data } = useFetch("/api/customers/allcustomers", refreshToggle);

  const deleteCustomer = async (customerId) => {
    event.stopPropagation();
    if (confirm("Are You Sure Want To Delete Customer!") == true) {
      try {
        await axios.delete(`/api/customers/delete/${customerId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        
        alert("customer deleted successfully");
        setRefreshToggle((prev) => !prev); 
      } catch (error) {
        console.error("Failed to delete customer", error);
      }
    } else {
     alert("Customer delete cancelled");
    }
   
    
  };

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

      <ul className="overflow-y-auto h-[calc(100vh-80px)] p-2 space-y-3 -mt-2">
        {!user.token ? (
          <div className="flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
            <Image
              src={Logo}
              alt="YourKhaata Logo"
              className="mb-4 rounded-full "
              width={200}
              height={200}
              unoptimized
              priority
            />
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
              Welcome to Your Khaata!
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              It looks like you haven't logged in yet.
            </p>
            <h2 className="text-lg bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded-lg shadow-md mb-4">
              No Customers Available!{" "}
              <span className="font-semibold">Please log in first</span>
            </h2>
            <Link
              href="/login"
              className="mt-4 px-6 py-3 bg-indigo-700 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Login & Register Now!
            </Link>
          </div>
        ) : (
          <span className="h-0 w-0"></span>
        )}

        <div className="text-center my-2">
          {data?.length <= 0 ? <WelcomeUser /> : " "}
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
                <button
                  onClick={() => deleteCustomer(customer._id)}
                  className="bg-gray-50 text-black text-center rounded-lg h-16 w-[45px]  shadow-xl"
                >
                  <MdDeleteForever className="m-auto" size={35}/>
                </button>
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
