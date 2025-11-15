"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type FormState = {
  studentNameBn: string;
  studentNameEn: string;
  gender: string;
  religion: string;
  bloodGroup: string;
  dob: string;
  nid: string;
  mobile: string;
  studentType: string;
  financialStatus: string;
  presentAddress: string;
  permanentAddress: string;

  fatherNameBn: string;
  fatherNameEn: string;
  fatherPhone: string;
  fatherNid: string;

  motherNameBn: string;
  motherNameEn: string;
  motherPhone: string;
  motherNid: string;

  guardianName: string;
  guardianPhone: string;
  guardianRelation: string;

  previousInstitution: string;
  previousClass: string;
  previousBoard: string;
  previousGPA: string;

  admissionDept: string;
  admissionSession: string;
  admissionRoll: string;
  admissionDate: string;

  declarationAgree: boolean;
};

const defaultState: FormState = {
  studentNameBn: "",
  studentNameEn: "",
  gender: "",
  religion: "",
  bloodGroup: "",
  dob: "",
  nid: "",
  mobile: "",
  studentType: "",
  financialStatus: "",
  presentAddress: "",
  permanentAddress: "",

  fatherNameBn: "",
  fatherNameEn: "",
  fatherPhone: "",
  fatherNid: "",

  motherNameBn: "",
  motherNameEn: "",
  motherPhone: "",
  motherNid: "",

  guardianName: "",
  guardianPhone: "",
  guardianRelation: "",

  previousInstitution: "",
  previousClass: "",
  previousBoard: "",
  previousGPA: "",

  admissionDept: "",
  admissionSession: "",
  admissionRoll: "",
  admissionDate: "",

  declarationAgree: false,
};

