"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SubjectCardProps {
  title: string;
  imageUrl: string;
  onClick: () => void;
  onDownload: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ title, imageUrl, onClick, onDownload }) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 cursor-pointer">
      <h3 className="text-lg font-semibold text-center mb-2 text-white bg-blue-600 px-3 py-1 rounded-md">
        {title}
      </h3>

      <div onClick={onClick}>
        <Image
          src={imageUrl}
          alt={title}
          width={600}
          height={400}
          className="rounded-lg border border-slate-200 w-full object-cover mb-2"
        />
      </div>

      {/* Grid-level Download Button */}
      <button
        className="bg-green-600 text-white rounded-md px-4 py-2 w-full hover:bg-green-700 transition shadow-md"
        onClick={onDownload}
      >
        Download
      </button>
    </div>
  );
};

export default function SubjectGrid() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const subjects = [
    { title: "Nine", imageUrl: "/image/book-list9.jpg" },
    { title: "Ten", imageUrl: "/image/book-list9.jpg" },
    { title: "Eight", imageUrl: "/image/book-list9.jpg" },
    { title: "Seven", imageUrl: "/image/book-list9.jpg" },
  ];

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.substring(url.lastIndexOf("/") + 1);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-2 text-slate-700">
        BOOK LIST
      </h2>
      <p className="text-center text-slate-500 mb-8">
  A curated collection of academic books to guide your learning journey
</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {subjects.map((item, index) => (
          <SubjectCard
            key={index}
            title={item.title}
            imageUrl={item.imageUrl}
            onClick={() => setSelectedImage(item.imageUrl)}
            onDownload={() => handleDownload(item.imageUrl)}
          />
        ))}
      </div>

      {/* Animated Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full p-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 bg-red-600 rounded-full w-10 h-10 flex items-center justify-center text-white text-2xl font-bold shadow-lg hover:bg-red-700 transition"
                onClick={() => setSelectedImage(null)}
              >
                &times;
              </button>

              <Image
                src={selectedImage}
                alt="Preview"
                width={800}
                height={600}
                className="rounded-lg w-full object-contain mb-4 shadow-md"
              />

              {/* Modal-level Download Button */}
              <button
                className="bg-green-600 text-white rounded-md px-4 py-2 w-full hover:bg-green-700 transition shadow-lg"
                onClick={() => handleDownload(selectedImage)}
              >
                Download
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
