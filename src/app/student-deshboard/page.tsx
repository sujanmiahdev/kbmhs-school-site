"use client";

import React from "react";
import SidebarMenu from "./components/SidebarMenu"; 
const StudentDashboardPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <SidebarMenu />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Student Dashboard
        </h1>

        <p className="text-slate-700 dark:text-slate-300">
          Welcome to your student panel. Here you can access all your classes, assignments, exams, library, fees, and notifications.
        </p>

        {/* Example content cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">Attendance Summary</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">View your monthly attendance records.</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">Pending Assignments</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Check all pending homework and exams.</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">Notifications</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">See all school notices and announcements.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboardPage;
