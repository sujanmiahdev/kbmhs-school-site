import React from 'react';
import DirectorGeneral from './components/DirectorGeneral';

// header & Footer import
import Navbar from '@/components/Navbar';
import RoutingHeader from '@/components/RoutingHeader';
import SchoolFooter from '@/components/SchoolFooter';

const DirectorGeneralPage = () => {
  return(
<>
  {/* Header */}
        <div>
          <RoutingHeader />
          <Navbar />
        </div>

 <DirectorGeneral/>

  {/* Footer */}
   <SchoolFooter/>
</>


  )
};

export default DirectorGeneralPage;