export interface Note {
  id: string;
  title: string;
  websites: string[];
  description: string;
  createdAt: number;
}

export interface NoteGroup {
  title: string;
  notes: Note[];
}