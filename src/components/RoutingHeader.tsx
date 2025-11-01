"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa";



export default function RoutingHeader() {
  return (
    <header className="w-full shadow-lg z-50 bg-yellow-400 dark:bg-gray-800 transition-colors duration-300">
      {/* Top Row: Logo + School Name + Social Icons */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-2 gap-3 md:gap-0 min-w-[320px]">
        
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center md:items-start">
          <div className="w-20 h-20 relative">
            <Image
              src="/image/kbmhs-logo.png"
              alt="KBMHS Logo"
              fill
              className="object-contain"
            />
          </div>
          
        </Link>

        {/* School Name */}
        <h1 className="text-4xl sm:text-lg md:text-2xl lg:text-4xl font-extrabold text-center text-black dark:text-white whitespace-nowrap overflow-hidden truncate transition-colors duration-300">
          Kumulli Bachchu Mia Model High School
        </h1>

{/* Social Icons */}
<div className="flex gap-4 justify-center md:justify-end text-gray-600">
  <a
    href="https://facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-blue-800 transition"
  >
    <FaFacebookF size={30} />
  </a>
  <a
    href="https://youtube.com"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-red-600 transition"
  >
    <FaYoutube size={30} />
  </a>
  <a
    href="https://twitter.com"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-blue-400 transition"
  >
    <FaTwitter size={30} />
  </a>
</div>

      </div>

      {/* Bottom Row: Address */}
      <div className="text-center font-bold text-xs sm:text-sm md:text-base pb-1 transition-colors duration-300">
        <p>Established: 2012</p>
        <p className="text-green-700 dark:text-green-400">
          Kumolli, Manikganj Sadar, Manikganj-1800
        </p>
      </div>

      
    </header>
  );
}
