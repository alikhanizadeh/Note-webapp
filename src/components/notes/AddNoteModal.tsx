'use client';

import { useState, useRef, useCallback, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, StickyNote, FileText } from 'lucide-react';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, websites: string[], description: string) => void;
}

export default function AddNoteModal({ isOpen, onClose, onSave }: AddNoteModalProps) {
  const [title, setTitle] = useState('');
  const [websiteInput, setWebsiteInput] = useState('');
  const [websites, setWebsites] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddWebsite = useCallback(() => {
    const trimmed = websiteInput.trim();
    if (trimmed && !websites.includes(trimmed)) {
      setWebsites((prev) => [...prev, trimmed]);
      setWebsiteInput('');
    }
  }, [websiteInput, websites]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddWebsite();
    }
  };

  const handleRemoveWebsite = (website: string) => {
    setWebsites((prev) => prev.filter((w) => w !== website));
  };

  const handleSave = () => {
    if (!title.trim() || websites.length === 0) return;
    onSave(title.trim(), websites, description.trim());
    setTitle('');
    setWebsites([]);
    setDescription('');
    onClose();
  };

  const handleCancel = () => {
    setTitle('');
    setWebsites([]);
    setDescription('');
    onClose();
  };

  const handleOverlayClick = () => {
    handleCancel();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop blur */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#13131a]/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20">
                <StickyNote className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white/90">Add New Note</h2>
                <p className="text-xs text-white/40">Create a new note with your websites</p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {/* Title Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/60">Note Title</label>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="e.g. Android Development"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white/90 placeholder-white/20 outline-none transition-colors focus:border-purple-500/40 focus:bg-white/[0.06]"
                  dir="auto"
                />
              </div>

              {/* Website List Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/60">Websites</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a website and press Enter"
                    value={websiteInput}
                    onChange={(e) => setWebsiteInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white/90 placeholder-white/20 outline-none transition-colors focus:border-purple-500/40 focus:bg-white/[0.06]"
                    dir="ltr"
                  />
                  <motion.button
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-400 transition-colors hover:bg-purple-500/20"
                    onClick={handleAddWebsite}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!websiteInput.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.button>
                </div>

                {/* Website chips */}
                <AnimatePresence mode="popLayout">
                  {websites.length > 0 && (
                    <motion.div
                      className="flex flex-wrap gap-2 pt-1"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {websites.map((website) => (
                        <motion.span
                          key={website}
                          className="group/chip inline-flex items-center gap-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 text-xs text-purple-300"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          layout
                        >
                          <span dir="ltr" className="font-mono">{website}</span>
                          <button
                            onClick={() => handleRemoveWebsite(website)}
                            className="ml-0.5 rounded-full p-0.5 text-purple-400/60 transition-colors hover:bg-purple-500/20 hover:text-purple-300"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Description Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5" />
                  Description
                </label>
                <textarea
                  placeholder="Optional description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white/90 placeholder-white/20 outline-none transition-colors focus:border-purple-500/40 focus:bg-white/[0.06]"
                  dir="auto"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <motion.button
                className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.08] hover:text-white/80"
                onClick={handleCancel}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                className="rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-600/20 transition-colors hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={handleSave}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!title.trim() || websites.length === 0}
              >
                Save Note
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}