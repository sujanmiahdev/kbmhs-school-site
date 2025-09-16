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
  // 🔹 Student Data
  const students: Student[] = [
    {
      id: "1",
      name: "Rahim Uddin",
      gpa: "5.00",
      classSection: "Class 10 (Science, A)",
      passingYear: "SSC 2018",
      institution: "BUET (CSE)",
      photo: "/students/rahim.jpg",
    },
    {
      id: "2",
      name: "Anika Sultana",
      gpa: "5.00",
      classSection: "Class 12 (Commerce, B)",
      passingYear: "HSC 2019",
      institution: "DU (Accounting)",
      photo: "/students/anika.jpg",
    },
    {
      id: "3",
      name: "Kamal Hossain",
      gpa: "5.00",
      classSection: "Class 8 (Arts, C)",
      passingYear: "JSC 2017",
      institution: "Notre Dame College",
      photo: "/students/kamal.jpg",
    },
    {
      id: "4",
      name: "Mitu Akter",
      gpa: "5.00",
      classSection: "Class 10 (Science, B)",
      passingYear: "SSC 2020",
      institution: "DMC (Medical)",
      photo: "/students/mitu.jpg",
    },
  ];

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loopStudents = [students[students.length - 1], ...students, students[0]];

  const goToIndex = (index: number, behavior: ScrollBehavior = "smooth") => {
    const container = trackRef.current;
    if (!container) return;
    const cards = Array.from(container.querySelectorAll(".student-card")) as HTMLElement[];
    const target = cards[index];
    target?.scrollIntoView({ behavior, inline: "center", block: "nearest" });
    setCurrentIndex(index);
  };

  const next = () => goToIndex((currentIndex + 1) % loopStudents.length);
  const prev = () => goToIndex((currentIndex - 1 + loopStudents.length) % loopStudents.length);

  // autoplay
  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className="relative">
      <h2 className="text-3xl font-bold mb-6 text-center">Shining Our Students</h2>

      {/* Navigation */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/80 p-2 rounded-full shadow z-10"
      >
        ◀
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/80 p-2 rounded-full shadow z-10"
      >
        ▶
      </button>

      {/* Slider */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 py-6"
      >
        {loopStudents.map((s, idx) => (
          <article
            key={idx}
            className="student-card snap-center flex-none w-[84%] sm:w-[46%] md:w-[32%] lg:w-[28%] 
              bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10 
              dark:from-green-900/20 dark:to-purple-900/20 
              rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition"
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={s.photo || "/placeholder-avatar.png"}
                alt={s.name}
                className="w-28 h-28 rounded-xl object-cover mb-4 shadow-md"
              />
              <h3 className="font-semibold text-lg">{s.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">GPA: {s.gpa}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{s.classSection}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{s.passingYear}</p>
              <p className="text-sm font-medium mt-2 text-indigo-700 dark:text-indigo-400">
                {s.institution}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2">
        {students.map((_, i) => (
          <button
            key={i}
            onClick={() => goToIndex(i + 1)}
            className={`w-3 h-3 rounded-full ${i + 1 === currentIndex ? "bg-indigo-600" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </section>
  );
}
