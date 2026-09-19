"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import CuteCharacter, { Mood } from "./CuteCharacter";
import NoButton from "./NoButton";
import YesButton from "./YesButton";
import SpeechBubble from "./SpeechBubble";

const TEASE_LINES = [
  "Em định bỏ anh thật hả 😭",
  "Không được chọn cái này đâu 🥺",
  "Anh biết em yêu anh mà 😭",
  "Bấm Có đi màaa 💗",
  "Em ác quá 🥹",
  "Hông trốn được anh đâu 🏃‍♀️💨",
  "Tim anh đập nhanh quá nè 😳",
];

interface LoveQuestionProps {
  onYes: () => void;
}

export default function LoveQuestion({ onYes }: LoveQuestionProps) {
  const [mood, setMood] = useState<Mood>("normal");
  const [bubble, setBubble] = useState<string | null>(null);
  const [yesScale, setYesScale] = useState(1);
  const moodTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDodge = (attempts: number) => {
    setMood(attempts % 2 === 0 ? "sad" : "nervous");
    setBubble(TEASE_LINES[(attempts - 1) % TEASE_LINES.length]);
    // Every dodge makes the "Có" button a little more tempting
    setYesScale(Math.min(1.2, 1 + attempts * 0.02));
    if (moodTimeout.current) clearTimeout(moodTimeout.current);
    moodTimeout.current = setTimeout(() => setMood("normal"), 900);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-6 py-10 text-center"
    >
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl mb-2"
      >
        ✨
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl leading-tight
                   bg-gradient-to-r from-blush-500 via-blush-400 to-mint-400 bg-clip-text text-transparent
                   max-w-md"
      >
        Em còn yêu anh khônggg? 🥺
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 140, damping: 12 }}
        onMouseEnter={() => setMood((m) => (m === "normal" ? "thinking" : m))}
        onMouseLeave={() => setMood((m) => (m === "thinking" ? "normal" : m))}
        className="my-6"
      >
        <CuteCharacter mood={mood} size={220} />
      </motion.div>

      <SpeechBubble text={bubble} />

      <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
        <NoButton onDodge={handleDodge} />
        <YesButton onClick={onYes} scale={yesScale} />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-sm sm:text-base text-blush-400/80 font-body font-semibold"
      >
        Chọn thật lòng nhaaaa 🥺
      </motion.p>
    </motion.div>
  );
}
