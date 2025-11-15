import React from 'react';
import ClassRoutine from './components/ClassRoutine';

// header & Footer import
import Navbar from '@/components/Navbar';
import RoutingHeader from '@/components/RoutingHeader';
import SchoolFooter from '@/components/SchoolFooter';

const ClassRoutinePage = () => {
  return (
  <>
  {/* Header */}
          <div>
            <RoutingHeader />
            <Navbar />
          </div>

  <ClassRoutine />

{/* Footer */}
     <SchoolFooter/>
  </>
  
)
};

export default ClassRoutinePage;