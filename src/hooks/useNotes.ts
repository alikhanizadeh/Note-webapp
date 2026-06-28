'use client';

import { useCallback, useMemo, useState } from 'react';
import { Note, NoteGroup } from '@/types/note';
import { getNotes, saveNotes, groupNotesByTitle } from '@/services/noteService';

const STORAGE_KEY = 'notes-app-data';

const emptyNotes: Note[] = [];

function readFromStorage(): Note[] {
  if (typeof window === 'undefined') return emptyNotes;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return emptyNotes;
  }
}

function writeToStorage(notes: Note[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(readFromStorage);

  const groups = useMemo(() => groupNotesByTitle(notes), [notes]);

  const addNote = useCallback(
    (title: string, websites: string[], description: string) => {
      const newNote: Note = {
        id: Date.now().toString(36) + Math.random().toString(36).substring(2, 9),
        title,
        websites,
        description,
        createdAt: Date.now(),
      };
      setNotes((prev) => {
        const updated = [...prev, newNote];
        writeToStorage(updated);
        return updated;
      });
    },
    []
  );

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      writeToStorage(updated);
      return updated;
    });
  }, []);

  return {
    notes,
    groups,
    isLoaded: true,
    addNote,
    deleteNote,
  };
}