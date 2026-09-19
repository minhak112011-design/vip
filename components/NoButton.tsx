"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const MESSAGES = [
  "Không 😭",
  "Ủa 😭",
  "Thiệt hả 🥺",
  "Đừng màaa 😭",
  "Em nỡ lòng nào 😭💔",
  "Bấm nữa là anh buồn đó 🥺",
  "Hông chạy kịp đâu 😤",
  "Thôi màaa, chọn Có đi 😭💗",
];

interface NoButtonProps {
  onDodge?: (attempts: number) => void;
}

export default function NoButton({ onDodge }: NoButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [attempts, setAttempts] = useState(0);
  const cooldown = useRef(false);

  const label = MESSAGES[Math.min(attempts, MESSAGES.length - 1)];

  const dodge = useCallback(() => {
    if (cooldown.current) return;
    cooldown.current = true;
    setTimeout(() => {
      cooldown.current = false;
    }, 260);

    const btn = btnRef.current;
    const width = btn?.offsetWidth ?? 150;
    const height = btn?.offsetHeight ?? 54;
    const padX = 20;
    const padY = 24;

    const maxX = Math.max(padX, window.innerWidth - width - padX);
    const maxY = Math.max(padY, window.innerHeight - height - padY);
    const minY = Math.min(120, maxY);

    let next = { x: Math.random() * maxX, y: minY + Math.random() * (maxY - minY) };

    // Try to keep some distance from the previous spot so it feels lively
    if (pos) {
      let tries = 0;
      while (
        tries < 8 &&
        Math.hypot(next.x - pos.x, next.y - pos.y) < Math.min(140, maxX / 2)
      ) {
        next = { x: Math.random() * maxX, y: minY + Math.random() * (maxY - minY) };
        tries++;
      }
    }

    setPos(next);
    setAttempts((a) => {
      const nextCount = a + 1;
      onDodge?.(nextCount);
      return nextCount;
    });
  }, [pos, onDodge]);

  // Desktop: dodge before the cursor even reaches the button
  useEffect(() => {
    const canHover =
      typeof window !== "undefined" &&
      window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    const handleMove = (e: MouseEvent) => {
      const btn = btnRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      if (dist < 95) {
        dodge();
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [dodge]);

  // Keep the button inside the viewport if the window resizes
  useEffect(() => {
    const handleResize = () => {
      if (!pos) return;
      const btn = btnRef.current;
      const width = btn?.offsetWidth ?? 150;
      const height = btn?.offsetHeight ?? 54;
      setPos((p) =>
        p
          ? {
              x: Math.min(p.x, Math.max(0, window.innerWidth - width - 12)),
              y: Math.min(p.y, Math.max(0, window.innerHeight - height - 12)),
            }
          : p
      );
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pos]);

  return (
    <motion.button
      ref={btnRef}
      type="button"
      aria-label="Không (nút sẽ né, hãy chọn Có nha)"
      onClick={(e) => {
        e.preventDefault();
        dodge();
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        dodge();
      }}
      onMouseEnter={() => dodge()}
      initial={false}
      animate={{ x: pos?.x ?? 0, y: pos?.y ?? 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 16 }}
      whileTap={{ scale: 0.95 }}
      style={pos ? { position: "fixed", top: 0, left: 0 } : undefined}
      className={
        (pos ? "fixed top-0 left-0 z-40 " : "relative z-40 ") +
        "rounded-full px-7 py-3.5 font-heading font-bold text-blush-500 text-base sm:text-lg " +
        "bg-white/80 backdrop-blur border-2 border-blush-200 shadow-soft select-none whitespace-nowrap " +
        "focus:outline-none focus-visible:ring-4 focus-visible:ring-mint-200"
      }
    >
      {label}
    </motion.button>
  );
}
