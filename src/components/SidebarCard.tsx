"use client";

import Link from "next/link";

const links: { name: string; href: string }[] = [
  { name: "School Admission", href: "/admission" },
  { name: "Book List", href: "/book-list" },
  { name: "Dress", href: "/dress" },
  { name: "Syllabus", href: "/syllabus" },
  { name: "Class Routine", href: "/class-routine" },
  { name: "Exam Routine", href: "/exam-routine" },
  { name: "Facility", href: "/facility" },
  { name: "School Result", href: "/school-result" },
  { name: "Board Result", href: "/board-result" },
  { name: "Dhaka Education Board", href:"//www.dhakaeducationboard.gov.bd/site/" },
  { name: "Department of Education Board", href:"https://dshe.gov.bd/" },

];

const SidebarCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 h-135">
      {/* Heading */}
      <h2 className="text-xl font-bold text-red-600 mb-4 border-b pb-2 flex justify-center items-center gap-2">
  <span>📌</span> Important Link
</h2>


      {/* List */}
      <ul className="flex flex-col justify-between space-y-1.5  ">
        {links.map((link, index) => (
          <li key={index} >
            <Link
              href={link.href}
              className="block px-3 py-1 bg-gray-200 rounded-lg text-gray-700 hover:bg-green-500 hover:text-white transition font-medium"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarCard;
