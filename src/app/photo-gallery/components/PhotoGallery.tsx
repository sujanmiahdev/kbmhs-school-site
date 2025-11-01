'use client';

import React, { useState } from 'react';
import Image from 'next/image';

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
            {/* Close button */}
            <button
              onClick={() => setOpenIndex(null)}
              className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-2 hover:bg-white transition"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Large Image */}
            <div className="w-full aspect-[4/3] relative rounded overflow-hidden shadow-lg">
              <Image
                src={photos[openIndex].src}
                alt={photos[openIndex].alt}
                fill
                sizes="(max-width: 1024px) 90vw, 800px"
                style={{ objectFit: 'contain' }}
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
              className="absolute inset-y-0 left-3 flex items-center text-4xl text-white/70 hover:text-white transition"
              aria-label="Previous"
            >
              ‹
            </button>

            <button
              onClick={() =>
                setOpenIndex(
                  (idx) =>
                    idx === null ? null : (idx + 1) % photos.length
                )
              }
              className="absolute inset-y-0 right-3 flex items-center text-4xl text-white/70 hover:text-white transition"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
