import React from 'react';
import Admission from './components/Admission';

// header & Footer import
import Navbar from '@/components/Navbar';
import RoutingHeader from '@/components/RoutingHeader';
import SchoolFooter from '@/components/SchoolFooter';

const AdmissionPage = () => {
  return (
  <>
  {/* Header */}
          <div>
            <RoutingHeader />
            <Navbar />
          </div>

  <Admission />

{/* Footer */}
     <SchoolFooter/>
  </>
  
)
};

export default AdmissionPage;