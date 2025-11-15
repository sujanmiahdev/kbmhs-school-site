'use client';

import React from 'react';

const magazines = [
  {
    name: "Magazine 2025",
    file: "/magazines/magazine-2025.pdf",
    thumbnail: "/thumbnails/magazine-2025-01.png", 
  },
 
];

const MagazinePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-800">
        School Magazines
      </h1>
        {/* subtitle */}

     <p className="text-center text-gray-600 max-w-2xl mx-auto mb-4">
 Discover our annual school magazines showcasing student creativity, achievements, and memorable moments.
</p>
<div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
   

      {/* Magazine Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {magazines.map((mag, idx) => (
          <div
            key={idx}
            className="border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 bg-white"
          >
         {/* Thumbnail */}
<div className="w-full h-64 overflow-hidden rounded-t-2xl">
  {mag.thumbnail ? (
    <img
      src={mag.thumbnail}
      alt={mag.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
      No Thumbnail
    </div>
  )}
</div>


            {/* Content */}
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                {mag.name}
              </h2>
              <div className="flex flex-col gap-2">
                <a
                  href={mag.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View File
                </a>
                <a
                  href={mag.file}
                  download
                  className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Download File
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MagazinePage;
