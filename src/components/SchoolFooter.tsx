// src/components/SchoolFooter.tsx
"use client";

import React from "react";
import Image from "next/image";
import AboutCard from "@/components/AboutCard";
import UsefulLink from "@/components/UsefulLink"

export default function SchoolFooter() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-0">
      <div className="max-w-7xl mx-auto px-6 py-1">
        {/* 3 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       
          {/* 2️⃣ Contact Info & Codes */}
          
          <div className="space-y-2 text-sm font-semibold text-center justify-center items-center md:text-left">
            <AboutCard />
          </div>

          {/* 3️⃣ Google Map (Card Style) */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] transform-gpu">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d645.6023654958027!2d90.07717727077197!3d23.744580481180602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37558ca12785d4ef%3A0xc98505f318597cee!2sKumulli%20Bachchu%20Mia%20Model%20High%20School!5e0!3m2!1sen!2sbd!4v1758045667198!5m2!1sen!2sbd"
              width="100%"
              height="370"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>

          <div>
            <UsefulLink/>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 py-2 text-center font-bold text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
          &copy; {new Date().getFullYear()} Kumulli Bachchu Mia Model High School. All rights reserved.
          <p>Design & Developed by <span className="text-red-700">Sujan Miah</span> </p>
        </div>
      </div>
    </footer>
  );
}
