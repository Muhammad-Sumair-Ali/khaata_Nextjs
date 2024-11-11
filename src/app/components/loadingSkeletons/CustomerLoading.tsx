'use client';
import React from 'react';

const CustomerLoading = () => {
  return (
    <div className="w-full m-auto box-border h-auto flex flex-col overflow-hidden p-4">

      <div className="flex align-center justify-between items-center gap-2 w-full px-12 py-2 bg-white shadow-md border-b border-gray-200 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gray-300 h-10 w-10"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        </div>
        <div className="h-14 w-40 bg-gray-300 rounded-lg"></div>
      </div>

      <div className="flex gap-6 w-3/4 mx-auto my-2 animate-pulse">
        <div className="bg-gray-300 text-base rounded-lg h-16 w-full flex flex-col items-center justify-center shadow-lg">
          <div className="h-10 w-24 bg-gray-400 rounded"></div>
        </div>
        <div className="bg-gray-300 text-base rounded-lg h-16 w-full flex flex-col items-center justify-center shadow-lg">
          <div className="h-10 w-24 bg-gray-400 rounded"></div>
        </div>
      </div>

      <div className="flex-grow p-4 bg-gray-50 rounded-lg shadow-inner w-full animate-pulse">
        <div className="flex flex-col-reverse gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={`flex justify-between`}>
              <div className="p-3 rounded-lg max-w-xs bg-gray-200 shadow-md w-full">
                <div className="h-4 bg-gray-400 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-400 rounded w-5/6 mb-1"></div>
                <div className="h-4 bg-gray-400 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 fixed bottom-2 right-4">
        <div className="bg-gray-300 rounded-lg h-16 w-52 flex items-center justify-center shadow-lg animate-pulse">
          <div className="h-8 w-8 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLoading;
