'use client';

import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Zod Schema
const studentSchema = z
  .object({
    fullName: z.string().min(1, 'Full Name is required'),
    dob: z.string().min(1, 'Date of Birth is required'),
    motherName: z.string().min(1, "Mother's Name is required"),
    fatherName: z.string().min(1, "Father's Name is required"),
    studentId: z.string().min(1, 'Student ID is required'),
    phone: z
      .string()
      .min(11, 'Mobile number must be at least 11 digits')
      .regex(/^01[3-9]\d{8}$/, 'Invalid Bangladeshi mobile number'),
    class: z.string().min(1, 'Class is required'),
    group: z.string().min(1, 'Group is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type StudentForm = z.infer<typeof studentSchema>;

export default function StudentRegistrationForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<StudentForm>({
    resolver: zodResolver(studentSchema),
    mode: 'onChange',
  });

  // Class -> Group mapping
  const classGroups: Record<string, string[]> = {
    '1': ['A', 'B'],
    '2': ['A', 'B'],
    '3': ['A', 'B'],
    '4': ['A', 'B'],
    '5': ['A', 'B'],
    '6': ['A', 'B'],
    '7': ['A', 'B'],
    '8': ['A', 'B'],
    '9': ['Science', 'Commerce', 'Arts'],
    '10': ['Science', 'Commerce', 'Arts'],
    '11': ['Science', 'Commerce', 'Arts'],
    '12': ['Science', 'Commerce', 'Arts'],
  };
  const groups = selectedClass ? classGroups[selectedClass] : [];

  const handleFileChange = (file: File) => {
    setProfileFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmitForm = (data: StudentForm) => {
    console.log('Form submitted:', { ...data, profileFile });
    alert('Form submitted! Check console for data.');
  };

  const InputStatusIcon = ({ fieldName }: { fieldName: keyof StudentForm }) => {
    if (!touchedFields[fieldName]) return null;
    return errors[fieldName] ? (
      <AlertCircle className="w-5 h-5 text-red-600 ml-2" />
    ) : (
      <CheckCircle2 className="w-5 h-5 text-green-600 ml-2" />
    );
  };

  return (
    <div className="relative max-w-4xl mx-auto p-4">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="fixed top-4 left-4 flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 shadow-md z-50"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm">Back</span>
      </button>

      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Row 1: Full Name | Father’s Name */}
          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Full Name *</span>
            <input {...register('fullName')} placeholder="Enter full name" className="mt-1 w-full border p-2 rounded-lg h-11 pr-8" />
            <InputStatusIcon fieldName="fullName" />
            {errors.fullName && <span className="text-red-600 text-sm">{errors.fullName.message}</span>}
          </label>

          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Father's Name *</span>
            <input {...register('fatherName')} placeholder="Enter father's name" className="mt-1 w-full border p-2 rounded-lg h-11 pr-8" />
            <InputStatusIcon fieldName="fatherName" />
            {errors.fatherName && <span className="text-red-600 text-sm">{errors.fatherName.message}</span>}
          </label>

          {/* Row 2: Mother’s Name | DOB */}
          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Mother's Name *</span>
            <input {...register('motherName')} placeholder="Enter mother's name" className="mt-1 w-full border p-2 rounded-lg h-11 pr-8" />
            <InputStatusIcon fieldName="motherName" />
            {errors.motherName && <span className="text-red-600 text-sm">{errors.motherName.message}</span>}
          </label>

          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Date of Birth *</span>
            <input type="date" {...register('dob')} className="mt-1 w-full border p-2 rounded-lg h-11 pr-8" />
            <InputStatusIcon fieldName="dob" />
            {errors.dob && <span className="text-red-600 text-sm">{errors.dob.message}</span>}
          </label>

          {/* Row 3: Mobile Number | Student ID */}
          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Mobile Number *</span>
            <input {...register('phone')} placeholder="01XXXXXXXXX" className="mt-1 w-full border p-2 rounded-lg h-11 pr-8" />
            <InputStatusIcon fieldName="phone" />
            {errors.phone && <span className="text-red-600 text-sm">{errors.phone.message}</span>}
          </label>

          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Student ID / Roll *</span>
            <input {...register('studentId')} placeholder="Enter student ID" className="mt-1 w-full border p-2 rounded-lg h-11 pr-8" />
            <InputStatusIcon fieldName="studentId" />
            {errors.studentId && <span className="text-red-600 text-sm">{errors.studentId.message}</span>}
          </label>

          {/* Row 4: Class | Group */}
          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Class *</span>
            <select
              {...register('class')}
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="mt-1 w-full border p-2 rounded-lg h-11 pr-8"
            >
              <option value="">Select Class</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <InputStatusIcon fieldName="class" />
            {errors.class && <span className="text-red-600 text-sm">{errors.class.message}</span>}
          </label>

          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Group *</span>
            <div className="relative">
              <select {...register('group')} className="mt-1 w-full border p-2 rounded-lg h-11 pr-8 appearance-none">
                <option value="">Select Group</option>
                {groups.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-3 w-5 h-5 pointer-events-none text-gray-500" />
            </div>
            <InputStatusIcon fieldName="group" />
            {errors.group && <span className="text-red-600 text-sm">{errors.group.message}</span>}
          </label>

          {/* Row 5: Password | Confirm Password */}
          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Password *</span>
            <input type="password" {...register('password')} placeholder="Enter password" className="mt-1 w-full border p-2 rounded-lg h-11 pr-8" />
            <InputStatusIcon fieldName="password" />
            {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
          </label>

          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Confirm Password *</span>
            <input type="password" {...register('confirmPassword')} placeholder="Confirm password" className="mt-1 w-full border p-2 rounded-lg h-11 pr-8" />
            <InputStatusIcon fieldName="confirmPassword" />
            {errors.confirmPassword && <span className="text-red-600 text-sm">{errors.confirmPassword.message}</span>}
          </label>

        </div>

        {/* Profile Picture */}
        <div>
          <span className="text-sm font-medium text-slate-700">Profile Picture</span>
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); e.dataTransfer.files[0] && handleFileChange(e.dataTransfer.files[0]); }}
            className="mt-2 flex items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
          >
            {previewUrl ? <img src={previewUrl} className="h-full object-contain" alt="Preview" /> : <span>Click or Drag & Drop to upload</span>}
          </div>
          <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => e.target.files && handleFileChange(e.target.files[0])} />
        </div>

        <button type="submit" className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
}
