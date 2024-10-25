'use client'
import React, { useEffect, useState } from "react";
import  { useFetch } from "@/app/action/customer";
import { useParams } from "next/navigation"; 
import AddTransaction from "@/app/components/AddTransaction";


const CustomerSingle = ({ customerActive }) => {

  const { id } = useParams(); 
  const { data } = id ? useFetch(`/api/customers/getsingle/${id}`) : {};

  if (data) {
     customerActive = data?.data;
  }
  
  const totalKitneLeneHai = customerActive?.totalGive - customerActive?.totalGet;
  const sortedTransactions = customerActive?.transactions?.sort((a, b) =>  new Date(b.date) - new Date(a.date));

  return (
    <div className="w-full m-auto box-border h-auto flex flex-col overflow-hidden">
      <div className="flex align-center justify-between items-center gap-2 w-full px-12 py-2 overflow-hidden bg-white shadow-md border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 ring-2 rounded-full p-1"
            src={`https://ui-avatars.com/api/?background=random&color=fff&name=${customerActive?.name}`}
            alt="Customer Avatar"
          />
          <h1 className="font-semibold text-xl text-gray-800">
            {customerActive?.name?.toUpperCase()}
          </h1>
        </div>
        
        <div className={`text-white text-lg rounded-xl h-14 flex items-center justify-center px-4 ${totalKitneLeneHai < 0 ? "bg-red-500" : "bg-blue-700"}`}>
          <strong className="block">
            {totalKitneLeneHai < 0 
              ? `Rs. ${Math.abs(totalKitneLeneHai)} dene hai.` 
              : totalKitneLeneHai > 0 
              ? `Aap ko Rs. ${totalKitneLeneHai} lene hain!` 
              : "Sab kuch theek hai"}
          </strong>
        </div>
      </div>

      {/* Customer Transaction Summary */}
      <div className="flex gap-6 w-3/4 mx-auto my-2">
        <button className="bg-blue-700 text-white text-base rounded-lg h-16 w-full flex flex-col items-center justify-center shadow-lg">
          <p className="text-2xl font-bold">{customerActive?.totalGet}</p>
          <small className="text-sm">Maine liye</small>
        </button>

        <button className="bg-red-500 text-white text-base rounded-lg h-16 w-full flex flex-col items-center justify-center shadow-lg">
          <p className="text-2xl font-bold">{customerActive?.totalGive}</p>
          <small className="text-sm">Maine diye</small>
        </button>
      </div>
   
      <div className="flex-grow p-4 bg-gray-50 rounded-lg shadow-inner w-full">
        <div className="flex flex-col-reverse gap-4">
          {sortedTransactions?.map((trans, index) => (
            <div key={index} className={`flex ${trans.type === "get" ? "justify-start" : "justify-end"}`}>
              <div className={`p-3 rounded-lg max-w-xs ${trans.type === "get" ? "bg-blue-200 text-black" : "bg-red-200 text-black"} shadow-md`}>
                <p className="font-semibold">Amount: Rs. {trans.amount}</p>
                <p className="text-sm text-gray-700">Details: {trans.details}</p>
                <p className="text-xs text-gray-500">Date: {new Date(trans.date).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 fixed bottom-2 right-4">
        <AddTransaction customer={customerActive} />
      </div>
    </div>
  );
};

export default CustomerSingle;
