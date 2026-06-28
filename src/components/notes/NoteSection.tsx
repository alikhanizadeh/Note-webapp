'use client';

import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { NoteGroup } from '@/types/note';
import { FolderOpen } from 'lucide-react';
import NoteCard from './NoteCard';

interface NoteSectionProps {
  group: NoteGroup;
  sectionIndex: number;
  onDeleteNote: (id: string) => void;
}

export default function NoteSection({ group, sectionIndex, onDeleteNote }: NoteSectionProps) {
  return (
    <motion.section
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
        delay: sectionIndex * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Section header */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: sectionIndex * 0.1 + 0.1, duration: 0.4 }}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20">
          <FolderOpen className="h-4.5 w-4.5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white/90">{group.title}</h2>
          <p className="text-xs text-white/30">
            {group.notes.length} {group.notes.length === 1 ? 'note' : 'notes'}
          </p>
        </div>
        <div className="ml-auto h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {group.notes.map((note, noteIndex) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={onDeleteNote}
              index={noteIndex}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}