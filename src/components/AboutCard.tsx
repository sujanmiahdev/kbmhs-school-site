"use client";

import React from "react";

export default function AboutCard() {
  return (
    <div className="w-full max-w-md mx-auto shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300 p-6 hover:shadow-2xl hover:scale-[1.02] transform-gpu">
      {/* Title */}
      <h1 className="text-2xl font-extrabold text-green-600 dark:text-green-400 mb-4 text-center md:text-left">
        About Us
      </h1>

      {/* Information */}
      <div className="space-y-2 text-sm font-medium text-center md:text-left">
        <p>
          <span className="font-semibold text-gray-600 dark:text-gray-400">Upazila Code:</span>{" "}
          <span className="text-gray-800 dark:text-gray-200">183</span>
        </p>
        <p>
          <span className="font-semibold text-gray-600 dark:text-gray-400">District Code:</span>{" "}
          <span className="text-gray-800 dark:text-gray-200">22</span>
        </p>
        <p>
          <span className="font-semibold text-gray-600 dark:text-gray-400">School Code:</span>{" "}
          <span className="text-gray-800 dark:text-gray-200">4046</span>
        </p>
        <p>
          <span className="font-semibold text-gray-600 dark:text-gray-400">Center Code:</span>{" "}
          <span className="text-gray-800 dark:text-gray-200">222</span>
        </p>

        <p className="text-green-700 dark:text-green-400">Post Office: Borondi</p>
        <p>
          <span className="font-semibold text-gray-600 dark:text-gray-400">Village:</span>{" "}
          <span className="text-gray-800 dark:text-gray-200">Kumolli</span>
        </p>
        <p className="text-red-500 dark:text-red-400">Upazila: Manikganj Sadar</p>
        <p className="text-purple-600 dark:text-purple-400">District: Manikganj</p>

        <p className="text-red-600 dark:text-red-400">Mobile: 01840000000</p>
        <p className="text-green-900 dark:text-green-300">E-mail: kbmmhs40@gmail.com</p>
      </div>
    </div>
  );
}
