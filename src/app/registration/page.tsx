"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RegistrationSelector() {
  const [role, setRole] = useState("");
  const router = useRouter();

  const handleGo = () => {
    if (!role) return;
    router.push(`/registration/${role.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 transition-colors duration-500"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-8">
          Register
        </h1>

        {/* Floating Label Dropdown */}
        <div className="relative mb-6">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="peer block w-full px-4 pt-5 pb-2 text-gray-900 dark:text-gray-100 bg-transparent border-2 border-gray-300 dark:border-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="" disabled hidden></option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Parent">Parent</option>
            <option value="Admin">Admin</option>
          </select>

          {/* Animated Label */}
          <motion.label
            animate={{
              top: role ? -8 : 16, // px top position
              fontSize: role ? 12 : 16, // px font size
              color: role ? "#2563eb" : "#6b7280", // blue-600 or gray-500
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute left-4 px-1 pointer-events-none bg-white dark:bg-gray-800"
          >
            Select Category
          </motion.label>

          {/* Arrow icon */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-300">
            ▼
          </div>
        </div>

        {/* Go Button */}
        <motion.button
          onClick={handleGo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-600 transition"
        >
          Go
        </motion.button>
      </motion.div>
    </div>
  );
}
