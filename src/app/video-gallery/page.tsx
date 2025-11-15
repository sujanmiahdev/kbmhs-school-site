import React from 'react';
import VideoGallery from './components/VideoGallery';

// header & Footer import
import Navbar from '@/components/Navbar';
import RoutingHeader from '@/components/RoutingHeader';
import SchoolFooter from '@/components/SchoolFooter';

const VideoGalleryPage = () => {
  return (
    <>
    {/* Header */}
            <div>
              <RoutingHeader />
              <Navbar />
            </div>

    <VideoGallery />

 {/* Footer */}
     <SchoolFooter/>

    </>
  ) 
};

export default VideoGalleryPage;