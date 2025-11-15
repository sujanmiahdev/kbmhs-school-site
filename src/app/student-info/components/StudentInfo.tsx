'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const students = [
  {
    id: '2111',
    roll: '1',
    name: 'Ayesha Siddika',
    class: 'Ten',
    shift: 'Day',
    section: 'Ka',
    year: '2025',
    group: 'Science',
    bloodGroup: 'A+',
    photo: '/image/student2.jpg',
  },
  {
    id: '2113',
    roll: '5',
    name: 'Raju Ahmed',
    class: 'Nine',
    shift: 'Day',
    section: 'Ka',
    year: '2025',
    group: 'Commerce',
    bloodGroup: 'B+',
    photo: '/image/student1.jpg',
  },
  {
    id: '2112',
    roll: '6',
    name: 'Mst. Sinthiya Tahorin Proma',
    class: 'Ten',
    shift: 'Day',
    section: 'Ka',
    year: '2025',
    group: 'Arts',
    bloodGroup: 'O+',
    photo: '/image/student4.jpg',
  },
  // আরও student data এখানে add করতে পারো
];

export default function StudentCardPage() {
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedShift, setSelectedShift] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Generate years dynamically from present to 1970
  const years = Array.from(
    { length: new Date().getFullYear() - 1970 + 1 },
    (_, i) => (new Date().getFullYear() - i).toString()
  );

  const filteredStudents = students.filter((student) => {
    const matchClass = selectedClass === 'All' || student.class === selectedClass;
    const matchShift = selectedShift === 'All' || student.shift === selectedShift;
    const matchSection = selectedSection === 'All' || student.section === selectedSection;
    const matchYear = selectedYear === 'All' || student.year === selectedYear;
    const matchSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roll.includes(searchTerm) ||
      student.id.includes(searchTerm);

    return matchClass && matchShift && matchSection && matchYear && matchSearch;
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-3 text-center text-gray-800">
          Student Information
        </h1>
     {/* subtitle */}

     <p className="text-center text-gray-600 max-w-2xl mx-auto mb-4">
  View detailed profiles of our students, including academic, personal, and contact information.
</p>
<div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-10"></div>

        {/* Filters */}
        <div className="grid md:grid-cols-5 gap-6 bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg mb-10">
          {/* Class Filter */}
          <select
  value={selectedClass}
  onChange={(e) => setSelectedClass(e.target.value)}
  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
>
  <option>All Classes</option>
  {Array.from({ length: 12 }, (_, i) => (
    <option key={i}>{['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve'][i]}</option>
  ))}
</select>

          {/* Shift Filter */}
          <select
            value={selectedShift}
            onChange={(e) => setSelectedShift(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option>All Shifts</option>
            <option>Day</option>
            <option>Morning</option>
          </select>

          {/* Section Filter */}
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option>All Sections</option>
            <option>Ka</option>
            <option>Kha</option>
            <option>Ga</option>
          </select>

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option>All Years</option>
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>

          {/* Search */}
          <div className="relative">
           <input
  type="text"
  placeholder="Search by Name, ID or Roll..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full border border-gray-300 rounded-xl px-2 py-2 pl-9 
             placeholder:text-xs focus:ring-2 focus:ring-blue-400 focus:outline-none"
/>

            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Student Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <motion.div
                key={student.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-lg p-4 text-center transition"
              >
                <div className="flex items-center gap-3 mb-4">
                 <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-blue-100 shadow-sm">
  <Image
    src={student.photo}
    alt={student.name}
    width={80}
    height={80}
    className="object-cover w-full h-full"
  />
</div>

                  <div className="text-left">
                    <h2 className="text-lg font-semibold text-gray-800">{student.name}</h2>
                    <p className="text-sm text-gray-500">ID: {student.id}</p>
                    <p className="text-sm text-gray-500">Roll: {student.roll}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <p>Class: {student.class}</p>
                  <p>Section: {student.section}</p>
                  <p>Shift: {student.shift}</p>
                  <p>Year: {student.year}</p>
                  <p>Group: {student.group}</p>
                  <p>Blood: {student.bloodGroup}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-10">
              No students found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
