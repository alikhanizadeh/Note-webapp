'use client';

import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { StickyNote, Plus, Inbox } from 'lucide-react';
import { useNotes } from '@/hooks/useNotes';
import SplashScreen from '@/components/notes/SplashScreen';
import NoteSection from '@/components/notes/NoteSection';
import AddNoteModal from '@/components/notes/AddNoteModal';
import { useState, useCallback } from 'react';

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { groups, isLoaded, addNote, deleteNote } = useNotes();

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleSave = useCallback(
    (title: string, websites: string[], description: string) => {
      addNote(title, websites, description);
    },
    [addNote]
  );

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white">
      {/* Splash Screen */}
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {/* Main App */}
      <AnimatePresence>
        {!showSplash && (
          <motion.div
            className="relative flex min-h-screen flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Background effects */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
              <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-purple-600/8 blur-[150px]" />
              <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-600/6 blur-[150px]" />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-white/[0.04] bg-[#0a0a0f]/80 backdrop-blur-xl">
              <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/[0.08]">
                    <StickyNote className="h-4.5 w-4.5 text-purple-400" strokeWidth={1.5} />
                  </div>
                  <h1 className="text-xl font-bold tracking-tight">
                    Notes<span className="text-purple-400">.</span>
                  </h1>
                </motion.div>

                <motion.button
                  className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-600/15 transition-colors hover:bg-purple-500"
                  onClick={() => setShowModal(true)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Note</span>
                </motion.button>
              </div>
            </header>

            {/* Content */}
            <main className="relative z-10 mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
              {!isLoaded ? (
                <div className="flex items-center justify-center py-32">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500/30 border-t-purple-500" />
                </div>
              ) : groups.length === 0 ? (
                <motion.div
                  className="flex flex-col items-center justify-center gap-4 py-24"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <Inbox className="h-10 w-10 text-white/15" strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-white/40">No notes yet</h3>
                    <p className="mt-1 text-sm text-white/25">Create your first note to get started</p>
                  </div>
                  <motion.button
                    className="mt-2 flex items-center gap-2 rounded-xl bg-purple-600/20 border border-purple-500/20 px-5 py-2.5 text-sm font-medium text-purple-300 transition-colors hover:bg-purple-600/30"
                    onClick={() => setShowModal(true)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Plus className="h-4 w-4" />
                    Add your first note
                  </motion.button>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-10">
                  <AnimatePresence mode="popLayout">
                    {groups.map((group, index) => (
                      <NoteSection
                        key={group.title}
                        group={group}
                        sectionIndex={index}
                        onDeleteNote={deleteNote}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/[0.04] py-6 text-center">
              <p className="text-xs text-white/20">Notes. — Your personal knowledge hub</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AddNoteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </div>
  );
}