import React from 'react';
import ExamRoutine from './components/ExamRoutine';

// header & Footer import
import Navbar from '@/components/Navbar';
import RoutingHeader from '@/components/RoutingHeader';
import SchoolFooter from '@/components/SchoolFooter';

const ExamRoutinePage = () => {
  return (
  <>
  {/* Header */}
          <div>
            <RoutingHeader />
            <Navbar />
          </div>

  <ExamRoutine />

{/* Footer */}
     <SchoolFooter/>
  </>
  
)
};

export default ExamRoutinePage;