"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = ["#f9548c", "#ff9ebd", "#7ad4c1", "#ffd166", "#a6e5d6"];
const SHAPES = ["💗", "✨", "🎉", "💕", "⭐"];

interface ConfettiProps {
  triggerKey: number; // change this value to re-trigger the burst
  count?: number;
}

export default function Confetti({ triggerKey, count = 40 }: ConfettiProps) {
  const pieces = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 120 + Math.random() * 220;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance - 60;
      const rotate = (Math.random() - 0.5) * 360;
      const delay = Math.random() * 0.15;
      const isEmoji = Math.random() > 0.5;
      const color = COLORS[i % COLORS.length];
      const emoji = SHAPES[i % SHAPES.length];
      const size = 8 + Math.random() * 10;
      return { id: `${triggerKey}-${i}`, x, y, rotate, delay, isEmoji, color, emoji, size };
    });
  }, [triggerKey, count]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute top-1/3 left-1/2">
        {pieces.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
            animate={{
              x: p.x,
              y: p.y + 260,
              opacity: [1, 1, 0],
              scale: [0, 1, 0.8],
              rotate: p.rotate,
            }}
            transition={{ duration: 1.6 + Math.random() * 0.6, delay: p.delay, ease: "easeOut" }}
            style={{
              position: "absolute",
              display: "block",
              fontSize: p.isEmoji ? p.size + 6 : undefined,
              width: p.isEmoji ? undefined : p.size,
              height: p.isEmoji ? undefined : p.size * 0.6,
              backgroundColor: p.isEmoji ? undefined : p.color,
              borderRadius: p.isEmoji ? undefined : 2,
            }}
          >
            {p.isEmoji ? p.emoji : null}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
