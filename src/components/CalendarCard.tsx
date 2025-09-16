"use client";

import React from "react";

const CalendarCard = () => {
  return (
    <div className="max-w-3/3 mx-3 p-0">
      <div className="bg-white rounded-2xl shadow-lg p-1">
        <h2 className=" font-bold text-3xl mb-2 text-center text-gray-800">
          📅 Bangladesh Government Holidays
        </h2>
        
        {/* Responsive Calendar */}
        <div className="w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-xl shadow-md">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=bn.bd%23holiday%40group.v.calendar.google.com&ctz=Asia%2FDhaka"
            className="w-full h-full border-0"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;


