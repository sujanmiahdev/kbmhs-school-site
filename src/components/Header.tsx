"use client";

import React from "react";
import Image from "next/image";
import AuthButtons from "./AuthButtons";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="w-full shadow-lg z-50 bg-yellow-400 dark:bg-gray-800 transition-colors duration-300">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-4 min-w-[320px] gap-3 md:gap-0">
        {/* Logo Left */}
        <div className="flex items-center gap-3 flex-1 justify-center md:justify-start">
          <Image
            src="/image/kbmhs-logo.png"
            alt="logo"
            width={80}
            height={80}
            className="rounded"
          />
        </div>

        {/* School Name Center */}
        <div className="flex-1 flex justify-center">
          <h1 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-extrabold text-center text-black dark:text-white whitespace-nowrap overflow-hidden truncate transition-colors duration-300">
            Kumulli Bachchu Mia Model High School
          </h1>
        </div>

        {/* Auth Buttons Right / Placeholder */}
        <div className="flex-1 flex justify-center md:justify-end">
          {pathname === "/" ? <AuthButtons /> : <div className="w-[120px]" />} 
          {/* placeholder so that center stays balanced */}
        </div>
      </div>

      {/* Established + Location */}
      <div className="text-center text-brown-700 dark:text-gray-300 font-bold text-xs sm:text-sm md:text-base pb-2 transition-colors duration-300">
        <p className="text-red-600">EIIN NO: 135585</p>
        <p>Established: 2012</p>
        <p className="text-green-700 dark:text-green-400">
          Manikganj Sadar, Manikganj-1800
        </p>
      </div>
    </header>
  );
};

export default Header;
