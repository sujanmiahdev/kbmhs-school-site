'use client';

import React from 'react';
import Syllabus from './components/Syllabus';

// Header & Footer import
import Navbar from '@/components/Navbar';
import RoutingHeader from '@/components/RoutingHeader';
import SchoolFooter from '@/components/SchoolFooter';

const SyllabusPage: React.FC = () => {
  return (
    <>
      {/* Header */}
      <div>
        <RoutingHeader />
        <Navbar />
      </div>

      {/* Magazine Section */}
      <Syllabus/>

      {/* Footer */}
      <SchoolFooter />
    </>
  );
};

export default SyllabusPage;
