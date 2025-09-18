"use client";

import BreakingNews from "@/components/BreakingNews";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import SidebarCard from "@/components/SidebarCard";
import SchoolInfoCard from "@/components/SchoolInfoCard";
import NoticeBoard from "@/components/NoticeBoard";
import CalendarCard from "@/components/CalendarCard";
import WeatherCard from "@/components/WeatherCard";
import PresidentMessageCard from "@/components/PresidentMessageCard";
import InteractiveImageSlider from "@/components/InteractiveImageSlider";
import HeadTeacherCard from "@/components/HeadTeacherCard";
import TeacherSlider from "@/components/TeacherSlider";
import ShiningStars from "../components/ShiningStars";
import SchoolMapEmbed from "@/components/SchoolFooter";




export default function HomePage() {
  const news = [
    "Admission for 2025 is now open!",
    "Class routine updated for Class 9 and 10.",
    "School Annual Day celebration on 25th August.",
    "Board exam results published today.",
  ];

  const notices = [
    { id: 1, title: "২০২৫-২০২৬ শিক্ষাবর্ষে একাদশ শ্রেণীতে ভর্তি বিজ্ঞপ্তি", link: "#", date: "20 May 2025" },
    { id: 2, title: "শোক বার্তা: মাইলস্টোন স্কুল এন্ড কলেজ", link: "#", date: "18 May 2025" },
    { id: 3, title: "ঈদুল আযহা উপলক্ষ্যে সভাপতি মহোদয়ের শুভেচ্ছা বার্তা", link: "#", date: "15 May 2025" },
    { id: 4, title: "আর্থিক সহায়তা সংক্রান্ত বিজ্ঞপ্তি (2025-05-20)", link: "#", date: "10 May 2025" },
    { id: 5, title: "প্রতারক চক্র হতে জরুরী সতর্কীকরণ বিজ্ঞপ্তি", link: "#", date: "5 May 2025" },
  ];

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Institute", dropdown: [
      { name: "Welcome Speech", link: "#" },
      { name: "Institute Details", link: "#" },
      { name: "Governing Body", link: "#" },
      { name: "Director General", link: "#" }
    ] },
    { name: "Administration", link: "#" },
    { name: "Teacher", link: "#" },
    { name: "Staff & MLSS", dropdown: [
      { name: "Staff", link: "#" },
      { name: "MLSS", link: "#" }
    ] },
    { name: "Students", link: "#" },
    { name: "Academic", dropdown: [
      { name: "Admission", link: "#" },
      { name: "Book List", link: "#" },
      { name: "Dress", link: "#" },
      { name: "Syllabus", link: "#" },
      { name: "Class Routine", link: "#" },
      { name: "Exam Routine", link: "#" }
    ] },
    { name: "Result", dropdown: [
      { name: "School Result", link: "#" },
      { name: "Board Result", link: "#" }
    ] },
    { name: "Publications", dropdown: [
      { name: "Magazine", link: "#" },
      { name: "Media News", link: "#" }
    ] },
    { name: "Gallery", dropdown: [
      { name: "Photo Gallery", link: "#" },
      { name: "Video Gallery", link: "#" }
    ] },
  ];

  const sliderImages = [
    { src: "/image/image1.jpg", alt: "Slide 1" },
    { src: "/image/image2.jpg", alt: "Slide 2" },
    { src: "/image/image3.jpg", alt: "Slide 3" },
  ];
  
// teachers card
  const teachers = [
    { id: "1", name: "Mrs. Dipa Rahman", title: "Senior English Teacher", subject: "Mathematics", avatar: "https://i.pravatar.cc/150?img=10", bio: "10+ years teaching mathematics.", email: "dipa@example.com", phone: "+8801796078955", socials: { facebook: "#", linkedin: "#", twitter: "#" } },
    { id: "2", name: "Mr. Sujan Miah", title: "Physics Teacher", subject: "Physics", avatar: "https://i.pravatar.cc/150?img=12", bio: "Physics teacher passionate about labs.", phone: "+8801840305015", socials: { facebook: "#", linkedin: "#", twitter: "#" } },
    { id: "3", name: "Mrs. Farzana Akter", title: "English Teacher", subject: "English", avatar: "https://i.pravatar.cc/150?img=14", bio: "Expert in English literature.", phone: "+8801700000000", socials: { facebook: "#", linkedin: "#", twitter: "#" } },
    { id: "4", name: "Mr. Tanvir Alam", title: "Chemistry Teacher", subject: "Chemistry", avatar: "https://i.pravatar.cc/150?img=15", bio: "Chemistry is fun with experiments.", phone: "+8801700000000", socials: { facebook: "#", linkedin: "#", twitter: "#" } },
    { id: "5", name: "Mrs. Salma Begum", title: "Biology Teacher", subject: "Biology", avatar: "https://i.pravatar.cc/150?img=16", bio: "Loves to explore biology with students.", phone: "+880170000000", socials: { facebook: "#", linkedin: "#", twitter: "#" } },
  ];

  //Shining Starts
  

  return (
    <main className="max-w-7xl mx-auto p-0">

      {/* Header + Navbar + Breaking News */}
      <Header />
      <Navbar menuItems={menuItems} />
      <BreakingNews newsItems={news} speed={100} />

      {/* Top Section Grid */}
      <div className="flex flex-col md:flex-row gap-6 p-4">
        <div className="w-full md:w-1/4"><SidebarCard /></div>
        <div className="w-full md:w-1/2"><SchoolInfoCard /></div>
        <div className="w-full md:w-1/4"><NoticeBoard notices={notices} speed={1} /></div>
      </div>

      {/* 2nd Section Grid */}
      <div className="grid md:grid-cols-3 gap-6 p-4">
        <PresidentMessageCard />
        <InteractiveImageSlider images={sliderImages} autoSlideInterval={4000} height={350} />
        <HeadTeacherCard />
      </div>

       {/* Teacher Slider */}
      <div className="p-4">
        <TeacherSlider teachers={teachers} />
      </div> 
 
 
{/* Shining Stars Slider */}
       <div>
      <ShiningStars />
    </div>



      {/* Bottom Section */}
      <div className="grid md:grid-cols-2 gap-6 p-2 pt-0">
        <CalendarCard />
        <WeatherCard />
      </div>

   <div className="space-y-6 px-4 py-6">
       <SchoolMapEmbed />
    </div>



    </main>
  );
}
