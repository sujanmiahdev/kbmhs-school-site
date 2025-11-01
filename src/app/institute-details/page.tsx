'use client';

import React from 'react';
import InstituteDetails from './components/InstituteDetails';


const InstituteDetailsPage = () => (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
   
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 text-center mb-12">
        🏫 Institute Details
      </h1>
      <InstituteDetails />
    </div>
  </div>
);

export default InstituteDetailsPage;
