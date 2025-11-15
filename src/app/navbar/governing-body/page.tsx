'use client';
import React from 'react';
import GoverningBody from './components/GoverningBody';

// header & Footer import
import Navbar from '@/components/Navbar';
import RoutingHeader from '@/components/RoutingHeader';
import SchoolFooter from '@/components/SchoolFooter';

const GoverningBodyPage = () => (
  <>
   <div >
    {/* Header */}
      <div>
       
  <RoutingHeader />
 <Navbar/>
      </div>
      <GoverningBody/>
    </div>
    
      {/* Footer */}
          <SchoolFooter/>
  </>
 
  
);

export default GoverningBodyPage;
