"use client"
import { createContext, ReactNode, useState, useEffect, useContext } from "react";

// Define the shape of your context
export interface AuthContextType {
  authUser: any; // Replace `any` with a more specific type if you have one
  setAuthUser: React.Dispatch<React.SetStateAction<any>> ; // Replace `any` with a more specific type if you have one
}

// Create context with default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for AuthContextProvider
interface AuthContextProviderProps {
  children: ReactNode;
}

export const useAuthContext = ()=>{
  return  useContext(AuthContext);
}
const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only access localStorage on the client
      const storedUser = JSON.parse(localStorage.getItem('data') || 'null');
      setAuthUser(storedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
