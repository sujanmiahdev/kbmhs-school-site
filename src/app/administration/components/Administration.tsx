'use client';

import React from 'react';
import {
  DocumentTextIcon,
  UserGroupIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

interface FormLink {
  name: string;
  link: string;
}

const admissionForms: FormLink[] = [
  { name: 'Admission Form', link: '#' },
  { name: 'Leave Application', link: '#' },
  { name: 'Student Transfer Form', link: '#' },
  { name: 'Other Important Forms', link: '#' },
];

const AdministrationPage: React.FC = () => {
  return (
    <div className="space-y-16 px-4 py-12 max-w-7xl mx-auto">
      {/* 1️⃣ Administration Overview */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-xl rounded-xl p-8 flex flex-col md:flex-row items-center gap-6 hover:shadow-2xl transition-shadow">
        <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
          <img
            src="/image/headteacher.jpg"
            alt="Principal"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <UserGroupIcon className="w-7 h-7 text-blue-600" /> Administration Overview
          </h2>
          <p className="text-gray-700 mb-2">
            Our school administration is structured to ensure discipline, quality education,
            and effective communication among students, teachers, and parents.
          </p>
          <p className="text-gray-700">
            <strong>Principal:</strong> Mr./Ms. [Name] <br />
            <strong>Head of Administration:</strong> Mr./Ms. [Name]
          </p>
        </div>
      </section>

      {/* 2️⃣ Policies & Rules */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <DocumentTextIcon className="w-7 h-7 text-green-600" /> Policies & Rules
        </h2>

        <div className="space-y-6 text-gray-800">
          <div>
            <h3 className="text-xl font-semibold mb-2">Admission Policy</h3>
            <p>
              Admission is based on merit, seat availability, and adherence to the school’s admission guidelines.
              Priority is given to local residents and siblings of current students.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Attendance & Leave Rules</h3>
            <p>
              Regular attendance is compulsory. A minimum of 80% attendance is required for promotion.
              Leave must be approved by the class teacher or head of administration beforehand.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Discipline & Code of Conduct</h3>
            <p>
              Students must behave properly both inside and outside the school.
              Bullying, disrespect, or misuse of mobile phones is strictly prohibited.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Uniform Policy</h3>
            <p>
              Students must wear the prescribed uniform neatly. Improper or incomplete dress is not allowed during school hours.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Examination & Promotion Rules</h3>
            <p>
              Students must attend all term exams. Promotion depends on overall performance, attendance, and discipline.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Health & Safety Policy</h3>
            <p>
              The school ensures a safe and hygienic environment. Any health issue must be reported to the school authority.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Digital & Internet Usage Policy</h3>
            <p>
              Students must use school computers and internet responsibly. Accessing harmful or inappropriate content is forbidden.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Parent Communication Policy</h3>
            <p>
              Parents are encouraged to attend PTMs and contact teachers through official channels when necessary.
            </p>
          </div>
        </div>
      </section>

      {/* 3️⃣ Forms & Downloads */}
      <section className="bg-gradient-to-r from-purple-50 to-purple-100 shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <DocumentTextIcon className="w-7 h-7 text-purple-600" /> Forms & Downloads
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {admissionForms.map((form, index) => (
            <a
              key={index}
              href={form.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-50 border border-purple-200 rounded-xl p-5 text-center font-medium text-purple-700 hover:bg-purple-100 hover:shadow-lg transition"
            >
              {form.name}
            </a>
          ))}
        </div>
      </section>

      {/* 4️⃣ Contact Information */}
      <section className="bg-gradient-to-r from-yellow-50 to-yellow-100 shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <PhoneIcon className="w-7 h-7 text-yellow-600" /> Contact Information
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li><strong>Address:</strong> 123, School Road, Dhaka, Bangladesh</li>
          <li><strong>Office Hours:</strong> 8:00 AM – 4:00 PM (Sunday–Thursday)</li>
          <li><strong>Phone:</strong> +880 1XXXXXXXXX</li>
          <li><strong>Email:</strong> info@schoolname.edu.bd</li>
        </ul>
      </section>
    </div>
  );
};

export default AdministrationPage;
