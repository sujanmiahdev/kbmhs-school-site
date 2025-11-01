'use client';
import React from 'react';
import GoverningBody from './components/GoverningBody';

import Navbar from '@/components/Navbar';
import RoutingHeader from '@/components/RoutingHeader';

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
  </>
 
  
);

export default GoverningBodyPage;
