"use client";

import { motion } from "framer-motion";

export default function AnimatedGradientBackground() {
  return (
    <motion.div
      className="fixed inset-0 -z-10"
      style={{
        background: "linear-gradient(270deg, #6b46c1, #9f7aea, #6b46c1)",
        backgroundSize: "400% 400%",
      }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
      transition={{
        duration: 15,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
    />
  );
}
