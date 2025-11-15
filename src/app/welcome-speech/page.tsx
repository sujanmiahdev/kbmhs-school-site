'use client';

import React from "react";

import SpeechContent from "./components/SpeechContent";
import HeroSection from "./components/HeroSection"

// header & Footer import
import Navbar from '@/components/Navbar';
import RoutingHeader from '@/components/RoutingHeader';
import SchoolFooter from '@/components/SchoolFooter';

const WelcomeSpeechPage = () => (
  <>
 {/* Header */}
        <div>
          <RoutingHeader />
          <Navbar />
        </div>

   <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto">
     <HeroSection/>
      <SpeechContent />
    </div>
  </div>

  {/* Footer */}
    <SchoolFooter/>
  </>
 
);

export default WelcomeSpeechPage;
