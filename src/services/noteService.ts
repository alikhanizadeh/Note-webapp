import { Note, NoteGroup } from '@/types/note';

const STORAGE_KEY = 'notes-app-data';

export function getNotes(): Note[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveNotes(notes: Note[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function addNote(note: Note): Note[] {
  const notes = getNotes();
  notes.push(note);
  saveNotes(notes);
  return notes;
}

export function deleteNote(id: string): Note[] {
  const notes = getNotes().filter((n) => n.id !== id);
  saveNotes(notes);
  return notes;
}

export function groupNotesByTitle(notes: Note[]): NoteGroup[] {
  const map = new Map<string, Note[]>();
  for (const note of notes) {
    const existing = map.get(note.title);
    if (existing) {
      existing.push(note);
    } else {
      map.set(note.title, [note]);
    }
  }
  return Array.from(map.entries()).map(([title, groupNotes]) => ({
    title,
    notes: groupNotes,
  }));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}