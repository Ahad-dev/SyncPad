import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share, Copy, Mail, Link } from "lucide-react";
import { toast } from "sonner";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  noteTitle: string;
  noteId: string;
}

const ShareDialog = ({ isOpen, onClose, noteTitle, noteId }: ShareDialogProps) => {
  const [email, setEmail] = useState("");
  const shareUrl = `${window.location.origin}/notes/${noteId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleShareByEmail = () => {
    if (!email.trim()) {
      toast.error("Please enter an email address");
      return;
    }
    // TODO: Implement email sharing logic
    toast.success(`Shared with ${email}`);
    setEmail("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share className="h-5 w-5" />
            Share "{noteTitle}"
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Share Link Section */}
          <div className="space-y-2">
            <Label>Share Link</Label>
            <div className="flex gap-2">
              <Input 
                value={shareUrl} 
                readOnly 
                className="flex-1"
              />
              <Button 
                onClick={handleCopyLink}
                variant="outline"
                size="sm"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Anyone with this link can view the note
            </p>
          </div>

          {/* Share by Email Section */}
          <div className="space-y-2">
            <Label htmlFor="email">Share with specific person</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleShareByEmail}
                variant="default"
                size="sm"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
