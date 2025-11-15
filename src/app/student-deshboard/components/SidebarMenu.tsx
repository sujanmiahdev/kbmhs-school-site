"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  BookOpen,
  Calendar,
  ClipboardList,
  FileText,
  Bell,
  Users,
  Wallet,
  MessageCircle,
  PieChart,
  ChevronDown,
  ChevronLeft,
  GraduationCap,
  Layers,
} from "lucide-react";

type MenuItem = {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  badge?: string | number;
};

const MENU: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/student-dashboard", // FIXED SPELLING
    icon: <Home size={16} />,
    children: [
      { id: "profile", label: "Profile Overview", href: "/student/dashboard/profile" },
      { id: "classinfo", label: "Class / Section", href: "/student/dashboard/class" },
      { id: "attendanceSummary", label: "Attendance Summary", href: "/student/dashboard/attendance" },
      { id: "pending", label: "Pending Assignments / Exams", href: "/student/dashboard/pending", badge: 3 },
      { id: "notices", label: "Notifications / Announcements", href: "/student/dashboard/notifications" },
    ],
  },
  {
    id: "attendance",
    label: "Attendance",
    href: "/student/attendance",
    icon: <GraduationCap size={16} />,
    children: [
      { id: "viewOwn", label: "View Own Attendance Record", href: "/student/attendance/record" },
      { id: "analytics", label: "Attendance Analytics", href: "/student/attendance/analytics" },
    ],
  },
  {
    id: "timetable",
    label: "Routine / Timetable",
    href: "/student/timetable",
    icon: <Calendar size={16} />,
    children: [
      { id: "viewTime", label: "View Timetable", href: "/student/timetable/view" },
      { id: "downloadTime", label: "Download / Print", href: "/student/timetable/download" },
    ],
  },
  {
    id: "homework",
    label: "Homework / Assignment",
    href: "/student/homework",
    icon: <ClipboardList size={16} />,
    children: [
      { id: "downloadHw", label: "Download Assigned", href: "/student/homework/download" },
      { id: "submitHw", label: "Submit Assignments", href: "/student/homework/submit" },
      { id: "feedback", label: "View Feedback / Marks", href: "/student/homework/feedback" },
    ],
  },
  {
    id: "exams",
    label: "Exam Management",
    href: "/student/exams",
    icon: <FileText size={16} />,
    children: [
      { id: "schedule", label: "View Exam Schedule", href: "/student/exams/schedule" },
      { id: "results", label: "Results / Grades", href: "/student/exams/results" },
      { id: "onlineExam", label: "Online Exam / Quiz", href: "/student/exams/online" },
    ],
  },
  {
    id: "library",
    label: "Library Access",
    href: "/student/library",
    icon: <BookOpen size={16} />,
    children: [
      { id: "search", label: "Search Books", href: "/student/library/search" },
      { id: "borrow", label: "Borrow / Return", href: "/student/library/manage" },
      { id: "history", label: "Borrow History", href: "/student/library/history" },
    ],
  },
  {
    id: "fees",
    label: "Fees & Payment",
    href: "/student/fees",
    icon: <Wallet size={16} />,
    children: [
      { id: "structure", label: "Fee Structure", href: "/student/fees/structure" },
      { id: "status", label: "Paid / Pending", href: "/student/fees/status" },
      { id: "pay", label: "Online Payment", href: "/student/fees/pay" },
    ],
  },
  {
    id: "notices",
    label: "Notices & Events",
    href: "/student/notices",
    icon: <Bell size={16} />,
    children: [
      { id: "viewNotices", label: "View Notices", href: "/student/notices/list" },
      { id: "events", label: "Event Calendar", href: "/student/notices/events" },
    ],
  },
  {
    id: "messages",
    label: "Messaging",
    href: "/student/messages",
    icon: <MessageCircle size={16} />,
    children: [
      { id: "teachers", label: "Message Teachers", href: "/student/messages/teachers" },
      { id: "alerts", label: "Alerts / Circulars", href: "/student/messages/alerts" },
    ],
  },
  {
    id: "advanced",
    label: "Optional / Advanced",
    href: "/student/advanced",
    icon: <PieChart size={16} />,
    children: [
      { id: "analytics", label: "Academic Progress", href: "/student/advanced/analytics" },
      { id: "certificates", label: "Download Certificates", href: "/student/advanced/certificates" },
      { id: "activities", label: "Extra-Curricular Tracking", href: "/student/advanced/activities" },
    ],
  },
];

