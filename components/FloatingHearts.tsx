"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const EMOJIS = ["💗", "✨", "💫", "🌸", "☁️", "⭐"];

interface FloatingHeartsProps {
  density?: number;
}

export default function FloatingHearts({ density = 14 }: FloatingHeartsProps) {
  const items = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => {
      const emoji = EMOJIS[i % EMOJIS.length];
      const left = Math.random() * 100;
      const size = 14 + Math.random() * 16;
      const duration = 14 + Math.random() * 12;
      const delay = Math.random() * -20;
      const drift = (Math.random() - 0.5) * 60;
      return { id: i, emoji, left, size, duration, delay, drift };
    });
  }, [density]);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      {items.map((item) => (
        <motion.span
          key={item.id}
          initial={{ y: "110vh", x: 0, opacity: 0 }}
          animate={{
            y: "-15vh",
            x: [0, item.drift, 0],
            opacity: [0, 0.55, 0.55, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${item.left}%`,
            fontSize: item.size,
            filter: "blur(0.2px)",
          }}
        >
          {item.emoji}
        </motion.span>
      ))}
    </div>
  );
}
