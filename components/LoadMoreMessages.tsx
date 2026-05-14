import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { LIMIT_MESSAGE } from "@/lib/constant";
import { getFromAndTo } from "@/lib/utils";
import { useMessageStore } from "@/lib/store/messages";
import { toast } from "sonner";

export default function LoadMoreMessages() {
  const { page, setMessageforPage, hasMore } = useMessageStore(
    (state) => state,
  );
  async function fetchMore() {
    const { from, to } = getFromAndTo(page, LIMIT_MESSAGE);
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("messages")
      .select("*, users(*)")
      .range(from, to)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setMessageforPage(data.reverse());
    }
  }
  if (hasMore) {
    return (
      <Button variant="outline" className="w-full" onClick={fetchMore}>
        Load More
      </Button>
    );
  }else{
    return <></>
  }
}
