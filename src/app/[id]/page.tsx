'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Use this to get the ID from the URL
import { useFetch } from '@/app/action/customer'; // Adjust import path

const CustomerSingle = () => {
  const { id } = useParams(); // Extract ID from the dynamic route
  const { data, error } = useFetch(`/api/customers/singlecustomer/${id}`); // Fetch customer data based on ID



  // if (!data) {
  //   return <p>Loading...</p>;
  // }

  const customer = data?.data; // Assuming `data.data` holds the customer info
  const totalKitneLeneHai = customer?.totalGive - customer?.totalGet;

  return (
    <div className="customer-details">
      <div className="header">
        <img
          className="avatar"
          src={`https://ui-avatars.com/api/?background=random&color=fff&name=${customer?.name}`}
          alt="Customer Avatar"
        />
        <h1>{customer?.name}</h1>
      </div>

      <div className={`balance ${totalKitneLeneHai < 0 ? 'negative' : 'positive'}`}>
        {totalKitneLeneHai < 0 ? `You owe Rs. ${Math.abs(totalKitneLeneHai)}` : `Rs. ${totalKitneLeneHai} is owed to you`}
      </div>

      {/* Transactions */}
      <div className="transactions">
        {customer?.transactions?.map((trans, index) => (
          <div key={index} className={`transaction ${trans.type === 'get' ? 'receive' : 'give'}`}>
            <p>Amount: Rs. {trans.amount}</p>
            <p>Details: {trans.details}</p>
            <p>Date: {new Date(trans.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerSingle;
