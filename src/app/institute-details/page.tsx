'use client';

import React from 'react';
import InstituteDetails from './components/InstituteDetails';

// header & Footer import
import Navbar from '@/components/Navbar';
import RoutingHeader from '@/components/RoutingHeader';
import SchoolFooter from '@/components/SchoolFooter';


const InstituteDetailsPage = () => (

  <>
 {/* Header */}
        <div>
          <RoutingHeader />
          <Navbar />
        </div>

    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
   
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 text-center mb-8">
        🏫 Institute Details
      </h1>
      <InstituteDetails />
    </div>
  </div>

   {/* Footer */}
      <SchoolFooter/>
  </>

);

export default InstituteDetailsPage;
