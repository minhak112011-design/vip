"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export type Mood = "normal" | "thinking" | "nervous" | "happy" | "sad";

interface CuteCharacterProps {
  mood: Mood;
  lookX?: number; // -1 (left) to 1 (right), where the character glances
  size?: number;
}

export default function CuteCharacter({
  mood,
  lookX = 0,
  size = 220,
}: CuteCharacterProps) {
  const [blink, setBlink] = useState(false);

  // Random blinking
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      const delay = 2200 + Math.random() * 2600;
      timeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  const tilt =
    mood === "thinking" ? -10 : mood === "nervous" ? 0 : mood === "sad" ? 4 : 0;

  const bodyBob =
    mood === "happy"
      ? { y: [0, -18, 0], transition: { duration: 0.55, repeat: Infinity } }
      : mood === "nervous"
      ? { x: [-2, 2, -2, 2, 0], transition: { duration: 0.35, repeat: Infinity } }
      : mood === "sad"
      ? { y: [0, 3, 0], transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }
      : { y: [0, -7, 0], transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" } };

  const eyesClosed = blink && mood !== "happy";

  return (
    <div
      className="relative select-none"
      style={{ width: size, height: size * 1.05 }}
      aria-hidden="true"
    >
      {/* Floating question marks when thinking */}
      <AnimatePresence>
        {mood === "thinking" && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: -40 - i * 10,
                  scale: [0.5, 1, 0.8],
                  x: i === 0 ? -30 : i === 1 ? 30 : 0,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  delay: i * 0.35,
                }}
                className="absolute top-0 left-1/2 text-2xl font-heading font-bold text-blush-400"
                style={{ transform: "translateX(-50%)" }}
              >
                ?
              </motion.span>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Sweat drop when nervous */}
      <AnimatePresence>
        {mood === "nervous" && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, repeat: Infinity }}
            className="absolute top-6 right-6 text-xl"
          >
            💦
          </motion.div>
        )}
      </AnimatePresence>

      {/* Happy sparkles */}
      <AnimatePresence>
        {mood === "happy" && (
          <>
            {["✨", "💗", "✨", "💕"].map((emoji, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.1, 0.8],
                  y: [0, -30 - i * 8],
                  x: [0, i % 2 === 0 ? -34 - i * 4 : 34 + i * 4],
                }}
                transition={{
                  duration: 1.3,
                  repeat: Infinity,
                  delay: i * 0.22,
                }}
                className="absolute top-4 left-1/2 text-xl"
                style={{ transform: "translateX(-50%)" }}
              >
                {emoji}
              </motion.span>
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ rotate: tilt, ...bodyBob }}
        transition={{ rotate: { duration: 0.4 } }}
        style={{ width: "100%", height: "100%" }}
      >
        <motion.svg
          viewBox="0 0 200 210"
          width="100%"
          height="100%"
          animate={{ scale: mood === "happy" ? [1, 1.06, 1] : [1, 1.02, 1] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* soft shadow */}
          <ellipse cx="100" cy="200" rx="46" ry="7" fill="#f9548c" opacity="0.12" />

          {/* left wing */}
          <motion.ellipse
            cx="35"
            cy="118"
            rx="16"
            ry="24"
            fill="#fff6ea"
            stroke="#f4d9c6"
            strokeWidth="2"
            animate={
              mood === "happy"
                ? { rotate: [-10, 10, -10], y: [-4, 0, -4] }
                : mood === "sad"
                ? { rotate: -4 }
                : { rotate: [-4, 4, -4] }
            }
            transition={{ duration: mood === "happy" ? 0.5 : 3, repeat: Infinity }}
            style={{ transformOrigin: "45px 105px" }}
          />
          {/* right wing */}
          <motion.ellipse
            cx="165"
            cy="118"
            rx="16"
            ry="24"
            fill="#fff6ea"
            stroke="#f4d9c6"
            strokeWidth="2"
            animate={
              mood === "happy"
                ? { rotate: [10, -10, 10], y: [-4, 0, -4] }
                : mood === "sad"
                ? { rotate: 4 }
                : { rotate: [4, -4, 4] }
            }
            transition={{ duration: mood === "happy" ? 0.5 : 3, repeat: Infinity }}
            style={{ transformOrigin: "155px 105px" }}
          />

          {/* feet */}
          <ellipse cx="82" cy="196" rx="11" ry="7" fill="#ffb37a" />
          <ellipse cx="118" cy="196" rx="11" ry="7" fill="#ffb37a" />

          {/* body / head (one round blob) */}
          <circle
            cx="100"
            cy="108"
            r="78"
            fill="#fffaf3"
            stroke="#ffdce8"
            strokeWidth="3"
          />

          {/* fluffy top tuft */}
          <path
            d="M92 32 C90 18, 108 18, 106 32 C112 20, 126 26, 118 38 C110 34, 96 40, 92 32 Z"
            fill="#fffaf3"
            stroke="#ffdce8"
            strokeWidth="2.5"
          />

          {/* cheeks */}
          <ellipse cx="58" cy="122" rx="14" ry="10" fill="#ffc2d4" opacity={mood === "happy" ? 0.95 : 0.65} />
          <ellipse cx="142" cy="122" rx="14" ry="10" fill="#ffc2d4" opacity={mood === "happy" ? 0.95 : 0.65} />

          {/* eyebrows for nervous / sad */}
          {(mood === "nervous" || mood === "sad") && (
            <>
              <path
                d="M68 84 Q78 78 88 86"
                stroke="#c98a9b"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M132 84 Q122 78 112 86"
                stroke="#c98a9b"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </>
          )}

          {/* eyes */}
          {mood === "happy" ? (
            <>
              <HeartEye cx={78} />
              <HeartEye cx={122} />
            </>
          ) : (
            <>
              <motion.g animate={{ x: lookX * 3 }}>
                <motion.ellipse
                  cx="78"
                  cy="100"
                  rx="7"
                  ry={eyesClosed ? 0.6 : 9}
                  fill="#4a3b3f"
                />
                {!eyesClosed && <circle cx="80.5" cy="96" r="2" fill="white" />}
              </motion.g>
              <motion.g animate={{ x: lookX * 3 }}>
                <motion.ellipse
                  cx="122"
                  cy="100"
                  rx="7"
                  ry={eyesClosed ? 0.6 : 9}
                  fill="#4a3b3f"
                />
                {!eyesClosed && <circle cx="124.5" cy="96" r="2" fill="white" />}
              </motion.g>
            </>
          )}

          {/* tears when sad */}
          {mood === "sad" && (
            <>
              <motion.path
                d="M76 108 q-4 8 0 14 q4 -6 0 -14 Z"
                fill="#8fd7f7"
                animate={{ y: [0, 10], opacity: [1, 0] }}
                transition={{ duration: 1.1, repeat: Infinity }}
              />
              <motion.path
                d="M124 108 q-4 8 0 14 q4 -6 0 -14 Z"
                fill="#8fd7f7"
                animate={{ y: [0, 10], opacity: [1, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: 0.3 }}
              />
            </>
          )}

          {/* beak / mouth */}
          {mood === "sad" ? (
            <path
              d="M90 128 Q100 120 110 128"
              stroke="#f2a65a"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          ) : mood === "happy" ? (
            <path
              d="M88 126 Q100 140 112 126"
              fill="#f2a65a"
              stroke="#e08f3f"
              strokeWidth="1.5"
            />
          ) : (
            <path
              d="M92 124 Q100 132 108 124 Q100 129 92 124 Z"
              fill="#f2a65a"
              stroke="#e08f3f"
              strokeWidth="1.5"
            />
          )}
        </motion.svg>
      </motion.div>
    </div>
  );
}

function HeartEye({ cx }: { cx: number }) {
  return (
    <motion.path
      d={`M${cx} ${106} c-6 -10 -18 -4 -14 6 c3 7 14 12 14 12 s11 -5 14 -12 c4 -10 -8 -16 -14 -6 Z`}
      fill="#f9548c"
      initial={{ scale: 0 }}
      animate={{ scale: [0.9, 1.08, 0.9] }}
      transition={{ duration: 0.7, repeat: Infinity }}
      style={{ transformOrigin: `${cx}px 110px` }}
    />
  );
}
