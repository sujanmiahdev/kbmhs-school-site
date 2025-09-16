"use client";

import { useEffect, useState, useRef, TouchEvent, MouseEvent } from "react";
import Image from "next/image";

interface InteractiveImageSliderProps {
  images: { src: string; alt?: string }[];
  autoSlideInterval?: number; 
  width?: number | string;
  height?: number | string; 
}

export default function InteractiveImageSlider({
  images,
  autoSlideInterval = 3000,
  width = "100%",
  height = "100%", 
}: InteractiveImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const mouseStartX = useRef(0);
  const isDragging = useRef(false);
  const swipeThreshold = 50;

  // Auto Slide
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);
    return () => clearInterval(interval);
  }, [images, autoSlideInterval]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      else if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length]);

  // Touch handlers
  const handleTouchStart = (e: TouchEvent) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e: TouchEvent) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > swipeThreshold) setCurrentIndex((prev) => (prev + 1) % images.length);
    else if (distance < -swipeThreshold) setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Mouse handlers
  const handleMouseDown = (e: MouseEvent) => {
    isDragging.current = true;
    mouseStartX.current = e.clientX;
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const distance = mouseStartX.current - e.clientX;
    if (distance > swipeThreshold) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      isDragging.current = false;
    } else if (distance < -swipeThreshold) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      isDragging.current = false;
    }
  };
  const handleMouseUp = () => (isDragging.current = false);
  const handleMouseLeave = () => (isDragging.current = false);

  return (
    <div
      ref={sliderRef}
      className="relative w-full select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ width, height }}
    >
      {/* Slider */}
      <div className="overflow-hidden rounded-xl shadow-lg relative w-full h-full">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${(idx - currentIndex) * 100}%)` }}
          >
            <Image
              src={img.src}
              alt={img.alt || `Slide ${idx + 1}`}
              fill
              className="object-cover w-full h-full"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentIndex ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
