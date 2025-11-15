"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";


/**
 * Result Search + Result Card (Demo)
 * - Floating labels for inputs
 * - Dropdowns: Class, Group/Section, Year (present→1970), Shift, Exam Name
 * - Submit clears form and shows matching demo result (if found)
 * - Result card styled like Bangladesh school report (based on your image)
 * - QR code on bottom-right, signatures, PDF download via jsPDF + html2canvas
 *
 * Save as: /app/result/page.tsx
 */

type SubjectRow = {
  name: string;
  fullMarks: number;
  written?: number;
  mcq?: number;
  practical?: number;
  total?: number;
  grade?: string;
  point?: number;
};

type DemoResult = {
  fullName: string;
  fatherName?: string;
  motherName?: string;
  studentId?: string;
  className: string;
  group: string;
  section: string;
  roll: string;
  year: string;
  shift?: string;
  examName: string;
  photo?: string;
  subjects: SubjectRow[];
  totalMarks: number;
  obtainedMarks: number;
  gpa: string;
  grade: string;
  status?: string;
  classPosition?: string;
  groupPosition?: string;
  sectionPosition?: string;
  attendance?: string;
  workingDays?: string;
};

const DEMO_RESULTS: DemoResult[] = [
  {
    fullName: "MD SUJAN MIAH",
    fatherName: "MD MOTALEB MIAH",
    motherName: "SHAMELA BEGUM",
    studentId: "ST10164",
    className: "NINE",
    group: "Science",
    section: "A",
    roll: "1",
    year: "2025",
    shift: "Day",
    examName: "Half Yearly",
    photo: "/image/student1.jpg", // optional; put an image in public/students/demo-student.jpg or leave
    subjects: [
      { name: "Bangla 1st", fullMarks: 100, written: 60, mcq: 22, practical: 0, total: 82, grade: "A+", point: 5 },
      { name: "Bangla 2nd", fullMarks: 100, written: 54, mcq: 28, practical: 0, total: 82, grade: "A+", point: 5 },
      { name: "English 1st", fullMarks: 100, written: 86, mcq: 0, practical: 0, total: 86, grade: "A+", point: 5 },
      { name: "English 2nd", fullMarks: 100, written: 76, mcq: 0, practical: 0, total: 76, grade: "A", point: 4 },
      { name: "Mathematics", fullMarks: 100, written: 35, mcq: 20, practical: 0, total: 55, grade: "B", point: 3 },
      { name: "Religion", fullMarks: 100, written: 60, mcq: 24, practical: 0, total: 84, grade: "A+", point: 5 },
      { name: "ICT Written", fullMarks: 50, written: 10, mcq: 13, practical: 20, total: 43, grade: "A+", point: 5 },
      { name: "BGS", fullMarks: 100, written: 59, mcq: 24, practical: 0, total: 83, grade: "A+", point: 5 },
      { name: "Physics", fullMarks: 100, written: 27, mcq: 13, practical: 20, total: 60, grade: "A-", point: 3.5 },
      { name: "Chemistry", fullMarks: 100, written: 42, mcq: 19, practical: 20, total: 81, grade: "A+", point: 5 },
      { name: "Biology", fullMarks: 100, written: 42, mcq: 23, practical: 20, total: 85, grade: "A+", point: 5 },
      { name: "Higher Math (4th Subject)", fullMarks: 100, written: 40, mcq: 20, practical: 20, total: 80, grade: "A+", point: 3.5 },
    ],
    totalMarks: 1150,
    obtainedMarks: 839,
    gpa: "4.78",
    grade: "A",
    status: "PASS",
    classPosition: "1 of 57",
    groupPosition: "1",
    sectionPosition: "1 of 57",
    workingDays:"150 Days",
    attendance: "120 Days",
  },
  // add more demo entries if you want
];

function generateYearsList(from = 1970) {
  const yrs: string[] = [];
  const thisYear = new Date().getFullYear();
  for (let y = thisYear; y >= from; y--) yrs.push(String(y));
  return yrs;
}

