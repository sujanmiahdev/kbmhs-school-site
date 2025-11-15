import React from 'react';
import StudentInfo from './components/StudentInfo'; 

// header & Footer import
import Navbar from '@/components/Navbar';
import RoutingHeader from '@/components/RoutingHeader';
import SchoolFooter from '@/components/SchoolFooter';


const StudentsPage = () => {
  return (
  <>
  {/* Header */}
        <div>
          <RoutingHeader />
          <Navbar />
        </div>

        {/* Student Page */}
  <StudentInfo />

  {/* Footer */}
  <SchoolFooter/>
  </>

  )
};

export default StudentsPage;
