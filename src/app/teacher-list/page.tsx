import React from 'react';
import TeacherList from './components/TeacherList'; 

import Navbar from '@/components/Navbar';
import RoutingHeader from '@/components/RoutingHeader';
import SchoolFooter from '@/components/SchoolFooter';



const TeachersPage = () => {
  return (
  <>
{/* Header */}
      <div>
        <RoutingHeader />
        <Navbar />
      </div>
{/* Teacher page */}
 <TeacherList />

{/* Footer */}
<SchoolFooter/>
  </>
  )
};

export default TeachersPage;
