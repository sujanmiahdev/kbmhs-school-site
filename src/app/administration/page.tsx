'use client';

import React from 'react';
import Administration from './components/Administration';
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

      {/* Administration Section */}
      <Administration />
      
      {/* Footer */}
<SchoolFooter/>
    </>
  );
};

export default Page;
