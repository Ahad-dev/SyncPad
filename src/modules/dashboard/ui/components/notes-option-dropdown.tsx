import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2, Share, FileEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConfirmation } from "@/hooks/use-confirmation";
import ShareDialog from "@/components/ShareDialog";
import RenameDialog from "@/components/RenameDialog";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { renameNote, deleteNote } from "@/store/notesSlice";
import { toast } from "sonner";
import type { Note } from "@/types";
import NotesService from "@/supabase/utils/notes";

interface NotesOptionDropdownProps {
  note: Note;
}

const NotesOptionDropdown = ({ note }: NotesOptionDropdownProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  
  const { confirm: confirmDelete, ConfirmationDialog } = useConfirmation({
    title: "Delete Note",
    description: `Are you sure you want to delete "${note.title}"? This action cannot be undone.`,
    confirmText: "Delete",
    cancelText: "Cancel",
  });

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/update/${note.id}`);
  };

  const handleRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRenameDialogOpen(true);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShareDialogOpen(true);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmed = await confirmDelete();
    if (confirmed) {
      try {
        await NotesService.delete(note.id);
        dispatch(deleteNote(note.id));
        toast.success("Note deleted successfully");
      } catch (error) {
        toast.error("Failed to delete note");
        console.error("Delete note error:", error);
      }
    }
  };

  const handleRenameSubmit = async (newName: string) => {
    
    try {
      // TODO: Implement actual API call to rename note
      dispatch(renameNote({ id: note.id, newTitle: newName }));
      await NotesService.update(note.id, { title: newName });
      toast.success("Note renamed successfully");
      setRenameDialogOpen(false);
    } catch (error) {
      toast.error("Failed to rename note");
      console.error("Rename note error:", error);
    } 
  };

  const DROP_DOWN_OPTION = [
    {
      icon: <Edit className="mr-2 h-4 w-4 text-green-500" />,
      label: "Edit",
      onClick: handleEdit,
    },
    {
      icon: <FileEdit className="mr-2 h-4 w-4 text-blue-500" />,
      label: "Rename",
      onClick: handleRename,
    },
    {
      icon: <Share className="mr-2 h-4 w-4 text-blue-500" />,
      label: "Share",
      onClick: handleShare,
    },
    {
      icon: <Trash2 className="mr-2 h-4 w-4" />,
      label: "Delete",
      onClick: handleDelete,
      className: "text-destructive focus:text-destructive",
    },
  ];
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {DROP_DOWN_OPTION.map((option, index) => (
            <DropdownMenuItem
              key={index}
              onClick={option.onClick}
              className={option.className}
            >
              {option.icon}
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialogs */}
      <ConfirmationDialog />
      
      <ShareDialog 
        isOpen={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        noteTitle={note.title}
        noteId={note.id}
      />
      
      <RenameDialog
        isOpen={renameDialogOpen}
        onClose={() => setRenameDialogOpen(false)}
        currentName={note.title}
        onRename={handleRenameSubmit}
      />
    </>
  );
};

export default NotesOptionDropdown;