export default function StudentSidebar({
  collapsedFromParent = false,
}: {
  collapsedFromParent?: boolean;
}) {
  const pathname = usePathname() || "/";
  const [collapsed, setCollapsed] = useState<boolean>(collapsedFromParent);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const map: Record<string, boolean> = {};
    MENU.forEach((m) => {
      if (m.children) {
        m.children.forEach((c) => {
          if (c.href && pathname.startsWith(c.href)) map[m.id] = true;
        });
      }
      if (m.href && pathname.startsWith(m.href)) map[m.id] = true;
    });
    setOpenMap(map);
  }, [pathname]);

  const toggleOpen = (id: string) =>
    setOpenMap((s) => ({ ...s, [id]: !s[id] }));

  const renderedMenu = useMemo(() => {
    return MENU.map((item) => {
      const isActive =
        item.href &&
        (pathname === item.href || pathname.startsWith(item.href));
      const hasChildren = item.children && item.children.length > 0;

      return (
        <li key={item.id} className="mb-1">
          <div
            className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
              isActive
                ? "bg-slate-100 dark:bg-slate-800"
                : "hover:bg-slate-50 dark:hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-slate-600 dark:text-slate-300">
                {item.icon}
              </div>

              {!collapsed && (
                <div className="flex items-center gap-2">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`text-sm font-medium ${
                        isActive
                          ? "text-sky-600"
                          : "text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {item.label}
                    </span>
                  )}

                  {item.badge && (
                    <span className="ml-1 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold bg-rose-100 text-rose-700">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </div>

            {hasChildren && !collapsed && (
              <button
                onClick={() => toggleOpen(item.id)}
                className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${
                    openMap[item.id] ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}

            {collapsed && (
              <div className="text-xs text-slate-400">
                {item.label.slice(0, 1)}
              </div>
            )}
          </div>

          {hasChildren && openMap[item.id] && (
            <ul className="mt-1 ml-8">
              {item.children!.map((c) => {
                const childActive =
                  c.href &&
                  (pathname === c.href || pathname.startsWith(c.href));

                return (
                  <li key={c.id} className="mb-1">
                    <Link
                      href={c.href || "#"}
                      className={`block px-3 py-2 rounded-md text-sm ${
                        childActive
                          ? "bg-slate-100 dark:bg-slate-800 text-sky-600"
                          : "hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {c.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      );
    });
  }, [collapsed, pathname, openMap]);

  return (
    <aside
      className={`h-screen sticky top-4 z-20 ${
        collapsed ? "w-20" : "w-72"
      } transition-all duration-200`}
    >
      <div className="flex h-full flex-col bg-white dark:bg-slate-900 rounded-2xl p-3 shadow-md border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between px-2 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 text-white font-bold">
              S
            </div>

            {!collapsed && (
              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Student Panel
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Quick access to your tools
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed((s) => !s)}
            className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {collapsed ? <ChevronLeft size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {!collapsed && (
          <div className="mb-3 px-2">
            <input
              id="sidebar-search"
              placeholder="Search menu..."
              className="w-full rounded-md border border-slate-200 dark:border-slate-800 px-3 py-2 text-sm bg-transparent focus:outline-none"
            />
          </div>
        )}

        <nav className="flex-1 overflow-y-auto pr-1">
          <ul className="space-y-1">{renderedMenu}</ul>
        </nav>

        {!collapsed && (
          <div className="mt-4 px-2">
            <Link
              href="/student/settings"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <Layers size={14} />
              <span className="text-sm text-slate-700 dark:text-slate-200">
                Settings
              </span>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
