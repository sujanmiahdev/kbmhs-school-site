"use client";

import React from "react";
import Link from "next/link";

type Props = {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  description?: string;
  slug?: string;
};

export default function HeadTeacherCard({
  title = "প্রধান শিক্ষক মহোদয়ের বাণী",
  subtitle = "মোঃ সলিম উদ্দিন",
  imageUrl = "/image/headteacher.jpg",
  description = "আলোচিত একটি সংক্ষিপ্ত ভূমিকা — সংক্ষিপ্ত বর্ণনা এখানে থাকবে। মানুষ কেবল চোখ দিয়েই দেখেনা, এর পেছনে রয়েছে তার সক্রিয় মন ও মগজ। রয়েছে তার একটা দৃষ্টিভংগি ও মতামত। জীবনের একটা উদ্দেশ্য ও লক্ষ্য আছে তার। সমস্যাবলী নিয়ে চিন্তা ভাবনা করার একটা প্রক্রিয়া তার আছে। মানুষ যা কিছু দেখে, শুনে এবং জানে, সেটাকে সে নিজের অভ্যন্তরীণ মৌলিক চিন্তা ও ধ্যান ধারণার সাথে সামঞ্জস্যশীল করে নেয়। অতপর সেই চিন্তা ও ধ্যান ধারণার ভিত্তিতেই তার জীবন পদ্ধতি গড়ে উঠে। এই জীবন পদ্ধতিই হলো সংস্কৃতি।",
  slug = "/messages/head-teacher",
}: Props) {
  return (
    <article className="max-w-3xl mx-auto p-6 rounded-2xl shadow-lg bg-white dark:bg-[#0b1220] ring-1 ring-gray-100 dark:ring-gray-800 transition-colors duration-300 flex flex-col">
      
      {/* Top: Image + Title + Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-6 mb-4">
        {/* Image */}
        <div className="flex-shrink-0 mb-1 sm:mb-0">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gradient-to-tr from-indigo-50 to-pink-50 dark:from-indigo-900 dark:to-pink-900 ring-1 ring-gray-200 dark:ring-gray-700">
            <img
              src={imageUrl}
              alt={`${title} portrait`}
              className="w-full h-full object-cover object-center"
            />
            <span className="absolute -bottom-2 -right-2 text-xs font-bold px-3 py-2 rounded-lg bg-green-400 dark:bg-gray-800/80 backdrop-blur-sm text-black dark:text-gray-200 shadow-sm">
              প্রধান শিক্ষক
            </span>
          </div>
        </div>

        {/* Title + Subtitle */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          <p className="mt-1 text-sm md:text-base text-black dark:text-indigo-400 font-medium tracking-wide">{subtitle}</p>
        </div>
      </div>

      {/* Description preview + Read More */}
      <div className="flex flex-col flex-grow p-1">
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-3 mb-2">
          {description}
        </p>

        {/* Read More button above Footer */}
        <div className="mt-auto self-end mb-1">
          <Link
            href={slug}
            className="inline-flex items-center gap-2 text-sm font-medium p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            আরও পড়ুন
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-1 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span>প্রকাশিত: ০১ সেপ্টেম্বর, ২০২৫</span>
        <div className="ml-auto flex items-center gap-2">
          <button className="text-xs px-3 py-1 rounded-md bg-white/80 dark:bg-white/6 ring-1 ring-gray-200 dark:ring-gray-700 hover:scale-105 transition">
            শেয়ার
          </button>
          <button className="text-xs px-3 py-1 rounded-md bg-white/80 dark:bg-white/6 ring-1 ring-gray-200 dark:ring-gray-700 hover:scale-105 transition">
            প্রিন্ট
          </button>
        </div>
      </footer>
    </article>
  );
}
