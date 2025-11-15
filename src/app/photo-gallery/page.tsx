import React from 'react';
import PhotoGallery from './components/PhotoGallery';

// header & Footer import
import Navbar from '@/components/Navbar';
import RoutingHeader from '@/components/RoutingHeader';
import SchoolFooter from '@/components/SchoolFooter';

const StaffPage = () => {
  return (
  <>
  {/* Header */}
          <div>
            <RoutingHeader />
            <Navbar />
          </div>

  <PhotoGallery />

{/* Footer */}
     <SchoolFooter/>
  </>
  
)
};

export default StaffPage;