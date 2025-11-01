'use client';

import React from 'react';
import Administration from './components/Administration';
import Navbar from '@/components/Navbar';
import RoutingHeader from '@/components/RoutingHeader';

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
    </>
  );
};

export default Page;
