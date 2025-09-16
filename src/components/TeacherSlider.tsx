// src/components/TeacherSlider.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

interface Teacher {
  id: string;
  name: string;
  title?: string;
  subject?: string;
  avatar?: string;
  bio?: string;
  email?: string;
  phone?: string;
  socials?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
}

interface Props {
  teachers: Teacher[];
  autoplay?: boolean;
  interval?: number;
}

export default function TeacherSlider({
  teachers,
  autoplay = true,
  interval = 4000,
}: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const loopTeachers = [teachers[teachers.length - 1], ...teachers, teachers[0]];

  const goToIndex = (index: number, behavior: ScrollBehavior = "smooth") => {
    const container = trackRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

    const cards = Array.from(container.querySelectorAll(".teacher-card")) as HTMLElement[];
    const target = cards[index];

    if (isInViewport) {
      target?.scrollIntoView({ behavior, inline: "center", block: "nearest" });
    }

    setCurrentIndex(index);
  };

  const next = () => goToIndex((currentIndex + 1) % loopTeachers.length);
  const prev = () => goToIndex((currentIndex - 1 + loopTeachers.length) % loopTeachers.length);

  useEffect(() => {
    if (!autoplay || isPaused) return;
    autoplayRef.current = setInterval(() => next(), interval);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, isPaused, interval, currentIndex]);

  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;

    const enter = () => setIsPaused(true);
    const leave = () => setIsPaused(false);

    container.addEventListener("mouseenter", enter);
    container.addEventListener("mouseleave", leave);
    container.addEventListener("touchstart", enter);
    container.addEventListener("touchend", leave);

    return () => {
      container.removeEventListener("mouseenter", enter);
      container.removeEventListener("mouseleave", leave);
      container.removeEventListener("touchstart", enter);
      container.removeEventListener("touchend", leave);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex]);

  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;

    let startX = 0;
    let isDragging = false;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      setIsPaused(true);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const deltaX = e.touches[0].clientX - startX;
      container.scrollLeft -= deltaX;
      startX = e.touches[0].clientX;
    };

    const onTouchEnd = () => {
      isDragging = false;
      setIsPaused(false);

      const cards = Array.from(container.querySelectorAll(".teacher-card")) as HTMLElement[];
      const nearestIndex = cards.reduce((prevIdx, card, idx) => {
        const cardRect = card.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const diff = Math.abs(cardRect.left + cardRect.width / 2 - (containerRect.left + containerRect.width / 2));
        const prevDiff = Math.abs(
          (cards[prevIdx].getBoundingClientRect().left + cards[prevIdx].getBoundingClientRect().width / 2) -
          (containerRect.left + containerRect.width / 2)
        );
        return diff < prevDiff ? idx : prevIdx;
      }, 0);

      goToIndex(nearestIndex, "smooth");
    };

    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchmove", onTouchMove);
    container.addEventListener("touchend", onTouchEnd);

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section className="relative">
      <h2 className="text-3xl font-bold mb-4 text-center">Our Teachers</h2>

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

      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 py-6"
      >
        {loopTeachers.map((t, idx) => (
          <article
            key={idx}
            className="teacher-card snap-center flex-none w-[84%] sm:w-[46%] md:w-[32%] lg:w-[28%] bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-900/20 dark:to-pink-900/20 rounded-3xl p-6 shadow-lg hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={t.avatar || "/placeholder-avatar.png"}
                alt={t.name}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-indigo-400/50"
              />
              <div>
                <h3 className="font-semibold text-lg">{t.name}</h3>
                <p className="text-sm text-muted-foreground">{t.title ?? t.subject}</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted-foreground line-clamp-3">{t.bio}</p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-3 text-gray-500 dark:text-gray-300">
                {t.socials?.facebook && (
                  <a
                    href={t.socials.facebook}
                    target="_blank"
                    aria-label="Facebook"
                    className="hover:text-blue-600 transition"
                  >
                    {/* Facebook Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35C.596 0 0 .774 0 1.729v20.542C0 23.226.596 24 1.77 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.098 2.796.142v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.59l-.467 3.622h-3.123V24h6.116c.73 0 1.324-.594 1.324-1.326V1.729C24 .774 23.405 0 22.675 0z"/>
                    </svg>
                  </a>
                )}
                {t.socials?.linkedin && (
                  <a
                    href={t.socials.linkedin}
                    target="_blank"
                    aria-label="LinkedIn"
                    className="hover:text-blue-500 transition"
                  >
                    {/* LinkedIn Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.23 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.77 24h20.46C23.208 24 24 23.225 24 22.271V1.729C24 .774 23.208 0 22.23 0zM7.061 20.452H3.548V9h3.513v11.452zM5.304 7.545a2.037 2.037 0 1 1 0-4.074 2.037 2.037 0 0 1 0 4.074zm15.148 12.907h-3.512v-5.605c0-1.336-.024-3.06-1.864-3.06-1.865 0-2.151 1.456-2.151 2.96v5.705h-3.514V9h3.374v1.561h.048c.47-.888 1.616-1.824 3.328-1.824 3.556 0 4.21 2.341 4.21 5.383v6.332z"/>
                    </svg>
                  </a>
                )}
                {t.socials?.twitter && (
                  <a
                    href={t.socials.twitter}
                    target="_blank"
                    aria-label="Twitter"
                    className="hover:text-sky-400 transition"
                  >
                    {/* Twitter Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.949.564-2.003.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.204-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.734-.666 1.584-.666 2.488 0 1.717.87 3.234 2.188 4.125-.807-.026-1.566-.247-2.228-.616v.062c0 2.404 1.711 4.407 3.977 4.859-.416.113-.855.173-1.307.173-.32 0-.632-.03-.938-.086.633 1.953 2.445 3.376 4.6 3.417-1.68 1.318-3.809 2.105-6.102 2.105-.396 0-.788-.023-1.175-.069 2.179 1.397 4.768 2.213 7.548 2.213 9.056 0 14.009-7.496 14.009-13.986 0-.21 0-.423-.015-.635.961-.695 1.8-1.562 2.46-2.549z"/>
                    </svg>
                  </a>
                )}
                {t.phone && (
                  <a
                    href={`tel:${t.phone}`}
                    className="ml-2 text-sm text-green-600 dark:text-indigo-400"
                  >
                    {/* Phone Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.05l-2.2 2.2z"/>
                    </svg>
                  </a>
                )}
              </div>
              <button
                onClick={() => setSelectedTeacher(t)}
                className="px-3 py-2 bg-indigo-600 text-white rounded-md"
              >
                Message
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {teachers.map((_, i) => (
          <button
            key={i}
            onClick={() => goToIndex(i + 1)}
            className={`w-3 h-3 rounded-full ${i + 1 === currentIndex ? "bg-indigo-600" : "bg-gray-400"}`}
          />
        ))}
      </div>

      {selectedTeacher && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl max-w-lg w-full relative">
            <button
              onClick={() => setSelectedTeacher(null)}
              className="absolute top-3 right-3 text-gray-600"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedTeacher.name}</h2>
            <p className="text-sm text-muted-foreground mb-4">{selectedTeacher.bio}</p>

            <form className="space-y-3">
              <input type="text" placeholder="Your Name" className="w-full border px-3 py-2 rounded-md" />
              <input type="email" placeholder="Your Email" className="w-full border px-3 py-2 rounded-md" />
              <textarea placeholder="Message" className="w-full border px-3 py-2 rounded-md" />
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md">Submit</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
