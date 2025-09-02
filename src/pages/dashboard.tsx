import DashboardView from "@/modules/dashboard/ui/view/dashboard-view";
import type { RootState } from "@/store/store";
import { setMyNotes, setSharedNotes, addNote } from "@/store/notesSlice";
import NotesService from "@/supabase/utils/notes";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

// Mock shared notes data with proper structure
const mockSharedNotes = [
  { 
    id: "3", 
    title: "Team Meeting Notes", 
    owner_id: "alice-user-id",
    content_html: "<p>Meeting notes...</p>",
    content_json: {},
    created_at: "2025-08-22T10:00:00Z",
    updated_at: "2025-08-22T10:00:00Z"
  },
];

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        if (user?.id) {
          const notes = await NotesService.getByOwnerId(user.id);
          console.log("Fetched notes:", notes);
          dispatch(setMyNotes(notes));
          // Set shared notes (mock data for now)
          dispatch(setSharedNotes(mockSharedNotes));
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
        toast.error("Failed to fetch notes");
      }
    };
    
    fetchNotes();
  }, [user?.id, dispatch]);

  const handleNewNote = async () => {
    try {
      const newNote = await NotesService.create({
        owner_id: user?.id,
        title: "New Note",
      });
      console.log("Created new note:", newNote);
      dispatch(addNote(newNote));
      navigate(`/new/${newNote.id}`);
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to create note");
    }
  };

  return <DashboardView onNewNote={handleNewNote} />;
}
