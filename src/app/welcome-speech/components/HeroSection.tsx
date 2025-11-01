'use client';

import { motion } from "framer-motion";

const HeroSection = () => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-center mb-12"
  >
    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
      🌿 Welcome Message from the Head Teacher
    </h1>
    <p className="text-gray-600 text-lg sm:text-xl">
      Inspiring Young Minds, Shaping the Future
    </p>
  </motion.div>
);

export default HeroSection;
