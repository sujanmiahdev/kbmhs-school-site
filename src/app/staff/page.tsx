import React from 'react';
import Staff from './components/Staff';

// header & Footer import
import Navbar from '@/components/Navbar';
import RoutingHeader from '@/components/RoutingHeader';
import SchoolFooter from '@/components/SchoolFooter';

const StaffPage = () => {
 
  return(
 <>
{/* Header */}
        <div>
          <RoutingHeader />
          <Navbar />
        </div>

  <Staff />
  
  {/* Footer */}
     <SchoolFooter/>
     
  </>

  ) 
};

export default StaffPage;