"use client";

import React, { useEffect, useRef, useState } from "react";

interface Student {
  id: string;
  name: string;
  gpa: string;
  classSection: string;
  passingYear: string;
  institution: string;
  photo?: string;
}

export default function ShiningStudentSlider() {
  const students: Student[] = [
    { id: "1", name: "Rahim Uddin", gpa: "5.00", classSection: "Class 10 (Science, A)", passingYear: "SSC 2018", institution: "BUET (CSE)", photo: "/image/student1.jpg" },
    { id: "2", name: "Anika Sultana", gpa: "5.00", classSection: "Class 10 (Commerce, B)", passingYear: "HSC 2019", institution: "DU (Accounting)", photo: "/image/student2.jpg" },
    { id: "3", name: "Kamal Hossain", gpa: "5.00", classSection: "Class 10 (Arts, C)", passingYear: "HSC 2017", institution: "Notre Dame College", photo: "/image/student5.jpg" },
    { id: "4", name: "Mitu Akter", gpa: "5.00", classSection: "Class 10 (Science, B)", passingYear: "SSC 2020", institution: "DMC (Medical)", photo: "/image/student3.jpg" },
  ];

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isInView, setIsInView] = useState(false); // <-- viewport focus
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loopStudents = [students[students.length - 1], ...students, students[0]];

  const goToIndex = (index: number, behavior: ScrollBehavior = "smooth") => {
    const container = trackRef.current;
    if (!container) return;
    const cards = Array.from(container.querySelectorAll(".student-card")) as HTMLElement[];
    const target = cards[index];
    target?.scrollIntoView({ behavior, inline: "center", block: "nearest" });
    setCurrentIndex(index);
  };

  const next = () => setCurrentIndex((prev) => prev + 1);
  const prev = () => setCurrentIndex((prev) => prev - 1);

  // 🔹 Intersection Observer for viewport-based focus
  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsInView(entry.isIntersecting));
      },
      { threshold: 0.5 } // 50% visible
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // 🔹 Autoplay only if in view and not dragging
  useEffect(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);

    if (!isDragging && isInView) {
      autoplayRef.current = setInterval(() => next(), 4000);
    }

    return () => clearInterval(autoplayRef.current!);
  }, [isDragging, isInView]);

  // 🔹 Loop fix
  useEffect(() => {
    if (currentIndex === loopStudents.length - 1) {
      goToIndex(currentIndex, "smooth");
      setTimeout(() => setCurrentIndex(1), 400);
    } else if (currentIndex === 0) {
      goToIndex(currentIndex, "smooth");
      setTimeout(() => setCurrentIndex(loopStudents.length - 2), 400);
    } else {
      goToIndex(currentIndex, "smooth");
    }
  }, [currentIndex, loopStudents.length]);

  // 🔹 Drag & Swipe support
  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;

    let startX = 0;
    let scrollLeft = 0;
    let touchStartX = 0;
    let touchScrollLeft = 0;

    // Mouse
    const onMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.classList.add("cursor-grabbing");
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const x = e.pageX - container.offsetLeft;
      container.scrollLeft = scrollLeft - (x - startX);
    };
    const onMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      container.classList.remove("cursor-grabbing");
      snapToNearest();
    };

    // Touch
    const onTouchStart = (e: TouchEvent) => {
      setIsDragging(true);
      touchStartX = e.touches[0].clientX;
      touchScrollLeft = container.scrollLeft;
    };
    const onTouchMove = (e: TouchEvent) => {
      const x = e.touches[0].clientX;
      container.scrollLeft = touchScrollLeft - (x - touchStartX);
    };
    const onTouchEnd = () => {
      setIsDragging(false);
      snapToNearest();
    };

    const snapToNearest = () => {
      const cards = Array.from(container.querySelectorAll(".student-card")) as HTMLElement[];
      const containerRect = container.getBoundingClientRect();
      const nearestIndex = cards.reduce((prevIdx, card, idx) => {
        const cardRect = card.getBoundingClientRect();
        const diff = Math.abs(cardRect.left + cardRect.width / 2 - (containerRect.left + containerRect.width / 2));
        const prevDiff = Math.abs(cards[prevIdx].getBoundingClientRect().left + cards[prevIdx].getBoundingClientRect().width / 2 - (containerRect.left + containerRect.width / 2));
        return diff < prevDiff ? idx : prevIdx;
      }, 0);
      setCurrentIndex(nearestIndex);
    };

    // Event listeners
    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchmove", onTouchMove);
    container.addEventListener("touchend", onTouchEnd);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section className="relative">
      <h2 className="text-3xl font-bold mb-6 text-center">🌟 Shining Our Students</h2>

      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/80 p-2 rounded-full shadow z-10">◀</button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/80 p-2 rounded-full shadow z-10">▶</button>

      <div ref={trackRef} className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 py-6 cursor-grab">
        {loopStudents.map((s, idx) => (
          <article key={idx} className="student-card snap-center flex-none w-[84%] sm:w-[46%] md:w-[32%] lg:w-[28%] bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10 dark:from-green-900/20 dark:to-purple-900/20 rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition">
            <div className="flex flex-col items-center text-center">
              <img src={s.photo || "/placeholder-avatar.png"} alt={s.name} className="w-28 h-28 rounded-xl object-cover mb-4 shadow-md" />
              <h3 className="font-semibold text-lg">{s.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">GPA: {s.gpa}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{s.classSection}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{s.passingYear}</p>
              <p className="text-sm font-medium mt-2 text-indigo-700 dark:text-indigo-400">{s.institution}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {students.map((_, i) => (
          <button key={i} onClick={() => setCurrentIndex(i + 1)} className={`w-3 h-3 rounded-full ${i + 1 === currentIndex ? "bg-indigo-600" : "bg-gray-400"}`} />
        ))}
      </div>
    </section>
  );
}
