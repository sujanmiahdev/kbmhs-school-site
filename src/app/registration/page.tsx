"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import TeacherRegistrationForm from "@/app/registration/teacher/TeacherRegistrationForm";
import StudentRegistrationForm from "@/app/registration/student/StudentRegistrationForm";

export default function RegistrationSelector() {
  const [role, setRole] = useState("");
  const router = useRouter();

  const handleGo = () => {
    if (!role) return;
    router.push(`/registration/${role.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-100 dark:bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 transition-colors duration-500 mt-12"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-8">
          Register
        </h1>

        {/* Floating Label Dropdown */}
        <div className="relative mb-6 w-full max-w-md mx-auto">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="peer block w-full px-4 pt-5 pb-2 text-gray-900 dark:text-gray-100 bg-transparent border-2 border-gray-300 dark:border-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="" disabled hidden></option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
            
          </select>

          {/* Animated Label */}
          <motion.label
            animate={{
              top: role ? -8 : 16,
              fontSize: role ? 12 : 16,
              color: role ? "#2563eb" : "#6b7280",
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
        
      </motion.div>
  {/* Student Registration Form Wide */}
   {role === "student" && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl mt-2 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-colors duration-500"
        >
          <h1 className="text-2xl text-center font-semibold mb-4 ">Student Registration</h1>
          <p className="text-sm text-center text-slate-600 mb-6">
            Create an account to access the student dashboard.
          </p>
          <StudentRegistrationForm />
        </motion.div>
      )}

      {/* Teacher Registration Form Wide */}
      {role === "teacher" && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl mt-2 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-colors duration-500"
        >
          <h1 className="text-2xl text-center font-semibold mb-4 ">Teacher Registration</h1>
          <p className="text-sm text-center text-slate-600 mb-6">
            Create an account to access the teacher dashboard.
          </p>
          <TeacherRegistrationForm />
        </motion.div>
      )}

    </div>
  );
}
