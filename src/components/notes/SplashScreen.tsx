'use client';

import { motion } from 'framer-motion';
import { StickyNote } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0f]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-600/15 blur-[120px]" />
      </div>

      {/* Logo */}
      <motion.div
        className="relative flex flex-col items-center gap-6"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Icon container with glow */}
        <motion.div
          className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 blur-xl" />
          <StickyNote className="relative h-12 w-12 text-purple-400" strokeWidth={1.5} />
        </motion.div>

        {/* App name */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Notes<span className="text-purple-400">.</span>
          </h1>
          <p className="text-sm text-white/40">organize your thoughts</p>
        </motion.div>
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        className="absolute bottom-16 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="h-1 w-32 overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
          />
        </div>
        <p className="text-xs text-white/30">Loading...</p>
      </motion.div>

      {/* Auto navigate after 2 seconds */}
      <motion.div
        onAnimationComplete={() => {
          setTimeout(onComplete, 400);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
      />
    </motion.div>
  );
}