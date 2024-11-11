'use client'
import React from "react";

const AllCustomersLoading: React.FC = () => {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((val, idx) => (
        <div
          key={idx}
          className="shadow-xl rounded-lg md:px-2 md:py-1 px-4 py-3 w-full  mx-auto bg-white  ring-gray-200"
        >
          <div className="animate-pulse flex space-x-2">
            <div className="rounded-full bg-slate-300 h-12 w-12" />
            <div className="flex-1 space-y-4 py-2">
              <div className="h-3 bg-slate-300 rounded w-3/4" />
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-3 bg-slate-300 rounded col-span-2" />
                  <div className="h-3 bg-slate-300 rounded col-span-1" />
                </div>
                <div className="h-3 bg-slate-300 rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllCustomersLoading;
