"use client";
import React from "react";
import { useFetch } from "@/app/action/customer";
import { useParams, useRouter } from "next/navigation";
import AddTransaction from "@/app/components/AddTransaction";
import Image from "next/image";
import Loading from "@/app/components/panel/Loading";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import ProfileSettings from "@/app/components/panel/ProfileSettings";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import TotalAmountAlert from "@/app/components/panel/CustomerTotalAmountAlert";

const CustomerSingle = ({ customerActive }: any) => {
  const { id } = useParams();
  const { data }: any = id? useFetch(`/api/customers/getsingle/${id}`, customerActive): {};
  const router = useRouter();

  if (data || data?.data) { customerActive = data?.data;}
  
  const totalGetFromCustomer = customerActive?.totalGive - customerActive?.totalGet;
  
  const sortedTransactions =customerActive?.transactions?.sort(
    (a: any, b: any) =>new Date(b.date).getTime() - new Date(a.date).getTime()) || [];
    
    if (!data && !customerActive) { return <Loading />;}
  return (
    <>
    <div className="w-full m-auto box-border h-auto flex flex-col overflow-hidden">

      <div className="flex align-center justify-between items-center gap-2 w-full px-1 md:px-4 py-2 overflow-hidden bg-white 
      shadow-md border-b border-gray-200">
        <div className="flex items-center gap-2">

     
    
        <IoChevronBackCircleOutline size={38} onClick={() => router.back()} 
        className={`${!id ? "hidden" : "block"} text-red-600 inline-block hover:bg-black hover:text-white rounded-full transition`}/>
   
          <Image
            className=" ring-2 rounded-full p-1"
            src={`https://ui-avatars.com/api/?background=random&color=fff&name=${encodeURIComponent(customerActive?.name)}`}
            alt="Customer Avatar"
            width={40}
            height={40}
            unoptimized
            priority
          />
          <h1 className="font-semibold text-xl text-gray-800">
            {customerActive?.name?.toUpperCase()}
          </h1>
        </div>

      <div className="flex items-center flex-row gap-1">
      <TotalAmountAlert totalGetFromCustomer={totalGetFromCustomer}/>

        
        <div>
        {/* user settings here  */}
          <ProfileSettings customer={customerActive} />
        </div>
      </div>
      </div>

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

      <div className="flex-grow p-5  rounded-lg shadow-inner w-full">
        <div className="flex flex-col-reverse px-2 gap-4 mb-[100px] ">
          {sortedTransactions?.map((trans: any, index: any) => (
            <div
              key={index}
              className={`flex ${
                trans.type === "get" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={` flex items-center gap-2 p-3 md:p-4 rounded-2xl max-w-xs ${
                  trans.type === "get" ? "bg-blue-100" : "bg-red-100"
                } shadow-lg`}
              >
                <div
                  className={`flex-shrink-0 p-2 rounded-full ${
                    trans.type === "get" ? "bg-blue-200" : "bg-red-200"
                  }`}
                >
                  {trans.type === "get" ? (
                    <FaArrowUp className="text-blue-800" size={18} />
                  ) : (
                    <FaArrowDown className="text-red-800" size={18} />
                  )}
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    Amount: Rs. {trans.amount}
                  </p>
                  <p className="text-sm text-gray-600">
                    Details: {trans.details}
                  </p>
                  <p className="text-xs text-gray-500">
                    Date: {new Date(trans.date).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden ">
        <AddTransaction customer={customerActive} />
      </div>
    </div>
    </>

  );
};

export default CustomerSingle;
