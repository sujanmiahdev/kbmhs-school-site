import React from 'react';
import Dress from './components/Dress';

// header & Footer import
import Navbar from '@/components/Navbar';
import RoutingHeader from '@/components/RoutingHeader';
import SchoolFooter from '@/components/SchoolFooter';

const DressPage = () => {
  return (
  <>
  {/* Header */}
          <div>
            <RoutingHeader />
            <Navbar />
          </div>

  <Dress />

{/* Footer */}
     <SchoolFooter/>
  </>
  
)
};

export default DressPage;