"use client";
import React from "react";

interface SyllabusItem {
  id: number;
  year: number;
  className: string;
  fileUrl: string;
}

const syllabusData: SyllabusItem[] = [
  
  { id: 1, year: 2025, className: "Nine", fileUrl: "/syllabus/syllabus-nine.pdf" },
  { id: 2, year: 2024, className: "Eight", fileUrl: "/files/syllabus-eight.pdf" },
];

const SyllabusComponent: React.FC = () => {
  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.substring(url.lastIndexOf("/") + 1);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sort by latest year first
  const sortedData = [...syllabusData].sort((a, b) => b.year - a.year);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      {/* Heading */}
    <h2 className="text-2xl md:text-3xl font-semibold text-center mb-2 text-slate-700">
  Comprehensive Classwise Syllabus
</h2>
<p className="text-center text-slate-500 mb-8">
  Explore the official academic syllabus for each class, curated for effective learning
</p>


      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-slate-200 rounded-lg overflow-hidden">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-center border-b">Serial No</th>
              <th className="px-4 py-3 text-center border-b">Year</th>
              <th className="px-4 py-3 text-center border-b">Class</th>
              <th className="px-4 py-3 text-center border-b">Syllabus</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 border-b text-center">{index + 1}</td>
                <td className="px-4 py-3 border-b text-center">{item.year}</td>
                <td className="px-4 py-3 border-b text-center">{item.className}</td>
                <td className="px-4 py-3 border-b text-center flex justify-center gap-2">
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                  >
                    View File
                  </a>
                  <button
                    onClick={() => handleDownload(item.fileUrl)}
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden flex flex-col gap-4">
        {sortedData.map((item, index) => (
          <div key={item.id} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between mb-2 text-sm md:text-base font-medium text-slate-700">
              <span>Serial No: {index + 1}</span>
              <span>Year: {item.year}</span>
            </div>
            <div className="mb-3 text-sm md:text-base font-medium text-slate-700">
              Class: {item.className}
            </div>
            <div className="flex gap-2">
              <a
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex-1 text-center"
              >
                View File
              </a>
              <button
                onClick={() => handleDownload(item.fileUrl)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition flex-1"
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SyllabusComponent;
