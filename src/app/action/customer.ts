'use client'
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';




export const useAddCustomer =  () => {
  const {user}:any  = useAuth()
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");


  const handleAddCustomer = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.post("/api/customers/addcustomer",
        { name, phone },
        {
          headers: {
            Authorization: `Bearer ${ user.token || token}`,
          },
        }
      );

      alert(response.data.message || "Customer added successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error adding customer:", error); 
      alert(error.response?.data?.message || "Something went wrong!");
    }
  }

  return{
    open,
    setOpen,
    name,
    setName,
    phone,
    setPhone,
    handleAddCustomer
  }
};


export const useAddTransactions = (customer) => {
  const { user, setUser }:any  = useAuth();
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("give");
  const [details, setDetails] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddTransaction = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); 
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/api/customers/addtransections/${customer._id}`, 
        {
          amount: Number(amount),
          type: transactionType,
          details,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token || token}`,
          },
        }
      );
      alert(response.data.message || "Transaction added successfully!");
      setUser((prev) => ({
        ...prev,
        user: response.data,
      }));

     
      setAmount("");
      setDetails("");
      setOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || error || "Error adding transaction");
    } finally {
      setLoading(false);
    }
  };

  return {
    amount,
    setAmount,
    transactionType,
    setTransactionType,
    details,
    setDetails,
    handleAddTransaction,
    open,
    setOpen,
    loading, 
  };
};



export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { user }:any = useAuth();

  const fetchAllCustomers = useCallback(async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem("token") : '';
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user?.token || token}`,
        },
      });
      setData(response.data);
    } catch (err) {
      setError(err.message || "Error fetching");
    }
  }, [url, user]);

  useEffect(() => {
    if (user) fetchAllCustomers();
  }, [user, fetchAllCustomers]);

  return { data, error };
};
