"use client";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { useAddTransactions } from "@/app/action/customer";
import { FaArrowDown ,FaArrowUp } from "react-icons/fa";


const AddTransaction = ({ customer }: any) => {
  const { details,setDetails,amount, setAmount,setTransactionType,
    handleAddTransaction,open, setOpen,loading,} = useAddTransactions(customer);

  const isSelect = () => {
    alert("Please select a customer first");
  };

  return (
    <div >
      {customer ? (
       <div className="flex flex-nowrap items-center gap-8 justify-between w-[85%] m-auto text-lg">
       <button
         onClick={() => {
           setOpen(true);
           setTransactionType("get");
         }}
         className="bg-blue-800 hover:bg-indigo-600 text-white font-bold py-2 px-4 w-2/3 h-16 rounded-lg shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2"
       >
         <span>Aapne Liye</span>
         <FaArrowUp size={24} className="ml-1" />
       </button>
       
       <button
         onClick={() => {
           setOpen(true);
           setTransactionType("give");
         }}
         className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 w-2/3 h-16 rounded-lg shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2"
       >
         <span>Aapne Diye</span>
         <FaArrowDown size={24} className="ml-1" />
       </button>
     </div>
     
      ) : (
        <button
          onClick={isSelect}
          className="bg-indigo-600 hover:bg-indigo-600 text-white font-bold py-2 px-4 w-52 h-16 text-lg rounded-lg shadow-md transition-transform duration-200 ease-in-out transform hover:scale-105"
        >
          ???
        </button>
      )}

      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
          <div className="relative w-full max-w-lg bg-white p-8 rounded-3xl shadow-xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              aria-label="Close dialog"
            >
              <IoMdClose className="text-2xl" />
            </button>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Add Transaction
              </h2>

              <form onSubmit={handleAddTransaction} className="space-y-4">
                {/* Amount Input */}
                <div className="relative">
                  <label className="block text-lg font-semibold text-gray-700">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-2 block w-full rounded-lg bg-gray-50 border border-gray-300 py-2 px-4 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
             
                <div className="relative">
                  <label className="block text-lg font-semibold text-gray-700">
                    Details
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="mt-2 block w-full rounded-lg bg-gray-50 border border-gray-300 py-2 px-4 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Additional details about the transaction"
                  />
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform duration-200 ease-in-out transform hover:scale-105 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Saving..." : "Save Transaction"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;
