'use client';

import React from 'react';
import MediaNews from './components/MediaNews';

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
      <MediaNews />

      {/* Footer */}
      <SchoolFooter />
    </>
  );
};

export default Page;
