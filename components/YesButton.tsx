"use client";

import { motion } from "framer-motion";

interface YesButtonProps {
  onClick: () => void;
  scale?: number;
  label?: string;
}

export default function YesButton({ onClick, scale = 1, label = "Có nha 💗" }: YesButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Có, em còn yêu anh"
      animate={{ scale }}
      whileHover={{ scale: scale * 1.08 }}
      whileTap={{ scale: scale * 0.94 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="relative rounded-full px-8 py-3.5 font-heading font-bold text-white text-base sm:text-lg
                 bg-gradient-to-r from-blush-500 to-blush-400 shadow-cute
                 focus:outline-none focus-visible:ring-4 focus-visible:ring-blush-200
                 whitespace-nowrap"
      style={{
        boxShadow: "0 10px 30px -8px rgba(249, 84, 140, 0.55)",
      }}
    >
      <motion.span
        className="absolute inset-0 rounded-full"
        animate={{ boxShadow: [
          "0 0 0px rgba(255,158,189,0.0)",
          "0 0 22px rgba(255,158,189,0.65)",
          "0 0 0px rgba(255,158,189,0.0)",
        ]}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="relative">{label}</span>
    </motion.button>
  );
}
