"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  userType: string;
  setUserType: (type: string) => void;
}

const UserContext = createContext<UserContextType>({
  userType: "",
  setUserType: () => {},
});

export const useUser = () => useContext(UserContext);

interface Props {
  children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [userType, setUserType] = useState<string>("student"); // default

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};
