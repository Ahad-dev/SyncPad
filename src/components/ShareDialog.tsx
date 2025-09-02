import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, User2, Share, Copy, Mail, Plane, ShareIcon, Send } from "lucide-react";
import { toast } from "sonner";
import { Label } from "./ui/label";
import CollaboratorService from "@/supabase/utils/collaborator";
import type { Collaborator } from "@/types";

const roles = [
  { value: "viewer", label: "Viewer" },
  { value: "editor", label: "Editor" },
];

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  noteTitle: string;
  noteId: string;
}

const ShareDialog = ({ isOpen, onClose, noteTitle, noteId }: ShareDialogProps) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


  const shareUrl = `${window.location.origin}/notes/${noteId}`;

  useEffect(() => {
    // ? Fetch existing collaborators
    console.log(noteId)
    const fetchCollaborators = async () => {
      try {
        const data = await CollaboratorService.getCollaboratorOfNotes(noteId);
        setCollaborators(data);
      } catch (error) {
        toast.error("Failed to fetch collaborators");
      }
    };
    if(isOpen){
      fetchCollaborators();
    }
  },[noteId,isOpen])

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

  const handleInvite = async() => {
    setLoading(true)
    try {
      
      await CollaboratorService.addCollaborator({
        email,
        role,
        note_id: noteId,
      });
      toast.success(`Invited ${email} as ${role}`);
    } catch (error) {
      toast.error("Failed to invite collaborator");
    } finally{
      setLoading(false)
    }
  };

  const handleRoleChange = (id, newRole) => {
    setCollaborators(
      collaborators.map((c) => (c.id === id ? { ...c, role: newRole } : c))
    );
  };

  const handleRemove = (id) => {
    setCollaborators(collaborators.filter((c) => c.id !== id));
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

          {/* Invite Collaborators Section */}
          <div className="space-y-2">
            <Label htmlFor="invite-email">Invite Collaborators</Label>
            <div className="flex gap-2">
              <Input
                id="invite-email"
                type="email"
                placeholder="Enter email to invite"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1"
              />
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-32">{roles.find(r => r.value === role)?.label}</SelectTrigger>
                <SelectContent>
                  {roles.map(r => (
                    <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleInvite} disabled={!email || loading}>
                <Send className="h-4 w-4 mr-1" />
                {loading ? "Inviting..." : "Invite"}
              </Button>
            </div>
          </div>

          {/* Collaborators List */}
          <div>
            <div className="font-semibold mb-2">Collaborators</div>
            <div className="space-y-2">
              {collaborators.map(c => (
                <div key={c.id} className="flex items-center gap-3 p-2 rounded bg-muted">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={c.profile.avatar_url} />
                    <AvatarFallback>
                      {c.profile.avatar_url ? c.profile.name[0].toUpperCase() : <User2 />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{c.profile.name}</div>
                    <div className="text-xs text-muted-foreground">{c.email}</div>
                  </div>
                  <Select
                    value={c.role.toLowerCase()}
                    onValueChange={val => handleRoleChange(c.id, val.charAt(0).toUpperCase() + val.slice(1))}
                    disabled={c.role === "Owner"}
                  >
                    <SelectTrigger className="w-24">{c.role}</SelectTrigger>
                    <SelectContent>
                      {roles.map(r => (
                        <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                      ))}
                      <SelectItem value="owner" disabled>Owner</SelectItem>
                    </SelectContent>
                  </Select>
                  {c.role !== "Owner" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(c.id)}
                      className="ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
