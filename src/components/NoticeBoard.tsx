// src/components/NoticeBoard.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";

interface Notice {
  id: number;
  title: string;
  link: string;
  date: string;
}

interface NoticeBoardProps {
  notices: Notice[];
  speed?: number; // higher = faster
}

const NoticeBoard: React.FC<NoticeBoardProps> = ({ notices, speed = 0.5 }) => {
  const [paused, setPaused] = useState(false);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const touchStartY = useRef(0);
  const mouseStartY = useRef(0);
  const scrollOffset = useRef(0);
  const dragging = useRef(false);

  // Smooth continuous scroll using requestAnimationFrame
  useEffect(() => {
    let animationFrame: number;

    const step = () => {
      if (!paused && containerRef.current) {
        const height = containerRef.current.scrollHeight / 2;
        setOffset(prev => {
          let next = prev + speed;
          if (next > height) next -= height; // loop
          return next;
        });
      }
      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [paused, speed]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
    scrollOffset.current = offset;
    setPaused(true);
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const delta = e.touches[0].clientY - touchStartY.current;
    const container = containerRef.current;
    if (!container) return;
    const height = container.scrollHeight / 2;
    let newOffset = scrollOffset.current - delta;
    if (newOffset < 0) newOffset += height;
    if (newOffset > height) newOffset -= height;
    setOffset(newOffset);
  };
  const handleTouchEnd = () => setPaused(false);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragging.current = true;
    mouseStartY.current = e.clientY;
    scrollOffset.current = offset;
    setPaused(true);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const delta = e.clientY - mouseStartY.current;
    const container = containerRef.current;
    if (!container) return;
    const height = container.scrollHeight / 2;
    let newOffset = scrollOffset.current - delta;
    if (newOffset < 0) newOffset += height;
    if (newOffset > height) newOffset -= height;
    setOffset(newOffset);
  };
  const handleMouseUp = () => {
    dragging.current = false;
    setPaused(false);
  };
  const handleMouseLeave = () => {
    dragging.current = false;
    setPaused(false);
  };

  // Mouse wheel
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const height = container.scrollHeight / 2;
    let newOffset = offset + e.deltaY;
    if (newOffset < 0) newOffset += height;
    if (newOffset > height) newOffset -= height;
    setOffset(newOffset);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col h-135 overflow-hidden">
      <h2 className="text-xl font-bold mb-3 text-red-600 flex justify-center items-center gap-2">
        <span className="text-2xl">📢</span> Notice Board
      </h2>

      <div
        className="relative flex-1 overflow-hidden h-64 cursor-grab"
        onMouseEnter={() => setPaused(true)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave} 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        <div
          ref={containerRef}
          className="flex flex-col gap-2 select-none"
          style={{ transform: `translateY(-${offset}px)` }}
        >
          {[...notices, ...notices].map((notice, idx) => (
            <a
              key={idx}
              href={notice.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 bg-red-50 rounded hover:bg-red-100 transition-all font-medium text-red-900"
            >
              <span className="font-bold">{(idx % notices.length) + 1}. </span>
              {notice.title}
              <div className="text-xs text-gray-500 mt-1">{notice.date}</div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-3 text-center">
        <a
          href="/notices"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition font-semibold inline-block"
        >
          More Notices
        </a>
      </div>
    </div>
  );
};

export default NoticeBoard;
