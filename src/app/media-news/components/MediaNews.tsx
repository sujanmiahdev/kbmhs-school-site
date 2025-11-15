"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: "Event" | "Press" | "Announcement" | "Achievement" | string;
  publishedAt: string;
  link?: string;
};

const DEMO_POSTS: Post[] = [
  {
    id: "p1",
    title: "Annual Sports Day 2025: Shining Performances",
    excerpt:
      "Our students demonstrated outstanding sportsmanship and secured top positions in inter-school events.",
    image: "/media-news/sports.jpg",
    category: "Event",
    publishedAt: "2025-03-10",
    link: "/news/sports-day-2025",
  },
  {
    id: "p2",
    title: "Featured in Daily Star: Eco-Club Initiative",
    excerpt:
      "Local press covered our student-led tree-planting drive and recycling program organized by the Eco-Club.",
    image: "/media-news/debaiting.jpg",
    category: "Press",
    publishedAt: "2025-02-21",
    link: "https://www.thedailystar.net/",
  },
  {
    id: "p3",
    title: "Admission Notice for Class 6 (2026)",
    excerpt:
      "Applications are open for Class 6 admissions. Important dates and form details inside.",
    image: "/media-news/admission.jpg",
    category: "Announcement",
    publishedAt: "2025-11-01",
    link: "/admissions",
  },
];

export default function MediaNewsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const years = useMemo(() => {
    const set = new Set(
      DEMO_POSTS.map((p) => new Date(p.publishedAt).getFullYear().toString())
    );
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, []);

  const categories = useMemo(() => {
    const set = new Set(DEMO_POSTS.map((p) => p.category));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    return DEMO_POSTS.filter((p) => {
      const matchesQuery =
        query.trim() === "" ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || p.category === category;
      const matchesYear =
        !year || new Date(p.publishedAt).getFullYear().toString() === year;
      return matchesQuery && matchesCategory && matchesYear;
    }).sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [query, category, year]);

  return (
    <main className="min-h-screen py-12 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">
            Media & News
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Stay updated with our school’s latest news, achievements, and press
            coverage.
          </p>
        </header>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, category or description..."
                className="w-full md:w-96 rounded-lg border border-slate-200 bg-white py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3 items-center">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white py-2 px-3 shadow-sm focus:outline-none"
              aria-label="Filter by category"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white py-2 px-3 shadow-sm focus:outline-none"
              aria-label="Filter by year"
            >
              <option value="">Select Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading skeleton or news grid */}
        {loading ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-slate-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-4 bg-slate-200 rounded w-2/3" />
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </section>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm">
                <p className="text-slate-600">
                  No news found. Try a different search term.
                </p>
              </div>
            ) : (
              filtered.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden group"
                >
                  <div className="relative h-44 md:h-48 w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium uppercase text-sky-600 bg-sky-50 px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <time className="text-xs text-slate-400">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </time>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-800 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 hover:underline"
                      >
                        Read more →
                      </button>

                      {post.link ? (
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-slate-500 hover:text-slate-700"
                        >
                          Source
                        </a>
                      ) : (
                        <span className="text-sm text-slate-400">—</span>
                      )}
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>
        )}

        {/* ✅ Smart pluralized result count */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          Showing <strong>{filtered.length}</strong>{" "}
          result{filtered.length !== 1 ? "s" : ""}.
        </div>
      </div>

      {/* Modal */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 md:h-72 w-full">
              <Image
                src={selectedPost.image}
                alt={selectedPost.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">
                  {selectedPost.title}
                </h2>
                <time className="text-sm text-slate-400">
                  {new Date(selectedPost.publishedAt).toLocaleDateString()}
                </time>
              </div>

              <p className="mt-4 text-slate-600">{selectedPost.excerpt}</p>

              <div className="mt-6 flex gap-3">
                {selectedPost.link && (
                  <a
                    href={selectedPost.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-md px-4 py-2 border border-sky-600 text-sky-600 font-medium"
                  >
                    Open Source / Full Report
                  </a>
                )}

                <button
                  onClick={() => setSelectedPost(null)}
                  className="ml-auto inline-block rounded-md bg-slate-800 text-white px-4 py-2 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
