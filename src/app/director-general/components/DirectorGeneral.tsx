'use client';

import Image from 'next/image';

export default function DirectorGeneralPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 pb-10 px-6">
      <div className="max-w-5xl mx-auto">
        {/* --- Header / Hero --- */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">
            Director General
          </h1>
          <p className="text-gray-600 mb-3">
            Leading with vision, inspiring excellence
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* --- Portrait --- */}
        <div className="flex justify-center mb-5">
          <div className="w-60 h-60  overflow-hidden border-4 border-blue-100 shadow-lg">
            <Image
              src="/image/DirectorGeneral.jpg" 
              alt="Director General"
              width={150}
              height={150}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* --- Biography / Intro --- */}
        <div className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
          <p>
            Mr./Ms. [Director Name] has been leading <strong>[School Name]</strong> 
            since [Year], with a strong focus on academic excellence, teacher 
            development, and holistic student growth. Under their guidance, the 
            school has achieved remarkable milestones in education and student 
            success.
          </p>
        </div>

        {/* --- Key Responsibilities --- */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
            Key Responsibilities
          </h2>
          <ul className="list-disc list-inside text-gray-700 max-w-3xl mx-auto space-y-2">
            <li>Strategic planning and academic leadership</li>
            <li>Teacher mentorship and professional development</li>
            <li>Student welfare and holistic growth initiatives</li>
            <li>Maintaining school standards and accreditation</li>
            <li>Community engagement and representation</li>
          </ul>
        </div>

        {/* --- Quote / Message --- */}
        <div className="text-center italic text-gray-600 mb-8">
          <p>"Education is the most powerful tool to shape the future of our nation."</p>
        </div>

        {/* --- Contact Info --- */}
        <div className="text-center text-gray-700">
          <p>Email: director@schoolname.edu.bd</p>
          <p>Phone: +8801XXXXXXXXX</p>
          <p>Office: [School Address], Bangladesh</p>
        </div>
      </div>
    </section>
  );
}
