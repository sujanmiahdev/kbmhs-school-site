'use client';

import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Zod Schema for Parent
const parentSchema = z
  .object({
    fullName: z.string().min(1, 'Full Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z
      .string()
      .min(11, 'Mobile number must be at least 11 digits')
      .regex(/^01[3-9]\d{8}$/, 'Invalid Bangladeshi mobile number'),
    address: z.string().min(1, 'Address is required'),
    relationship: z.enum(['Father', 'Mother', 'Guardian'], 'Relationship is required'),
    studentFullName: z.string().min(1, 'Student full name is required'),
    studentId: z.string().min(1, 'Student ID/Roll is required'),
    studentClass: z.string().min(1, 'Class is required'),
    section: z.string().min(1, 'Section/Group is required'),
    session: z.string().min(1, 'Session is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ParentForm = z.infer<typeof parentSchema>;

export default function ParentRegistrationForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    watch,
  } = useForm<ParentForm>({
    resolver: zodResolver(parentSchema),
    mode: 'onChange',
  });

  const handleFileChange = (file: File) => {
    setProfileFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmitForm = (data: ParentForm) => {
    console.log('Parent Form submitted:', { ...data, profileFile });
    alert('Form submitted! Check console for data.');
  };

  const InputStatusIcon = ({ fieldName }: { fieldName: keyof ParentForm }) => {
    if (!touchedFields[fieldName]) return null;
    return errors[fieldName] ? (
      <AlertCircle className="w-5 h-5 text-red-600 ml-2" />
    ) : (
      <CheckCircle2 className="w-5 h-5 text-green-600 ml-2" />
    );
  };

  const inputClass = 'mt-1 w-full border p-2 rounded-lg h-11';

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
          {/* Row 1: Full Name | Email */}
          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Full Name *</span>
            <input {...register('fullName')} placeholder="Enter full name" className={inputClass + ' pr-8'} />
            <InputStatusIcon fieldName="fullName" />
            {errors.fullName && <span className="text-red-600 text-sm">{errors.fullName.message}</span>}
          </label>

          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Email *</span>
            <input {...register('email')} placeholder="Enter email" className={inputClass + ' pr-8'} />
            <InputStatusIcon fieldName="email" />
            {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
          </label>

          {/* Row 2: Mobile Number | Address */}
          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Mobile Number *</span>
            <input {...register('phone')} placeholder="01XXXXXXXXX" className={inputClass + ' pr-8'} />
            <InputStatusIcon fieldName="phone" />
            {errors.phone && <span className="text-red-600 text-sm">{errors.phone.message}</span>}
          </label>

          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Address *</span>
            <input {...register('address')} placeholder="Enter address" className={inputClass + ' pr-8'} />
            <InputStatusIcon fieldName="address" />
            {errors.address && <span className="text-red-600 text-sm">{errors.address.message}</span>}
          </label>

          {/* Row 3: Relationship | Student Full Name */}
          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Relationship to Student *</span>
            <select {...register('relationship')} className={inputClass + ' pr-8 appearance-none'}>
              <option value="">Select Relationship</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Guardian">Guardian</option>
            </select>
            <InputStatusIcon fieldName="relationship" />
            {errors.relationship && <span className="text-red-600 text-sm">{errors.relationship.message}</span>}
          </label>

          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Student Full Name *</span>
            <input {...register('studentFullName')} placeholder="Enter student full name" className={inputClass + ' pr-8'} />
            <InputStatusIcon fieldName="studentFullName" />
            {errors.studentFullName && <span className="text-red-600 text-sm">{errors.studentFullName.message}</span>}
          </label>

          {/* Row 4: Student ID | Class */}
          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Student ID / Roll *</span>
            <input {...register('studentId')} placeholder="Enter student ID/roll" className={inputClass + ' pr-8'} />
            <InputStatusIcon fieldName="studentId" />
            {errors.studentId && <span className="text-red-600 text-sm">{errors.studentId.message}</span>}
          </label>

          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Class *</span>
            <input {...register('studentClass')} placeholder="Enter class" className={inputClass + ' pr-8'} />
            <InputStatusIcon fieldName="studentClass" />
            {errors.studentClass && <span className="text-red-600 text-sm">{errors.studentClass.message}</span>}
          </label>

          {/* Row 5: Section/Group | Session */}
          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Section/Group *</span>
            <input {...register('section')} placeholder="Enter section/group" className={inputClass + ' pr-8'} />
            <InputStatusIcon fieldName="section" />
            {errors.section && <span className="text-red-600 text-sm">{errors.section.message}</span>}
          </label>

          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Session *</span>
            <input {...register('session')} placeholder="Enter session" className={inputClass + ' pr-8'} />
            <InputStatusIcon fieldName="session" />
            {errors.session && <span className="text-red-600 text-sm">{errors.session.message}</span>}
          </label>

          {/* Row 6: Password | Confirm Password */}
          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Password *</span>
            <input type="password" {...register('password')} placeholder="Enter password" className={inputClass + ' pr-8'} />
            <InputStatusIcon fieldName="password" />
            {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
          </label>

          <label className="flex flex-col relative">
            <span className="text-sm font-medium text-slate-700">Confirm Password *</span>
            <input type="password" {...register('confirmPassword')} placeholder="Confirm password" className={inputClass + ' pr-8'} />
            <InputStatusIcon fieldName="confirmPassword" />
            {errors.confirmPassword && <span className="text-red-600 text-sm">{errors.confirmPassword.message}</span>}
          </label>

          {/* Row 7: Profile Picture (full width) */}
          <div className="col-span-1 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Profile Picture</span>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                e.dataTransfer.files[0] && handleFileChange(e.dataTransfer.files[0]);
              }}
              className="mt-2 flex items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
            >
              {previewUrl ? (
                <img src={previewUrl} className="h-full object-contain" alt="Preview" />
              ) : (
                <span>Click or Drag & Drop to upload</span>
              )}
            </div>
            <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => e.target.files && handleFileChange(e.target.files[0])} />
          </div>
        </div>

        <button type="submit" className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
}
