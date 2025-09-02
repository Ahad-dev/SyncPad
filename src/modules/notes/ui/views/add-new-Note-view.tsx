import { Editor } from "@/components/tiptap-templates/simple/simple-editor";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, FileText, Loader2 } from "lucide-react";
import type { Note } from "@/types";
import NotesService from "@/supabase/utils/notes";
import { toast } from "sonner";

interface AddNewNoteViewProps {
  note: Note;
  title: string;
  buttonText: string;
}

const AddNewNoteView = ({ note, title, buttonText }: AddNewNoteViewProps) => {
  const [editor, setEditor] = useState<any>(null);
  const [noteName, setNoteName] = useState("");
  const [pending, setPending] = useState(false);
  useEffect(() => {
    setNoteName(note?.title || "");
    editor?.commands.setContent(note?.content_json);
  }, [note,editor]);

  const saveNote = async () => {
    setPending(true);

    if (!editor || !noteName.trim()) {
      alert("Please provide a note name and content");
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

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
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
            />
          </div>

          {/* Save Button */}
          <Button
            onClick={saveNote}
            className="shadow-sm"
            disabled={!noteName.trim() || pending}
          >
            {!pending? <Save className="mr-2 h-4 w-4" />:<Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Note
          </Button>
        </div>
      </div>

      {/* Full-Screen Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          content="<p>Start typing your note...</p>"
          onEditorReady={setEditor}
        />
      </div>
    </div>
  );
};

export default AddNewNoteView;
