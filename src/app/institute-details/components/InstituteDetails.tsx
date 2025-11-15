'use client';

import React, { JSX, useState } from 'react';
import { 
  MapPinIcon, PhoneIcon, EnvelopeIcon, AcademicCapIcon, 
  BookOpenIcon, TrophyIcon, CheckCircleIcon, UserGroupIcon, UsersIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline';

import { motion, AnimatePresence } from 'framer-motion';

type Section = {
  title: string;
  icon:JSX.Element;
  content: React.ReactNode;
};

const InstituteDetailsBangladesh = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const sections: Section[] = [
    {
      title: '🏫 Basic Information',
      icon: <MapPinIcon className="w-5 h-5 text-blue-500" />,
      content: (
        <ul className="space-y-2 text-gray-700 mt-2">
          <li><strong>Name:</strong> Kumulli Bachchu Mia Model High School</li>
          <li><strong>Established:</strong> 2012</li>
          <li><strong>Board / Affiliation:</strong> Dhaka Board</li>
          <li><strong>EIIN:</strong> 135585</li>
          <li><strong>Principal:</strong> Mr. Solim Uddin</li>
          <li className="flex items-center gap-2"><PhoneIcon className="w-5 h-5 text-blue-500" /> +880 1234 567890</li>
          <li className="flex items-center gap-2"><EnvelopeIcon className="w-5 h-5 text-green-500" /> kbmmhs40@gmail.com</li>
          <li className="flex items-center gap-2"><MapPinIcon className="w-5 h-5 text-red-500" /> Kumolli, Manikganj Sadar, Manikganj-1800</li>
        </ul>
      ),
    },
    {
      title: '👩‍🎓 Student Demographics',
      icon: <UserGroupIcon className="w-5 h-5 text-purple-500" />,
      content: (
        <ul className="space-y-2 text-gray-700 mt-2">
          <li>Total Students: 1200+</li>
          <li>Boys: 650</li>
          <li>Girls: 550</li>
          <li>Medium: Bangla & English (National Curriculum / English Version)</li>
          <li>Religion Distribution: Islam 70%, Hinduism 25%, Others 5%</li>
        </ul>
      ),
    },
    {
      title: '👨‍🏫 Staff Information',
      icon: <UsersIcon className="w-5 h-5 text-green-500" />,
      content: (
        <ul className="space-y-2 text-gray-700 mt-2">
          <li>Total Teachers: 65</li>
          <li>Male Teachers: 35</li>
          <li>Female Teachers: 30</li>
          <li>Administrative Staff: 15</li>
          <li>Support Staff: 10</li>
        </ul>
      ),
    },
    {
      title: '🎓 Academic Information',
      icon: <AcademicCapIcon className="w-5 h-5 text-indigo-500" />,
      content: (
        <ul className="space-y-2 text-gray-700 mt-2">
          <li>Classes Offered: 1–12</li>
          <li>Streams: Science, Humanities, Business Studies</li>
          <li>Major Subjects: Bangla, English, Math, Physics, Chemistry, Biology, Accounting, Economics</li>
          <li>Annual Exams: Board + Internal Exams</li>
        </ul>
      ),
    },
    {
      title: '📚 Facilities',
      icon: <BookOpenIcon className="w-5 h-5 text-green-500" />,
      content: (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 text-gray-700">
          <li className="flex items-center gap-2"><BookOpenIcon className="w-5 h-5 text-green-500" /> Library: 5000+ books</li>
          <li className="flex items-center gap-2"><AcademicCapIcon className="w-5 h-5 text-indigo-500" /> Labs: Physics, Chemistry, Biology, Computer</li>
          <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-purple-500" /> Sports: Playground, Indoor Games, Gym</li>
          <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-yellow-500" /> Transport: Bus routes across Dhaka</li>
          <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-pink-500" /> Canteen: Healthy food options</li>
          <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-blue-500" /> IT & Multimedia: Smart Classrooms, Projector, Internet</li>
        </ul>
      ),
    },
    {
      title: '🏆 Achievements / Recognition',
      icon: <TrophyIcon className="w-5 h-5 text-yellow-500" />,
      content: (
        <ul className="space-y-2 text-gray-700 mt-2">
          <li>Board Toppers in Science & Humanities</li>
          <li>Inter-School Sports Competitions</li>
          <li>Cultural Awards: Drama, Music, Art Festivals</li>
          <li>Notable Alumni: Famous Ex-Students</li>
        </ul>
      ),
    },
    {
      title: '🌟 Vision, Mission & Values',
      icon: <CheckCircleIcon className="w-5 h-5 text-pink-500" />,
      content: (
        <ul className="space-y-2 text-gray-700 mt-2">
          <li><strong>Vision:</strong> Nurture responsible, creative, and skilled young citizens of Bangladesh.</li>
          <li><strong>Mission:</strong> Provide quality education in a safe, inspiring environment for all students.</li>
          <li><strong>Values:</strong> Discipline, Honesty, Respect, Innovation, Community Service</li>
        </ul>
      ),
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <div key={index} className="bg-white rounded-3xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
            onClick={() => toggle(index)}
          >
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.2 }}>{section.icon}</motion.div>
              <span className="text-xl font-semibold text-gray-800">{section.title}</span>
            </div>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              className="w-6 h-6 text-gray-400"
            >
              <ChevronDownIcon />
            </motion.div>
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-5 border-t border-gray-200"
              >
                {section.content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default InstituteDetailsBangladesh;
