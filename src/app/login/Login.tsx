'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

// ✅ Zod validation schema
const loginSchema = z.object({
  category: z.enum(['Student', 'Teacher', 'Guardian', 'Admin'])
    .refine((val) => !!val, { message: 'Select a category' }),
  fullName: z.string().min(3, { message: 'Full Name must be at least 3 characters' }),
  MobileNumber: z.string()
    .regex(/^(01)[3-9]\d{8}$/, { message: 'Enter a valid Bangladeshi mobile number (e.g. 017XXXXXXXX)' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const [role, setRole] = useState("");

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Login Data:', data);
    router.push('/dashboard'); // Redirect after login
  };

  return (
    <div className="max-w-md mx-auto m-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Category */}
        <div className="relative mb-6 w-full">
          <select
            {...register("category")}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="peer block w-full px-4 pt-5 pb-2 text-gray-900 bg-transparent border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="" disabled hidden></option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Guardian">Guardian</option>
            <option value="Admin">Admin</option>
          </select>

          <motion.label
            animate={{
              top: role ? -8 : 16,
              fontSize: role ? 12 : 16,
              color: role ? "#2563eb" : "#6b7280",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute left-4 px-1 pointer-events-none bg-white"
          >
            Select Category
          </motion.label>

          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Full Name */}
        <div>
          <label>Full Name</label>
          <input
            type="text"
            {...register('fullName')}
            className="w-full border p-2 rounded"
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label>Mobile Number</label>
          <input
            type="tel"
            {...register('MobileNumber')}
            className="w-full border p-2 rounded"
            placeholder="Enter your mobile number"
          />
          {errors.MobileNumber && (
            <p className="text-red-500 text-sm">{errors.MobileNumber.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label>Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full border p-2 rounded"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-green-600"
        >
          Login
        </button>

        {/* Forgotten password link - Centered */}
        <div className="text-center mt-4">
          <a
            href="/forgot-password"  // Change this route to your password reset page
            className="text-blue-500 text-sm hover:underline"
          >
            Forgotten password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
