'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function StaffRegistrationForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: '',
    fatherName: '',
    motherName: '',
    dob: '',
    gender: '',
    religion: '',
    bloodGroup: '',
    nid: '',
    maritalStatus: '',
    phone: '',
    email: '',
    presentAddress: '',
    permanentAddress: '',
    emergencyName: '',
    emergencyPhone: '',
    degree: '',
    subject: '',
    institute: '',
    passingYear: '',
    gpa: '',
    staffId: 'STF' + Date.now(),
    designation: '',
    department: '',
    joiningDate: '',
    experience: '',
    salary: '',
    employmentType: '',
    workSchedule: '',
    skills: '',
    training: '',
    awards: '',
    comments: '',
    
    password: '',
    role: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      let base64Image: string | null = null;
      if (profileFile) base64Image = await convertToBase64(profileFile);

      const payload = { ...form, profilePicture: base64Image };

      const res = await fetch('/api/staff/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setMessage('✅ Staff registered successfully!');
      } else {
        setError(data.error || 'Something went wrong!');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileClick = () => fileInputRef.current?.click();
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0])
      setProfileFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="relative p-8">
      <button
        type="button"
        onClick={() => router.back()}
        className="absolute top-4 left-4 flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 shadow-md"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Go Back</span>
      </button>

      <h1 className="text-2xl font-bold text-center mb-6">🧾 Staff Registration Form</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1️⃣ Personal Information */}
        <Section title="👤 Personal Information">
          <div className="grid grid-cols-3 gap-4">
            <Input label="Full Name *" name="fullName" value={form.fullName} onChange={handleChange} />
            <Input label="Father's Name *" name="fatherName" value={form.fatherName} onChange={handleChange} />
            <Input label="Mother's Name" name="motherName" value={form.motherName} onChange={handleChange} />
            <Input type="date" label="Date of Birth *" name="dob" value={form.dob} onChange={handleChange} />
            <Select label="Gender *" name="gender" value={form.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
            <Select label="Religion" name="religion" value={form.religion} onChange={handleChange} options={['Islam', 'Hindu', 'Christian', 'Buddhist']} />
            <Select label="Blood Group" name="bloodGroup" value={form.bloodGroup} onChange={handleChange} options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+']} />
            <Input label="National ID / Birth Certificate" name="nid" value={form.nid} onChange={handleChange} />
            <Select label="Marital Status" name="maritalStatus" value={form.maritalStatus} onChange={handleChange} options={['Single', 'Married']} />
          </div>
        </Section>

        {/* 2️⃣ Contact Information */}
        <Section title="☎️ Contact Information">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Phone *" name="phone" value={form.phone} onChange={handleChange} />
            <Input label="Email *" name="email" type="email" value={form.email} onChange={handleChange} />
            <Input label="Present Address" name="presentAddress" value={form.presentAddress} onChange={handleChange} />
            <Input label="Permanent Address" name="permanentAddress" value={form.permanentAddress} onChange={handleChange} />
            <Input label="Emergency Contact Name" name="emergencyName" value={form.emergencyName} onChange={handleChange} />
            <Input label="Emergency Contact Number" name="emergencyPhone" value={form.emergencyPhone} onChange={handleChange} />
          </div>
        </Section>

        {/* 3️⃣ Education */}
        <Section title="🎓 Educational Qualification">
          <div className="grid grid-cols-3 gap-4">
            <Input label="Degree" name="degree" value={form.degree} onChange={handleChange} />
            <Input label="Subject" name="subject" value={form.subject} onChange={handleChange} />
            <Input label="Institute" name="institute" value={form.institute} onChange={handleChange} />
                        <Input label="GPA / CGPA" name="gpa" value={form.gpa} onChange={handleChange} />

            <Input label="Passing Year" name="passingYear" value={form.passingYear} onChange={handleChange} />
          </div>
        </Section>

        {/* 4️⃣ Job Info */}
        <Section title="💼 Employment Details">
          <div className="grid grid-cols-3 gap-4">
            <Input label="Staff ID" name="staffId" value={form.staffId} disabled />
            <Input label="Designation" name="designation" value={form.designation} onChange={handleChange} />
            <Input label="Department" name="department" value={form.department} onChange={handleChange} />
            <Input type="date" label="Joining Date" name="joiningDate" value={form.joiningDate} onChange={handleChange} />
            <Input label="Experience (Years)" name="experience" value={form.experience} onChange={handleChange} />
            <Input label="Salary Scale" name="salary" value={form.salary} onChange={handleChange} />
            <Select label="Employment Type" name="employmentType" value={form.employmentType} onChange={handleChange} options={['Permanent', 'Temporary', 'Contractual']} />
            <Input label="Work Schedule" name="workSchedule" value={form.workSchedule} onChange={handleChange} />
          </div>
        </Section>

        {/* 5️⃣ Extra Info */}
        <Section title="🧠 Extra / Skill Info">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Skills" name="skills" value={form.skills} onChange={handleChange} />
            <Input label="Training / Course" name="training" value={form.training} onChange={handleChange} />
            <Input label="Awards / Recognition" name="awards" value={form.awards} onChange={handleChange} />
            <Textarea label="Comments" name="comments" value={form.comments} onChange={handleChange} />
          </div>
        </Section>

        {/* 6️⃣ Login Info */}
        <Section title="🔐 Login Information">
          <div className="grid grid-cols-3 gap-4">
            <Input type="password" label="Password" name="password" value={form.password} onChange={handleChange} />
            <Input type="password" label="Confirm Password" name="password" value={form.password} onChange={handleChange} />
            <Select label="Role" name="role" value={form.role} onChange={handleChange} options={['Staff', 'Accountant', 'Clerk']} />
          </div>
        </Section>

        {/* Profile Photo */}
        <div>
          <span className="text-sm font-medium">📸 Profile Picture</span>
          <div
            onClick={handleProfileClick}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="mt-2 flex items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
          >
            {profileFile ? <span>{profileFile.name}</span> : <span>Click or Drag & Drop to upload</span>}
          </div>
          <input ref={fileInputRef} type="file" className="hidden" onChange={e => e.target.files && setProfileFile(e.target.files[0])} />
        </div>

        {error && <p className="text-red-600">{error}</p>}
        {message && <p className="text-green-600">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Registering...' : 'Register Staff'}
        </button>
      </form>
    </div>
  );
}

// Helper Components
function Input({ label, ...props }: any) {
  return (
    <label className="flex flex-col">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input {...props} className="mt-1 w-full rounded-lg border p-2 h-11" />
    </label>
  );
}

function Select({ label, options, ...props }: any) {
  return (
    <label className="flex flex-col">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <select {...props} className="mt-1 w-full rounded-lg border p-2 h-11">
        <option value="">Select</option>
        {options.map((opt: string) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}

function Textarea({ label, ...props }: any) {
  return (
    <label className="flex flex-col col-span-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <textarea {...props} rows={3} className="mt-1 w-full rounded-lg border p-2" />
    </label>
  );
}

function Section({ title, children }: any) {
  return (
    <section className="border rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
}
