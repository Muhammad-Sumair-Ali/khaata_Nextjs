'use client'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';



export const useAddCustomer =  () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const {user} = useAuth()
 console.log(user)

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.post("/api/customers/addcustomer",
        { name, phone },
        {
          headers: {
            Authorization: `Bearer ${ user._id}`,
          },
        }
      );

      alert(response.data.message || "Customer added successfully!");
    } catch (error) {
      console.error("Error adding customer:", error); // Log the error
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return {
    handleAddCustomer,
    name,
    setName,
    phone,
    setPhone,
  };
};



export const useAddTransactions = (customer, fetchAllCustomers) => {
  const { user, setUser } = useAuth();
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("give");
  const [details, setDetails] = useState("");
  const [open, setOpen] = useState(false);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/api/customers/addtransactions/${customer?._id}`,
        {
          amount: Number(amount),
          type: transactionType,
          details,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
    //   fetchAllCustomers();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
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
  };
};



export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
 const {user} = useAuth()
  const fetchAllCustomers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.toekn ||  token}`,
        },
      });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching customers");
    }
  };

  useEffect(() => {
    fetchAllCustomers();
  }, [url]);

  return {
    data,
    fetchAllCustomers,
    error,
  };
};
