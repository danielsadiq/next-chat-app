"uce client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMessageStore } from "@/lib/store/messages";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

export function DeleteAlert() {
  const actionMessage = useMessageStore((state) => state.actionMessage);
  const optimisticDeleteMessage = useMessageStore(
    (state) => state.optimisticDeleteMessage,
  );
  async function handleDeleteMessage() {
    if (!actionMessage?.id) {
      return; // Exit early if there's nothing to delete
    }
    const supabase = createClient();
    optimisticDeleteMessage(actionMessage.id);
    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", actionMessage?.id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Successfully deleted!");
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button id="trigger-delete"></button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers. {actionMessage?.id}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteMessage}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function EditAlert() {
  const actionMessage = useMessageStore((state) => state.actionMessage);
  const optimisticUpdateMessage = useMessageStore(state => state.optimisticUpdateMessage);
  const inputRef = useRef<HTMLInputElement>(null);
  async function handleEdit() {
    const supabase = createClient();
    const text = inputRef.current?.value.trim();
    if (text && actionMessage?.id) {
      // optimisticUpdateMessage(actionMessage.id, text)
      const {error} = await supabase
        .from("messages")
        .update({ text, is_edit: true })
        .eq("id", actionMessage?.id);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Successfully updated!");
      }
      document.getElementById('trigger-edit')?.click();
    }
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button id="trigger-edit"></button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Edit Message</DialogTitle>
          </DialogHeader>
          <Input defaultValue={actionMessage?.text} ref={inputRef} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleEdit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
