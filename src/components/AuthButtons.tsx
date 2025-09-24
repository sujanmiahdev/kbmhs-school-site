"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "../app/context/UserContext";

const AuthButtons: React.FC = () => {
  const router = useRouter();
  const { userType } = useUser(); 

  const handleRegistration = () => {
    const routes: Record<string, string> = {
      student: "/registration/student",
      teacher: "/registration/teacher",
      parent: "/registration/parent",
      
    };

    // যদি userType না থাকে বা unknown হয়, default /registration এ যাবে
    router.push(routes[userType] || "/registration");
  };

  const buttonClass = `
    px-3 sm:px-4 py-2 bg-[#f89b29] dark:bg-orange-600
    text-black dark:text-white font-semibold rounded-lg shadow-md
    hover:bg-green-500 dark:hover:bg-green-500 hover:text-white
    transition-colors duration-300 text-sm sm:text-base
  `;

  return (
    <div className="flex gap-3 md:gap-4 flex-1 justify-center md:justify-end">
      {/* Registration Button */}
    <Link href="/registration">
    <button onClick={handleRegistration} className={buttonClass}>
        Registration
      </button>

    </Link>
      {/* Login Button */}
      <Link href="/login">
        <button className={buttonClass}>Login</button>
      </Link>
    </div>
  );
};

export default AuthButtons;
