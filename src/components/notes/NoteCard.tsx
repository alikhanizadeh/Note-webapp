'use client';

import { motion } from 'framer-motion';
import { Note } from '@/types/note';
import { Globe, Trash2 } from 'lucide-react';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  index: number;
}

export default function NoteCard({ note, onDelete, index }: NoteCardProps) {
  return (
    <motion.div
      className="group relative rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-md transition-colors hover:border-white/[0.12] hover:bg-white/[0.06]"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      {/* Subtle top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Websites */}
      <div className="flex flex-wrap gap-2">
        {note.websites.map((website) => (
          <motion.div
            key={website}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-3 py-1.5 text-sm text-white/80 transition-colors hover:bg-white/[0.1]"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.15 }}
          >
            <Globe className="h-3 w-3 text-purple-400/70" />
            <span dir="ltr" className="font-mono text-xs">{website}</span>
          </motion.div>
        ))}
      </div>

      {/* Delete button */}
      <motion.button
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg text-white/20 transition-colors hover:bg-red-500/20 hover:text-red-400 opacity-0 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(note.id);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Delete note"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </motion.button>
    </motion.div>
  );
}