import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { editMessage } from "@/lib/data-services";
import { useState } from "react";

interface EditMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: {
    id: string;
    content: string;
  } | null;
}

export default function EditMessageDialog({open, onOpenChange, message}: EditMessageDialogProps) {
  const [editContent, setEditContent] = useState(message?.content);
  // Keep input updated when message changes
  useState(() => {
    if (message) setEditContent(message.content);
  }, [message]);
  
  async function handleSaveEdit(){
    if (message && editContent){
      await editMessage(message?.id, editContent);
    }
    onOpenChange(false);
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Message</DialogTitle>
          <DialogDescription>
            Update your message below and click save.
          </DialogDescription>
        </DialogHeader>
        {message && (
        <div className="space-y-4">
          <Input
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Edit your message..."
          />
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save</Button>
          </DialogFooter>
        </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
