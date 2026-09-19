"use client";

import { AnimatePresence, motion } from "framer-motion";

interface SpeechBubbleProps {
  text: string | null;
}

export default function SpeechBubble({ text }: SpeechBubbleProps) {
  return (
    <div className="h-12 flex items-center justify-center px-4">
      <AnimatePresence mode="wait">
        {text && (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="relative bg-white/90 backdrop-blur px-4 py-2 rounded-2xl shadow-soft border border-blush-100 text-sm sm:text-base font-heading font-semibold text-blush-500 text-center max-w-xs"
          >
            {text}
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/90 border-t border-l border-blush-100 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