export default function AdmissionPage() {
  const [form, setForm] = useState<FormState>(defaultState);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null); // preview url
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const [loadingPdf, setLoadingPdf] = useState(false);

  const handleChange = (k: keyof FormState, v: string | boolean) => {
    setForm((s) => ({ ...s, [k]: v }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setPhotoFile(file);
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
  };

  const handleDownloadPDF = async () => {
    if (!formRef.current) return;
    setLoadingPdf(true);
    try {
      // Remove buttons visually for the captured image by adding a class
      const element = formRef.current;
      // Temporarily hide download/print controls if present
      const controls = element.querySelectorAll(".no-print");
      controls.forEach((c) => (c as HTMLElement).style.display = "none");

      // increase scale for better quality
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      // restore controls
      controls.forEach((c) => (c as HTMLElement).style.display = "");

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      // Calculate dimensions to fit A4 width with preserved ratio
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgProps = canvas as HTMLCanvasElement;
      const imgWidth = imgProps.width;
      const imgHeight = imgProps.height;
      const ratio = imgHeight / imgWidth;

      const pdfWidth = pageWidth - 40; // margin
      const pdfHeight = pdfWidth * ratio;

      pdf.addImage(imgData, "PNG", 20, 20, pdfWidth, pdfHeight);
      pdf.save(`admission-form-${form.studentNameBn || "student"}.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("PDF তৈরি করতে সমস্যা হয়েছে। Console দেখো।");
    } finally {
      setLoadingPdf(false);
    }
  };

  const handlePrint = () => {
    // Hide controls while printing by adding a class and use window.print()
    const root = formRef.current;
    if (!root) return;
    const controls = root.querySelectorAll(".no-print");
    controls.forEach((c) => (c as HTMLElement).style.display = "none");
    window.print();
    // restore
    setTimeout(() => {
      controls.forEach((c) => (c as HTMLElement).style.display = "");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
       

        {/* Form card */}
        <div
          ref={formRef}
          className="bg-white p-6 rounded-md shadow-md print:bg-white print:shadow-none"
          style={{ lineHeight: 1.15 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between">
 <section className="w-full flex justify-center py-6">
  <div className="flex flex-col items-center text-center gap-3 md:flex-row md:items-center md:justify-center md:gap-6">
    {/* Logo */}
    <div className="w-16 h-16 rounded-md flex items-center justify-center bg-white shadow-sm">
      <Image
        src="/image/kbmhs-logo.png"
        alt="Logo"
        width={64}
        height={64}
        className="object-contain w-14 h-14"
      />
    </div>

    {/* Text Info */}
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-sky-700">
        Kumulli Bachchu Mia Model High School
      </h1>
      <p className="text-sm text-slate-600">
        ইমেইল: kbmmhs40@gmail.com, ফোন নম্বর: 01840000000
      </p>
      <p className="text-sm text-slate-600">
        ঠিকানাঃ Kumulli, Manikganj Sadar, Manikganj-1800
      </p>
    </div>
  </div>
</section>



            {/* photo box */}
            <div className="w-28">
              <div className="border border-dashed border-slate-300 w-28 h-28 flex items-center justify-center">
                {photoUrl ? (
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <img src={photoUrl} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-xs text-slate-400">Student Photo</div>
                )}
              </div>

              <label className="mt-2 block text-center text-sm">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <span className="text-blue-600 underline cursor-pointer">Upload Photo</span>
              </label>
            </div>
          </div>

          <hr className="my-4 border-slate-200" />

          {/* Student personal info */}
          <div className="mb-4 border border-dashed border-slate-300 p-3 rounded">
            <h3 className="font-medium mb-2">শিক্ষার্থীর ব্যক্তিগত তথ্য</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-sm text-slate-600">শিক্ষার্থীর নাম (বাংলা)</label>
                <input
                  value={form.studentNameBn}
                  onChange={(e) => handleChange("studentNameBn", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">শিক্ষার্থীর নাম (ইংরেজি)</label>
                <input
                  value={form.studentNameEn}
                  onChange={(e) => handleChange("studentNameEn", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">লিঙ্গ</label>
                <select
                  value={form.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                >
                  <option value="">-- নির্বাচন করুন --</option>
                  <option value="male">পুরুষ</option>
                  <option value="female">মহিলা</option>
                  <option value="other">অন্যান্য</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-600">ধর্ম</label>
                <input
                  value={form.religion}
                  onChange={(e) => handleChange("religion", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">রক্তের গ্রুপ</label>
                <input
                  value={form.bloodGroup}
                  onChange={(e) => handleChange("bloodGroup", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">জন্ম তারিখ</label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">জন্ম সনদ নম্বর / NID</label>
                <input
                  value={form.nid}
                  onChange={(e) => handleChange("nid", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">মোবাইল নম্বর</label>
                <input
                  value={form.mobile}
                  onChange={(e) => handleChange("mobile", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">Student Type</label>
                <input
                  value={form.studentType}
                  onChange={(e) => handleChange("studentType", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div className="md:col-span-1">
                <label className="text-sm text-slate-600">বর্তমান ঠিকানা</label>
                <input
                  value={form.presentAddress}
                  onChange={(e) => handleChange("presentAddress", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div className="md:col-span-1">
                <label className="text-sm text-slate-600">স্থায়ী ঠিকানা</label>
                <input
                  value={form.permanentAddress}
                  onChange={(e) => handleChange("permanentAddress", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Parent info */}
          <div className="mb-4 border border-dashed border-slate-300 p-3 rounded">
            <h3 className="font-medium mb-2">শিক্ষার্থীর পিতার তথ্য</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="text-sm text-slate-600">পিতার নাম (বাংলা)</label>
                <input
                  value={form.fatherNameBn}
                  onChange={(e) => handleChange("fatherNameBn", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">পিতার নাম (ইংরেজি)</label>
                <input
                  value={form.fatherNameEn}
                  onChange={(e) => handleChange("fatherNameEn", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">পিতার ফোন</label>
                <input
                  value={form.fatherPhone}
                  onChange={(e) => handleChange("fatherPhone", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">পিতার NID</label>
                <input
                  value={form.fatherNid}
                  onChange={(e) => handleChange("fatherNid", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Mother info */}
          <div className="mb-4 border border-dashed border-slate-300 p-3 rounded">
            <h3 className="font-medium mb-2">শিক্ষার্থীর মাতার তথ্য</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="text-sm text-slate-600">মাতার নাম (বাংলা)</label>
                <input
                  value={form.motherNameBn}
                  onChange={(e) => handleChange("motherNameBn", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">মাতার নাম (ইংরেজি)</label>
                <input
                  value={form.motherNameEn}
                  onChange={(e) => handleChange("motherNameEn", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">মাতার ফোন</label>
                <input
                  value={form.motherPhone}
                  onChange={(e) => handleChange("motherPhone", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">মাতার NID</label>
                <input
                  value={form.motherNid}
                  onChange={(e) => handleChange("motherNid", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Guardian info */}
          <div className="mb-4 border border-dashed border-slate-300 p-3 rounded">
            <h3 className="font-medium mb-2">শিক্ষার্থীর অভিভাবকের তথ্য</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-sm text-slate-600">অভিভাবকের নাম</label>
                <input
                  value={form.guardianName}
                  onChange={(e) => handleChange("guardianName", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">অভিভাবকের মোবাইল</label>
                <input
                  value={form.guardianPhone}
                  onChange={(e) => handleChange("guardianPhone", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">সম্পর্ক</label>
                <input
                  value={form.guardianRelation}
                  onChange={(e) => handleChange("guardianRelation", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Previous Institution */}
          <div className="mb-4 border border-dashed border-slate-300 p-3 rounded">
            <h3 className="font-medium mb-2">পূর্বের প্রতিষ্ঠানের তথ্য</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="text-sm text-slate-600">প্রতিষ্ঠান</label>
                <input
                  value={form.previousInstitution}
                  onChange={(e) => handleChange("previousInstitution", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">ক্লাস</label>
                <input
                  value={form.previousClass}
                  onChange={(e) => handleChange("previousClass", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">বোর্ড/শাখা</label>
                <input
                  value={form.previousBoard}
                  onChange={(e) => handleChange("previousBoard", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">CGPA/Grade</label>
                <input
                  value={form.previousGPA}
                  onChange={(e) => handleChange("previousGPA", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Admission info */}
          <div className="mb-4 border border-dashed border-slate-300 p-3 rounded">
            <h3 className="font-medium mb-2">শিক্ষার্থীর ভর্তি তথ্য</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="text-sm text-slate-600">বিভাগ</label>
                <input
                  value={form.admissionDept}
                  onChange={(e) => handleChange("admissionDept", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">শাখা</label>
                <input
                  value={form.admissionSession}
                  onChange={(e) => handleChange("admissionSession", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">ভর্তি স্লিপ/রোল</label>
                <input
                  value={form.admissionRoll}
                  onChange={(e) => handleChange("admissionRoll", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">Admission Date</label>
                <input
                  type="date"
                  value={form.admissionDate}
                  onChange={(e) => handleChange("admissionDate", e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Declaration */}
          <div className="mb-4 border border-dashed border-slate-300 p-3 rounded text-sm text-slate-700">
            <p className="mb-2">
              আমি, <span className="underline">{form.studentNameBn || "__________"}</span> এই
              মারফত অঙ্গিকার করছি যে, উপরিউক্ত বিবরণসমূহ সঠিক। আমি জানি Kumulli Bachchu Mia Model High School এর নিয়ম
              পালন করতে হবে এবং প্রতিষ্ঠানের নীতিমালা মেনে চলতে হবে।
            </p>

            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.declarationAgree}
                onChange={(e) => handleChange("declarationAgree", e.target.checked)}
                className="w-4 h-4"
              />
              <span>উপরোক্ত শর্তাবলী আমি মেনে নিচ্ছি</span>
            </label>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
            <div>
              <div className="border-t border-slate-400 pt-2 text-sm">শিক্ষার্থীর স্বাক্ষর</div>
            </div>
            <div>
              <div className="border-t border-slate-400 pt-2 text-sm">অভিভাবকের স্বাক্ষর</div>
            </div>
            <div>
              <div className="border-t border-slate-400 pt-2 text-sm">শিক্ষকের স্বাক্ষর</div>
            </div>
            <div>
              <div className="border-t border-slate-400 pt-2 text-sm">পরিচালকের স্বাক্ষর</div>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            <p>Kumulli Bachchu Mia Model High School · {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
       {/* Controls */}
        <div className="flex gap-3 justify-center mt-6 mb-4 no-print">
 <button
            
            className="bg-gray-600 text-white px-4 py-2 rounded-full shadow hover:bg-black transition">
            Submit
          </button>

          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition"
          >
            প্রিন্ট করুন
          </button>

         

          <button
            onClick={handleDownloadPDF}
            className="bg-green-600 text-white px-4 py-2 rounded-full shadow hover:bg-green-700 transition"
            disabled={loadingPdf}
          >
            {loadingPdf ? "Preparing..." : "ডাউনলোড"}
          </button>
        </div>
    </div>
    




    
  );
  
}
