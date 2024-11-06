'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';


interface User {
    email: string;
    username: string;
    name: string
  
}

interface AuthContextType {
    user: {
        user: User | null;
        token: string;
    };
    setUser: React.Dispatch<React.SetStateAction<{ user: User | null; token: string; }>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<{ user: User | null; token: string }>({
        user: null,
        token: "",
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            setUser({
                user: JSON.parse(userData),
                token: token,
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
