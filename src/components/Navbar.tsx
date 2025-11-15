"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Menu Items kept inside Navbar
const menuItems = [
  { name: "Home", link: "/" },
  {
    name: "Institute",
    dropdown: [
      { name: "Welcome Speech", link: "/welcome-speech" },
      { name: "Institute Details", link: "/institute-details" },
      { name: "Governing Body", link: "/navbar/governing-body" },
      { name: "Director General", link: "/director-general" },
    ],
  },
  { name: "Administration", link: "/administration" },
  { name: "Teacher", link: "/teacher-list" },
  {
    name: "Staff & MLSS",
    dropdown: [
      { name: "Staff", link: "/staff" },
      { name: "MLSS", link: "#" },
    ],
  },
  { name: "Students", link: "/student-info" },
  {
    name: "Academic",
    dropdown: [
      { name: "Admission", link: "admission" },
      { name: "Book List", link: "book-list" },
      { name: "Dress", link: "dress" },
      { name: "Syllabus", link: "syllabus" },
      { name: "Class Routine", link: "class-routine" },
      { name: "Exam Routine", link: "exam-routine" },
    ],
  },
  {
    name: "Result",
    dropdown: [
      { name: "School Result", link: "/school-result" },
      { name: "Board Result", link: "https://eboardresults.com/v2/home" }, // external
    ],
  },
  {
    name: "Publications",
    dropdown: [
      { name: "Magazine", link: "/magazine" },
      { name: "Media News", link: "/media-news" },
    ],
  },
  {
    name: "Gallery",
    dropdown: [
      { name: "Photo Gallery", link: "/photo-gallery" },
      { name: "Video Gallery", link: "/video-gallery" },
    ],
  },
];

// Animation Variants
const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: -5, transition: { duration: 0.2 } },
};

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const renderLink = (sub: { name: string; link: string }) => {
    const isSubActive = sub.link === pathname;
    const isExternal = sub.link.startsWith("http");

    if (isExternal) {
      return (
        <a
          href={sub.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`block px-4 py-2 rounded-lg cursor-pointer ${
            isSubActive ? "bg-green-600" : "hover:bg-green-600"
          }`}
        >
          {sub.name}
        </a>
      );
    } else {
      return (
        <Link
          href={sub.link || "#"}
          className={`block px-4 py-2 rounded-lg cursor-pointer ${
            isSubActive ? "bg-green-600" : "hover:bg-green-600"
          }`}
        >
          {sub.name}
        </Link>
      );
    }
  };

  const renderMobileLink = (sub: { name: string; link: string }) => {
    const isSubActive = sub.link === pathname;
    const isExternal = sub.link.startsWith("http");

    if (isExternal) {
      return (
        <a
          href={sub.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`block px-3 py-1 rounded-lg cursor-pointer ${
            isSubActive ? "bg-green-600" : "hover:bg-green-600"
          }`}
        >
          {sub.name}
        </a>
      );
    } else {
      return (
        <Link
          href={sub.link || "#"}
          className={`block px-3 py-1 rounded-lg cursor-pointer ${
            isSubActive ? "bg-green-600" : "hover:bg-green-600"
          }`}
        >
          {sub.name}
        </Link>
      );
    }
  };

  return (
    <nav className="bg-blue-900 relative z-50">
      {/* Desktop Navbar */}
      <ul className="hidden md:flex justify-center items-center gap-2 py-3 text-white font-medium">
        {menuItems.map((item, i) => {
          const isParentActive = item.link
            ? pathname === item.link
            : item.dropdown
            ? item.dropdown.some(sub => sub.link === pathname)
            : false;

          return (
            <li
              key={i}
              className="relative group flex items-center"
              onMouseEnter={() => item.dropdown && setOpenDropdown(i)}
              onMouseLeave={() => item.dropdown && setOpenDropdown(null)}
            >
              {item.link || !item.dropdown ? (
                <Link
                  href={item.link || "#"}
                  className={`px-3 py-2 rounded-lg transition flex items-center gap-1 cursor-pointer ${
                    isParentActive ? "bg-green-600" : "hover:bg-green-600"
                  }`}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  onClick={() => item.dropdown && toggleDropdown(i)}
                  className={`px-3 py-2 rounded-lg transition flex items-center gap-1 cursor-pointer ${
                    isParentActive ? "bg-green-600" : "hover:bg-green-600"
                  }`}
                >
                  {item.name}
                  {item.dropdown &&
                    (openDropdown === i ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </button>
              )}

              {/* Desktop Dropdown */}
              <AnimatePresence>
                {item.dropdown && openDropdown === i && (
                  <motion.ul
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-0 top-full mt-1 bg-blue-900 rounded-lg shadow-lg min-w-[150px] overflow-hidden"
                  >
                    {item.dropdown.map(sub => (
                      <motion.li key={sub.name} variants={itemVariants}>
                        {renderLink(sub)}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {/* Mobile Navbar */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden absolute right-4 top-3 p-2 text-white"
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col gap-2 px-4 py-3 text-white font-medium bg-blue-900"
          >
            {menuItems.map((item, i) => {
              const isParentActive = item.link
                ? pathname === item.link
                : item.dropdown
                ? item.dropdown.some(sub => sub.link === pathname)
                : false;

              return (
                <li key={i} className="flex flex-col">
                  {item.link || !item.dropdown ? (
                    <Link
                      href={item.link || "#"}
                      className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center justify-between cursor-pointer ${
                        isParentActive ? "bg-green-600" : "hover:bg-green-600"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => item.dropdown && toggleDropdown(i)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center justify-between cursor-pointer ${
                        isParentActive ? "bg-green-600" : "hover:bg-green-600"
                      }`}
                    >
                      {item.name}
                      {item.dropdown &&
                        (openDropdown === i ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        ))}
                    </button>
                  )}

                  {/* Mobile Dropdown */}
                  <AnimatePresence>
                    {item.dropdown && openDropdown === i && (
                      <motion.ul
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="pl-6 space-y-1 overflow-hidden"
                      >
                        {item.dropdown.map(sub => (
                          <motion.li key={sub.name} variants={itemVariants}>
                            {renderMobileLink(sub)}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
