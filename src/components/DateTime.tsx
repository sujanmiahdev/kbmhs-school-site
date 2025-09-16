"use client";

import { useEffect, useState } from "react";

const DateTime = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Format English date
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setDate(now.toLocaleDateString("en-US", options));

      // Format 12-hour time with AM/PM
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // 0 -> 12
      const strTime = `${hours.toString().padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;
      setTime(strTime);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-green-600 rounded-xl shadow-md min-w-[140px]">
      <div className="text-white font-medium text-sm sm:text-base text-center">{date}</div>
      <div className="text-white font-bold text-lg sm:text-xl text-center mt-1">{time}</div>
    </div>
  );
};

export default DateTime;
