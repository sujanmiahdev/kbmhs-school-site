'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Teacher = {
  id: number;
  pdsId: string;
  name: string;
  subject: string;
  image: string;
  contact: string;
  mainPost: string;
  joiningDate: string;
  homeDistrict: string;
};

const teachers: Teacher[] = [
  {
    id: 1,
    pdsId: 'PDS001',
    name: 'Sujan Miah',
    subject: 'Mathematics',
    image: '/image/teacher1.jpg',
    contact: '017xxxxxxxx',
    mainPost: 'Senior Teacher',
    joiningDate: '01 Jan 2020',
    homeDistrict: 'Dhaka',
  },
  {
    id: 2,
    pdsId: 'PDS002',
    name: 'Dipa Akter',
    subject: 'English',
    image: '/image/teacher2.jpg',
    contact: '018xxxxxxxx',
    mainPost: 'Assistant Teacher',
    joiningDate: '15 Feb 2021',
    homeDistrict: 'Chittagong',
  },
  {
    id: 3,
    pdsId: 'PDS003',
    name: 'Rahim Uddin',
    subject: 'Science',
    image: '/image/teacher3.jpg',
    contact: '019xxxxxxxx',
    mainPost: 'Teacher',
    joiningDate: '20 Mar 2019',
    homeDistrict: 'Khulna',
  },
    {
    id: 4,
    pdsId: 'PDS004',
    name: 'Ashik Ahmed',
    subject: 'Science',
    image: '/image/teacher4.jpg',
    contact: '019xxxxxxxx',
    mainPost: 'Teacher',
    joiningDate: '20 Mar 2019',
    homeDistrict: 'Khulna',
  },
    {
    id: 5,
    pdsId: 'PDS005',
    name: 'Atik Khan',
    subject: 'Science',
    image: '/image/teacher5.jpg',
    contact: '019xxxxxxxx',
    mainPost: 'Teacher',
    joiningDate: '20 Mar 2019',
    homeDistrict: 'Khulna',
  },
    {
    id: 6,
    pdsId: 'PDS006',
    name: 'Shaila Akter',
    subject: 'Science',
    image: '/image/image6.jpg',
    contact: '019xxxxxxxx',
    mainPost: 'Teacher',
    joiningDate: '20 Mar 2019',
    homeDistrict: 'Khulna',
  },
    {
    id: 7,
    pdsId: 'PDS007',
    name: 'Rakib Hasan',
    subject: 'Science',
    image: '/image/image7.jpg',
    contact: '019xxxxxxxx',
    mainPost: 'Teacher',
    joiningDate: '20 Mar 2019',
    homeDistrict: 'Khulna',
  },
  {
    id: 8,
    pdsId: 'PDS008',
    name: 'Sadia Rahman',
    subject: 'Bangla',
    image: '/image/teacher8.jpg',
    contact: '016xxxxxxxx',
    mainPost: 'Teacher',
    joiningDate: '05 May 2022',
    homeDistrict: 'Barishal',
  },
];

const subjectColors: Record<string, string> = {
  Mathematics: 'bg-gradient-to-r from-blue-400 to-blue-600',
  English: 'bg-gradient-to-r from-green-400 to-green-600',
  Science: 'bg-gradient-to-r from-purple-400 to-purple-600',
  Bangla: 'bg-gradient-to-r from-pink-400 to-pink-600',
};

const TeacherCard: React.FC<{ teacher: Teacher }> = ({ teacher }) => (
  <motion.div
    className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* Square profile image */}
    <div className="w-35 h-35 relative mb-4 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <Image
        src={teacher.image}
        alt={teacher.name}
        fill
        className="object-cover"
      />
    </div>

    <h2 className="text-xl font-semibold text-gray-800">{teacher.name}</h2>

    {/* Subject Badge */}
    <div
      className={`text-white text-xs px-3 py-1 rounded-full mb-2 ${
        subjectColors[teacher.subject] || 'bg-gray-400'
      }`}
    >
      {teacher.subject}
    </div>

    {/* Teacher Details */}
    <div className="text-sm text-gray-600 space-y-1">
      <p>PDS ID: <span className="font-medium text-gray-800">{teacher.pdsId}</span></p>
      <p>Post: <span className="font-medium text-gray-800">{teacher.mainPost}</span></p>
      <p>Joining Date: <span className="font-medium text-gray-800">{teacher.joiningDate}</span></p>
      <p>District: <span className="font-medium text-gray-800">{teacher.homeDistrict}</span></p>
      <p>📞 <span className="font-medium text-gray-800">{teacher.contact}</span></p>
    </div>
  </motion.div>
);

const Teacher: React.FC = () => (
  <div className="py-12 px-10 max-w-7xl mx-auto">
    <h1 className="text-4xl font-bold mb-3 text-center text-gray-800">Our Teachers</h1>

<p className="text-center text-gray-600 max-w-2xl mx-auto mb-4">
  Meet our dedicated and experienced faculty who inspire and guide our students 
  towards academic excellence and personal growth.
</p>
<div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-10"></div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {teachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}
    </div>
  </div>
);

export default Teacher;
