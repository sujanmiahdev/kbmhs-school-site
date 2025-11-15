'use client';

import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Image from 'next/image';


const governingMembers = [
  {
    name: 'Md. Alamgir Hossain',
    role: 'Chairman',
    type: 'Guardian Representative',
    image: '/image/chairman.jpg',
    contact: '017xxxxxxxx',
  },
  {
    name: 'Mrs. Nazma Akter',
    role: 'Teacher Representative',
    type: 'Senior Teacher (Bangla)',
    image: '/image/Teacher Representative.jpg',
    contact: '018xxxxxxxx',
  },
  {
    name: 'Md. Humayun Kabir',
    role: 'Guardian Member',
    type: 'Guardian Representative',
    image: '/image/Guardian Representative.jpg',
    contact: '019xxxxxxxx',
  },
  {
    name: 'Abdul Karim',
    role: 'Head Teacher',
    type: 'Member Secretary',
    image: '/image/headteacher1.jpg',
    contact: '016xxxxxxxx',
  },
];

 const menuItems = [
    { name: "Home", link: "/" },
    { name: "Institute", dropdown: [
      { name: "Welcome Speech", link: "/welcome-speech" },
      { name: "Institute Details", link: "/institute-details" },
      { name: "Governing Body", link: "/navbar/governing-body/components" },
     { name: "Director General", link: "#" }
    ] },
    { name: "Administration", link: "#" },
    { name: "Teacher", link: "#" },
    { name: "Staff & MLSS", dropdown: [
      { name: "Staff", link: "#" },
      { name: "MLSS", link: "#" }
    ] },
    { name: "Students", link: "#" },
    { name: "Academic", dropdown: [
      { name: "Admission", link: "#" },
      { name: "Book List", link: "#" },
      { name: "Dress", link: "#" },
      { name: "Syllabus", link: "#" },
      { name: "Class Routine", link: "#" },
      { name: "Exam Routine", link: "#" }
    ] },
    { name: "Result", dropdown: [
      { name: "School Result", link: "#" },
      { name: "Board Result", link: "#" }
    ] },
    { name: "Publications", dropdown: [
      { name: "Magazine", link: "#" },
      { name: "Media News", link: "#" }
    ] },
    { name: "Gallery", dropdown: [
      { name: "Photo Gallery", link: "#" },
      { name: "Video Gallery", link: "#" }
    ] },
  ];

export default function GoverningBody() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 py-8 px-6 transition-colors duration-500">
      {/* Header */}
 
 <div className="max-w-6xl mx-auto text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
          Governing Body (2024–2026)
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          The Governing Body ensures the proper management, discipline, and
          development of the institution.
        </p>
      </div>

      {/* Member Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {governingMembers.map((member, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Card className="shadow-lg dark:shadow-black/30 hover:shadow-2xl transition-all duration-300 rounded-3xl border-none bg-white dark:bg-gray-900">
              <CardContent className="flex flex-col items-center text-center p-2">
                <div className="relative w-40 h-40 mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                      className="rounded-lg object-cover border-4 border-indigo-200 dark:border-indigo-500 shadow-md"
                  />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {member.name}
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium">{member.role}</p>
                <p className="text-sm text-slate-500 dark:text-slate-300 mb-2">{member.type}</p>
                <span className="text-sm text-slate-400 dark:text-slate-400">{member.contact}</span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-10 pb-8 text-sm text-slate-500 dark:text-slate-400">
        <p>
          Approved by the School Managing Committee — Effective from January 2024 to
          December 2026.
        </p>
      </div>
    </div>
  );
}
