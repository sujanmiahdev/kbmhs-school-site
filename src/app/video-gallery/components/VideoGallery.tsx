'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle, Search } from 'lucide-react';

interface VideoItem {
  id: number;
  title: string;
  category: string;
  url: string; // YouTube link (normal or short)
}

// 🔧 Utility: Convert normal/short YouTube links → embed + thumbnail
const getYouTubeId = (url: string): string | null => {
  try {
    if (url.includes('youtube.com/watch?v=')) {
      return url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1].split('?')[0];
    }
  } catch {
    return null;
  }
  return null;
};

const getEmbedUrl = (url: string): string => {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : url;
};

const getThumbnailUrl = (url: string): string => {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '/default-thumb.jpg';
};

// ------------------ Video Data ------------------
const videos: VideoItem[] = [
  {
    id: 1,
    title: 'Annual Sports Day 2025',
    category: 'Sports',
    url: 'https://youtu.be/dQw4w9WgXcQ',
  },
  {
    id: 2,
    title: 'Cultural Program Highlights',
    category: 'Cultural',
    url: 'https://www.youtube.com/watch?v=5NV6Rdv1a3I',
  },
  {
    id: 3,
    title: 'Science Fair Projects',
    category: 'Science',
    url: 'https://youtu.be/ScMzIvxBSi4',
  },
  {
    id: 4,
    title: 'Football Final Highlights',
    category: 'Sports',
    url: 'https://www.youtube.com/watch?v=2vjPBrBU-TM',
  },
  {
    id: 5,
    title: 'Cultural Dance Performance',
    category: 'Cultural',
    url: 'https://youtu.be/fLexgOxsZu0',
  },
  {
    id: 6,
    title: 'Science Quiz Championship',
    category: 'Science',
    url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
  },
];

// ------------------ Component ------------------
const VideoGallery: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const categories = ['All', ...Array.from(new Set(videos.map((v) => v.category)))];

  const filteredVideos = videos.filter((v) => {
    const matchCategory = selectedCategory === 'All' || v.category === selectedCategory;
    const matchSearch = v.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const visibleVideos = filteredVideos.slice(0, visibleCount);

  return (
    <section className="py-10 pt-6 px-4 bg-gray-50 min-h-screen">
      {/* ---------------- Title Section ---------------- */}
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">
          🎥 Video Gallery
        </h1>
        <p className="text-gray-600 text-base max-w-2xl mx-auto">
          Explore memorable moments and special events captured from our school activities — 
          sports, cultural programs, science fairs, and more.
        </p>
        <div className="mt-4 w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      {/* ---------------- Search & Filter ---------------- */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-blue-100 border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* ---------------- Video Grid ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {visibleVideos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{
                y: -5,
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
              }}
              className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative aspect-video">
                <img
                  src={getThumbnailUrl(video.url)}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition">
                  <PlayCircle className="text-white w-16 h-16" />
                </div>
              </div>
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">{video.title}</h2>
                <p className="text-sm text-gray-500">{video.category}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ---------------- Load More ---------------- */}
      {visibleCount < filteredVideos.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}

      {/* ---------------- Modal ---------------- */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="relative bg-black rounded-2xl overflow-hidden w-full max-w-4xl aspect-video"
            >
              <iframe
                className="w-full h-full"
                src={`${getEmbedUrl(selectedVideo.url)}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-3 right-3 text-white hover:text-red-500 transition"
              >
                <X className="w-8 h-8" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoGallery;
