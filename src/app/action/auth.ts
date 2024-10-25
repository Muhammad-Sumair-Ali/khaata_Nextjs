import { useAuth } from "../context/AuthContext";

export function useAuthentication(){
    const { setUser } = useAuth();

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser({ user: null, token: '' });
      // Redirect to login page or update UI accordingly
    };

    return{
        handleLogout
    }
}