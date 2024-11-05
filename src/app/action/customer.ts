'use client'
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';



export const useAddTransactions = (customer: any) => {
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
      setUser((prev: typeof user) => ({
        ...prev,
        user: response.data,
      }));
      

     
      setAmount("");
      setDetails("");
      setOpen(false);
    } catch (error: any) {
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



export const useFetch = <T>(url: string, refreshToggle: any) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user }: any = useAuth();

  const fetchAllCustomers = useCallback(async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem("token") : '';
      
      const response = await axios.get<T>(url, {
        headers: {
          Authorization: `Bearer ${user?.token || token}`,
        },
      });
      setData(response.data);
    } catch (err: any) {
      setError(err.message || "Error fetching");
    }
  }, [url, user, refreshToggle]);

  useEffect(() => {
    if (user) fetchAllCustomers();
  }, [user, fetchAllCustomers]);

  return { data, error };
};





export const useCustomer = () => {

  const {user}:any  = useAuth()
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [refreshToggle, setRefreshToggle] = useState(false);

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
      setName("")
      setPhone("")
      setOpen(false);
    } catch (error: any) {
      console.error("Error adding customer:", error); 
      alert(error.response?.data?.message || "Something went wrong!");
    }
  }

  const handleDeleteCustomer = async (customerId: any) => {
    event?.preventDefault();

    if (confirm("Are You Sure Want To Delete Customer!") == true) {
      try {
        await axios.delete(`/api/customers/delete/${customerId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        
        alert("customer deleted successfully");
        setRefreshToggle((prev) => !prev); 
      } catch (error) {
        console.error("Failed to delete customer", error);
      }
    } else {
     alert("Customer delete cancelled");
    }
   
    
  };



  return{
    open,
    setOpen,
    name,
    setName,
    phone,
    setPhone,
    handleAddCustomer,
    handleDeleteCustomer,
    refreshToggle
  }
}