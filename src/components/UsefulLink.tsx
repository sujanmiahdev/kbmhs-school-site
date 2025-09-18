"use client";

import Link from "next/link";

const links: { name: string; href: string }[] = [
 
  { name: "NCTB", href: "https://nctb.gov.bd/" },
   { name: "e-SIF", href: "  https://erp.dhakaeducationboard.gov.bd/index.php/auth/login/" },
 { name: "EMIS", href: "https://application.emis.gov.bd/sso/Account/Login?ReturnUrl=%2FSSO" },
  { name: "Board Result", href: "https://www.eboardresults.com/v2/home" },
    { name: "XI-Admission", href: "  https://xiclassadmission.gov.bd/" },
  { name: "Dhaka Education Board", href:"//www.dhakaeducationboard.gov.bd/site/" },
  { name: "Department of Education Board", href:"https://dshe.gov.bd/" },
   { name: "উইকিপিডিয়া", href: "https://bn.wikipedia.org/" },

];

const SidebarCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl hover:scale-[1.02] transform-gpu">
      {/* Heading */}
      <h2 className="text-xl font-bold text-red-600 mb-4 border-b pb-2 flex justify-center items-center gap-2">
  <span>🌏</span> Useful Link
</h2>


      {/* List */}
      <ul className="flex flex-col justify-between space-y-1  ">
        {links.map((link, index) => (
          <li key={index} >
            <Link
              href={link.href}
              className="block px-2 py-1 bg-gray-200 rounded-lg text-gray-700 hover:bg-green-500 hover:text-white transition font-medium"
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
