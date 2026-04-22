"uce client"
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
} from "@/components/ui/alert-dialog"
import { useMessageStore } from "@/lib/store/messages"
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export function DeleteAlert() {
  const actionMessage = useMessageStore(state => state.actionMessage);
  const optimisticDeleteMessage = useMessageStore(state => state.optimisticDeleteMessage);
  async function handleDeleteMessage(){
    if (!actionMessage?.id) {
    return; // Exit early if there's nothing to delete
  }
    const supabase = createClient();
    optimisticDeleteMessage(actionMessage.id)
    const { error }= await supabase.from("messages").delete().eq('id', actionMessage?.id);
    if (error){
      toast.error(error.message)
    }else {
      toast.success("Successfully deleted!")
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
          <AlertDialogAction onClick={handleDeleteMessage}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
