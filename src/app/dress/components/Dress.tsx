"use client";
import React from "react";

export default function DressSection() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-slate-800">
        স্কুল ইউনিফর্ম
      </h2>

      <div className="grid md:grid-cols-2 gap-8 text-slate-700 leading-relaxed">
        {/* Boys Section */}
        <div className="bg-blue-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">
            ছাত্রদের পোশাক
          </h3>
          <p>
            স্কুলের ছাত্রদের জন্য নির্ধারিত পোশাক হলো — সাদা ফুল হাতা বা হাফ হাতা
            শার্ট, নেভি ব্লু ফুল প্যান্ট, এবং কালো জুতা সঙ্গে সাদা মোজা। গলায় স্কুল টাই
            ও বুকের বাম পাশে স্কুলের মনোগ্রাম সংযুক্ত থাকতে হবে। শীতকালে নেভি ব্লু
            সোয়েটার পরা যাবে।
          </p>
        </div>

        {/* Girls Section */}
        <div className="bg-pink-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2 text-pink-700">
            ছাত্রীদের পোশাক
          </h3>
          <p>
            ছাত্রীদের জন্য নির্ধারিত পোশাক হলো — সাদা কামিজ ও ওড়না, সঙ্গে নেভি ব্লু
            সালোয়ার। কামিজের বুকের বাম পাশে স্কুলের মনোগ্রাম থাকবে। শীতকালে নেভি ব্লু
            সোয়েটার বা কার্ডিগান পরা যাবে। জুতার রং কালো ও মোজা সাদা হবে।
          </p>
        </div>
      </div>

      <div className="mt-8 bg-slate-100 p-4 rounded-xl text-center">
        <h4 className="font-semibold text-slate-800 mb-1">সাধারণ নির্দেশনা</h4>
        <p>
          প্রতিদিন পরিষ্কার ও নির্ধারিত পোশাক পরে স্কুলে উপস্থিত হওয়া বাধ্যতামূলক।
          পোশাকের শৃঙ্খলা ও পরিচ্ছন্নতা বজায় রাখা প্রতিটি শিক্ষার্থীর দায়িত্ব।
        </p>
      </div>
    </section>
  );
}
