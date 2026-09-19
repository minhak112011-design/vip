"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CuteCharacter from "./CuteCharacter";
import Confetti from "./Confetti";

export default function ResultScreen() {
  const [burstKey, setBurstKey] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-6 py-10 text-center"
    >
      <Confetti triggerKey={burstKey} />

      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl mb-1"
      >
        💗 💗 💗
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl
                   bg-gradient-to-r from-blush-500 via-blush-400 to-mint-400 bg-clip-text text-transparent"
      >
        Anh biết màaa 🥺💗
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 160, damping: 12 }}
        className="my-6"
      >
        <CuteCharacter mood="happy" size={230} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="font-heading font-semibold text-lg sm:text-xl text-blush-500"
      >
        Em vẫn còn yêu anh 💗
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="mt-1 font-body text-base sm:text-lg text-blush-400"
      >
        Anh cũng yêu em rất nhiều 💗
      </motion.p>

      <motion.button
        type="button"
        onClick={() => setBurstKey((k) => k + 1)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="mt-8 rounded-full px-8 py-3.5 font-heading font-bold text-white text-base sm:text-lg
                   bg-gradient-to-r from-mint-400 to-blush-400 shadow-cute
                   focus:outline-none focus-visible:ring-4 focus-visible:ring-mint-200"
      >
        Bấm nữa nè 💌
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-xl"
      >
        ✨ 💗 ✨ 💗 ✨
      </motion.p>
    </motion.div>
  );
}
