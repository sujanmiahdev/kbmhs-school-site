'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function TeacherRegistrationForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // --- State ---
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [nid, setNid] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [presentAddress, setPresentAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [degree, setDegree] = useState('');
  const [subjectMajor, setSubjectMajor] = useState('');
  const [institution, setInstitution] = useState('');
  const [passingYear, setPassingYear] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [teacherId] = useState(() => 'TCH' + Date.now());
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [experience, setExperience] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [skills, setSkills] = useState('');
  const [publications, setPublications] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [profileFile, setProfileFile] = useState<File | null>(null);
   const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // --- Field specific errors ---
  const [errors, setErrors] = useState<Record<string, string>>({});

  // --- Passing Year Options ---
  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
 
  //  Convert image to base64
 const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};


  // --- Handlers ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setErrors({});

    const requiredFields = [
      { key: 'fullName', name: 'Full Name', value: fullName },
      { key: 'gender', name: 'Gender', value: gender },
      { key: 'fatherName', name: "Father's Name", value: fatherName },
      { key: 'phone', name: 'Mobile Number', value: phone },
      { key: 'email', name: 'Email', value: email },
      { key: 'permanentAddress', name: 'Permanent Address', value: permanentAddress },
      { key: 'department', name: 'Department / Subject', value: department },
      { key: 'subjectMajor', name: 'Subject / Major', value: subjectMajor },
      { key: 'passingYear', name: 'Passing Year', value: passingYear },
      { key: 'designation', name: 'Designation', value: designation },
      { key: 'degree', name: 'Highest Degree', value: degree },
      { key: 'password', name: 'Password', value: password },
      { key: 'confirmPassword', name: 'Confirm Password', value: confirmPassword },
      { key: 'dob', name: 'Date of Birth', value: dob },
      { key: 'joiningDate', name: 'Joining Date', value: joiningDate },
      { key: 'institution', name: 'University / College', value: institution },
      { key: 'emergencyName', name: 'Emergency Contact Name', value: emergencyName },
      { key: 'emergencyPhone', name: 'Emergency Contact Phone', value: emergencyPhone },
    ];

    const newErrors: Record<string, string> = {};
    for (const field of requiredFields) {
      if (!field.value || field.value.trim() === '') {
        newErrors[field.key] = `${field.name} is required`;
      }
    }

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors['confirmPassword'] = "Passwords don't match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
       let base64Image: string | null = null
    if (profileFile) {
      base64Image = await convertToBase64(profileFile)
    }

   
  
      const payload = {
        basic: { fullName, fatherName, motherName, dob, gender, nid, maritalStatus },
        contact: { phone, email, presentAddress, permanentAddress },
        academic: { degree, subjectMajor, institution, passingYear, cgpa },
        professional: { teacherId, designation, department, experience, joiningDate },
        extra: {
          skills,
          publications,
          bloodGroup,
          emergencyContact: { name: emergencyName, phone: emergencyPhone },
        },
        credentials: { email, password },
        profilePicture:base64Image,
      };

      //  API call
   const res = await fetch('/api/teacher/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const result = await res.json()

    if (result.success) {
      alert('✅ Teacher registered successfully!')
      setMessage('Teacher successfully added.')
      setErrors({})
      
    } else {
      alert(`❌ Error: ${result.error}`)
    }
  } catch (err: any) {
    console.error(err)
    setErrors({ general: err.message })
  } finally {
    setLoading(false)
  }
}

  const handleProfileClick = () => fileInputRef.current?.click();
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0])
      setProfileFile(e.dataTransfer.files[0]);
  };

  const inputClass = 'mt-1 w-full rounded-lg border p-2 h-11';

  return (
    <div className="relative">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="fixed top-4 left-4 flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 shadow-md z-50"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm">Back</span>
      </button>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-7xl mx-auto pt-0 ">
        <div className="grid grid-cols-3 gap-6">

          {/* -------- Column 1 -------- */}
          <div className="space-y-4">
            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Full Name *</span>
              <input value={fullName} onChange={e => setFullName(e.target.value)} className={inputClass} />
              {errors.fullName && <span className="text-red-600 text-sm">{errors.fullName}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Marital Status</span>
              <select value={maritalStatus} onChange={e => setMaritalStatus(e.target.value)} className={inputClass}>
                <option value="">Select Marital Status</option>
                <option>Single</option>
                <option>Married</option>
                <option>Other</option>
              </select>
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">National ID / Birth Certificate No.</span>
              <input value={nid} onChange={e => setNid(e.target.value)} className={inputClass} />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Present Address</span>
              <input value={presentAddress} onChange={e => setPresentAddress(e.target.value)} className={inputClass} />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Designation *</span>
              <select value={designation} onChange={e => setDesignation(e.target.value)} className={inputClass}>
                <option value="">Select Designation</option>
                <option>Assistant Teacher</option>
                <option>Lecturer</option>
                <option>Senior Teacher</option>
                <option>Head Teacher</option>
              </select>
              {errors.designation && <span className="text-red-600 text-sm">{errors.designation}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Highest Degree *</span>
              <select value={degree} onChange={e => setDegree(e.target.value)} className={inputClass}>
                <option value="">Select Highest Degree</option>
                <option>B.Sc</option>
                <option>M.Sc</option>
                <option>Honors</option>
                <option>Masters</option>
              </select>
              {errors.degree && <span className="text-red-600 text-sm">{errors.degree}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">CGPA / Division</span>
              <input value={cgpa} onChange={e => setCgpa(e.target.value)} className={inputClass} />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Publications / Research</span>
              <input value={publications} onChange={e => setPublications(e.target.value)} className={inputClass} />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Emergency Contact Phone *</span>
              <input value={emergencyPhone} onChange={e => setEmergencyPhone(e.target.value)} className={inputClass} />
              {errors.emergencyPhone && <span className="text-red-600 text-sm">{errors.emergencyPhone}</span>}
            </label>
          </div>

          {/* -------- Column 2 -------- */}
          <div className="space-y-4">
            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Gender *</span>
              <select value={gender} onChange={e => setGender(e.target.value)} className={inputClass}>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {errors.gender && <span className="text-red-600 text-sm">{errors.gender}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Father's Name *</span>
              <input value={fatherName} onChange={e => setFatherName(e.target.value)} className={inputClass} />
              {errors.fatherName && <span className="text-red-600 text-sm">{errors.fatherName}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Mobile Number *</span>
              <input value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} />
              {errors.phone && <span className="text-red-600 text-sm">{errors.phone}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Permanent Address *</span>
              <input value={permanentAddress} onChange={e => setPermanentAddress(e.target.value)} className={inputClass} />
              {errors.permanentAddress && <span className="text-red-600 text-sm">{errors.permanentAddress}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Department / Subject *</span>
              <input value={department} onChange={e => setDepartment(e.target.value)} className={inputClass} />
              {errors.department && <span className="text-red-600 text-sm">{errors.department}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Subject / Major *</span>
              <input value={subjectMajor} onChange={e => setSubjectMajor(e.target.value)} className={inputClass} />
              {errors.subjectMajor && <span className="text-red-600 text-sm">{errors.subjectMajor}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Passing Year *</span>
              <select value={passingYear} onChange={e => setPassingYear(e.target.value)} className={inputClass}>
                <option value="">Select Passing Year</option>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              {errors.passingYear && <span className="text-red-600 text-sm">{errors.passingYear}</span>}
            </label>

           {/* Blood Group */}
          {/* Blood Group */}
            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Blood Group</span>
              <select value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} className={inputClass}>
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              {errors.bloodGroup && <span className="text-red-600 text-sm">{errors.bloodGroup}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Password *</span>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className={inputClass} />
              {errors.password && <span className="text-red-600 text-sm">{errors.password}</span>}
            </label>
          </div>

          {/* -------- Column 3 -------- */}
          <div className="space-y-4">
            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Date of Birth *</span>
              <input type="date" value={dob} onChange={e => setDob(e.target.value)} className={inputClass} />
              {errors.dob && <span className="text-red-600 text-sm">{errors.dob}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Mother's Name</span>
              <input value={motherName} onChange={e => setMotherName(e.target.value)} className={inputClass} />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Email *</span>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
              {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Teacher ID</span>
              <input value={teacherId} disabled className={`${inputClass} bg-gray-100`} />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Joining Date *</span>
              <input type="date" value={joiningDate} onChange={e => setJoiningDate(e.target.value)} className={inputClass} />
              {errors.joiningDate && <span className="text-red-600 text-sm">{errors.joiningDate}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">University / College *</span>
              <input value={institution} onChange={e => setInstitution(e.target.value)} className={inputClass} />
              {errors.institution && <span className="text-red-600 text-sm">{errors.institution}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Skills</span>
              <input value={skills} onChange={e => setSkills(e.target.value)} placeholder="Computer, Language, Training" className={inputClass} />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Emergency Contact Name *</span>
              <input value={emergencyName} onChange={e => setEmergencyName(e.target.value)} className={inputClass} />
              {errors.emergencyName && <span className="text-red-600 text-sm">{errors.emergencyName}</span>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">Confirm Password *</span>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className={inputClass} />
              {errors.confirmPassword && <span className="text-red-600 text-sm">{errors.confirmPassword}</span>}
            </label>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="mt-6">
          <label className="flex flex-col">
            <span className="text-sm font-medium text-slate-700">Profile Picture</span>
            <div
              onClick={handleProfileClick}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="mt-2 flex items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
            >
              {profileFile ? (
                <span>{profileFile.name}</span>
              ) : (
                <span>Click or Drag & Drop to upload</span>
              )}
            </div>
            <input ref={fileInputRef} type="file" className="hidden" onChange={e => e.target.files && setProfileFile(e.target.files[0])} />
          </label>
        </div>

        {/* Error / Success Messages */}
        {error && <p className="text-red-600">{error}</p>}
        {message && <p className="text-green-600">{message}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
