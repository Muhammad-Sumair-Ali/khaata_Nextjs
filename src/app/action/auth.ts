import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export function useAuthentication(){
    const router = useRouter();
    const { setUser } = useAuth();

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser({ user: null, token: '' });
      router.push('/login'); 
    };

    return{
        handleLogout
    }
}