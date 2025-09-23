'use client';

import { createContext, useContext, useState, ReactNode, FC } from "react";

// ১. Context type define
interface UserContextType {
  userType: string;
  setUserType: (type: string) => void;
}

// ২. Context create
const UserContext = createContext<UserContextType>({
  userType: "student", // default
  setUserType: () => {},
});

// ৩. Custom hook for easy access
export const useUser = () => useContext(UserContext);

// ৪. Props interface
interface UserProviderProps {
  children: ReactNode;
}

// ৫. UserProvider (Client Component)
export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [userType, setUserType] = useState<string>("student");

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};
