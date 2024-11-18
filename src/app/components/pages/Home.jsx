"use client";
import '@/assets/css/style.css';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomerSingle from "@/app/singlepage/[id]/page";
import ListingCustomers from "./ListingCustomers";
import { useAuth } from "@/app/context/AuthContext";
import DefaultPage from "../panel/DefaultPage";

const Home = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [customerActive, setCustomerActive] = useState(null);
  

  useEffect(() => {
    if (!user.token) {
     router.push("/login")
    }
 
  }, );


  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar for listing customers */}
      <div className="w-full sm:w-[40%] md:w-[40%] h-screen overflow-y-auto border-r border-gray-300">
        <ListingCustomers
          customerActive={customerActive}
          setCustomerActive={setCustomerActive}
        />
      </div>

      {/* Main content area */}
      <div className="hidden sm:block md:block md:w-[60%] h-screen overflow-y-auto">
        {customerActive ? (
          <CustomerSingle
            setCustomerActive={setCustomerActive}
            customerActive={customerActive}
          />
        ) : (
          <DefaultPage />
        )}
      </div>
    </div>
  );
};

export default Home;
