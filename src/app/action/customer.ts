"use client";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { showSuccess, showError } from "@/utils/swalUtils";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient, QueryKey } from "@tanstack/react-query";


type Transaction = {
  amount: number;
  type: string;
  details: string;
};
// setCustomerActive mistake is undefined
export const useCustomerActions = (customer: any) => {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState<Transaction["type"]>("give");
  const [details, setDetails] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Query keys 
  const allCustomersKey: QueryKey = ["customers", "all"];
  const addCustomerKey: QueryKey = ["customers", "add"];
  const updateCustomerKey: QueryKey = ["customers", "update", customer?._id];
  // const deleteCustomerKey: QueryKey = ["customers", "delete", customer?._id];
  const addTransactionKey: QueryKey = ["transactions", customer?._id, "add"];

  // Fetch all customers with React Query
  const { data: allCustomersData, isLoading, isError } = useQuery({
    queryKey: allCustomersKey,
    queryFn: async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
      const response = await axios.get("/api/customers/allcustomers", {
        headers: { Authorization: `Bearer ${user?.token || token}` },
      });
      return response.data;
    },
  });

  // Mutation for adding a new customer
  const addCustomerMutation = useMutation({
    mutationKey: addCustomerKey,
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      const response:any = await axios.post(
        "/api/customers/addcustomer",
        { name, phone },
        { headers: { Authorization: `Bearer ${user?.token || token}` } }
      );
      return response.data;
    },
    onSuccess: (data) => {
      showSuccess(data.message || "Customer added successfully");
      setName("");
      setPhone("");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: allCustomersKey as QueryKey });
    },
    onError: (error: unknown) => {
      const err = error as any;
      showError(err?.response?.data?.message || "Something went wrong!");
    },
  });


// Mutation for adding a transaction
const addTransactionMutation = useMutation({
  mutationKey: addTransactionKey,
  mutationFn: async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `/api/customers/addtransections/${customer._id}`,
      { amount: Number(amount), type: transactionType, details },
      { headers: { Authorization: `Bearer ${user?.token || token}` } }
    );
    return response.data;
  },
  onSuccess: (data: any) => {
    
    showSuccess(data.message || "Transaction added successfully!");
    queryClient.invalidateQueries({ queryKey: allCustomersKey as QueryKey });

    setAmount("");
    setDetails("");
    setOpen(false);
  },
  onError: (error: unknown) => {
    const err = error as any;
    showError(err?.response?.data?.message || "Error adding transaction");
  },
});


  // Mutation for updating customer details
  const updateCustomerMutation = useMutation({
    mutationKey: updateCustomerKey,
    mutationFn: async (updatedCustomer: { name: string; phone: string }) => {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `/api/customers/updatecustomerdetails/${customer._id}`,
        updatedCustomer,
        { headers: { Authorization: `Bearer ${user?.token || token}` } }
      );
      return response.data;
    },
    onSuccess: (data) => {
      showSuccess(data.message || "Customer Details Updated Successfully.");
      setOpen(false);
      setName("");
      setPhone("");
      queryClient.invalidateQueries({ queryKey: allCustomersKey as QueryKey });
    },
    onError: (error: unknown) => {
      const err = error as any;
      showError(err?.response?.data?.message || "Update customer failed");
    },
  });

 
  const deleteCustomerMutation:any = useMutation({
    mutationFn: async () => {
        const res = await axios.delete(`/api/customers/delete/${customer._id}`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        return res.data;
    },
    onSuccess: (data) => {
      showSuccess(data.message || "Customer has been deleted.");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: allCustomersKey });
      
      router.push("/");
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || "Failed to delete Customer");
    },
  });



  return {
    loading,
    allCustomersData,
    isError,
    isLoading,
    addCustomer: (event: React.FormEvent) => {
      event.preventDefault();
      addCustomerMutation.mutate();
    },
    addTransaction: (event: React.FormEvent) => {
      event.preventDefault();
      
      setLoading(true);
      addTransactionMutation.mutate();
      setLoading(false);
    },
    updateCustomer: (event: React.FormEvent) => {
      event.preventDefault();
      if (name || phone) {
        updateCustomerMutation.mutate({ name, phone });
      } else {
        showError("Please fill all details");
      }
    },
    deleteCustomer: deleteCustomerMutation.mutate,
    isMutating: deleteCustomerMutation.isLoading,
    setAmount,
    transactionType,
    setTransactionType,
    setDetails,
    setName,
    setPhone,
    setOpen,
    open,
  };
};



export const useFetchData = (url: string, enabled = true) => {
  const { user }: any = useAuth();

  const fetchAllCustomers = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : "";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${user?.token || token}`,
      },
    });
    return response.data;
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: [url],
    queryFn: fetchAllCustomers,
    enabled,
  });

  return { data, isError, isLoading };
};  