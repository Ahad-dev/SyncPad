import { Editor } from "@/components/tiptap-templates/simple/simple-editor";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, FileText, Loader2 } from "lucide-react";
import type { Note } from "@/types";
import NotesService from "@/supabase/utils/notes";
import { toast } from "sonner";
import { Link } from "react-router";

interface AddNewNoteViewProps {
  note?: Note; // Make note optional
  title: string;
  role: string;
}

const AddNewNoteView = ({ note, title, role }: AddNewNoteViewProps) => {
  const [editor, setEditor] = useState<any>(null);
  const [noteName, setNoteName] = useState("");
  const [pending, setPending] = useState(false);
  
  // Check if user can edit based on role
  const canEdit = role === "editor" || role === "Owner";
  
  useEffect(() => {
    setNoteName(note?.title || "");
    editor?.commands.setContent(note?.content_json);
  }, [note,editor]);

  const saveNote = async () => {
    if (!canEdit) {
      toast.error("You don't have permission to edit this note");
      return;
    }
    
    if (!note) {
      toast.error("Note not found");
      return;
    }
    
    setPending(true);

    if (!editor || !noteName.trim()) {
      toast.error("Please provide a note name and content");
      setPending(false);
      return;
    }
    try {
      await NotesService.update(note.id, {
        title: noteName.trim(),
        content_html: editor.getHTML(),
        content_json: editor.getJSON(),
      });
      toast.success("Note updated successfully", {
        description: "Your note has been updated.",
      });
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note");
    } finally {
      setPending(false);
    }
  };

  // Show loading state if note is not loaded yet
  if (!note) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading note...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-3">
          <Link to={"/"}>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </Link>
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Note Name Input */}
          <div className="flex items-center gap-2">
            <Label
              htmlFor="note-name"
              className="text-sm font-medium whitespace-nowrap"
            >
              Note Name:
            </Label>
            <Input
              id="note-name"
              type="text"
              placeholder="Untitled Note"
              value={noteName}
              onChange={(e) => setNoteName(e.target.value)}
              className="w-60"
              disabled={!canEdit}
            />
          </div>

          {/* Save Button - Only show for Editor/Owner */}
          {canEdit && (
            <Button
              onClick={saveNote}
              className="shadow-sm"
              disabled={!noteName.trim() || pending}
            >
              {!pending? <Save className="mr-2 h-4 w-4" />:<Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Note
            </Button>
          )}
          
          {/* Role Badge */}
          <div className="px-3 py-1 bg-muted rounded-full">
            <span className="text-xs font-medium">{role}</span>
          </div>
        </div>
      </div>

      {/* Full-Screen Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          content="<p>Start typing your note...</p>"
          onEditorReady={setEditor}
          editable={canEdit}
          showToolbar={canEdit}
        />
      </div>
    </div>
  );
};

export default AddNewNoteView;
