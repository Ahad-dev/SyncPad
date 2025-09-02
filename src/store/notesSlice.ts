import type { Note, SharedNote } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a simplified Note type that your frontend actually needs


interface NotesState {
  myNotes: Note[];
  sharedNotes: SharedNote[];
  loading: boolean;
  error: string | null;
}

const initialState: NotesState = {
  myNotes: [],
  sharedNotes: [],
  loading: false,
  error: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    // Loading states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    // Set all notes
    setMyNotes: (state, action: PayloadAction<Note[]>) => {
      state.myNotes = action.payload;
    },
    setSharedNotes: (state, action: PayloadAction<SharedNote[]>) => {
      state.sharedNotes = action.payload;
    },
    
    // Add new note
    addNote: (state, action: PayloadAction<Note>) => {
      state.myNotes.unshift(action.payload); // Add to beginning
    },
    
    // Update note (works for both my notes and shared notes)
    updateNote: (state, action: PayloadAction<{ id: string; updates: Partial<Note> }>) => {
      const { id, updates } = action.payload;
      
      // Update in myNotes
      const myNoteIndex = state.myNotes.findIndex(note => note.id === id);
      if (myNoteIndex !== -1) {
        state.myNotes[myNoteIndex] = { ...state.myNotes[myNoteIndex], ...updates };
      }
      
      // Update in sharedNotes
      const sharedNoteIndex = state.sharedNotes.findIndex(note => note.id === id);
      if (sharedNoteIndex !== -1) {
        state.sharedNotes[sharedNoteIndex] = { ...state.sharedNotes[sharedNoteIndex], ...updates };
      }
    },
    
    // Rename note
    renameNote: (state, action: PayloadAction<{ id: string; newTitle: string }>) => {
      const { id, newTitle } = action.payload;
      const updates = { 
        title: newTitle, 
        updated_at: new Date().toISOString() 
      };
      
      // Update in myNotes
      const myNoteIndex = state.myNotes.findIndex(note => note.id === id);
      if (myNoteIndex !== -1) {
        state.myNotes[myNoteIndex] = { ...state.myNotes[myNoteIndex], ...updates };
      }
      
      // Update in sharedNotes
      const sharedNoteIndex = state.sharedNotes.findIndex(note => note.id === id);
      if (sharedNoteIndex !== -1) {
        state.sharedNotes[sharedNoteIndex] = { ...state.sharedNotes[sharedNoteIndex], ...updates };
      }
    },
    
    // Delete note
    deleteNote: (state, action: PayloadAction<string>) => {
      const noteId = action.payload;
      state.myNotes = state.myNotes.filter(note => note.id !== noteId);
      state.sharedNotes = state.sharedNotes.filter(note => note.id !== noteId);
    },
    
    // Clear all notes
    clearNotes: (state) => {
      state.myNotes = [];
      state.sharedNotes = [];
    },
  },
});

export const {
  setLoading,
  setError,
  setMyNotes,
  setSharedNotes,
  addNote,
  updateNote,
  renameNote,
  deleteNote,
  clearNotes,
} = notesSlice.actions;

export default notesSlice.reducer;
