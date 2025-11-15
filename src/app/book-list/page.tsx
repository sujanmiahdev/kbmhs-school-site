import React from 'react';
import BookList from './components/BookList';

// header & Footer import
import Navbar from '@/components/Navbar';
import RoutingHeader from '@/components/RoutingHeader';
import SchoolFooter from '@/components/SchoolFooter';

const BookListPage = () => {
  return (
  <>
  {/* Header */}
          <div>
            <RoutingHeader />
            <Navbar />
          </div>

  <BookList />

{/* Footer */}
     <SchoolFooter/>
  </>
  
)
};

export default BookListPage;