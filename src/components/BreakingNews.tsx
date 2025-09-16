"use client";

import { useEffect, useRef } from "react";

interface BreakingNewsProps {
  newsItems: string[];
  speed?: number; // pixels per second
}

export default function BreakingNews({
  newsItems,
  speed = 100,
}: BreakingNewsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrame: number;
    let start: number | null = null;
    let currentIndex = 0;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const distance = (elapsed / 1000) * speed;

      const itemWidth = container.scrollWidth / newsItems.length;
      const translateX = -currentIndex * itemWidth - distance;

      container.style.transform = `translateX(${translateX}px)`;

      if (Math.abs(translateX) >= itemWidth * (currentIndex + 1)) {
        currentIndex = (currentIndex + 1) % newsItems.length;
        start = timestamp;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [newsItems, speed]);

  return (
    <div className="bg-red-600 text-white py-2 flex  items-center overflow-hidden border-t-4 border-red-700">
      {/* Fixed Breaking News label */}
      <span className="font-bold px-4 flex-shrink-0 text-lg border-r-2 border-white">
        Breaking News:
      </span>

      {/* Scrolling News */}
      <div className="flex-1 overflow-hidden  relative h-8 flex items-center">
        <div
          ref={containerRef}
          className="flex whitespace-nowrap absolute left-0 top-1/2 -translate-y-1/2 text-lg font-medium"
        >
          {newsItems.map((item, idx) => (
            <span key={idx} className="px-12 flex-shrink-0">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
