'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const staffList = [
  {
    name: 'MD. SHAHAJAN ISLAM',
    role: 'Accountant (Addl. Charge)',
    image: '/images/staff/shahajan.jpg',
  },
  {
    name: 'SHARMIN NAHAR',
    role: 'Office Assistant',
    image: '/images/staff/sharmin.jpg',
  },
  {
    name: 'RUKSHANA PARVIN',
    role: 'Supervisor',
    image: '/images/staff/rukshana.jpg',
  },
  {
    name: 'MD. SHAHIDUL ISLAM',
    role: 'Lower Division Clerk (LDC)',
    image: '/images/staff/shahidul.jpg',
  },
  {
    name: 'MD. ASRAFUL ISLAM',
    role: 'Store Keeper',
    image: '/images/staff/asraful.jpg',
  },
  {
    name: 'MD. GOLAM ZAKARIA',
    role: 'Computer Operator (GE)',
    image: '/images/staff/zakaria.jpg',
  },
  {
    name: 'MD. ISRAFIL',
    role: 'Computer Operator (GE)',
    image: '/images/staff/israfil.jpg',
  },
  {
    name: 'JANNATY KHATUN',
    role: 'Class Attendant (PT)',
    image: '/images/staff/jannaty.jpg',
  },
  {
    name: 'NASIMA KHATUN',
    role: 'Class Attendant (PT)',
    image: '/images/staff/nasima.jpg',
  },
  {
    name: 'AROBY AKTER',
    role: 'Class Attendant (PT)',
    image: '/images/staff/aroby.jpg',
  },
  {
    name: 'SUMAIA ISLAM ANIKA',
    role: 'Class Attendant (PT)',
    image: '/images/staff/anika.jpg',
  },
  {
    name: 'NOOR MOHAMMAD',
    role: 'Driver (GD)',
    image: '/images/staff/noor.jpg',
  },
];

export default function StaffPage() {
  return (
    <section className="py-12 px-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-700">
        Non-Teaching Staff
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {staffList.map((staff, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md p-4 text-center hover:shadow-lg transition"
          >
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-100 shadow-sm">
              <Image
                src={staff.image}
                alt={staff.name}
                width={150}
                height={150}
                className="object-cover w-full h-full"
              />
            </div>

            <h2 className="mt-4 font-semibold text-lg text-gray-800 uppercase tracking-wide">
              {staff.name}
            </h2>
            <p className="text-sm text-blue-600">{staff.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
