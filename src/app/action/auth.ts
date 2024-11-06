import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";

export function useAuthentication(){
    const router = useRouter();
    const { setUser, user }:any = useAuth();

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser({ user: null, token: '' });
      router.push('/login'); 
    };
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
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
        alert(response.data.message);
        router.push('/');
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Login failed";
        alert(errorMessage);
        setError(errorMessage);
      }
    };

    
   
    return{
        handleLogout,
        handleLogin,
        email,setEmail,
        password, setPassword,
        error,
        success
    }
}


export const userRegister = () => {
  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter()

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/users/signup', {
        email,
        username,
        password,
      });
      setSuccess(response.data.message);
      router.push('/login')
    } catch (err: any) {
      setError(err.response?.data.message || 'Signup failed');
    }
  };

  return{
    handleSignup,
    email, setEmail,
    username, setUsername,
    password, setPassword,
    error,
    success
  }
}
