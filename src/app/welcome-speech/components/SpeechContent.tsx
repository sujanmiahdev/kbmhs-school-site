'use client';

import { motion } from "framer-motion";

const SpeechContent = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4, duration: 0.8 }}
    className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 text-gray-700 space-y-6"
  >
    <p>Dear Students, Teachers, and Visitors,</p>

    <p>
      It gives me immense pleasure to welcome you to the official website of our school and college.
      Our institution has always been a center of learning, discipline, and inspiration — a place
      where young minds are nurtured to become responsible citizens of Bangladesh.
    </p>

    <p>
      Education is not just about books and exams; it is about shaping character, building
      confidence, and inspiring creativity. Here, we believe in providing our students with a
      balanced education that combines academic excellence with moral and social values.
    </p>

    <p>
      Our dedicated teachers work tirelessly to ensure that every learner receives proper
      guidance and care. We encourage our students to dream big, think critically, and act
      kindly — for these are the qualities that build a better nation.
    </p>

    <p>
      This website is a window into our world — where you can explore our academic programs,
      achievements, and the vibrant activities that make our institution unique. I invite you
      to browse through and feel the spirit of our school community.
    </p>

    <p>
      Let us all work together — students, teachers, and parents — to uphold the values of
      honesty, respect, and dedication that define our beloved institution.
    </p>

    <p>
      Thank you for visiting, and welcome once again to our school and college family.
    </p>

    <p className="mt-6 font-semibold">
      With best wishes,<br />
      [Name of Head Teacher]<br />
      Head Teacher<br />
      [Name of School & College]
    </p>
  </motion.div>
);

export default SpeechContent;
