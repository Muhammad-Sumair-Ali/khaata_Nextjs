"use client";
import "@/assets/css/style.css";
import React from "react";
import ListingCustomers from "./ListingCustomers";
import CustomerSingle from "@/app/singlepage/[id]/page";
import DefaultPage from "../panel/DefaultPage";
import { useCustomerActive } from "@/utils/useCustomerActive";

const Home = () => {
  const { customerActive, activateCustomer } = useCustomerActive();

  return (
    <div className="flex min-h-screen bg-white">

      <div className="w-full sm:w-[40%] md:w-[40%] h-screen overflow-y-auto border-r border-gray-300">
        <ListingCustomers 
          customerActive={customerActive} 
          setCustomerActive={activateCustomer} 
        />
      </div>
     
      <div className="hidden sm:block md:block md:w-[60%] h-screen overflow-y-auto">
        {customerActive ? (
          <CustomerSingle 
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