export default function ResultPage() {
  // form fields
  const [examName, setExamName] = useState("Half Yearly");
  const [fullName, setFullName] = useState("");
  const [className, setClassName] = useState("");
  const [group, setGroup] = useState("");
  const [section, setSection] = useState("");
  const [roll, setRoll] = useState("");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [shift, setShift] = useState("Day");

  const [loading, setLoading] = useState(false);
  const [matched, setMatched] = useState<DemoResult | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const classes = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT","NINE","TEN","SSC","ELEVEN", "TWELVE"];
  const groups = ["Science", "Arts", "Commerce", "General"];
  const sections = ["A", "B", "C", "D"];
  const shifts = ["Day", "Morning", "Evening"];
  const exams = ["Half Yearly", "Annual", "Test", "Final", "Mock"];
  const years = useMemo(() => generateYearsList(1970), []);

  useEffect(() => {
    // nothing special
  }, []);

  const clearForm = () => {
    setExamName("Half Yearly");
    setFullName("");
    setClassName("");
    setGroup("");
    setSection("");
    setRoll("");
    setYear(String(new Date().getFullYear()));
    setShift("Day");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMatched(null);

    // simulate searching delay (like fetching from DB)
    setTimeout(() => {
      const found = DEMO_RESULTS.find((r) => {
        return (
          r.fullName.toLowerCase() === fullName.toLowerCase().trim() &&
          r.className.toLowerCase() === className.toLowerCase().trim() &&
          r.group.toLowerCase() === group.toLowerCase().trim() &&
          r.section.toLowerCase() === section.toLowerCase().trim() &&
          r.roll === roll.trim() &&
          r.year === year.trim() &&
          r.shift?.toLowerCase() === shift.toLowerCase().trim() &&
          r.examName.toLowerCase() === examName.toLowerCase().trim()
        );
      }) || null;

      setMatched(found);
      setLoading(false);

      // clear form as requested
      clearForm();
    }, 900); // small delay to show shimmer
  };

const handleDownloadPDF = async () => {
  if (!cardRef.current || !matched) return;

  // High-quality canvas capture
  const canvas = await html2canvas(cardRef.current, {
    scale: 3,
    useCORS: true,
    allowTaint: true,
    scrollY: -window.scrollY,
  });

  const imgData = canvas.toDataURL("image/png");

  // Legal landscape PDF
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "legal",
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // Calculate scaling to fit PDF page
  const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
  const imgWidth = canvas.width * ratio;
  const imgHeight = canvas.height * ratio;

  // Centering the image
  const x = (pdfWidth - imgWidth) / 2;
  const y = (pdfHeight - imgHeight) / 2;

  pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
  pdf.save(`${matched.fullName.replace(/\s+/g, "_")}_Result_${matched.year}.pdf`);
};





  // small helper to render subject rows
  const renderSubjectRow = (s: SubjectRow, idx: number) => (
    <tr key={idx} className="even:bg-white odd:bg-slate-50">
      <td className="border px-2 py-1 text-sm">{s.name}</td>
      <td className="border px-2 py-1 text-sm text-center">{s.fullMarks}</td>
      <td className="border px-2 py-1 text-sm text-center">{s.written ?? "-"}</td>
      <td className="border px-2 py-1 text-sm text-center">{s.mcq ?? "-"}</td>
      <td className="border px-2 py-1 text-sm text-center">{s.practical ?? "-"}</td>
      <td className="border px-2 py-1 text-sm text-center">{s.total ?? "-"}</td>
      <td className="border px-2 py-1 text-sm text-center">{s.point ?? "-"}</td>
      <td className="border px-2 py-1 text-sm text-center">{s.grade ?? "-"}</td>
    </tr>
  );

  

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-slate-800">Student Result Search</h1>
          <p className="mt-2 text-slate-600">Demo — Kumulli Bachchu Mia Model High School</p>
        </header>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Row 1: Exam */}
          <div className="relative md:col-span-1">
            <label className={`absolute left-3 -top-3 bg-white px-1 text-xs text-slate-600`}>Name of Examination</label>
            <select
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none"
            >
              {exams.map((ex) => (
                <option key={ex} value={ex}>
                  {ex}
                </option>
              ))}
            </select>
          </div>

          {/* Full Name as floating label */}
          <div className="relative md:col-span-2">
            <input
              id="fullname"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder=" "
              className="peer w-full border rounded px-3 py-3 focus:outline-none"
              required
            />
            <label
              htmlFor="fullname"
              className="absolute left-3 top-1 text-xs text-slate-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs"
            >
              Full Name
            </label>
          </div>

          {/* Class */}
          <div className="relative">
            <label className="absolute left-3 -top-3 bg-white px-1 text-xs text-slate-600">Class</label>
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none"
              required
            >
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option value={c} key={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Group */}
          <div className="relative">
            <label className="absolute left-3 -top-3 bg-white px-1 text-xs text-slate-600">Group / Section</label>
            <select
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none"
              required
            >
              <option value="">Select Group</option>
              {groups.map((g) => (
                <option value={g} key={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Section */}
          <div className="relative">
            <label className="absolute left-3 -top-3 bg-white px-1 text-xs text-slate-600">Section</label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none"
              required
            >
              <option value="">Select Section</option>
              {sections.map((s) => (
                <option value={s} key={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Roll */}
          <div className="relative">
            <input
              id="roll"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              placeholder=" "
              className="peer w-full border rounded px-3 py-3 focus:outline-none"
              required
            />
            <label
              htmlFor="roll"
              className="absolute left-3 top-1 text-xs text-slate-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs"
            >
              Roll / ID
            </label>
          </div>

          {/* Year */}
          <div className="relative">
            <label className="absolute left-3 -top-3 bg-white px-1 text-xs text-slate-600">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none"
              required
            >
              <option value="">Select Year</option>
              {years.map((y) => (
                <option value={y} key={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Shift */}
          <div className="relative">
            <label className="absolute left-3 -top-3 bg-white px-1 text-xs text-slate-600">Shift</label>
            <select
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none"
              required
            >
              {shifts.map((s) => (
                <option value={s} key={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="md:col-span-3 text-center mt-2">
            <button
              type="submit"
              className="inline-block bg-sky-600 text-white px-6 py-2 rounded shadow hover:bg-sky-700 transition"
            >
              {loading ? "Searching..." : "Submit"}
            </button>
          </div>
        </form>

        {/* Loading shimmer */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow p-6 animate-pulse h-56" />
            ))}
          </div>
        )}

        {/* Result Card */}
        {!loading && matched && (
          <div className="mb-2">
            <div ref={cardRef} className="bg-white border-2 border-black rounded-lg p-2 relative">
              {/* Outer decorative border like your reference */}
              <div className="border-4 border-black p-2">

                {/* Header */}
              <div className="flex justify-center mb-2">
  {/* Logo + Name Section */}
  <div className="flex items-center gap-4">
  {/* Logo */}
  <Image
    src="/image/kbmhs-logo.png" 
    alt="School Logo"
    width={60}
    height={60}
    className="object-contain"
  />

  {/* Name + Address */}
  <div className="flex flex-col justify-center">
    <h3 className="text-xl font-bold">
      Kumulli Bachchu Mia Model High School
    </h3>
    <p className=" text-center text-sm text-slate-600">
      Kumolli, Manikganj Sadar, Manikganj-1800
    </p>

    <div>
<p className="text-center">
  <strong>Examination:</strong> {matched.examName} - {matched.year}
</p>

    </div>
    
  </div>
</div>

</div>


                {/* Student Info Grid */}
                <div className="grid grid-cols-1  md:grid-cols-2 gap-1 mb-0">
                  <div className="flex gap-1">
                    <div className="w-25 h-25 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
  {matched.photo ? (
    <Image
      src={matched.photo}
      alt={matched.fullName}
      width={300}   // Next.js Image intrinsic size
      height={300} // Next.js Image intrinsic size
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-slate-400">
      Photo
    </div>
  )}
</div>

                    <div className="grid grid-cols-1 gap-1 ext-sm">
                      <p><strong>Student's Name:</strong> {matched.fullName}</p>
                      <p><strong>Father's Name:</strong> {matched.fatherName}</p>
                      <p><strong>Mother's Name:</strong> {matched.motherName}</p>
                      <p><strong>Group</strong>: {matched.group}</p>
                      <p><strong>Class</strong>: {matched.className}</p>
                      
                      
                      
                    </div>
                  </div>

                  <div>
                    <div className="grid grid-cols-1 gap-1 text-sm">
                      <p><strong>Student's ID:</strong> {matched.studentId}</p>
                      <p><strong>Roll</strong>: {matched.roll}</p>
                      <p><strong>Section</strong>: {matched.section}</p>
                      <p><strong>Shift</strong>: {matched.shift}</p>
                      <p><strong>Exam Held</strong>: {new Date().toLocaleString("en-GB", { month: "short", year: "numeric" })}</p>
                    </div>
                  </div>


                  <div>

  {/* Marks	Grade	GPA */}
  <table className="absolute top-3 right-10 border-collapse border border-gray-500 text-sm w-auto  m-1 bg-white shadow-sm">
  <thead>
    <tr className="bg-gray-100">
      <th className="border border-gray-500 px-2 py-1 text-center">Marks</th>
      <th className="border border-gray-500 px-2 py-1 text-center">Grade</th>
      <th className="border border-gray-500 px-2 py-1 text-center">GPA</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border border-gray-500 px-2 py-1 text-center">80-100</td>
      <td className="border border-gray-500 px-2 py-1 text-center">A</td>
      <td className="border border-gray-500 px-2 py-1 text-center">4.0</td>
    </tr>
    <tr>
      <td className="border border-gray-500 px-2 py-1 text-center">70-79</td>
      <td className="border border-gray-500 px-2 py-1 text-center">A-</td>
      <td className="border border-gray-500 px-2 py-1 text-center">3.5</td>
    </tr>
    <tr>
      <td className="border border-gray-500 px-2 py-1 text-center">60-69</td>
      <td className="border border-gray-500 px-2 py-1 text-center">B</td>
      <td className="border border-gray-500 px-2 py-1 text-center">3.0</td>
    </tr>
    <tr>
      <td className="border border-gray-500 px-2 py-1 text-center">50-59</td>
      <td className="border border-gray-500 px-2 py-1 text-center">C</td>
      <td className="border border-gray-500 px-2 py-1 text-center">2.0</td>
    </tr>
    <tr>
      <td className="border border-gray-500 px-2 py-1 text-center">40-49</td>
      <td className="border border-gray-500 px-2 py-1 text-center">D</td>
      <td className="border border-gray-500 px-2 py-1 text-center">1.0</td>
    </tr>
    <tr>
      <td className="border border-gray-500 px-2 py-1 text-center">0-39</td>
      <td className="border border-gray-500 px-2 py-1 text-center">F</td>
      <td className="border border-gray-500 px-2 py-1 text-center">0.0</td>
    </tr>
  </tbody>
</table>

</div>
                  
                </div>

                {/* Marks Table */}
                <div className="overflow-x-auto mb-1">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border px-2 py-0.5">Subject</th>
                        <th className="border px-2 py-0.5">Full Marks</th>
                        <th className="border px-2 py-0.5">Written</th>
                        <th className="border px-2 py-0.5">MCQ</th>
                        <th className="border px-2 py-0.5">Practical</th>
                        <th className="border px-2 py-0.5">Total</th>
                        <th className="border px-2 py-0.5">Grade Point</th>
                        <th className="border px-2 py-0.5">Letter Grade</th>
                      </tr>
                    </thead>
                    <tbody>
  {matched.subjects.map((s, i) => renderSubjectRow(s, i))}
  <tr className="font-semibold bg-slate-100">
    <td className="border px-2 py-0.5">Total</td>
    <td className="border px-2 py-0.5 text-center">{matched.totalMarks}</td>
    <td className="border px-2 py-0.5 text-center">-</td>
    <td className="border px-2 py-0.5 text-center">-</td>
    <td className="border px-2 py-0.5 text-center">-</td>
    <td className="border px-2 py-0.5 text-center">{matched.obtainedMarks}</td>
    <td className="border px-2 py-0.5 text-center">{matched.gpa}</td>
    <td className="border px-2 py-0.5 text-center">{matched.grade}</td>
  </tr>
</tbody>

                  </table>
                </div>

              {/* Summary & Positions Grid (2 rows x 4 columns) */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-1 text-sm">
  <div className="bg-gray-100 border px-3 py-0.5 rounded">
    <strong>GPA:</strong> {matched.gpa}
  </div>
  <div className="bg-gray-100 border px-3 py-0.5 rounded">
    <strong>Grade:</strong> {matched.grade}
  </div>
  <div className="bg-gray-100 border px-3 py-0.5 rounded">
    <strong>Status:</strong> {matched.status}
  </div>
  <div className="bg-gray-100 border px-3 py-0.5 rounded">
    <strong>Class Position:</strong> {matched.classPosition}
  </div>

  <div className="bg-gray-100 border px-3 py-0.5 rounded">
    <strong>Group Position:</strong> {matched.groupPosition}
  </div>
  <div className="bg-gray-100 border px-3 py-0.5 rounded">
    <strong>Section Position:</strong> {matched.sectionPosition}
  </div>
  <div className="bg-gray-100 border px-3 py-0.5 rounded">
    <strong>Working Days:</strong> {matched.workingDays}
  </div>
  <div className="bg-gray-100 border px-3 py-0.5 rounded">
    <strong>Attendance:</strong> {matched.attendance}
  </div>
</div>




              
               {/* Signatures and QR */}
<div className="flex justify-between items-end mt-0.5">
  {/* Signatures centered */}
  <div className="flex justify-center gap-8 flex-1">
    
       {/* status card box */}
<div className="mt-1 w-72 flex items-center justify-center text-center bg-white border rounded p-2 shadow-sm">
  <p className="text-slate-700 font-medium">Very Good! Thanks</p>
</div>



    <div className="text-center">
      <div className="h-12 border-b w-44 mx-auto"></div>
      <p className="text-sm mt-1">Head Teacher</p>
    </div>
    <div className="text-center">
      <div className="h-12 border-b w-44 mx-auto"></div>
      <p className="text-sm mt-1">Class Teacher</p>
    </div>
    <div className="text-center">
      <div className="h-12 border-b w-44 mx-auto"></div>
      <p className="text-sm mt-1">Guardian</p>
    </div>
     
  </div>
  

  {/* QR Code at right corner with padding */}
  <div className="flex flex-col items-end p-1">
    <div className="mb-2">
      <QRCodeCanvas value="https://your-school-website.com" size={40} />
    </div>
    <p className="text-xs text-slate-500">Scan to verify</p>
  </div>
</div>

               
              </div>
            </div>

            {/* Action Buttons */}
<div className="mt-6 flex justify-center gap-6">
  {/* Download PDF */}
  <button
    onClick={handleDownloadPDF}
    className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
  >
    Download PDF
  </button>

  {/* Print */}
  <button
    onClick={() => {
      if (cardRef.current) {
        const printContents = cardRef.current.innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // optional: reload page to restore state
      }
    }}
    className="bg-blue-700 text-white px-4 py-2 rounded shadow hover:bg-blue-800"
  >
    Print
  </button>

  {/* Exit / Close */}
  <button
    onClick={() => {
      setMatched(null);
    }}
    className="bg-red-700 text-white px-4 py-2 rounded shadow hover:bg-red-800"
  >
    Exit
  </button>
</div>

          </div>
        )}

        {/* No result */}
        {!loading && !matched && (
          <div className="py-8">
            <p className="text-center text-slate-500">No result to show. Fill the form and press Submit.</p>
          </div>
        )}
      </div>
    </main>
  );
}
