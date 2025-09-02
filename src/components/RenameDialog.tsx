import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileEdit } from "lucide-react";
import { toast } from "sonner";

interface RenameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onRename: (newName: string) => void;
}

const RenameDialog = ({ isOpen, onClose, currentName, onRename }: RenameDialogProps) => {
  const [newName, setNewName] = useState(currentName);

  const handleRename = () => {
    if (!newName.trim()) {
      toast.error("Please enter a valid name");
      return;
    }
    
    if (newName.trim() === currentName) {
      toast.info("Name unchanged");
      onClose();
      return;
    }

    onRename(newName.trim());
    onClose();
  };

  const handleClose = () => {
    setNewName(currentName); // Reset to original name
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileEdit className="h-5 w-5" />
            Rename Note
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="note-name">Note Name</Label>
            <Input
              id="note-name"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new name"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRename();
                }
              }}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleRename}>
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDialog;
