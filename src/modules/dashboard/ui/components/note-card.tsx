import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatDate } from "@/lib/date";
import type { Note } from "@/types";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Clock } from "lucide-react";
import NotesOptionDropdown from "./notes-option-dropdown";
import { useState } from "react";

interface NoteCardProps {
  note: Note;
  role: string;
}

const NoteCard = ({ note, role }: NoteCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="group p-4 rounded-lg border bg-card hover:bg-accent/50 cursor-pointer transition-all duration-200 hover:shadow-md"
        >
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
              <h3 className="font-semibold text-card-foreground group-hover:text-accent-foreground transition-colors">
                {note.title}
              </h3>
              <div className="flex items-center gap-4 mt-2">
                {role == "Collaborator" && (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-4 w-4">
                      <AvatarFallback className="text-xs bg-muted">
                        {note.owner_id?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                      by {note.owner_id}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Last edited: {formatDate(note.updated_at!)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <Badge variant="secondary" className="text-xs">
                {role}
              </Badge>
              <NotesOptionDropdown note={note} />
            </div>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{note.title}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {note.content_html ? (
            <div 
              className="prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: note.content_html }} 
            />
          ) : (
            <p className="text-muted-foreground italic">No content available</p>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t text-sm text-muted-foreground">
          <span>Created: {formatDate(note.created_at!)}</span>
          <span>Last edited: {formatDate(note.updated_at!)}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NoteCard;
