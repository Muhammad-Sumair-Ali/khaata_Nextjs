import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { showSuccess, showError, showConfirmation } from "@/utils/swalUtils";

export const _useAuth = (admin: any) => {

  const { setUser, user }: any = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [business, setBusiness] = useState("");
  const [username, setUsername] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);




  // login user
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log("Respone user=> ", response);

      setUser((prev: typeof user) => ({
        ...prev,
        user: response.data.user,
        token: response.data.token,
      }));

      setSuccess(response.data.message);
      showSuccess(response.data.message || "Login  successfully!");

      router.push("/");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      showError(error.response?.data.message || "Error Login failed");
      setError(errorMessage);
    }
  };


 // Register signup user
 const handleSignup = async (event: React.FormEvent) => {
  event.preventDefault();
  setError("");
  setSuccess("");

  try {
    const response = await axios.post("/api/users/signup", {
      email,
      username,
      business,
      password,
    });
    setSuccess(response.data.message);
    showSuccess(response.data.message || "Register successfully!");
    router.push("/login");
  } catch (err: any) {
    showError(err.response?.data.message || "Error Register failed");
    setError(err.response?.data.message || "Register failed");
  }
};


// Logout user
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  Swal.fire("logged Out", "", "info");
  setUser({ user: null, token: "" });
  router.push("/login");
};


// handle Delete User 
const handleDeleteUser = async (customerId: any) => {
  const result = await showConfirmation(
    "Are you sure?",
    "Do you really want to delete Your Account?"
  );

  if (result.isConfirmed) {
    try {
      const res = await axios.delete(`/api/users/delete/${customerId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      Swal.fire(
        "Deleted!",
        res.data.message || "Your account has been deleted.",
        "success"
      );
      handleLogout();
    } catch (error: any) {
      showError("Failed to delete User Account");
    }
  } else {
    showError("User Account deletion was cancelled");
  }
};


// Edit User Account details 
const handleUpdateUserDetails = async (event: React.FormEvent) => {
  event.preventDefault();
  event.stopPropagation();

  if (!email && !business && !username) {
    showError("please fill the all fields");
    return;
  }
  try {
    const response = await axios.put(
      `/api/users/updatedetails/${admin._id}`,
      {
        email,
        business,
        username,
      }
    );
    const token = localStorage.getItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(response.data.user));

    setUser(() => ({
      user: response.data.user,
      token: token,
    }));
    showSuccess(response.data.message || "User details updated successfully");
    setIsOpen(false);
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Update failed";
    showError(errorMessage);
  }
};


// return all sataes

return{
  handleLogin,
  handleSignup,
  handleLogout,
  handleDeleteUser,
  handleUpdateUserDetails,
  email,
  setEmail,
  password,
  setPassword,
  business,
  setBusiness,
  username,
  setUsername,
  success,
  error,
  isOpen,
  setIsOpen,

}

}