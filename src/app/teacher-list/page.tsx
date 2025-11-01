import React from 'react';
import TeacherList from './components/TeacherList'; 

import Navbar from '@/components/Navbar';
import RoutingHeader from '@/components/RoutingHeader';



const TeachersPage = () => {
  return (
  <>
{/* Header */}
      <div>
        <RoutingHeader />
        <Navbar />
      </div>

  <TeacherList />
  </>
  )
};

export default TeachersPage;
