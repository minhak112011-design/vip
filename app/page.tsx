"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import LoveQuestion from "@/components/LoveQuestion";
import ResultScreen from "@/components/ResultScreen";
import MusicToggle from "@/components/MusicToggle";

export default function Home() {
  const [answered, setAnswered] = useState(false);

  return (
    <main className="relative min-h-[100dvh] w-full overflow-hidden">
      <FloatingHearts density={16} />

      <AnimatePresence mode="wait">
        {answered ? (
          <ResultScreen key="result" />
        ) : (
          <LoveQuestion key="question" onYes={() => setAnswered(true)} />
        )}
      </AnimatePresence>

      <MusicToggle />
    </main>
  );
}
