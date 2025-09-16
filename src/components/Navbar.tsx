"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Animation Variants
const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, duration: 0.3 },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: -5, transition: { duration: 0.2 } },
};

interface MenuItem {
  name: string;
  link?: string;
  dropdown?: { name: string; link?: string }[];
}

interface NavbarProps {
  menuItems: MenuItem[];
}

export default function Navbar({ menuItems }: NavbarProps) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <nav className="bg-blue-900 relative z-50">
      {/* Desktop Navbar */}
      <ul className="hidden md:flex justify-center items-center gap-2 py-3 text-white font-medium">
        {menuItems.map((item, i) => {
          const isActive = item.link && pathname === item.link;
          return (
            <li
              key={i}
              className="relative group flex items-center"
              onMouseEnter={() => item.dropdown && setOpenDropdown(i)}
              onMouseLeave={() => item.dropdown && setOpenDropdown(null)}
            >
              {item.link ? (
                <Link
                  href={item.link}
                  className={`px-3 py-2 rounded-lg transition flex items-center gap-1 cursor-pointer 
                    ${isActive ? "bg-green-600" : "hover:bg-green-600"}`}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  onClick={() => item.dropdown && toggleDropdown(i)}
                  className="px-3 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-1 cursor-pointer"
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

              {/* Dropdown with Animation */}
              <AnimatePresence>
                {item.dropdown && openDropdown === i && (
                  <motion.ul
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-0 top-full mt-1 bg-blue-900 rounded-lg shadow-lg min-w-[150px] overflow-hidden"
                  >
                    {item.dropdown.map((sub, idx) => {
                      const isSubActive = sub.link && pathname === sub.link;
                      return (
                        <motion.li key={idx} variants={itemVariants}>
                          <Link
                            href={sub.link || "#"}
                            className={`block px-4 py-2 rounded-lg cursor-pointer 
                              ${isSubActive ? "bg-green-600" : "hover:bg-green-600"}`}
                          >
                            {sub.name}
                          </Link>
                        </motion.li>
                      );
                    })}
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
              const isActive = item.link && pathname === item.link;
              return (
                <li key={i} className="flex flex-col">
                  {item.link ? (
                    <Link
                      href={item.link}
                      className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center justify-between cursor-pointer 
                        ${isActive ? "bg-green-600" : "hover:bg-green-600"}`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => item.dropdown && toggleDropdown(i)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-between cursor-pointer"
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

                  {/* Mobile Dropdown Animation */}
                  <AnimatePresence>
                    {item.dropdown && openDropdown === i && (
                      <motion.ul
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="pl-6 space-y-1 overflow-hidden"
                      >
                        {item.dropdown.map((sub, idx) => {
                          const isSubActive = sub.link && pathname === sub.link;
                          return (
                            <motion.li key={idx} variants={itemVariants}>
                              <Link
                                href={sub.link || "#"}
                                className={`block px-3 py-1 rounded-lg cursor-pointer 
                                  ${isSubActive ? "bg-green-600" : "hover:bg-green-600"}`}
                              >
                                {sub.name}
                              </Link>
                            </motion.li>
                          );
                        })}
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
