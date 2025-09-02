import { FileText, Users } from "lucide-react";
import HeaderDashboard from "../components/header";
import NotesList from "../components/notes-list";
import { Separator } from "@/components/ui/separator";
import { useSelector, useDispatch } from "react-redux";
import {useEffect } from "react";
import type { RootState } from "@/store/store";
import { setMyNotes, setLoading, setSharedNotes } from "@/store/notesSlice";
import NotesService from "@/supabase/utils/notes";

export default function DashboardView({ onNewNote }: {
  onNewNote: () => void
}) {
  const dispatch = useDispatch();
  const { myNotes,sharedNotes,loading } = useSelector((state: RootState) => state.notes);
  const user = useSelector((state: RootState) => state.auth.user);

  // Load dummy data for now - replace with actual API calls
  useEffect(() => {
    dispatch(setLoading(true));

    const fetchNotes = async () => {
      try {
        const myNotes = await NotesService.getByOwnerId(user?.id!);
        dispatch(setMyNotes(myNotes));
        const sharedNote = await NotesService.getSharedWithUser(user?.id!);
        console.log(sharedNote);
        dispatch(setSharedNotes(sharedNote));
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchNotes();
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Header Section */}
        <HeaderDashboard onNewNote={onNewNote} />
        <Separator className="mb-8" />

        {/* Notes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          
          {/* My Notes Section */}
          
            <NotesList
              notes={myNotes}
              Icon={FileText}
              role="Owner"
              title="My Notes"
              
              />

          {/* Shared Notes Section */}
          <NotesList
            notes={sharedNotes}
            Icon={Users}
            role="Collaborator"
            title="Shared with Me"
          />

        </div>
      </div>
    </div>
  );
}
