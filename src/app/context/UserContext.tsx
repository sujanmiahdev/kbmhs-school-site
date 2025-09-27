'use client';

import { createContext, useContext, useState, ReactNode, FC } from "react";

// Context type define
interface UserContextType {
  userType: string;
  setUserType: (type: string) => void;
}

// Context create
const UserContext = createContext<UserContextType>({
  userType: "student", // default
  setUserType: () => {},
});

// Custom hook for easy access
export const useUser = () => useContext(UserContext);

// Props interface
interface UserProviderProps {
  children: ReactNode;
}

// UserProvider (Client Component)
export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [userType, setUserType] = useState<string>("student");

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};
