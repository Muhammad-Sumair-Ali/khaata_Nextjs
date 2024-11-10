'use client'
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { showSuccess, showError, showConfirmation } from '@/utils/swalUtils';
import { useRouter } from "next/navigation";


export const useAddTransactions = (customer: any) => {
  const { user, setUser }: any = useAuth();
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
        { amount: Number(amount), type: transactionType, details },
        { headers: { Authorization: `Bearer ${user.token || token}` } }
      );

      showSuccess(response.data.message || "Transaction added successfully!");
      setUser((prev: typeof user) => ({ ...prev, user: response.data }));

      setAmount("");
      setDetails("");
      setOpen(false);
    } catch (error: any) {
      showError(error.response?.data?.message || "Error adding transaction");
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




export const useCustomer = () => {
  const { user }: any = useAuth();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [refreshToggle, setRefreshToggle] = useState(false);
  const router = useRouter()


  const handleAddCustomer = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("/api/customers/addcustomer", { name, phone }, {
        headers: { Authorization: `Bearer ${user.token || token}` }
      });

      showSuccess(response.data.message || 'Customer added successfully');
      setName("");
      setPhone("");
      setOpen(false);
    } catch (error: any) {
      showError(error.response?.data?.message || "Something went wrong!");
    }
  };

 

  return {
    open,
    setOpen,
    name,
    setName,
    phone,
    setPhone,
    handleAddCustomer,
    refreshToggle
  };
};




export const editCustomer = (customer:any) =>  {
  const [refreshToggle, setRefreshToggle] = useState(false);
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const { user }: any = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  

  const handleUpdateCustomerDetails = async (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    
    if(!name && !phone) {
      showError('Please fil The All Details');
      return;
    }
    try {
      const response = await axios.put(`/api/customers/updatecustomerdetails/${customer._id}`,{
        name,
        phone
      })
      showSuccess(response.data.message || 'Customer Details Updated Successfully.');
        setOpen(false);
      setName("")
      setPhone("")
    }catch (error:any) {
      const errorMessage = error.response?.data?.message || "Update customer failed";
      showError(errorMessage);
    }
  }
  const handleDeleteCustomer = async (customerId: any) => {
    event?.preventDefault();
    const result = await showConfirmation(
      'Are you sure?',
      'Do you really want to delete Customer?'
    );

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`/api/customers/delete/${customerId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });

        showSuccess(res.data.message || 'Customer has been deleted.');
        setRefreshToggle((prev) => !prev);
        setOpen(false);
        router.push('/')
      } catch (error) {
        showError("Failed to delete customer");
      }
    } else {
      showError('Customer deletion was cancelled');
    }
  };

  return{
    handleUpdateCustomerDetails,
    handleDeleteCustomer,
    name,setName,
    phone, setPhone,
    setOpen,open
  }


}




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
