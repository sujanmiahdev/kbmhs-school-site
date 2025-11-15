'use client';

import React from 'react';
import Magazine from './components/Magazine';

// Header & Footer import
import Navbar from '@/components/Navbar';
import RoutingHeader from '@/components/RoutingHeader';
import SchoolFooter from '@/components/SchoolFooter';

const Page: React.FC = () => {
  return (
    <>
      {/* Header */}
      <div>
        <RoutingHeader />
        <Navbar />
      </div>

      {/* Magazine Section */}
      <Magazine />

      {/* Footer */}
      <SchoolFooter />
    </>
  );
};

export default Page;
