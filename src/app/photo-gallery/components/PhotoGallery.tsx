'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react'; // সুন্দর আইকন যোগ করা

type Photo = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  year?: string;
  album?: string;
};

const photos: Photo[] = [
  {
    id: '1',
    src: '/image/parentsday.jpg',
    alt: 'Parent Day 2025',
    caption: 'Parent Day - 2025',
    year: '2025',
    album: 'Parent Day',
  },
  {
    id: '2',
    src: '/image/sportday.jpg',
    alt: 'Sports Day',
    caption: 'Annual Sports - 2024',
    year: '2024',
    album: 'Sports',
  },
  // আরও ছবি এখানে যোগ করুন
];

export default function PhotoGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="p-6">
      {/* Page Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-green-600">
          Photo Gallery
        </h1>
        <p className="text-gray-500 mt-2">Our School Memories & Events</p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setOpenIndex(i)}
            className="relative overflow-hidden rounded-xl group focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label={`Open ${p.caption ?? p.alt}`}
          >
            <div className="aspect-[4/3] w-full relative">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                style={{ objectFit: 'cover' }}
                loading="lazy"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-sm p-2 opacity-0 group-hover:opacity-100 transition">
              {p.caption}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox / Modal */}
      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="max-w-4xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button (X icon) */}
           <button
  onClick={() => setOpenIndex(null)}
  className="absolute top-3 right-3 z-10 bg-white text-gray-800 rounded-full p-2 shadow-lg transition-colors duration-300 hover:bg-red-600 hover:text-white"
  aria-label="Close"
>
  <X className="w-5 h-5" />
</button>

{/* Large Image */}
<div className="relative w-full flex justify-center items-center rounded-2xl overflow-hidden shadow-2xl bg-black max-h-[85vh]">
  <Image
    src={photos[openIndex].src}
    alt={photos[openIndex].alt}
    width={1200}
    height={800}
    className="object-contain w-full h-auto rounded-2xl"
    priority
  />
</div>



            {/* Caption */}
            {photos[openIndex].caption && (
              <p className="mt-4 text-center text-white text-base md:text-lg font-medium">
                {photos[openIndex].caption}
              </p>
            )}

            {/* Prev / Next Buttons */}
            <button
              onClick={() =>
                setOpenIndex(
                  (idx) =>
                    idx === null
                      ? null
                      : (idx - 1 + photos.length) % photos.length
                )
              }
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-gray-600 rounded-full p-2 text-white transition"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setOpenIndex(
                  (idx) =>
                    idx === null ? null : (idx + 1) % photos.length
                )
              }
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20  hover:bg-gray-600 rounded-full p-2 text-white transition"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
